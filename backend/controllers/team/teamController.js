


import { Team } from "../../models/team/teamModel.js";
import path from "path";
import fs from "fs";


// create 
export const addTeamMember = async (req, res) => {
  try {

let teamTitle = req.body.title
let teamDesc = req.body.desc;
let teamDesig = req.body.desig
let teamImage = req.file;

console.log(teamTitle)
    const team = new Team({
          title: teamTitle,
          desc: teamDesc,
          desig: teamDesig,
          image: teamImage.path,

    });
    await team.save();


    res.json({ ok: true, data:team, message:"Team member added successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// delete 
export const deleteTeamMember = async (req, res) => {
  try {
    let { teamId } = req.body;
    // console.log(teamId, "id")
    //  console.log(filePath)
    let foundedTeam = await Team.findById(teamId);

    let imagePath = foundedTeam.image  //uploads\image-1763208621723-915631519.png
     const fullImagePathLocal = path.join(process.cwd())+"\\"+imagePath.replace(/^\/+/, '');
    //  console.log(fullImagePathLocal)
         if (fs.existsSync(fullImagePathLocal)) {
           fs.unlinkSync(fullImagePathLocal);
         } else {
           return res.status(404).json({ message: "Image file not found on server", ok: false, youRequested:foundedTeam });
         }

    await Team.findByIdAndDelete(teamId);
    res.json({ ok: true, message:"Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// get all 
export const getAllTeamItems = async (req, res) => {
  try {
    const team = await Team.find(); 
    return res.status(200).json({ team, ok: true });
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({ message: "Failed to fetch team", ok: false });
  }
};