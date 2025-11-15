
import express from "express";
import { deleteImage, getAllHeroesItems, updateHeroItem } from "../controllers/homepage/heroController.js";
import { deleteAboutUsImage, getAllAboutUsItems } from "../controllers/aboutus/aboutUsController.js";
import { upload } from "../middleware/multer.js";
import { updateAboutUs } from "../controllers/aboutus/aboutUsController.js";
import { deleteMissionImage, getAllMissions, updateMission } from "../controllers/mission/missionController.js";
import { addTeamMember, deleteTeamMember, getAllTeamItems } from "../controllers/team/teamController.js";
import { singleUpload } from "../middleware/singleUpload.js";

const router = express.Router();
// HERO 
router.get("/hero", getAllHeroesItems);
router.put("/hero", upload.array("images", 10), updateHeroItem);
router.delete("/hero", deleteImage);
// HERO END END 


// ABOUT US 
router.put(
  "/aboutus",
  upload.array("images", 2),
  updateAboutUs
); 
router.delete("/aboutus", deleteAboutUsImage);
router.get("/aboutus", getAllAboutUsItems);
// ABOUT US END


// MISSION
router.put("/mission", upload.array("images", 1), updateMission);
router.get("/mission", getAllMissions);
router.delete("/mission",  deleteMissionImage);
// MISSION END


// TEAM 
// router.post("/team", addTeamMember);
router.post("/team",singleUpload.single("image"), addTeamMember);
router.delete("/team", deleteTeamMember);
router.get("/team", getAllTeamItems);
// TEAM UPDATE 
export default router;
