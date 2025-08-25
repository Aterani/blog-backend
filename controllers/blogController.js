const db = require("../db/queries");

async function createPost(req, res) {
  const { title, content, authorId } = req.body;
  try {
    const newPost = await db.createPost({ title, content, authorId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
}

async function getPosts(req, res) {
  const search = req.query.search;
  if (search) {
    try {
      const posts = await db.searchPosts(search);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to search posts" });
    }
  } else {
    try {
      const posts = await db.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve posts" });
    }
  }
}

async function getPostById(req, res) {
  const postId = Number(req.params.postId);
  try {
    const post = await db.getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve post" });
  }
}

async function updatePost(req, res) {
  const postId = Number(req.params.postId);
  const { title, content } = req.body;
  try {
    const updatedPost = await db.updatePost(postId, { title, content });
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
}

async function deletePost(req, res) {
  const postId = Number(req.params.postId);
  try {
    const deletedPost = await db.deletePost(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
}

async function createComment(req, res) {
  const postId = Number(req.params.postId);
  const { content, authorId } = req.body;
  try {
    const newComment = await db.createComment(postId, { content, authorId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
}

async function getCommentsByPostId(req, res) {
  const postId = Number(req.params.postId);
  try {
    const comments = await db.getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
}

async function getCommentById(req, res) {
  const postId = Number(req.params.postId);
  const commentId = Number(req.params.commentId);
  try {
    const comment = await db.getCommentById(postId, commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comment" });
  }
}

async function updateComment(req, res) {
  const postId = Number(req.params.postId);
  const commentId = Number(req.params.commentId);
  const { content } = req.body;
  try {
    const updatedComment = await db.updateComment(commentId, {
      content,
    });
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" });
  }
}

async function deleteComment(req, res) {
  const commentId = Number(req.params.commentId);
  try {
    const deletedComment = await db.deleteComment(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment,
};
