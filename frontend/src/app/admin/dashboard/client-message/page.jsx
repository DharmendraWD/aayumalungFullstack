import React from 'react'
import { MdMessage } from "react-icons/md";

const page = async () => {
    let data1 = [];

try {
    const res = await fetch(`${process.env.BASE_API}/homepage/client-message`);
    const data = await res.json();
    data1 = data.clientMess
} catch (error) {
    
}
  return (
    <div className='grid-container'>
        
{
    data1.map((elem)=>{
        return (
                   <div className="relative flex flex-col my-6 bg-[#7385a7] shadow-sm border border-slate-200 rounded-lg w-96 p-6">
   <MdMessage />
  <div className="flex items-center mb-4">
  <div className='flex flex-col gap-3'>
      <h5 className="ml-3 text-slate-800 text-xl font-semibold">
      {elem.name}
    </h5>
    <h5 className="ml-3 text-slate-800 text-xl font-semibold">
      {elem.email}
    </h5>
  </div>
  </div>
  <p className="block text-slate-600 leading-normal font-light mb-4">
    {elem.message}
  </p>

</div>
        )
    })
}
      
    
    </div>
  )
}

export default page