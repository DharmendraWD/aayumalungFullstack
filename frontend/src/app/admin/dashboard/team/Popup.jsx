"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";


export default function PopupModal({teamData}) {

  const [isOpen, setIsOpen] = useState(false);

  // upper heading
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [desig, setdesig] = useState("");
  const [isloading, setisloading] = useState(false);
  const [message, setMessage] = useState("");


const router = useRouter()

  
  
  const [hideMessageInterval, setHideMessageInterval] = useState(true);
  
  
  
  const BASE_CONTENT = process.env.NEXT_PUBLIC_BASE_CONTENT;
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
  
  
  
  // image preview 
  // const [images, setImages] = useState([missionData?.mission[0]?.images]);
  const [images, setImages] = useState(
    [].map((imgPath) => ({ preview: `${BASE_CONTENT}${imgPath}` })) || []
  );

  console.log(images)
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









// ------to post on click submit 
const handleSubmit = async (e) => {
    e.preventDefault();

const formData = new FormData();


formData.append("title", name);
formData.append("desc", desc);
formData.append("desig", desig);





    // -------------------------------------------------------------------
    // FIX HERE: Use the same field name 'images' for every file.
    // -------------------------------------------------------------------
    images.forEach((image) => {
      // ONLY append the file object if it's a new file (has 'file' property)
      // Existing images loaded from missionData only have 'preview'
      if (image.file) { 
        // The field name 'images' must match the array name in your backend Multer setup.
        formData.append("image", image.file); 
      }
    });
    // -------------------------------------------------------------------

    // ... rest of the fetch logic ...
    try {
      // ... (fetch code remains the same)
      setisloading(true);
      const response = await fetch(`${BASE_API}/homepage/team`, {
        method: "POST",
        body: formData,
      });
      // ...
      
      // I also recommend checking the backend response for a clearer error message:
      const result = await response.json(); 

      if (response.ok) {
        setisloading(false);
        setMessage(`Success: ${result.message}`);
        setHideMessageInterval(false);
        toast.success(`Success: ${result.message}`);
        setIsOpen(false);
        setTimeout(() => {
          router.refresh();
          setname("");
          setdesc("");
          setdesig("");
          setImages([]);
          setHideMessageInterval(true);
        }, 4000);
        // Optionally update the images state with the new paths from the successful response
      } else {
        setisloading(false);
        setMessage(`Error: ${result.message || "Failed to submit form"}`);
        console.error("API Error:", result);
      }
    } catch (error) {
      setisloading(false);
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
  Add More Member 
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
              w-[90%] sm:w-[40%] max-w-8xl p-6
              animate-slideDown`}
          >


            {/* Heading */}
            <h2 className="text-2xl ml-4 font-semibold text-gray-800 mb-4">
             Add Team Member
            </h2>



{
  !hideMessageInterval && (
    <>
    { message.toLowerCase().includes("successfully") || message.toLowerCase().includes("success") ?(
  <h1 className="text-xl text-center mb-2 text-[#3dee3d] absolute top-1/2 left-1/2 -translate-x-1/2 [translate-y-[282%]]">{message}</h1>
) : (
  <h1 className="text-xl text-center mb-2 text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 [translate-y-[282%]]">{message}</h1>
)}
</>
  )
}

<form action="" method="PUT">
           <div className="grid grid-cols-1 ">
             {/* Input */}
       {/* 1st  */}
<div>

<div className="flex flex-col gap-2 w-full">
     <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
             His/Her Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
             A Short Bio
              </label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div> 
            <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Designation
              </label>
              <input
                type="text"
                value={desig}
                onChange={(e) => setdesig(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div> 

              <div className="p-4">
      {/* File Input */}

{
  images?.length >= 1 ?   <h1 className="text-red-300 mb-2 text-xl text-center">Only 1 Image Allowed.</h1>    : 
   <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
}
  




  
    </div>

</div>
                </div>
                {/* 2md */}



            
           </div>
</form>
           {/* images  */}
               <div className="grid-container">
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

    </div>
  ))}
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
                {isloading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}
