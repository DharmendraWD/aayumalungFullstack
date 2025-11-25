

import React from 'react';
import img1 from "../../../public/img/hpower1.jpg";
import img2 from "../../../public/img/hpower2.jpg";
import Image from 'next/image';
import map from "../../../public/img/map.png"
import elec from "../../../public/img/electric.png"

const Card = ({ children, className }) => (
  <div
    className={`my-scroll overflow-scroll p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-[1.01] ${className}`}
  >
    {children}
  </div>
);

const ClientCarousel = async () => {

 const BASE_API = process.env.BASE_API;
    const BASE_CONTENT = process.env.BASE_CONTENT;
    let Data = [];
    let error = null;
    
    try {
        const response = await fetch(`${BASE_API}/homepage/aboutus`, {
        });

        
        if (!response.ok) {
          error = "Something went wrong.";
          throw new Error('Failed to fetch data');
        }
     let data1 = await response.json();
        Data = data1;

 
    } catch (error) {
        console.error('Error fetching data:', error);
    }

 

  return (
Data &&
    <div className=" max-w-[1440px] mx-auto bg-white p-4 sm:p-8"id='about-us'>

        <div className="relative min-h-[70vh] flex items-center justify-center py-16 sm:py-24 overflow-hidden bg-white font-[Inter]">
            

  
            <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8 text-center">

          
                <div className="flex justify-center mb-8 sm:mb-12">
                    <button className="px-6 py-2 bg-white text-indigo-600 font-medium text-l rounded-full shadow-lg transition duration-200 hover:shadow-xl hover:text-gray-800  border border-gray-200">
                     {Data?.aboutus?.[0]?.headingDesc?.title}
                    </button>
                </div>
                


                <p className="text-xl sm:text-2xl text-gray-700 text-start leading-relaxed max-w-[100%] mx-auto mt-4 border-blue-600 pt-4">
                  {Data?.aboutus?.[0]?.headingDesc?.description}
                </p>
                
            </div>
        </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:h-[700px]" >

      
        <Card className="bg-[#4842e4]  text-white lg:col-span-2 lg:row-span-1 h-full relative overflow-hidden">
          <div className='flex'>
     <div >
           <h3 className="text-sm font-semibold mb-4 opacity-75">{Data?.aboutus?.[0]?.whereWeOperate?.title}</h3>
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           
            <div className="absolute inset-0 bg-repeat [background-image:radial-gradient(currentColor_1px,_transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          <div className="relative z-10">
            <p className="text-lg leading-relaxed max-w-2xl">
              {Data?.aboutus?.[0]?.whereWeOperate?.description}
            </p>
      
           
            <div className="absolute right-[10%] top-[40%] bg-white w-2 h-2 rounded-full border-2 border-opacity-70 border-white shadow-xl"></div>
          </div>
       </div>
          <Image src={map.src} width={200} className='w-[50%]' height={200}   alt="map" />  
          

     </div>
        </Card>


        <div className="lg:col-span-1 lg:row-span-1 overflow-hidden rounded-xl shadow-lg">

           <Image
                height={300}
                width={300}
              
          unoptimized
                    src={BASE_CONTENT+Data?.aboutus?.[0]?.images?.[0]} 
                    alt="Aerial view of the reservoir water"
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-[1.03]"
                />
        </div>

        <div className="lg:col-span-1 lg:row-span-1 overflow-hidden rounded-xl shadow-lg">
          <div className="relative w-full h-full">
            <div className="flex h-full">
                <Image
                width={300}
                height={300}
      unoptimized
                    src={`${BASE_CONTENT}${Data?.aboutus?.[0]?.images?.[1]}`}
                    alt="Side view of the hydropower dam structure"
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-[1.03]"
                />
             
            </div>
          </div>
        </div>

        <Card className="bg-white text-gray-800 lg:col-span-1 lg:row-span-1 border border-gray-100 h-full">
          <h3 className="text-sm font-semibold mb-4 opacity-75">{Data?.aboutus?.[0]?.foundation?.title}</h3>
          <p className="leading-relaxed ">
           {Data?.aboutus?.[0]?.foundation?.description} 
          </p>
        
        
        </Card>

    
        <Card className="bg-[#4842e4] text-white lg:col-span-1 lg:row-span-1 h-full relative overflow-hidden flex flex-col justify-between">
   <div className='flex'>
    <div>
           <h3 className="text-sm font-semibold opacity-75">{Data?.aboutus?.[0]?.capacity?.title}</h3>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative text-2xl font-extrabold">{Data?.aboutus?.[0]?.capacity?.valueMW}</div>
      
          </div>
          <p className="mt-4 overflow-auto my-scroll text-l leading-relaxed max-w-xs">
            {Data?.aboutus?.[0]?.capacity?.description}
          </p>
          
   </div>
   <Image src={elec} width={200} className='w-[30%]' height={200}   alt="map" />
   </div>
        </Card>
      </div>
    </div>
  );
};

export default ClientCarousel;