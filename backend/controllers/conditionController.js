import conditionModel from "../models/conditionModel.js";
import userModel from "../models/userModel.js";

export const conditionList = async (req, res) => {
  // Use query parameter instead of route param
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const totalConditions = await conditionModel.countDocuments(); // Get total count
    const conditions = await conditionModel.find().skip(skip).limit(limit);

    res.status(200).json({
      page, // Current page number
      totalPages: Math.ceil(totalConditions / limit), // Total pages
      conditions, // The array of conditions
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Occurred",
      error: error.message,
    });
  }
};

export const conditionIndex = async (req, res) => {
  try {
    const data = await conditionModel
      .find({})
      .select("_id title subtitle label");

    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const getCondition = async (req, res) => {
  const { label } = req.params;

  try {
    const condition = await conditionModel
      .findOne({ label: label.toLowerCase() })
      .populate("postIds");

    if (!condition) {
      return res
        .status(404)
        .json({ success: false, message: "Condition not found" });
    }

    res.status(200).json({ success: true, data: condition });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred", error });
  }
};

export const getConditionById = async (req, res) => {
  const { conditionId } = req.params;

  try {
    const condition = await conditionModel.findById(conditionId).populate("postIds");

    if (!condition) {
      return res
        .status(404)
        .json({ success: false, message: "Condition not found" });
    }

    res.status(200).json({ success: true, data: condition });
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

export const createCondition = async (req, res) => {
  try {
    const { title, subtitle, desc } = req.body;

    const label = subtitle?.toLowerCase().split(" ").join("-");

    const parsedAuthor = safeParse(req.body.author, {});
    const parsedFaqs = safeParse(req.body.faqs, []);
    const parsedKeyterms = safeParse(req.body.keyterms, []);

    const newCondition = new conditionModel({
      title,
      subtitle,
      label,
      desc,
      author: parsedAuthor,
      faqs: parsedFaqs,
      keyterms: parsedKeyterms,
    });

    await newCondition.save();

    return res.status(201).json({
      success: true,
      message: "Condition Created",
      data: newCondition,
    });
  } catch (error) {
    console.error("Error creating condition:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateCondition = async (req, res) => {
  const { conditionId } = req.params;
  const { title, subtitle, desc, author, faqs, keyterms } = req.body;

  try {
    const condition = await conditionModel.findById(conditionId);
    if (!condition) {
      return res.status(404).json({ message: "Condition not found" });
    }

    const parsedAuthor = safeParse(author, {});
    const parsedFaqs = safeParse(faqs, []);
    const parsedKeyterms = safeParse(keyterms, []);

    const label = subtitle?.toLowerCase().split(" ").join("-");

    await conditionModel.findByIdAndUpdate(conditionId, {
      title,
      subtitle,
      desc,
      author: parsedAuthor,
      faqs: parsedFaqs,
      keyterms: parsedKeyterms,
      label,
    });

    const updatedCondition = await conditionModel.findById(conditionId);

    res.json({
      success: true,
      message: "Condition Updated",
      data: updatedCondition,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating Condition",
      error,
    });
  }
};

export const deleteCondition = async (req, res) => {
  const { conditionId } = req.params;

  try {
    const condition = await conditionModel.findById(conditionId);
    if (!condition) {
      return res.status(404).json({ message: "Condition not found" });
    }

    const permit = await userModel.findById(req.body.userId);
    if (!permit.permission.includes("deleteCondition")) {
      return res.status(401).json({ message: "Permission Denied" });
    }

    await conditionModel.findByIdAndDelete(conditionId);
    res.status(200).json({ message: "Condition Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Condition", error });
  }
};
