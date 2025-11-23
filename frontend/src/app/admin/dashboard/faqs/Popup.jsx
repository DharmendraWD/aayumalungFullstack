

"use client"
import React, {  useEffect, useState } from 'react'
import img from "../../../../../public/img/logof.png"
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import toast from 'react-hot-toast';

const Popup = () => {
    const [faqToBeDeleted, setFaqToBeDeleted] = useState(null);
    const [isFaqAddPopupOpen, setisFaqAddPopupOpen] = useState(null);
    const [question, setquestion] = useState("");
    const [answer, setanswer] = useState("");

    const [yesNo, setYesNo] = useState(null);
    const [faq, setFaq] = useState([])   
  const BASE_CONTENT = process.env.NEXT_PUBLIC_BASE_CONTENT;




    // yes no for delete 
    const HandleYesNo = (id) => {
        setFaqToBeDeleted(id);
        setYesNo(true);
      };
    
    // show all blog by fetching from api 
const getData = async () =>{
    try{
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/homepage/faq`)
    const data = await res.json()
    setFaq(data.faq)
    
    if(!res.ok){
        throw new Error(data.message)
    }
       
    }catch(err){
        console.log(err)
    }
}
useEffect(() => {
    getData()
    // claeanup function
}, [])

// delete faq 
const deleteFaq = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/homepage/faq`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
  
      if (!res.ok) {
          toast.error("Failed to delete faq");
        throw new Error("Failed to delete faq");
      }
  toast.success("FAQ deleted successfully");
      setFaq((prev) => prev.filter((faq) => faq._id !== id));
    } catch (error) {
        toast.error("Failed to delete faq");
      console.error("Error deleting faq:", error);
    }
  };

const addFaq = async (e) => {
    try {
        e.preventDefault()
        if(!question || !answer) return toast.error("Please fill all fields");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/homepage/faq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question, answer: answer }),
      });
  
      if (!res.ok) {
          toast.error("Failed to add faq");
        throw new Error("Failed to add faq");
      }
const data = await res.json();
setFaq((prev) => [...prev, data.data])
  toast.success("FAQ added successfully");
      setquestion("")
      setanswer("")
      setisFaqAddPopupOpen(null)
 
    } catch (error) {
        toast.error("Failed to add faq");
      console.error("Error adding faq:", error);
    }
}



  return (
    <div className='relative'>

{
    isFaqAddPopupOpen && (
        <div className='absolute top-0 z-[9] bg-gray-500 w-full px-[10%] py-[1%] rounded-xl'>
    <form action="" method="PUT">
           <div className="grid grid-cols-1">
             {/* Input */}
            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Question
              </label>
              <textarea 
                type="text"
                value={question}
                onChange={(e) => setquestion(e.target.value)}
                placeholder="Type..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Description
              </label>
              <textarea
                type="text"
                value={answer}
                onChange={(e) => setanswer(e.target.value)}
                placeholder="Type..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          
         <div className='flex justify-center items-center gap-4'>
             <button  onClick={addFaq} className='bg-green-300 text-gray-700 px-8 rounded-xl cursor-pointer py-2 w-fit'>Add</button>
          <button  className='bg-red-300 text-gray-700 px-8 rounded-xl cursor-pointer  py-2 w-fit' onClick={() => setisFaqAddPopupOpen(null)}>Close</button>
         </div>
           </div>
</form>
</div>
    )
}

          <div className="text-xl bg-[#3a4351] px-6 rounded py-4 mt
          mb-2 mx-4 adminCardTextClr font-medium flex w-full items-center justify-between">
    <h1>Manage FAQs</h1>
<span
onClick={() => setisFaqAddPopupOpen(true)}
className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-white text-white">
    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 ease"></span>
    <span className="relative text-white transition duration-300 group-hover:text-indigo-600 ease">+</span>
</span>
    </div>
<div>
<div className="relative flex items-center justify-center font-nunito text-slate-600">
    <section className=" w-full mx-4">

{yesNo !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">Delete Image?</h2>
      <p className="mb-4 text-gray-400">Are you sure you want to delete this image?</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setYesNo(null)}
          className="px-4 py-2 cursor-pointer border rounded-md border-gray-400 text-gray-600 hover:bg-gray-100 transition"
        >
          No
        </button>

        {/* Now you can safely access the image using the stored index */}
        <button
          onClick={() => deleteFaq(faqToBeDeleted) && setYesNo(null)}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}

{

faq?.map((faq, index) => (
           <ul
            key={faq?._id}
            className="w-full relative bg-[#172135] lg:p-8 px-2 py-8  rounded-lg gap-3 flex items-start justify-center  flex-col sm:flex-row relative overflow-hidden mb-10">
            <li className="pr-4 overflow-hidden grow flex flex-col lg:items-start items-center ">
                <span className="absolute slide-in-top bg-gradient-to-r from-[#6c73ff] to-[#676bbe] text-white lg:px-24 px-4 py-[4px] rounded-br-lg left-0 top-0 text-sm">FAQ {index+1}</span>
                <h2 className="mb-1 text-l text-gray-300  font-[600] mt-2">{faq?.question}</h2>
                <p className=" text-lg multiline-ellipsis text-gray-400">{faq?.answer} 
                </p>

<span className='  absolute right-[12px] bottom-[12px] flex items-center gap-2'>
    <span className='flex items-center gap-1 bg-gray-300 cursor-pointer hover:bg-gray-200 hover:scale-105 px-2 py-1 rounded'
    onClick={() => HandleYesNo(faq._id)}
    >
        <MdDeleteForever className='text-l text-red-500' />
        <p className='text-sm text-red-500 hover:text-red-400 transform transtition duration-100 lg:block hidden'>Delete FAQ</p>
    </span>
</span>
            </li>
{/* //// */}
        </ul> 
))
}


    </section>



</div>
</div>

    </div>
  )
}

export default Popup