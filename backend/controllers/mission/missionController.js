
import { Mission } from "../../models/mission/missionModel.js";
import path from "path";
import fs from "fs";

// update mission
export const updateMission = async (req, res) => {
  try {
    let data = req.body;
    // console.log(data);

    let existing = await Mission.findOne();

    if (!existing) {
      existing = new Mission({});
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
    const updated = await Mission.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    res.status(200).json({
      ok: true,
      message: "Mission Section updated successfully",
      data: updated,
    });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error, ok:false });
  }
};

// delete image 
export const deleteMissionImage = async (req, res) => {
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
 
     // Update mission document
     const mission = await Mission.findOne();
     if (!mission) {
       return res.status(404).json({ message: "mission not found", ok: false });
     }
 
 mission.images = mission.images.filter(
   (img) => img !== `/${image}`
 );
 
 // mission.images.forEach((img, index) => {
 //   console.log("abtus img db", img)
 //   console.log("req.body", image)
 // })
 
     await mission.save();
 
     res.status(200).json({ message: "Image deleted successfully", ok: true, mission });
   } catch (error) {
     console.error("Error deleting image:", error);
     res.status(500).json({ message: "Failed to delete image", ok: false });
   }
    
}
 export const getAllMissions = async (req, res) => {
  try {
   let mission = await Mission.find();
    return res.status(200).json({  ok: true, mission });
  } catch (error) {
    console.error("Error fetching mission:", error);
    res.status(500).json({ message: "Failed to fetch mission", ok: false });
  }
};