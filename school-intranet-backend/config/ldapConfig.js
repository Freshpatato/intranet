module.exports = {
  server: {
    url: process.env.LDAP_URL
  },
  bindDn: process.env.LDAP_BIND_DN,
  bindCredentials: process.env.LDAP_BIND_PASSWORD,
  searchBase: process.env.LDAP_SEARCH_BASE,
  searchFilter: '(sAMAccountName={{username}})',
  userAttributes: ['cn', 'mail', 'memberOf'],
};
