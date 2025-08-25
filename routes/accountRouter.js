const { Router } = require("express");
const accountRouter = Router();
const accountController = require("../controllers/accountController");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/accountQueries");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getAccountByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getAccountById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

accountRouter.post("/", accountController.createAccount);
accountRouter.put("/", passport.authenticate("local"), accountController.logIn);
accountRouter.delete("/", accountController.logOut);

accountRouter.get("/account/:accountId", accountController.getAccount);
accountRouter.put("/account/:accountId", accountController.updateAccount);
accountRouter.delete("/account/:accountId", accountController.deleteAccount);

module.exports = accountRouter;
