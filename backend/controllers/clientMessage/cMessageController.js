


import { ClientMessage } from "../../models/cMessageModel/cMessageModel.js";
import path from "path";
import fs from "fs";


// create 
export const addClientMessage = async (req, res) => {
  try {

let clientName = req.body.name
let clientEmali = req.body.email;
let clientMessage = req.body.message


    const clientMess = new ClientMessage({
          name: clientName,
          email: clientEmali,
          message: clientMessage,

    });
    await clientMess.save();


    res.json({ ok: true, data:clientMess, message:"Message added successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// delete 
export const deleteClientMessage = async (req, res) => {
  try {
    let { id } = req.body;
    // console.log(blogId, "id")

    await ClientMessage.findByIdAndDelete(id);
    res.json({ ok: true, message:"Client message deleted successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// get all 
export const getAllClientMessages = async (req, res) => {
  try {
    const clientMess = await ClientMessage.find(); 
    return res.status(200).json({ clientMess, ok: true });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Failed to fetch blog", ok: false });
  }
};