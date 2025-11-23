
import express from "express";
import { deleteImage, getAllHeroesItems, updateHeroItem } from "../controllers/homepage/heroController.js";
import { deleteAboutUsImage, getAllAboutUsItems } from "../controllers/aboutus/aboutUsController.js";
import { upload } from "../middleware/multer.js";
import { updateAboutUs } from "../controllers/aboutus/aboutUsController.js";
import { deleteMissionImage, getAllMissions, updateMission } from "../controllers/mission/missionController.js";
import { addTeamMember, deleteTeamMember, getAllTeamItems } from "../controllers/team/teamController.js";
import { singleUpload } from "../middleware/singleUpload.js";
import { deleteGallaryImage, getAllGallaryItems, updateGallaryItem } from "../controllers/gallary/gallaryController.js";
import { addBlog, deleteBlog, getAllBlogItems, getOneBlogItems } from "../controllers/blog/blogController.js";
import { addClientMessage, deleteClientMessage, getAllClientMessages } from "../controllers/clientMessage/cMessageController.js";
import { getAllFooterItems, updateFooterItem } from "../controllers/footerInfo/footerInfoController.js";
import { addFAQ, deleteFaq, getallfaq } from "../controllers/faq/faqController.js";

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
router.post("/team",singleUpload.single("image"), addTeamMember);
router.delete("/team", deleteTeamMember);
router.get("/team", getAllTeamItems);
// TEAM END


// GALLARY 
router.put("/gallary",upload.array("images", 10), updateGallaryItem);
router.get("/gallary", getAllGallaryItems);
router.delete("/gallary", deleteGallaryImage);
// GALLARY END 


// BLOG 
router.get("/blog", getAllBlogItems);
router.post("/blog",singleUpload.single("image"), addBlog);
router.delete("/blog",deleteBlog);
router.get("/singleBlog/:blogId", getOneBlogItems);
// BLOG END



// CLIENT MEMSSG 
router.post("/client-message",addClientMessage);
router.get("/client-message", getAllClientMessages);
router.delete("/client-message", deleteClientMessage);
// CLIENT MEMSSG END 

// FOOTER SECTION 
router.put("/footer",  updateFooterItem);
router.get("/footer",  getAllFooterItems);
// FOOTER SECTION END


// FAQ 
router.get("/faq", getallfaq);
router.post("/faq", addFAQ);
router.delete("/faq", deleteFaq);
// FAQ END






export default router;
