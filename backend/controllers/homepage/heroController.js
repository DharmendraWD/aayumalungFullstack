import { Hero } from "../../models/homepage/heroModel.js";
import cloudinary from "../../config/cloudinary.js";
import path from "path";
import fs from "fs";
import { ok } from "assert";




export const getAllHeroesItems = async (req, res) => {
  try {
    const hero = await Hero.find(); // assuming you have one hero section
    return res.status(200).json({ hero, ok: true });
  } catch (error) {
    console.error("Error fetching hero:", error);
    res.status(500).json({ message: "Failed to fetch hero", ok: false });
  }
};



export const updateHeroItem = async (req, res) => {
  try {
    const { title, description, button1Text, button2Text, button1Link, button2Link } = req.body;

    // Get image paths (relative to public directory)
    const imageUrls = req.files.map((file) => {
      return `/uploads/${path.basename(file.path)}`;
    });

    // Find or create hero document
    let hero = await Hero.findOne();
    if (!hero) hero = new Hero({});

    hero.title = title || hero.title;
    hero.description = description || hero.description;
    hero.button1Text = button1Text || hero.button1Text;
    hero.button2Text = button2Text || hero.button2Text;
    hero.button1Link = button1Link || hero.button1Link;
    hero.button2Link = button2Link || hero.button2Link;

    // Merge new images with existing ones
    const totalImages = hero.images.length + imageUrls.length;
    if (totalImages > 10) {
      return res.status(400).json({ message: "Maximum 10 images allowed", ok: false });
    }

    if (imageUrls.length > 0) {
      hero.images = [...hero.images, ...imageUrls];
    }

    await hero.save();

    return res.status(200).json({
      message: "Hero section updated successfully",ok:true
    });
  } catch (error) {
    console.error("Error updating hero item:", error);
   return res.status(500).json({ message: "Failed to update hero item", ok:false });
  }
};



export const deleteImage = async (req, res) => {
  try {
    const { image } = req.body; // e.g., "/uploads/filename.jpg"
    console.log("Requested image to delete:", image);

    // Build absolute path
    const filePath = path.join(process.cwd(), image.replace(/^\/+/, ''));
    console.log("Deleting file at:", filePath);

    // Delete file from local folder
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      return res.status(404).json({ message: "Image file not found" });
    }

    // Update hero document
    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    hero.images = hero.images.filter(
      (img) => img.trim().replace(/^\/+/, '') !== image.trim().replace(/^\/+/, '')
    );

    await hero.save();

    res.status(200).json({ message: "Image deleted successfully", hero });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image" });
  }
};
