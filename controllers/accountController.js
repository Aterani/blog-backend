const db = require("../db/accountQueries");
const bcrypt = require("bcryptjs");

async function createAccount(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const account = await db.createAccount({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: "Failed to create account" });
  }
}

async function getAccount(req, res) {
  try {
    const accountId = Number(req.params.accountId);
    const account = await db.getAccountById(accountId);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve account" });
  }
}

async function updateAccount(req, res) {
  try {
    const accountId = Number(req.params.accountId);
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedAccount = await db.updateAccount(accountId, {
      username,
      hashedPassword,
    });
    if (!updatedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json(updatedAccount);
  } catch (error) {
    res.status(500).json({ error: "Failed to update account" });
  }
}

async function deleteAccount(req, res) {
  try {
    const accountId = Number(req.params.accountId);
    const deletedAccount = await db.deleteAccount(accountId);
    if (!deletedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
}

async function logIn(req, res) {
  try {
    if (req.user) {
      res.status(200).json({ message: "Login successful", user: req.user });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to log in" });
  }
}

async function logOut(req, res) {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to log out" });
  }
}

module.exports = {
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  logIn,
  logOut,
};
