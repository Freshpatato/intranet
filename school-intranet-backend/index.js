const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LdapStrategy = require('passport-ldapauth').Strategy;
const bodyParser = require('body-parser');
const cors = require('cors');
const ldap = require('ldapjs');
const ldapConfig = require('./config/ldap');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LdapStrategy(ldapConfig));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.post('/api/auth/login', (req, res, next) => {
  passport.authenticate('ldapauth', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.status(500).send({ message: 'Internal Server Error', error: err });
    }
    if (!user) {
      console.warn('Authentication failed:', info);
      return res.status(401).send({ message: 'Unauthorized', error: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).send({ message: 'Internal Server Error', error: err });
      }

      const roles = [];
      if (user.memberOf) {
        if (user.memberOf.includes('CN=Admins,CN=Users,DC=home,DC=local')) {
          roles.push('admin');
        }
        if (user.memberOf.includes('CN=Teachers,CN=Users,DC=home,DC=local')) {
          roles.push('teacher');
        }
        if (user.memberOf.includes('CN=Students,CN=Users,DC=home,DC=local')) {
          roles.push('student');
        }
      }
      user.roles = roles;
      user.name = user.cn;

      console.log('User authenticated successfully:', user);
      return res.send({ message: 'Authenticated', user });
    });
  })(req, res, next);
});

app.post('/api/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send({ message: 'Failed to logout', error: err });
    }
    console.log('User logged out');
    res.send({ message: 'Logged out' });
  });
});

const ldapClient = ldap.createClient({
  url: ldapConfig.server.url
});

ldapClient.on('error', (err) => {
  console.error('LDAP client error:', err);
});

const searchLDAP = (searchBase, searchOptions) => {
  return new Promise((resolve, reject) => {
    ldapClient.search(searchBase, searchOptions, (err, res) => {
      if (err) {
        console.error('LDAP search error:', err);
        reject(err);
      }
      const entries = [];
      res.on('searchEntry', (entry) => {
        console.log('LDAP entry:', entry.object);
        entries.push(entry.object);
      });
      res.on('end', (result) => {
        console.log('LDAP search completed. Entries:', entries);
        resolve(entries);
      });
      res.on('error', (err) => {
        console.error('LDAP search error:', err);
        reject(err);
      });
    });
  });
};

app.get('/api/students', async (req, res) => {
  try {
    console.log('Fetching students from LDAP');
    const students = await searchLDAP(ldapConfig.server.searchBase, {
      filter: '(memberOf=CN=Students,CN=Users,DC=home,DC=local)',
      scope: 'sub',
      attributes: ['cn', 'mail']
    });
    console.log('Students:', students);
    res.send(students);
  } catch (err) {
    console.error('Failed to fetch students:', err);
    res.status(500).send({ message: 'Failed to fetch students', error: err });
  }
});

app.get('/api/teachers', async (req, res) => {
  try {
    console.log('Fetching teachers from LDAP');
    const teachers = await searchLDAP(ldapConfig.server.searchBase, {
      filter: '(memberOf=CN=Teachers,CN=Users,DC=home,DC=local)',
      scope: 'sub',
      attributes: ['cn', 'mail']
    });
    console.log('Teachers:', teachers);
    res.send(teachers);
  } catch (err) {
    console.error('Failed to fetch teachers:', err);
    res.status(500).send({ message: 'Failed to fetch teachers', error: err });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
