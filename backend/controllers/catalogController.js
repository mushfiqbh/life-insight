import catalogModel from "../models/catalogModel.js";
import userModel from "../models/userModel.js";

const catalogList = async (req, res) => {
  try {
    const catalogs = await catalogModel.find({});
    res.json({ success: true, data: catalogs });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred" });
  }
};

const getCatalog = async (req, res) => {
  const { catalogId } = req.params;

  try {
    const catalog = await catalogModel.findById(catalogId);

    if (!catalog) {
      return res.status(404).json({ message: "Catalog not found" });
    }
    res.json({ success: true, data: catalog });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred", error });
  }
};

const createCatalog = async (req, res) => {
  const newCatalog = new catalogModel({
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
    await newCatalog.save();
    res.json({ success: true, message: "Catalog Created" });
  } catch (error) {
    res.json({ success: false, message: "Error Creating Catalog", error });
  }
};

const updateCatalog = async (req, res) => {
  const { catalogId } = req.params;

  try {
    const catalog = await catalogModel.findById(catalogId);
    if (!catalog) {
      return res.status(404).json({ message: "Catalog not found" });
    }

    req.body.label = req.body.subtitle.toLowerCase().split(" ").join("-");
    await catalogModel.findByIdAndUpdate(catalogId, req.body);
    const updatedCatalog = await catalogModel.findById(catalogId);

    res.status(200).json({ message: "Catalog Updated", data: updatedCatalog });
  } catch (error) {
    res.status(500).json({ message: "Error updating catalog", error });
  }
};

const deleteCatalog = async (req, res) => {
  const { catalogId } = req.params;

  try {
    const catalog = await catalogModel.findById(catalogId);
    if (!catalog) {
      return res.status(404).json({ message: "Catalog not found" });
    }

    const permit = await userModel.findById(req.body.userId);
    if (!permit.permission.includes("deleteOverview")) {
      return res.status(401).json({ message: "Permission Denied" });
    }

    await catalogModel.findByIdAndDelete(catalogId);
    res.status(200).json({ message: "Catalog Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Catalog", error });
  }
};

export { createCatalog, updateCatalog, getCatalog, deleteCatalog, catalogList };
