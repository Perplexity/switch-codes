module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: true,
  logging: false,
  keepConnectionAlive: true,
  entities: [
    '../common/src/entities/**/*.js'
  ],
  migrations: [
    '../common/src/migration/**/*.js'
  ],
  subscribers: [
    '../common/src/subscriber/**/*.js'
  ],
  cli: {
    entitiesDir: '../common/src/entities',
    migrationsDir: '../common/src/migration',
    subscribersDir: '../common/src/subscriber'
  }
}
