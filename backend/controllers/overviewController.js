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
      .populate("posts");
      
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

export const createOverview = async (req, res) => {
  const newOverview = new overviewModel({
    title: req.body.title,
    subtitle: req.body.subtitle,
    label: req.body.subtitle.toLowerCase().split(" ").join("-"),
    desc: req.body.desc,
    author: JSON.parse(req.body.author),
    faqs: JSON.parse(req.body.faqs),
    keyterms: JSON.parse(req.body.keyterms),
    date: req.body.date,
  });

  try {
    await newOverview.save();
    res.json({ success: true, message: "Overview Created" });
  } catch (error) {
    res.json({ success: false, message: "Error Creating Overview", error });
  }
};

export const updateOverview = async (req, res) => {
  const { overviewId } = req.params;

  try {
    const overview = await overviewModel.findById(overviewId);
    if (!overview) {
      return res.status(404).json({ message: "Overview not found" });
    }

    req.body.label = req.body.subtitle.toLowerCase().split(" ").join("-");
    await overviewModel.findByIdAndUpdate(overviewId, req.body);
    const updatedOverview = await overviewModel.findById(overviewId);

    res
      .status(200)
      .json({ message: "Overview Updated", data: updatedOverview });
  } catch (error) {
    res.status(500).json({ message: "Error updating Overview", error });
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
