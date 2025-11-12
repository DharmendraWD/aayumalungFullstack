// models/Hero.js
import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    button1Text: {
      type: String,
      trim: true,
    },
    button2Text: {
      type: String,
      trim: true,
    },
    button1Link: {
      type: String,
      trim: true,
    },
    button2Link: {
      type: String,
      trim: true,
    },
 images: [
      {
        type: String, // store image URLs or file paths
        required: false,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

export const Hero = mongoose.model("Hero", heroSchema);
