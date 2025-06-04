import overviewModel from "../models/overviewModel.js";
import userModel from "../models/userModel.js";

export const overviewList = async (req, res) => {
  const pageNo = parseInt(req.params.pageNo) || 1;
  const limit = 5;
  const skip = (pageNo - 1) * limit;

  try {
    const totalPosts = await overviewModel.countDocuments(); // Get total post count
    const data = await overviewModel.find().skip(skip).limit(limit);

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

export const overviewIndex = async (req, res) => {
  try {
    const data = await overviewModel
      .find({})
      .select("_id title subtitle label");

    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const getOverview = async (req, res) => {
  const { label } = req.params;

  try {
    const overview = await overviewModel
      .findOne({ label: label.toLowerCase() })
      .populate("postIds");

    if (!overview) {
      return res
        .status(404)
        .json({ success: false, message: "Overview not found" });
    }

    res.status(200).json({ success: true, data: overview });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred", error });
  }
};

export const getOverviewById = async (req, res) => {
  const { labelId } = req.params;

  try {
    const overview = await overviewModel.findById(labelId).populate("postIds");

    if (!overview) {
      return res
        .status(404)
        .json({ success: false, message: "Overview not found" });
    }

    res.status(200).json({ success: true, data: overview });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred", error });
  }
};

// Safe parsing helpers
const safeParse = (value, fallback) => {
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    return fallback;
  }
};

export const createOverview = async (req, res) => {
  try {
    const { title, subtitle, desc } = req.body;

    const label = subtitle?.toLowerCase().split(" ").join("-");

    const parsedAuthor = safeParse(req.body.author, {});
    const parsedFaqs = safeParse(req.body.faqs, []);
    const parsedKeyterms = safeParse(req.body.keyterms, []);

    const newOverview = new overviewModel({
      title,
      subtitle,
      label,
      desc,
      author: parsedAuthor,
      faqs: parsedFaqs,
      keyterms: parsedKeyterms,
    });

    await newOverview.save();

    return res.status(201).json({
      success: true,
      message: "Overview Created",
      data: newOverview,
    });
  } catch (error) {
    console.error("Error creating overview:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateOverview = async (req, res) => {
  const { overviewId } = req.params;
  const { title, subtitle, desc, author, faqs, keyterms } = req.body;

  try {
    const overview = await overviewModel.findById(overviewId);
    if (!overview) {
      return res.status(404).json({ message: "Overview not found" });
    }

    const parsedAuthor = safeParse(author, {});
    const parsedFaqs = safeParse(faqs, []);
    const parsedKeyterms = safeParse(keyterms, []);

    const label = subtitle?.toLowerCase().split(" ").join("-");

    await overviewModel.findByIdAndUpdate(overviewId, {
      title,
      subtitle,
      desc,
      author: parsedAuthor,
      faqs: parsedFaqs,
      keyterms: parsedKeyterms,
      label,
    });

    const updatedOverview = await overviewModel.findById(overviewId);

    res.json({
      success: true,
      message: "Overview Updated",
      data: updatedOverview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Overview",
      error,
    });
  }
};

export const deleteOverview = async (req, res) => {
  const { overviewId } = req.params;

  try {
    const overview = await overviewModel.findById(overviewId);
    if (!overview) {
      return res.status(404).json({ message: "Overview not found" });
    }

    const permit = await userModel.findById(req.body.userId);
    if (!permit.permission.includes("deleteOverview")) {
      return res.status(401).json({ message: "Permission Denied" });
    }

    await overviewModel.findByIdAndDelete(overviewId);
    res.status(200).json({ message: "Overview Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Overview", error });
  }
};
