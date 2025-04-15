import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    label: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    author: {
      name: String,
      bio: String,
    },
    content: {
      type: String,
    },
    readingTime: {
      type: Number,
    },
    editors: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    sources: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    adminChoice: {
      type: Boolean,
      default: "false",
    },
  },
  { timeStamps: true }
);

const postModel = mongoose.models.post || mongoose.model("post", postSchema);
export default postModel;
