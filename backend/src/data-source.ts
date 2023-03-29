import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import "dotenv/config";
import { User } from "./entities/usersEntity";
import { UserContact } from "./entities/userContactsEntity";
import { creatingUserCreatingContact1679498927035 } from "./migrations/1679498927035-creatingUser-creatingContact";
const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: [User, UserContact],
      }
    : {
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        logging: true,
        synchronize: false,
        entities: [User, UserContact],
        migrations: [creatingUserCreatingContact1679498927035],
      }
);

export default AppDataSource;
