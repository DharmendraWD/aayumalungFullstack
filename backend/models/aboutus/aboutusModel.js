import mongoose from "mongoose";

const aboutusSchema = new mongoose.Schema({
  headingDesc: {
    title: String,
    subtitle: String,
    description: String,
  },

  whereWeOperate: {
    title: String,
    description: String,
    // Map image is fixed → no field needed
  },
 images: [
      {
        type: String, // store image URLs or file paths
        required: false,
      },
    ],

  foundation: {
    title: String,
    description: String,
  },

  capacity: {
    title: String,
    valueMW: String,
    description: String,
  },

  
}, { timestamps: true });

export const Aboutus = mongoose.model("Aboutus", aboutusSchema);
