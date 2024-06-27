// config/ldapConfig.js
module.exports = {
  url: 'ldap://172.20.50.50:389',
  bindDN: 'Administrateur@home.local',
  bindCredentials: 'Bmw1999', // Remplacez par le mot de passe correct
  searchBase: 'DC=home,DC=local',
  searchFilter: '(sAMAccountName={{username}})'
};
