const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function createPost(postContent) {
  const post = await prisma.post.create({
    data: {
      title: postContent.title,
      content: postContent.content,
      authorId: postContent.authorId,
    },
  });
  return post;
}

async function getAllPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

async function searchPosts(query) {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      author: true,
    },
  });

  return posts;
}

async function getPostById(postId) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
    },
  });
  return post;
}

async function updatePost(postId, postContent) {
  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      title: postContent.title,
      content: postContent.content,
    },
  });
  return post;
}

async function deletePost(postId) {
  const post = await prisma.post.delete({
    where: { id: postId },
  });
  return post;
}

async function createComment(postId, commentContent) {
  const comment = await prisma.comment.create({
    data: {
      content: commentContent.content,
      postId: postId,
      authorId: commentContent.authorId,
    },
  });
  return comment;
}

async function getCommentsByPostId(postId) {
  const comments = await prisma.comment.findMany({
    where: { postId: postId },
    include: {
      author: true,
    },
  });
  return comments;
}

async function updateComment(commentId, commentContent) {
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: {
      content: commentContent.content,
    },
  });
  return comment;
}

async function deleteComment(commentId) {
  const comment = await prisma.comment.delete({
    where: { id: commentId },
  });
  return comment;
}

module.exports = {
  createPost,
  getAllPosts,
  searchPosts,
  getPostById,
  updatePost,
  deletePost,
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};
