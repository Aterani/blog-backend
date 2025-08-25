const { Router } = require("express");
const blogController = require("../controllers/blogController");
const blogRouter = Router();
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

blogRouter.post("/posts", blogController.createPost);
blogRouter.get("/posts", blogController.getPosts);
blogRouter.get("/posts/:postId", blogController.getPostById);
blogRouter.put("/posts/:postId", blogController.updatePost);
blogRouter.delete("/posts/:postId", blogController.deletePost);

blogRouter.post("/posts/:postId/comments", blogController.createComment);
blogRouter.get("/posts/:postId/comments", blogController.getCommentsByPostId);
blogRouter.get(
  "/posts/:postId/comments/:commentId",
  blogController.getCommentById,
);
blogRouter.put(
  "/posts/:postId/comments/:commentId",
  blogController.updateComment,
);
blogRouter.delete(
  "/posts/:postId/comments/:commentId",
  blogController.deleteComment,
);

blogRouter.post("/account", accountController.createAccount);
blogRouter.post(
  "/login",
  passport.authenticate("local"),
  accountController.logIn,
);
blogRouter.get("/logout", accountController.logOut);
blogRouter.get("/account", accountController.getAccount);
blogRouter.put("/account/:accountId", accountController.updateAccount);
blogRouter.delete("/account/:accountId", accountController.deleteAccount);

module.exports = blogRouter;
