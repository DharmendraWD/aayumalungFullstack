"use client";
import Loading from "../../loading";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

import { FaTrash } from "react-icons/fa";

export default function PopupModal({HeroData}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [btn1Text, setbtn1Text] = useState(HeroData?.hero[0]?.button1Text);
  const [btn2Text, setbtn2Text] = useState(HeroData?.hero[0]?.button2Text);
  const [btn1Link, setbtn1Link] = useState(HeroData?.hero[0]?.button1Link);
  const [btn2Link, setbtn2Link] = useState(HeroData?.hero[0]?.button2Link);
  const [title, settitle] = useState(HeroData?.hero[0]?.title);
  const [desc, setdesc] = useState(HeroData?.hero[0]?.description);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
    const BASE_CONTENT = process.env.NEXT_PUBLIC_BASE_CONTENT;
    const BASE_API = process.env.NEXT_PUBLIC_BASE_API;



  // image preview 
  // const [images, setImages] = useState([HeroData?.hero[0]?.images]);
  const [images, setImages] = useState(
  HeroData?.hero[0]?.images?.map((imgPath) => ({ preview: `${BASE_CONTENT}${imgPath}` })) || []
);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  // Handle file selection
const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  const newImages = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  // Append new images to existing images
  setImages((prev) => [...prev, ...newImages]);
};
console.log(images)
  // Handle delete confirmation
  const handleDelete = (index) => {
    setConfirmDeleteIndex(index);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (confirmDeleteIndex !== null) {
      setImages((prev) => prev.filter((_, i) => i !== confirmDeleteIndex));
      setConfirmDeleteIndex(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
  };


// ------to post on click submit 
const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("button1Text", btn1Text);
    formData.append("button1Link", btn1Link);
    formData.append("button2Text", btn2Text);
    formData.append("button2Link", btn2Link);

    // -------------------------------------------------------------------
    // FIX HERE: Use the same field name 'images' for every file.
    // -------------------------------------------------------------------
    images.forEach((image) => {
      // ONLY append the file object if it's a new file (has 'file' property)
      // Existing images loaded from HeroData only have 'preview'
      if (image.file) { 
        // The field name 'images' must match the array name in your backend Multer setup.
        formData.append("images", image.file); 
      }
    });
    // -------------------------------------------------------------------

    // ... rest of the fetch logic ...
    try {
      // ... (fetch code remains the same)
      isloading(true);
      const response = await fetch(`${BASE_API}/homepage/hero`, {
        method: "PUT",
        body: formData,
      });
      // ...
      
      // I also recommend checking the backend response for a clearer error message:
      const result = await response.json(); 

      if (response.ok) {
        isloading(false);
        setMessage(`Success: ${result.message}`);
        // Optionally update the images state with the new paths from the successful response
      } else {
        isloading(false);
        setMessage(`Error: ${result.message || "Failed to submit form"}`);
        console.error("API Error:", result);
      }
    } catch (error) {
      isloading(false);
      setMessage("Connection error. Check console for details.");
      console.error("Error submitting form:", error);
    }
  }
// ...

  return (
    <>

<div className="w-full flex justify-center ">
          <button
      onClick={() => setIsOpen(true)}
  className="inline-flex items-center justify-center px-4 py-2 cursor-pointer bg-blue-600 ease-in-out delay-75 hover:bg-blue-700 text-white text-xl font-medium rounded-md hover:-translate-y-1 min-w-[100px] hover:scale-105 active:scale-100 transition-all duration-200"
>
  <svg
    className="h-5 w-5 mr-1 self-center items-center"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
    ></path>
  </svg>
  Edit
</button>
</div>


      {/* Overlay (Blurred Background) */}
      {isOpen && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)} // closes when clicking outside
        >
{/* 
          <div className="absoulte">
            <Loading></Loading>
          </div> */}
          {/* Popup Container */}
          <div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            className={`relative bg-gray-500 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out
              w-[90%] sm:w-[80%] max-w-8xl p-6
              animate-slideDown`}
          >


            {/* Heading */}
            <h2 className="text-2xl ml-4 font-semibold text-gray-800 mb-4">
              Update Hero Section
            </h2>

            <h1 className="text-xl text-center mb-2">{message}</h1>

<form action="" method="PUT">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4">
             {/* Input */}
            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
              First Button Text
              </label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
              First Button Text
              </label>
              <input
                type="text"
                value={btn1Text}
                onChange={(e) => setbtn1Text(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
                Second Button Text
              </label>
              <input
                type="text"
                value={btn2Text}
                onChange={(e) => setbtn2Text(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
               First Button Link 
              </label>
              <input
                type="text"
                value={btn1Link}
                onChange={(e) => setbtn1Link(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
                Second Button Link
              </label>
              <input
                type="text"
                value={btn2Link}
                onChange={(e) => setbtn2Link(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
           </div>
</form>
           {/* images  */}
           <div>
  <div className="p-4">
      {/* File Input */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Image Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-52 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center"
          >
            <img
              src={img.preview}
              alt={`preview-${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleDelete(index)}
              className="absolute cursor-pointer top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Popup */}
      {confirmDeleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h2 className="text-lg font-semibold mb-4">Delete Image?</h2>
            <p className="mb-4">Are you sure you want to delete this image?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 cursor-pointer border rounded-md border-gray-400 text-gray-600 hover:bg-gray-100 transition"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 cursor-pointer py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
           </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md cursor-pointer border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 cursor-pointer py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {isloading ? 'Updateing...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}
