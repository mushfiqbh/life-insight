import overviewModel from "../models/overviewModel.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

export const getAllPosts = async (req, res) => {
  const pageNo = parseInt(req.params.pageNo) || 1;
  const limit = 5;
  const skip = (pageNo - 1) * limit;

  try {
    const totalPosts = await postModel.countDocuments(); // Get total post count
    const data = await postModel.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      data,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: pageNo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred", error });
  }
};

export const selectedPosts = async (req, res) => {
  try {
    let data = {};

    data.adminChoice = await postModel.findOne({ adminChoice: 1 });
    data.latestPost = await postModel.findOne().sort({ createdAt: -1 });
    data.popularPosts = await postModel.find().sort({ views: -1 }).limit(4);

    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred", error });
  }
};

export const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const relatedPosts = await postModel.find({
      label: post.label,
      _id: { $ne: postId },
    });

    res.json({ success: true, data: { post, relatedPosts } });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred", error });
  }
};

export const createPost = async (req, res) => {
  const image_filename = `${req.file.filename}`;

  const userId = req.userId;

  const words = req.body.content?.split(" ")?.length;
  const reading_time = Math.ceil(words / 225);

  const newPost = new postModel({
    title: req.body.title,
    label: req.body.label,
    subtitle: req.body.subtitle,
    author: JSON.parse(req.body.author),
    content: req.body.content,
    readingTime: reading_time,
    editors: [userId],
    sources: JSON.parse(req.body.sources),
    image: image_filename,
    adminChoice: req.body.adminChoice,
  });

  try {
    const thePost = await newPost.save();

    res.json({ success: true, message: "Post Created" });
  } catch (error) {
    res.json({ success: false, message: "Error Creating Post", error });
  }
};

export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Calculate reading time if content is provided
    const content = req.body.content ?? post.content;
    const words =
      typeof content === "string" ? content.trim().split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 225));

    // Add editor if not already present
    if (!Array.isArray(post.editors)) post.editors = [];

    const userIdStr = userId?.toString();
    if (userIdStr && !post.editors.includes(userIdStr)) {
      post.editors.push(userIdStr);
    }

    // Fields that should be updated (only from request body)
    const updatableFields = {
      title: req.body.title,
      label: req.body.label,
      subtitle: req.body.subtitle,
      author: JSON.parse(req.body.author),
      content: req.body.content,
      readingTime,
      sources: JSON.parse(req.body.sources),
      image: req.body.image,
      adminChoice: req.body.adminChoice,
    };

    // Optional parsing for structured fields
    if (req.body.author) {
      updatableFields.author = JSON.parse(req.body.author);
    }

    if (req.body.sources) {
      updatableFields.sources = JSON.parse(req.body.sources);
    }

    if (req.file?.filename) {
      updatableFields.image = req.file.filename;
    }

    Object.assign(post, updatableFields);

    await post.save();

    res.status(200).json({ success: true, message: "Post Updated", post });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({
      success: false,
      message: "Error updating post",
      error: error.message,
    });
  }
};

export const incrementViews = async (req, res) => {
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

export const deletePost = async (req, res) => {
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
