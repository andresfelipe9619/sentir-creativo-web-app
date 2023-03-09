module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql2',
        host: env('DATABASE_HOST'),
        port:env.int('DATABASE_PORT', 3306),
        database:env('DATABASE_NAME', 'sentircr'),
        username:env('DATABASE_USERNAME', 'admin'),
        password:env('DATABASE_PASSWORD', ''),
        timezone:"+00:00",
      },
      options: {
        autoMigration: true
      }
    }
  }
})
