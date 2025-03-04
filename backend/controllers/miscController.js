import Fuse from "fuse.js";
import postModel from "../models/postModel.js";
import overviewModel from "../models/overviewModel.js";

export const search = async (req, res) => {
  const { query } = req.params;
  try {
    const posts = await postModel.find({});
    const catalog = await overviewModel.find({});

    const options = {
      keys: ["title", "subtitle", "content", "desc"],
      includeScore: true,
      threshold: 0.3,
    };

    const fuse = new Fuse([...posts, ...catalog], options);
    const result = fuse.search(query);

    res.json({ success: true, data: result });
  } catch (error) {
    res.json({ success: false, message: "Error Occurred", error });
  }
};
