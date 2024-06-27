// ldapClient.js
const ldap = require('ldapjs');
const config = require('./ldapConfig');

const client = ldap.createClient({
  url: config.url
});

client.bind(config.bindDN, config.bindCredentials, (err) => {
  if (err) {
    console.error('Error binding to LDAP server:', err);
  } else {
    console.log('Successfully connected to LDAP server');
  }
});

module.exports = client;
