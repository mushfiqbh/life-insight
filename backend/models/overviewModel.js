import mongoose from "mongoose";

const overviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    label: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    desc: {
      type: String,
    },
    author: {
      type: Object,
    },
    faqs: {
      type: Array,
    },
    keyterms: {
      type: Array,
    },
  },
  { timeStamps: true }
);

const overviewModel =
  mongoose.models.overview || mongoose.model("overview", overviewSchema);
export default overviewModel;
