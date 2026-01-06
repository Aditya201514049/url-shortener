import { nanoid } from "nanoid";
import prisma from "../prisma.js";

export const createShortUrl = async (userId, original) => {
  // Count user's URLs for limit check
  const urlCount = await prisma.url.count({ where: { userId } });
  if (urlCount >= 100) {
    const err = new Error("URL creation limit reached (free tier: 100 URLs)");
    err.code = "LIMIT_REACHED";
    throw err;
  }
  const shortCode = nanoid(6); // or randomly 6–8 chars
  const url = await prisma.url.create({
    data: {
      original,
      shortCode,
      userId,
    },
  });
  return url;
};

export const listUserUrls = async (userId) => {
  return prisma.url.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteUrl = async (userId, id) => {
  // Only allow delete own URL
  return prisma.url.deleteMany({ where: { id, userId } });
};

export const findByShortCode = async (shortCode) => {
  return prisma.url.findUnique({ where: { shortCode } });
};

export const incrementClick = async (id) => {
  return prisma.url.update({
    where: { id },
    data: { clicks: { increment: 1 } },
  });
};