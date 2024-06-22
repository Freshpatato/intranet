const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ldapConfig = require('./config/ldapConfig');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

// LDAP client setup
const ldap = require('ldapjs');
const client = ldap.createClient({
  url: ldapConfig.server.url
});

client.bind(ldapConfig.bindDn, ldapConfig.bindCredentials, (err) => {
  if (err) {
    console.error('Error binding to LDAP server:', err);
  } else {
    console.log('Successfully bound to LDAP server');
  }
});

const searchLDAP = (searchBase, searchOptions) => {
  return new Promise((resolve, reject) => {
    client.search(searchBase, searchOptions, (err, res) => {
      if (err) {
        return reject(err);
      }

      const entries = [];

      res.on('searchEntry', (entry) => {
        entries.push(entry.object);
      });
      res.on('end', (result) => {
        if (result.status !== 0) {
          reject(new Error(`LDAP search failed with status: ${result.status}`));
        } else {
          resolve(entries);
        }
      });
    });
  });
};

const getUsersByRole = async (role) => {
  const searchOptions = {
    scope: 'sub',
    filter: `(memberOf=CN=${role},CN=Users,DC=beenary,DC=local)`,
    attributes: ldapConfig.userAttributes
  };

  try {
    const users = await searchLDAP(ldapConfig.searchBase, searchOptions);
    return users.map(user => ({
      name: user.cn,
      email: user.mail,
      dn: user.dn
    }));
  } catch (error) {
    console.error(`Error fetching ${role}s:`, error);
    throw error;
  }
};

module.exports = {
  getUsersByRole
};
