


import { Blog } from "../../models/blog/blogModel.js";
import path from "path";
import fs from "fs";


// create 
export const addBlog = async (req, res) => {
  try {

let blogTitle = req.body.title
let blogDesc = req.body.desc;
let blogAuthor = req.body.author
let blogImage = req.file;


    const blog = new Blog({
          title: blogTitle,
          desc: blogDesc,
          author: blogAuthor,
          image: blogImage.path,

    });
    await blog.save();


    res.json({ ok: true, data:blog, message:"Blog added successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// delete 
export const deleteBlog = async (req, res) => {
  try {
    let { blogId } = req.body;
    // console.log(blogId, "id")
    //  console.log(filePath)
    let foundedId = await Blog.findById(blogId);

    let imagePath = foundedId.image  //uploads\image-1763208621723-915631519.png
     const fullImagePathLocal = path.join(process.cwd())+"\\"+imagePath.replace(/^\/+/, '');
    //  console.log(fullImagePathLocal)
         if (fs.existsSync(fullImagePathLocal)) {
           fs.unlinkSync(fullImagePathLocal);
         } else {
           return res.status(404).json({ message: "Image file not found on server", ok: false, youRequested:foundedId });
         }

    await Blog.findByIdAndDelete(blogId);
    res.json({ ok: true, message:"Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// get all 
export const getAllBlogItems = async (req, res) => {
  try {
    const blog = await Blog.find(); 
    return res.status(200).json({ blog, ok: true });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Failed to fetch blog", ok: false });
  }
};
export const getsingleBlog = async (req, res) => {
 const { blogId } = req.params;

  try {
  // const blog = await Blog.find({ _id: blogId}); 
  const blog = await Blog.findById(blogId);
    return res.status(200).json({ blog, ok: true });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Failed to fetch blog", ok: false });
  }
};