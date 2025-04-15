import mongoose from "mongoose";

const overviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
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
      required: true,
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
