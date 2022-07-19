import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  database: process.env.DATABASE_DB || "postgres",
  username: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
  port: parseInt(process.env.DATABASE_PORT || "5432", 10),
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  synchronize: false,
  migrationsTableName: process.env.MIGRATION_DB_TABLE || "typeorm",
  migrations: ['src/migration/*.{ts,js}']
})
