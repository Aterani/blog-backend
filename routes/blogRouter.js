const { Router } = require("express");
const blogRouter = Router();
const blogController = require("../controllers/blogController");

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

module.exports = blogRouter;
