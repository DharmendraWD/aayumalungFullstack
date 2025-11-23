
"use client"

import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Delelet = ({data}) => {
    const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';
const router = useRouter()
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
      // Cancel deletion
  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
  };
  // Confirm deletion
const confirmDelete = (imageToBeDeleted) => {
   setConfirmDeleteIndex(null);
   deleteTeam(imageToBeDeleted)

};

// delete team api call 
const deleteTeam = async (teamId) => {
  try {
    const res = await fetch(`${BASE_API}/homepage/team`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId }),
    });

    if (!res.ok) {
      const errData = await res.json();
      toast.error(errData.message || "Failed to delete team");
      throw new Error(errData.message || "Failed to delete team");
    }

    toast.success("Team deleted successfully");
    router.refresh()
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Failed to delete team");
    toast.error(error.message || "Failed to delete team");
  }
};

  // Handle delete confirmation
  const handleDelete = (index) => {
    setConfirmDeleteIndex(index);
  };



  return (
    <div>
           <button
        onClick={() => handleDelete()}   // <-- save index to state
        className="absolute cursor-pointer top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
      >
        <FaTrash />
      </button>

      
    {/* ✅ Popup moved OUTSIDE map */}
{confirmDeleteIndex !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">Remove <b className='text-white'> {data.title}</b>? </h2>
      <p className="mb-4 text-gray-400">Are you sure you want to delete <b className='text-white'>{data.title}</b> from Team?</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={cancelDelete}
          className="px-4 py-2 cursor-pointer border rounded-md border-gray-400 text-gray-600 hover:bg-gray-100 transition"
        >
          No
        </button>

        {/* Now you can safely access the image using the stored index */}
        <button
          onClick={() => confirmDelete(data._id)}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default Delelet