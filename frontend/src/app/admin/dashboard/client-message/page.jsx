import React from 'react';
import { MdMessage } from "react-icons/md";

const Page = async () => {
  let data1 = [];

  try {
    const res = await fetch(`${process.env.BASE_API}/homepage/client-message`);
    const data = await res.json();
    // ensure data.clientMess is always an array
    data1 = Array.isArray(data.clientMess) ? data.clientMess : [];
  } catch (error) {
    console.error("Failed to fetch client messages:", error);
    data1 = [];
  }

  return (
    <div className='grid-container'>
      {data1.length === 0 ? (
        <p className="text-slate-600 text-center mt-10">No messages available.</p>
      ) : (
        data1.map((elem, index) => (
          <div
            key={index}
            className="relative flex flex-col my-6 bg-[#7385a7] shadow-sm border border-slate-200 rounded-lg w-96 p-6"
          >
            <MdMessage />
            <div className="flex items-center mb-4">
              <div className='flex flex-col gap-1'>
                <h5 className="ml-3 text-slate-800 text-l font-semibold">{elem.name}</h5>
                <h5 className="ml-3 text-slate-800 text-sm font-semibold">{elem.email}</h5>
              </div>
            </div>
            <p className="block ml-3 text-slate-600 leading-normal font-light mb-4">{elem.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Page;
