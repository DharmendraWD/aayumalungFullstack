
// import React from 'react';

// const clientLogos = [
//   { src: 'https://fastly.picsum.photos/id/503/200/300.jpg?hmac=NvjgwV94HmYqnTok1qtlPsDxdf197x8fsWy5yheKlGg', alt: 'Client Logo 1' },
//   { src: 'https://fastly.picsum.photos/id/729/200/200.jpg?hmac=hCw_uurY9O39ITS0MMk7fNNdWPaY20TzXz2NTAkEslU', alt: 'Client Logo 2' },
//   { src: 'https://fastly.picsum.photos/id/872/200/200.jpg?hmac=m0AwAUFkEiEz2KW58n6a5RVkKaClHNylfppYjE3a0v4', alt: 'Client Logo 3' },
//   { src: 'https://fastly.picsum.photos/id/927/200/200.jpg?hmac=8gJRiqNVrPAFPg0IyGTTYxaPJBSoLOVg4elvGEPV30M', alt: 'Client Logo 5' },
// ];


// const LogoSet = ({logos}) => (

//     <div className="flex max-w-[1440px] flex-shrink-0 justify-around items-center w-full min-w-max space-x-12 sm:space-x-16 md:space-x-20 lg:space-x-24">
//         {logos.map((logo, index) => (
//             <div key={index} className="flex-shrink-0 opacity-50 hover:opacity-100 transition duration-300">
//                 <img 
//                     src={logo.src} 
//                     alt={logo.alt} 
                   
//                     className="h-6 sm:h-7 md:h-8 lg:h-10 w-auto object-contain"
//                 />
//             </div>
//         ))}
//     </div>
// );


// const ClientCarousel = () => {

//   const logosToDisplay = [...clientLogos, ...clientLogos]; 

//   return (
    
//     <section className="bg-white py-10 md:py-16 overflow-hidden">
//       <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

//         <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          
//           {/* Heading */}
//           <div className="flex-shrink-0 mb-6 lg:mb-0 lg:w-1/4">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
//               Clients include:
//             </h2>
//           </div>

   
//           <div className="flex w-full lg:w-3/4 overflow-hidden relative">
            
         
//             <div 
//               className="flex whitespace-nowrap animate-scroll-left w-full min-w-max"
            
//               style={{
//                   animation: 'scroll-left 40s linear infinite',
//               }}
//             >
        
//               <LogoSet logos={logosToDisplay} />
//               <LogoSet logos={logosToDisplay} />
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ClientCarousel;


// components/Homepage.jsx

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
        Data = await response.json();

 
    } catch (error) {
        console.error('Error fetching data:', error);
    }




  return (
    <div className=" max-w-[1440px] mx-auto bg-white p-4 sm:p-8"id='about-us'>

        <div className="relative min-h-[70vh] flex items-center justify-center py-16 sm:py-24 overflow-hidden bg-white font-[Inter]">
            

  
            <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8 text-center">

          
                <div className="flex justify-center mb-8 sm:mb-12">
                    <button className="px-6 py-2 bg-white text-gray-800 font-medium text-sm rounded-full shadow-lg transition duration-200 hover:shadow-xl hover:text-indigo-600 border border-gray-200">
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