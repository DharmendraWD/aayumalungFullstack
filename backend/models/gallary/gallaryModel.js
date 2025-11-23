// models/Hero.js
import mongoose from "mongoose";

const gallarySchema = new mongoose.Schema(
  {
 images: [
      {
        type: String, // store image URLs or file paths
        required: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

export const Gallary = mongoose.model("Gallary", gallarySchema);
