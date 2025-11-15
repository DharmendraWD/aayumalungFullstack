import mongoose from "mongoose";
const teamSchema = new mongoose.Schema({
  upper: {
    title: String,
    desc: String,
  },

  team: [
    {
      title: String,
      desc: String,
      desig: String,
      image: String,
    }
  ],
}, { timestamps: true });


export const Team = mongoose.model("Team", teamSchema);
