import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"

export const AppTestDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "david.liang",
    password: "",
    database: "graphql-ts-server-auth-test",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})