module.exports = {
  //...
  settings: {
    // cors: {
    //   origin: ['http://localhost', 'https://mysite.com', 'https://www.mysite.com'],
    // },
    'audit-log': {
      enabled: true,
      exclude: [],
      map: [
        {
          pluginName: 'content-manager',
          serviceName: 'contentmanager',
          decorate: true,
        },
      ]
    },
  },
};
 