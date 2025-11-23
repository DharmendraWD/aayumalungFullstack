


import { FAQ } from "../../models/faq/faqModel.js";
import path from "path";
import fs from "fs";


// create 
export const addFAQ = async (req, res) => {
  try {

let question = req.body.question
let answer = req.body.answer;


    const faq = new FAQ({
          question:question,
          answer:answer,

    });
    await faq.save();
    res.json({ ok: true, data:faq, message:"faq added successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// delete 
export const deleteFaq = async (req, res) => {
  try {
    let { id } = req.body;
    // console.log(blogId, "id")

    await FAQ.findByIdAndDelete(id);
    res.json({ ok: true, message:"FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// get all 
export const getallfaq = async (req, res) => {
  try {
    const faq = await FAQ.find(); 
    return res.status(200).json({ faq, ok: true });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Failed to fetch blog", ok: false });
  }
};