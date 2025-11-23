import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
      title: { type: String, required: true },
      desc: { type: String, required: true },
      date: { type: Date, default: Date.now },
      image: { type: String },
      author: { type: String, required: true },
}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogSchema);
