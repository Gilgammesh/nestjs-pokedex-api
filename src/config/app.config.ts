export const AppConfig = () => ({
  environment: process.env['NODE_ENV'],
  appPort: +process.env['PORT'],
  mongoDbConnectionString: process.env['MONGO_DB_CONNECTION_STRING'],
  appGlobalPrefix: 'api',
  defaultLimit: 1,
  defaultOffset: 10
});
