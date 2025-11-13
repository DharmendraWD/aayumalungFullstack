
import PopupModal from "./Popup";
const hero = async () => {
    const BASE_API = process.env.BASE_API;
    const BASE_CONTENT = process.env.BASE_CONTENT;
    let isLoading = true;
    let HeroData = [];


    try {
        const response = await fetch(`${BASE_API}/homepage/hero`, {
        });

        isLoading = false;

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
         HeroData = await response.json();
 
    } catch (error) {
        console.error('Error fetching data:', error);
    }


    console.log(HeroData.hero[0].images);

    return (

<>
{/* <div>{BASE_API}</div>
<PopupModal /> */}
<div className=" mt-[30px]">
     <h1 className="text-xl bg-[#3a4351] px-6 rounded py-4 mx-4 adminCardTextClr font-medium">
      Hero Buttons and Button's Link
    </h1>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4">

<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col my-6 cardBg h-fit shadow-sm  rounded-lg w-96">
  <div className="mx-3 mb-0pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
      Hero First Button Text 
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero[0]?.button1Text}
    </h5>
 
  </div>
</div>
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col my-6 cardBg shadow-sm  h-fit  rounded-lg w-96">
  <div className="mx-3 mb-0 pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
      Hero Second Button Text
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero[0]?.button2Text}
    </h5>

  </div>
</div>


{/* 3rd  */}
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col my-6 cardBg shadow-sm  h-fit  rounded-lg w-96">
  <div className="mx-3 mb-0  pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
      Hero First Button Link
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero[0]?.button1Link}
    </h5>
  </div>
</div>

{/* 4th  */}
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col my-6 cardBg shadow-sm h-fit  rounded-lg w-96">
  <div className="mx-3 mb-0  pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
      Hero Second Button Link
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero[0]?.button2Link}
    </h5>
  </div>
</div>

{/* 5th  */}
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col h-fit my-6 cardBg shadow-sm  rounded-lg w-96">
  <div className="mx-3 mb-0  pt-3 pb-2 px-1">
    <span className="text-l adminCardTextClr font-medium">
      Hero Title
    </span>
  </div>
  
  <div className="p-4">
    <h5 className="mb-2 adminCardTextValueClr text-xl font-semibold">
      {HeroData?.hero[0]?.title}
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
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
  {HeroData?.hero?.map((hero, i) => (
    <div
      key={i}
      className="flex  transform transition-transform duration-300 hover:scale-105 flex-col cardBg shadow-sm  rounded-lg my-6 w-full sm:w-96"
    >
      <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
        {/* ✅ Loop through all images */}
        {hero.images && hero.images.length > 0 ? (
          hero.images.map((img, index) => (
            <div key={index} className="flex flex-col justify-center items-center">
            <img
          
              src={img.startsWith("http") ? img : `${BASE_CONTENT}${img}`}
              alt={`hero-image-${index}`}
              className="w-full h-full object-cover rounded-md"
          
            />
              <p
      className="text-sm mt-[20px] font-semibold text-slate-500 uppercase">
Hero Scrolling Image {index + 1}
    </p>
    </div>
          ))
        ) : (
            <div className=" transform transition-transform duration-300 hover:scale-105">
          <img
            src="https://via.placeholder.com/400x300?text=No+Image"
            alt="no-image"
            className="w-full h-full object-cover rounded-md"
          />

            <p
      className="text-sm mt-[20px] font-semibold text-slate-500 uppercase">
      Scrolling Image {index + 1}
    </p>
</div>
        )}
      </div>

    </div>
  ))}
  </div>
</div>


<PopupModal HeroData={HeroData}/> 


</>



    )
}

export default hero