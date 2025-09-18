"use strict";
import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD, DB_PORT } from "./configEnv.js";
import { User } from "../entities/user.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: `${HOST}`,
  port: DB_PORT,
  username: `${DB_USERNAME}`,
  password: `${PASSWORD}`,
  database: `${DATABASE}`,
  // Registrar las entidades directamente como objetos (EntitySchema)
  entities: [User],
  synchronize: true,
  logging: false,
});

export async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log("=> Conexión exitosa a la base de datos PostgreSQL!");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}