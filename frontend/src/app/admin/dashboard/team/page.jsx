// homepage/team
import Image from "next/image";
import PopupModal from "./Popup";
import { Delete } from "lucide-react";
import Delelet from "./Delelet";




// import PopupModal from "./Popup";
const page = async () => {
  
  const BASE_API = process.env.BASE_API;
  const BASE_CONTENT = process.env.BASE_CONTENT;
  let teamData = [];
    let error = null;



  // ------------
    try {
        const response = await fetch(`${BASE_API}/homepage/team`, {
        });

        
        if (!response.ok) {
          error = "Something went wrong.";
          throw new Error('Failed to fetch data');
        }
        teamData = await response.json();

    } catch (error) {
        console.error('Error fetching data:', error);
    }



    return (

<>
{/* <div>{BASE_API}</div>
<PopupModal /> */}
{
  //  <h1 className="text-xl bg-[#3a4351] px-6 rounded py-4 mx-4 adminCardTextClr font-medium">
  //    {teamData?.team ? teamData?.team[0]?.upper?.title : ""}
  //   </h1>
}
<div className=" mt-[30px]">
     <h1 className="text-xl bg-[#3a4351] px-6 rounded py-4 mx-4 adminCardTextClr font-medium">
   Team Section
    </h1>
{
  error ?      <h1 className="text-xl text-red-500 bg-[#3a4351] px-6 rounded py-4 mx-4 text-center font-medium">
     {error}
    </h1>: ""
}


<div className="flex items-center justify-center flex-wrap justify-between gap-4 px-4 mt-4">
{
  teamData?.team?.map((data, index) => (
    
   <div key={index} className=" flex bg-[#141d2f] min-w-[300px] max-w-[300px] hover:scale-105 transform transition-transform duration-300 rounded-[12px] shadow-[0_10px_20px_rgba(0,0,0,0.1)]  justify-start block p-6  rounded-base shadow-xs">

     <div className="flex relative flex-col items-center">

        <img

  className="rounded-base w-[170px] h-[170px] mx-auto rounded-full object-cover"
  src={`${BASE_CONTENT}/${data?.image}`}
  alt=""
/>





        <h5 className="mt-6 mb-2 text-xl font-semibold text-gray-300 tracking-tight text-heading">{data?.title}</h5>
  
    <p className="mb-6 text-gray-400">{data?.desc}</p>

   <Delelet data={data}></Delelet>
     </div>
</div>
  )) ?? ""
}

</div>
</div>



 <div className="mt-6">
  {teamData?.team && <PopupModal />}

</div>  
</>



    )
}

export default page