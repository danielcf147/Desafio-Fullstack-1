import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import "dotenv/config";
import { User } from "./entities/usersEntity";
import { UserContact } from "./entities/userContactsEntity";
import { creatingAddressPropertiesUsersToPropertiesCategories1680367749725 } from "./migrations/1680367749725-creatingAddress-Properties-UsersToProperties-Categories";
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
        migrations: [
          creatingAddressPropertiesUsersToPropertiesCategories1680367749725,
        ],
      }
);

export default AppDataSource;
