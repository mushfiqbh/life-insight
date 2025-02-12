import mongoose from "mongoose";

const catalogSchema = mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now().toString(),
  },
});

const catalogModel =
  mongoose.models.catalog || mongoose.model("catalog", catalogSchema);
export default catalogModel;
