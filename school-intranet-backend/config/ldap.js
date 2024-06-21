const ldap = require('ldapjs');

const client = ldap.createClient({
  url: process.env.LDAP_URL
});

const opts = {
  filter: '(uid=user)',
  scope: 'sub',
  attributes: ['dn', 'sn', 'cn']
};

client.bind(process.env.LDAP_BIND_DN, process.env.LDAP_BIND_PASSWORD, (err) => {
  if (err) {
    console.error('Error binding to LDAP:', err);
  } else {
    client.search(process.env.LDAP_SEARCH_BASE, opts, (err, res) => {
      if (err) {
        console.error('Error searching LDAP:', err);
      }

      res.on('searchEntry', (entry) => {
        console.log('Entry:', entry.object);
      });

      res.on('error', (err) => {
        console.error('Search error:', err);
      });

      res.on('end', (result) => {
        console.log('Search result:', result);
        client.unbind((err) => {
          if (err) {
            console.error('Error unbinding:', err);
          }
        });
      });
    });
  }
});
