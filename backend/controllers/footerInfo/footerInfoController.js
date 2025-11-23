import { Footer } from "../../models/footerModel/footerModel.js";
import path from "path";






export const getAllFooterItems = async (req, res) => {
  try {
    const footer = await Footer.find();
    return res.status(200).json({ footer, ok: true });
  } catch (error) {
    console.error("Error fetching footer:", error);
    res.status(500).json({ message: "Failed to fetch footer", ok: false });
  }
};



export const updateFooterItem = async (req, res) => {
  try {
    const { heading, desc, email, phone, linkedin, telegram, x, instagram, youtube, map, footerAboveHeading, footerAboveDesc, footerAboveBtnValue, footerAboveBtnLink, Copyrights } = req.body;


    // Find or create footer document
    let footer = await Footer.findOne();
    if (!footer) footer = new Footer({});

    footer.heading = heading || footer.heading;
    footer.desc = desc || footer.desc;
    footer.email = email || footer.email;
    footer.phone = phone || footer.phone;
    footer.linkedin = linkedin || footer.linkedin;
    footer.telegram = telegram || footer.telegram;
    footer.x = x || footer.x;
    footer.instagram = instagram || footer.instagram;
    footer.youtube = youtube || footer.youtube;
    footer.map = map || footer.map;
    footer.footerAboveHeading = footerAboveHeading || footer.footerAboveHeading;
    footer.footerAboveDesc = footerAboveDesc || footer.footerAboveDesc;
    footer.footerAboveBtnValue = footerAboveBtnValue || footer.footerAboveBtnValue;
    footer.footerAboveBtnLink = footerAboveBtnLink || footer.footerAboveBtnLink;
    footer.Copyrights = Copyrights || footer.Copyrights;


    await footer.save();

    return res.status(200).json({
      message: "footer section updated successfully",ok:true
    });
  } catch (error) {
    console.error("Error updating footer item:", error);
   return res.status(500).json({ message: "Failed to update footer item", ok:false });
  }
};



