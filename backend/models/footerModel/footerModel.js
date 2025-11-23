// models/Hero.js
import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    telegram: {
      type: String,
      trim: true,
    },
    x: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    youtube: {
      type: String,
      trim: true,
    },
    map: {
      type: String,
      trim: true,
    },

    footerAboveHeading:{
      type: String,
      trim: true,
    },
    footerAboveDesc:{
      type: String,
      trim: true,
    },
    footerAboveBtnValue:{
      type: String,
      trim: true,
    },
    footerAboveBtnLink:{
      type: String,
      trim: true,
    },
    Copyrights:{
      type: String,
      trim: true,
    }

  },
  { timestamps: true } // adds createdAt and updatedAt
);

export const Footer = mongoose.model("Footer", footerSchema);
