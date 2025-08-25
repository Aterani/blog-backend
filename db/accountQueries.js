const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function createAccount(user) {
  const account = await prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
    },
  });
  return account;
}

async function getAccountByUsername(username) {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user;
}

async function getAccountById(id) {
  const account = await prisma.user.findUnique({
    where: { id },
  });
  return account;
}

async function updateAccount(id, data) {
  const account = await prisma.user.update({
    where: { id },
    data: {
      username: data.username,
      password: data.password,
    },
  });
  return account;
}

async function deleteAccount(id) {
  const account = await prisma.user.delete({
    where: { id },
  });
  return account;
}

module.exports = {
  createAccount,
  getAccountById,
  getAccountByUsername,
  updateAccount,
  deleteAccount,
};
