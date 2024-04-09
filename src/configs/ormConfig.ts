import { DataSource } from "typeorm";

export const dbConfiguration = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
        process.env.ENVIRONMENT == "dev"
            ? `${process.cwd()}/**/models/*.entity.ts`
            : `${process.cwd()}/**/models/*.entity.js`,
    ],
    logging: ["error"],
    synchronize: true,
    migrationsRun: true,
});