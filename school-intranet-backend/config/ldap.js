module.exports = {
    server: {
      url: 'ldap://172.20.50.50',
      bindDn: 'CN=Administrateur,CN=Users,DC=home,DC=local',
      bindCredentials: 'Bmw1999',
      searchBase: 'DC=home,DC=local',
      searchFilter: '(sAMAccountName={{username}})',
    }
  };
  