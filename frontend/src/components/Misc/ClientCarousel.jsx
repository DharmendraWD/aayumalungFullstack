
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

const Card = ({ children, className }) => (
  <div
    className={`p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-[1.01] ${className}`}
  >
    {children}
  </div>
);

const ClientCarousel = () => {
  return (
    <div className=" max-w-[1440px] mx-auto bg-white p-4 sm:p-8"id='about-us'>

        <div className="relative min-h-[70vh] flex items-center justify-center py-16 sm:py-24 overflow-hidden bg-white font-[Inter]">
            

            {/* Content Container */}
            <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* Overlaid Button (Simulated 'About Us' tab) */}
                <div className="flex justify-center mb-8 sm:mb-12">
                    <button className="px-6 py-2 bg-white text-gray-800 font-medium text-sm rounded-full shadow-lg transition duration-200 hover:shadow-xl hover:text-indigo-600 border border-gray-200">
                        About Us
                    </button>
                </div>
                


                {/* Supporting Paragraph */}
                <p className="text-xl sm:text-2xl text-gray-700 text-start leading-relaxed max-w-[100%] mx-auto mt-4 border-blue-600 pt-4">
                   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta animi harum quidem? Nulla dignissimos, dolor debitis aliquam, eveniet ipsum ad illo itaque explicabo libero recusandae inventore iure quasi harum unde a? Veniam vitae non beatae voluptate fugiat? Voluptas obcaecati voluptatem quod ad quos expedita eligendi ut perspiciatis provident nemo, ea reiciendis dolore natus perferendis saepe fugiat nam cupiditate totam itaque velit fugit asperiores ipsa quia doloremque! Dolore eveniet suscipit repellendus molestiae ipsum, animi officia nostrum nesciunt commodi similique molestias ratione a, fugiat mollitia quis. Ut possimus omnis voluptas placeat, reprehenderit officia, expedita quo magni ducimus ab consectetur tempora quod totam?
                </p>
                
            </div>
        </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:h-[700px]" >

        {/* 1. Where We Operate (Large Blue Map Card) - Top Left */}
        <Card className="bg-[#4842e4] text-white lg:col-span-2 lg:row-span-1 h-full relative overflow-hidden">
          <h3 className="text-sm font-semibold mb-4 opacity-75">Where We Operate</h3>
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            {/* Simple dotted map representation (replace with actual image/SVG in a real project) */}
            <div className="absolute inset-0 bg-repeat [background-image:radial-gradient(currentColor_1px,_transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          <div className="relative z-10">
            <p className="text-lg leading-relaxed max-w-2xl">
              Our projects are located across **Nepal's Himalayan foothills**, with our flagship Aayu Malung Hydropower Project situated in the scenic eastern region an area rich in natural flow and energy potential.
            </p>
            <p className="mt-4 text-l leading-relaxed max-w-2xl opacity-90">
              Every location is chosen with care, balancing engineering efficiency and environmental harmony.
            </p>
            {/* Placeholder for the white pin on the map image area */}
            <div className="absolute right-[10%] top-[40%] bg-white w-2 h-2 rounded-full border-2 border-opacity-70 border-white shadow-xl"></div>
          </div>
        </Card>

        {/* 2. Dam Image (Large Top Right Image) */}
        <div className="lg:col-span-1 lg:row-span-1 overflow-hidden rounded-xl shadow-lg">
          {/* Replace with Next.js <Image /> component in a real project for optimization */}
           <Image
                height={300}
                width={300}
              
                    src={img2} // Replace with actual image path
                    alt="Aerial view of the reservoir water"
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-[1.03]"
                />
        </div>

        {/* 3. Side View Image (Bottom Left Image) */}
        <div className="lg:col-span-1 lg:row-span-1 overflow-hidden rounded-xl shadow-lg">
          <div className="relative w-full h-full">
            {/* Replace with actual image paths, and use a div for the split effect */}
            <div className="flex h-full">
                <Image
                width={300}
                height={300}
      
                    src={img1} // Replace with actual image path
                    alt="Side view of the hydropower dam structure"
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-[1.03]"
                />
             
            </div>
          </div>
        </div>

        {/* 4. Our Foundation (Middle Text Card) */}
        <Card className="bg-white text-gray-800 lg:col-span-1 lg:row-span-1 border border-gray-100 h-full">
          <h3 className="text-sm font-semibold mb-4 opacity-75">Our Foundation</h3>
          <p className="leading-relaxed">
            Founded with a vision to harness **renewable energy responsibly**, Aayu Malung Hydropower brings together experts in civil, electrical, and environmental engineering.
          </p>
          <p className="mt-4 leading-relaxed">
            We combine decades of technical experience with a deep respect for Nepal's natural landscapes and local communities.
          </p>
        </Card>

        {/* 5. Our Capacity (Bottom Right Capacity Card) */}
        <Card className="bg-[#4842e4] text-white lg:col-span-1 lg:row-span-1 h-full relative overflow-hidden flex flex-col justify-between">
          <h3 className="text-sm font-semibold opacity-75">Our Capacity</h3>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative text-8xl font-extrabold">9.6 MW</div>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-10 absolute right-6 bottom-6 lg:relative lg:right-auto lg:bottom-auto">
                {/* Simple lightning bolt icon (replace with actual SVG) */}
                <span className="text-white text-3xl">⚡</span>
            </div>
          </div>
          <p className="mt-4 overflow-auto my-scroll text-l leading-relaxed max-w-xs">
            The Aayu Malung Hydropower Project currently generates **9.6 MW** of clean hydroelectric power, contributing significantly to Nepal's growing energy demands.
          </p>
          
        </Card>
      </div>
    </div>
  );
};

export default ClientCarousel;