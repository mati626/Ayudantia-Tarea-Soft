import { AppDataSource } from "../config/configDb.js";
import { User } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

function getUserRepository() {
  return AppDataSource.getRepository(User);
}

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const repo = getUserRepository();
  const newUser = repo.create({
    email: data.email,
    password: hashedPassword,
  });

  return await repo.save(newUser);
}

export async function findUserByEmail(email) {
  const repo = getUserRepository();
  return await repo.findOneBy({ email });
}

export async function findUserById(id) {
  const repo = getUserRepository();
  return await repo.findOneBy({ id });
}

export async function saveUser(user) {
  const repo = getUserRepository();
  return await repo.save(user);
}

export async function removeUser(user) {
  const repo = getUserRepository();
  return await repo.remove(user);
}
