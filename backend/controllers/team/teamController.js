


import { Team } from "../../models/team/teamModel.js";
import path from "path";
import fs from "fs";


// create 
export const addTeamMember = async (req, res) => {
  try {
// console.log(req.file)
let data = req.body; 
let upperTitle = data['upper.title'];
let upperDesc = data['upper.desc'];
let teamTitle = data['team[0].title'];
let teamDesc = data['team[0].desc'];
let teamDesig = data['team[0].desig'];
let teamImage = req.file;


    const team = new Team({
      upper: {
        title: upperTitle,
        desc: upperDesc,
      },
      team: [
        {
          title: teamTitle,
          desc: teamDesc,
          desig: teamDesig,
          image: teamImage.path,
        }
      ],
    });
    await team.save();


    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// delete 
export const deleteTeamMember = async (req, res) => {
  try {
    const { teamId } = req.body;
    
    //  console.log(filePath)
    let image = await Team.findById(teamId);
    let imagePath = image?.team[0]?.image  //uploads\image-1763208621723-915631519.png
     const fullImagePathLocal = path.join(process.cwd())+"\\"+imagePath.replace(/^\/+/, '');
     console.log(fullImagePathLocal)
         if (fs.existsSync(fullImagePathLocal)) {
           fs.unlinkSync(fullImagePathLocal);
         } else {
           return res.status(404).json({ message: "Image file not found on server", ok: false, youRequested:image });
         }

    await Team.findByIdAndDelete(teamId);
    res.json({ ok: true });
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