import prisma from "../prisma.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const createUser = async (email, password, name) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  return user;
};

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const validateUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return user;
};
