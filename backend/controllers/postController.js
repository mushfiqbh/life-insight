import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

export const createPost = async (req, res) => {
  const userId = req.userId;

  try {
    const imageUrl = req.file
      ? await uploadToCloudinary(req.file.buffer, "posts") // use buffer
      : req.body.image || "default_image_url";

    if (!imageUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Image upload failed" });
    }

    const words = req.body.content?.split(" ")?.length || 0;
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
      image: imageUrl,
      adminChoice: req.body.adminChoice,
    });

    await newPost.save();
    res.json({ success: true, message: "Post Created" });
  } catch (error) {
    console.error("Error in createPost:", error);
    res
      .status(500)
      .json({ success: false, message: "Error Creating Post", error });
  }
};

export const getAllPosts = async (req, res) => {
  const pageNo = parseInt(req.params.pageNo) || 1;
  const limit = 10;
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

    data.adminChoice = await postModel.findOne({ adminChoice: 1 }).select('-content');
    data.latestPost = await postModel.findOne().sort({ createdAt: -1 }).select('-content');
    data.popularPosts = await postModel.find().sort({ views: -1 }).limit(4).select('-content');

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

export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId;

  try {
    const existingPost = await postModel.findById(postId);
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const content = req.body.content ?? existingPost.content;
    const words =
      typeof content === "string" ? content.trim().split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 225));

    // let imageUrl = req.body.image || existingPost.image;

    // if (req.file) {
    //   imageUrl = await uploadToCloudinary(req.file.buffer, "posts");
    // }

    let editors = Array.isArray(existingPost.editors)
      ? [...existingPost.editors]
      : [];
    const userIdStr = userId?.toString();
    if (userIdStr && !editors.includes(userIdStr)) {
      editors.push(userIdStr);
    }

    const updatedFields = {
      title: req.body.title,
      label: req.body.label,
      subtitle: req.body.subtitle,
      content: req.body.content,
      readingTime,
      image: existingPost.image,
      adminChoice: req.body.adminChoice,
      editors,
    };

    if (req.body.author) {
      updatedFields.author = JSON.parse(req.body.author);
    }

    if (req.body.sources) {
      updatedFields.sources = JSON.parse(req.body.sources);
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { $set: updatedFields },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Post Updated", post: updatedPost });
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
  const userId = req.userId;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const permit = await userModel.findById(userId);
    if (!permit.permissions.includes("deletePost")) {
      return res.status(401).json({ message: "Permission Denied" });
    }

    // if (post.image) {
    //   const imageUrl = post.image;
    //   const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0]; // → posts/abc123

    //   await cloudinary.uploader.destroy(publicId);
    // }

    await postModel.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Post", error });
  }
};
