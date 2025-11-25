
import PopupModal from "./Popup";
const hero = async () => {
    const BASE_API = process.env.BASE_API;
    const BASE_CONTENT = process.env.BASE_CONTENT;
    let HeroData = [];
    let error = null;


    try {
        const response = await fetch(`${BASE_API}/homepage/hero`, {
        });

        
        if (!response.ok) {
          error = "Something went wrong.";
          throw new Error('Failed to fetch data');
        }
        HeroData = await response.json();

 
    } catch (error) {
        console.error('Error fetching data:', error);
    }




    return (

<>
{/* <div>{BASE_API}</div>
<PopupModal /> */}
<div className=" mt-[30px]">
     <h1 className="text-xl bg-[#3a4351] px-6 rounded py-4 mx-4 adminCardTextClr font-medium">
      Hero Section Text and Button
    </h1>
{
  error ?      <h1 className="text-xl text-red-500 bg-[#3a4351] px-6 rounded py-4 mx-4 text-center font-medium">
     {error}
    </h1>: ""
}


<div className="grid-container px-4">
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col h-fit my-6 cardBg shadow-sm  rounded-lg ">
  <div className="mx-3 mb-0  pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
      Hero Title
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero ? HeroData?.hero[0]?.title : "Loading..."}
    </h5>
  </div>
</div>
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col h-fit my-6 cardBg shadow-sm  rounded-lg ">
  <div className="mx-3 mb-0  pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
      Description
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero ? HeroData?.hero[0]?.description: ""}
    </h5>
  </div>
</div>


<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col my-6 cardBg h-fit shadow-sm  rounded-lg ">
  <div className="mx-3 mb-0pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
       First Button Text 
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero ? HeroData?.hero[0]?.button1Text: ""}
    </h5>
 
  </div>
</div>
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col my-6 cardBg shadow-sm  h-fit  rounded-lg ">
  <div className="mx-3 mb-0 pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
       Second Button Text
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero ? HeroData?.hero[0]?.button2Text: ""}
    </h5>

  </div>
</div>


{/* 3rd  */}
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col my-6 cardBg shadow-sm  h-fit  rounded-lg ">
  <div className="mx-3 mb-0  pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
       First Button Link
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero ? HeroData?.hero[0]?.button1Link: ""}
    </h5>
  </div>
</div>

{/* 4th  */}
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col my-6 cardBg shadow-sm h-fit  rounded-lg ">
  <div className="mx-3 mb-0  pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
       Second Button Link
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero ? HeroData?.hero[0]?.button2Link: ""}
    </h5>
  </div>
</div>


</div></div>

{/* http://localhost:8000/uploads/images-1762787494977-894233015.png */}

{/* 6 th */}
<div className="mt-[100px]">
   <h1 className="text-xl bg-[#3a4351] px-6 rounded py-4 mx-4 adminCardTextClr font-medium">
      Hero Scrolling Images
    </h1>
<div className=" mx-1 mt-4">
  {HeroData?.hero && HeroData?.hero?.map((hero, i) => (
    <div
      key={i}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4"
    >
        {/* ✅ Loop through all images */}
        {hero.images && hero.images.length > 0 ? (
          hero.images.map((img, index) => (
            <div key={index} className="flex transform transition-transform duration-300 hover:scale-105 flex-col cardBg justify-center items-center m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
            <img
          
              src={img.startsWith("http") ? img : `${BASE_CONTENT}${img}`}
              alt={`hero-image-${index}`}
              className="w-full h-[85%] object-cover rounded-md"
          
            />
              <p
      className="text-sm mt-[20px] font-semibold text-slate-500 uppercase">
Hero Scrolling Image {index + 1}
    </p>
    </div>
          ))
        ) : (
         

            <h1
      className="text-sm text-center mt-[20px] font-semibold text-slate-500 uppercase">
      No any Image Found.
    </h1>

        )}

    </div>
  ))}
  </div>
</div>


<div className="mt-6">
  {HeroData?.hero && <PopupModal HeroData={HeroData} />}

</div>

</>



    )
}

export default hero