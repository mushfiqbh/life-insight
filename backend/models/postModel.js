import mongoose from "mongoose";
import { type } from "os";

const postSchema = mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    author: {
      type: {
        name: String,
        bio: String,
      },
      required: true,
    },
    content: {
      type: String,
    },
    readingTime: {
      type: Number,
      required: true,
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
      required: true,
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
