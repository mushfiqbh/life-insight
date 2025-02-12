import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

const postList = async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.json({ success: true, data: posts });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred" });
  }
};

const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred" });
  }
};

const createPost = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const post_label = req.body.label.split(" ").join("-");

  const words = req.body.content?.split(" ")?.length;
  const reading_time = Math.ceil(words / 225);

  const newPost = new postModel({
    title: req.body.title,
    label: post_label,
    subtitle: req.body.subtitle,
    author: JSON.parse(req.body.author),
    content: req.body.content,
    readingTime: reading_time,
    editors: JSON.parse(req.body.editors),
    sources: JSON.parse(req.body.sources),
    image: image_filename,
    date: req.body.date,
  });

  try {
    await newPost.save();
    res.json({ success: true, message: "Post Created" });
  } catch (error) {
    res.json({ success: false, message: "Error Creating Post", error });
  }
};

const updatePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await postModel.findByIdAndUpdate(postId, req.body);
    res.status(200).json({ success: true, message: "Post Updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

const incrementViews = async (req, res) => {
  const { postId } = req.params;

  try {
    if (
      Object.keys(req.body).length !== 1 &&
      !Object.keys(req.body).includes("$inc")
    ) {
      return res.status(405).json({ message: "Invalid Request" });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await postModel.findByIdAndUpdate(postId, req.body);
    const updatedPost = await postModel.findById(postId);
    res.status(200).json({ message: "Post Updated", data: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const permit = await userModel.findById(req.body.userId);
    if (!permit.permission.includes("deletePost")) {
      return res.status(401).json({ message: "Permission Denied" });
    }

    fs.unlink(`uploads/${post.image}`, () => {});
    await postModel.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Post", error });
  }
};

export {
  createPost,
  updatePost,
  incrementViews,
  getPost,
  deletePost,
  postList,
};
