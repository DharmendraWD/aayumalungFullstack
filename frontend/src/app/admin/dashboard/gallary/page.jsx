
import Delelet from "./Delelet";
import PopupModal from "./Popup";
const page = async () => {
    const BASE_API = process.env.BASE_API;
    const BASE_CONTENT = process.env.BASE_CONTENT;
    let gallaryData = [];
    let error = null;


    try {
        const response = await fetch(`${BASE_API}/homepage/gallary`, {
        });

        
        if (!response.ok) {
          error = "Something went wrong.";
          throw new Error('Failed to fetch data');
        }
        gallaryData = await response.json();

 
    } catch (error) {
        console.error('Error fetching data:', error);
    }



    return (

<>
{/* <div>{BASE_API}</div>
<PopupModal /> */}
<div className=" mt-[30px]">
     <h1 className="text-xl bg-[#3a4351] px-6 rounded py-4 mx-4 adminCardTextClr font-medium">
      Gallary Section
    </h1>
{
  error ?      <h1 className="text-xl text-red-500 bg-[#3a4351] px-6 rounded py-4 mx-4 text-center font-medium">
     {error}
    </h1>: ""
}


<div className=" px-2">
  {gallaryData?.gallary && gallaryData?.gallary?.map((hero, i) => (
    <div
      key={i}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4 "
    >
        {/* ✅ Loop through all images */}
        {hero.images && hero.images.length > 0 ? (
          hero.images.map((img, index) => (
            <div key={index} className="flex transform transition-transform relative duration-300 hover:scale-105 flex-col cardBg justify-center items-center m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
            <img
          
              src={ `${BASE_CONTENT}${img}`}
              alt={`hero-image-${index}`}
              className="w-full h-full object-cover rounded-md"
          
            />
              <p
      className="text-sm mb-2 mt-[20px] font-semibold text-slate-500 uppercase">
Gallary Image {index + 1}
    </p>
<Delelet img={img}></Delelet>
{/* <p>skmas</p> */}
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

{/* http://localhost:8000/uploads/images-1762787494977-894233015.png */}




<div className="mt-6">
  {gallaryData?.gallary && <PopupModal gallaryData={gallaryData} />}

</div>

</>



    )
}

export default page