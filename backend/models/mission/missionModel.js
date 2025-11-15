import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
  upper: {
    title: String,
    desc: String,
  },

  box1: {
    title: String,
    desc: String,
   
  },
  box2: {
    title: String,
    desc: String,
   
  },
  box3: {
    title: String,
    desc: String,
   
  },
 images: [
      {
        type: String, // store image URLs or file paths
        required: false,
      },
    ],
}, { timestamps: true });

export const Mission = mongoose.model("Mission", missionSchema);
