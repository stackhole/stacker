// Check typeORM documentation for more information.
const config = {
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  database: process.env.DATABASE_DB || "curd",
  username: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
  port: parseInt(process.env.DATABASE_PORT || "5432", 10),
  entities: [__dirname + '/**/*.entity.ts'],
  synchronize: false,
  migrationsTableName: process.env.MIGRATION_DB_TABLE || "typeorm",
  migrations: ['src/migration/*.ts'],
  cli: {
    migrationsDir: 'src/migration'
  }
};

export default config;