
import { Aboutus } from "../../models/aboutus/aboutusModel.js";
import fs from "fs";
import path from "path";

// Create About Us Content
export const updateAboutUs = async (req, res) => {
  try {
    let data = req.body;
    // console.log(data);

    let existing = await Aboutus.findOne();

    if (!existing) {
      existing = new Aboutus({});
    }

    // ---- IMAGES ----
    const imageUrls = req.files?.map((file) => {
      return `/uploads/${path.basename(file.path)}`;
    }) || [];

    if (imageUrls.length > 0) {
      data.images = [...(existing.images || []), ...imageUrls];
    } else {
      // keep old images if no new image
      data.images = existing.images;
    }

    // ---- UPDATE / UPSERT ----
    const updated = await Aboutus.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "About Us updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// delete aboout us image 
export const deleteAboutUsImage = async (req, res) => {
  try {
    const { image } = req.body; // e.g., "/uploads/filename.jpg"

    // Build absolute path
    const filePath = path.join(process.cwd())+"\\"+image.replace(/^\/+/, '');
    
    // console.log(filePath) --> check this if says image file not found on servre

    // Delete file from local folder
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      return res.status(404).json({ message: "Image file not found on server", ok: false, youRequested:image });
    }

    // Update aboutus document
    const aboutus = await Aboutus.findOne();
    if (!aboutus) {
      return res.status(404).json({ message: "aboutus not found", ok: false });
    }

aboutus.images = aboutus.images.filter(
  (img) => img !== `/${image}`
);

// aboutus.images.forEach((img, index) => {
//   console.log("abtus img db", img)
//   console.log("req.body", image)
// })

    await aboutus.save();

    res.status(200).json({ message: "Image deleted successfully", ok: true, aboutus });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image", ok: false });
  }
};

// get all about us
export const getAllAboutUsItems = async (req, res) => {
  try {
    const aboutus = await Aboutus.find(); // assuming you have one aboutus section
    return res.status(200).json({ aboutus, ok: true });
  } catch (error) {
    console.error("Error fetching aboutus:", error);
    res.status(500).json({ message: "Failed to fetch aboutus", ok: false });
  }
};