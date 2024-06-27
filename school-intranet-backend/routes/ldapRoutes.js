// routes/ldapRoutes.js
const express = require('express');
const ldap = require('ldapjs');
const router = express.Router();
const config = require('../config/ldapConfig');
const schedule = require('../config/schedule');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const client = ldap.createClient({
    url: config.url,
    timeout: 5000,
    connectTimeout: 10000,
    reconnect: true
  });

  const bindClient = (dn, credentials) => {
    return new Promise((resolve, reject) => {
      client.bind(dn, credentials, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  const searchUserDN = (username) => {
    return new Promise((resolve, reject) => {
      const searchOpts = {
        filter: config.searchFilter.replace('{{username}}', username),
        scope: 'sub',
        attributes: ['dn']
      };

      client.search(config.searchBase, searchOpts, (err, searchResult) => {
        if (err) {
          reject(err);
        }

        let userDN = null;

        searchResult.on('searchEntry', (entry) => {
          userDN = entry.object.dn;
        });

        searchResult.on('end', () => {
          if (userDN) {
            resolve(userDN);
          } else {
            reject(new Error('User not found'));
          }
        });
      });
    });
  };

  const searchUserGroups = (userDN) => {
    return new Promise((resolve, reject) => {
      const groupSearchOpts = {
        filter: `(member=${userDN})`,
        scope: 'sub',
        attributes: ['cn']
      };

      client.search(config.searchBase, groupSearchOpts, (err, groupSearchResult) => {
        if (err) {
          reject(err);
        }

        const roles = [];
        groupSearchResult.on('searchEntry', (entry) => {
          if (entry.object.cn) {
            roles.push(entry.object.cn);
          }
        });

        groupSearchResult.on('end', () => {
          resolve(roles);
        });
      });
    });
  };

  try {
    await bindClient(config.bindDN, config.bindCredentials);
    const userDN = await searchUserDN(username);
    await bindClient(userDN, password);
    const roles = await searchUserGroups(userDN);
    
    res.json({ message: 'Authentication successful', roles });
  } catch (err) {
    console.error('LDAP error:', err);
    res.status(401).json({ message: 'Authentication failed', error: err.message });
  } finally {
    client.unbind();
  }
});

router.get('/schedule', (req, res) => {
  const { roles } = req.query;  // Les rôles de l'utilisateur sont passés en tant que query parameter
  let userSchedule = [];

  if (roles.includes('CM1')) {
    userSchedule = userSchedule.concat(schedule.CM1);
  }
  if (roles.includes('CM2')) {
    userSchedule = userSchedule.concat(schedule.CM2);
  }

  res.json(userSchedule);
});

module.exports = router;
