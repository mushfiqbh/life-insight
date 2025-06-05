import mongoose from "mongoose";

const conditionSchema = mongoose.Schema(
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
    postIds: [
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

const conditionModel =
  mongoose.models.condition || mongoose.model("condition", conditionSchema);
export default conditionModel;
