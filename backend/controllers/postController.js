import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import conditionModel from "../models/conditionModel.js";
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

    const thePost = await newPost.save();

    // push id to condition.postIds where label = label if not already present
    const condition = await conditionModel.findOne(
      { label: req.body.label } // Find condition by label
    );
    if (condition && !condition.postIds.includes(thePost._id)) {
      condition.postIds.push(thePost._id);
      await condition.save();
    }

    res.json({ success: true, message: "Post Created" });
  } catch (error) {
    console.error("Error in createPost:", error);
    res
      .status(500)
      .json({ success: false, message: "Error Creating Post", error });
  }
};

export const getAllPosts = async (req, res) => {
  // Use query params (e.g., /api/posts?page=1)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalPosts = await postModel.countDocuments();
    const posts = await postModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-content") // Exclude content field
      .sort({ createdAt: -1 }); // Sort by creation date, most recent first

    res.status(200).json({
      page, // The current page number
      totalPages: Math.ceil(totalPosts / limit), // Total number of pages
      posts, // The array of posts
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Occurred",
      error: error.message,
    });
  }
};

export const selectedPosts = async (req, res) => {
  try {
    let data = {};

    data.adminChoice = await postModel
      .findOne({ adminChoice: 1 })
      .select("-content");
    data.latestPost = await postModel
      .findOne()
      .sort({ createdAt: -1 })
      .select("-content");
    data.popularPosts = await postModel
      .find()
      .sort({ views: -1 })
      .limit(4)
      .select("-content");

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

    res.json({ success: true, data: post });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred", error });
  }
};

export const getRelatedPosts = async (req, res) => {
  const label = req.query.label;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;

  try {
    // First get the total count of related posts
    const totalPosts = await postModel.countDocuments({ label });
    const totalPages = Math.ceil(totalPosts / limit);

    // Then get the posts for the current page
    const relatedPosts = await postModel
      .find({ label })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-content");

    res.status(200).json({
      page,
      totalPages,
      relatedPosts,
    });
  } catch (error) {
    console.error("Error fetching related posts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching related posts",
      error: error.message,
    });
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
      views: existingPost.views || 0,
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

    if (updatedPost) {
      const condition = await conditionModel.findOne({
        label: updatedPost.label,
      });
      if (condition && !condition.postIds.includes(updatedPost._id)) {
        condition.postIds.push(updatedPost._id);
        await condition.save();
      }
    }

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
    if (!permit.permissions.includes("delete")) {
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
