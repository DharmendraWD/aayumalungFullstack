import path from "path";
import fs from "fs";
import {Gallary} from "../../models/gallary/gallaryModel.js";





export const getAllGallaryItems = async (req, res) => {
  try {
    const gallary = await Gallary.find();
    return res.status(200).json({ gallary, ok: true });
  } catch (error) {
    console.error("Error fetching Gallary:", error);
    res.status(500).json({ message: "Failed to fetch Gallary", ok: false });
  }
};



export const updateGallaryItem = async (req, res) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded", ok: false });
    }
    // Get image paths (relative to public directory)
    let imageUrls = req.files.map((file) => {
      return `/uploads/${path.basename(file.path)}`;
    });

    // Find or create Gallary document
    let gallary = await Gallary.findOne();
    if (!gallary) gallary = new Gallary({});


    // Merge new images with existing ones
    let totalImages = gallary.images.length + imageUrls.length;

    if (totalImages >6) {
      return res.status(400).json({ message: "Maximum 6 images allowed", ok: false });
    }

    if (imageUrls.length > 0) {
      gallary.images = [...gallary.images, ...imageUrls];
    }

    await gallary.save();

    return res.status(200).json({
      message: "Gallary section updated successfully",ok:true
    });
  } catch (error) {
    console.error("Error updating Gallary item:", error);
   return res.status(500).json({ message: "Failed to update Gallary item", ok:false });
  }
};



export const deleteGallaryImage = async (req, res) => {
  try {
    const { image } = req.body; // e.g., "/uploads/filename.jpg"
    // Build absolute path
    const filePath = path.join(process.cwd(),image.replace(/^\/+/, ''));

// console.log("file path ", filePath)
    // Delete file from local folder
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      return res.status(404).json({ message: "Image file not found", ok: false });
    }

    // Update Gallary document
    const gallary = await Gallary.findOne();
    if (!gallary) {
      return res.status(404).json({ message: "Gallary not found", ok: false });
    }

    gallary.images = gallary.images.filter(
      (img) => img.trim().replace(/^\/+/, '') !== image.trim().replace(/^\/+/, '')
    );

    await gallary.save();

    res.status(200).json({ message: "Image deleted successfully", ok: true, Gallary });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image", ok: false });
  }
};
