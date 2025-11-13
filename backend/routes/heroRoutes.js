
import express from "express";
import { deleteImage, getAllHeroesItems, updateHeroItem } from "../controllers/homepage/heroController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// GET all
router.get("/hero", getAllHeroesItems);

// POST to update (multiple images allowed)
router.put("/hero", upload.array("images", 10), updateHeroItem);

// DELETE image
router.delete("/hero", deleteImage);

export default router;
