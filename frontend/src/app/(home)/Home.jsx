
import React from 'react';
import Head from 'next/head';
import RoundedBgBtn from '@/components/Buttons/RoundedBgBtn';
import RoundedNotBGBtn from '@/components/Buttons/RoundedNotBGBtn';


const ImageGridContent = async ({HeroData, BASE_CONTENT, BASE_API}) => {
  
  
  const imagePaths = {
    img1: BASE_CONTENT+HeroData?.hero?.[0]?.images?.[0], 
    img2: BASE_CONTENT+HeroData?.hero?.[0]?.images?.[1],
    img3: BASE_CONTENT+HeroData?.hero?.[0]?.images?.[2],
    img4: BASE_CONTENT+HeroData?.hero?.[0]?.images?.[3],
    img5: BASE_CONTENT+HeroData?.hero?.[0]?.images?.[4],
    img6: BASE_CONTENT+HeroData?.hero?.[0]?.images?.[5]
  };
  
return (
  <div className="grid grid-cols-2 grid-rows-3 gap-3 p-4 md:p-6 lg:p-8">
           {/* ... (Image elements are unchanged) ... */}
        {/* Image 1: Top Left - Span two rows */}
        <div className="row-span-1 aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
            <img src={imagePaths.img5} alt="Modern steel architecture" className="w-full h-full object-cover grayscale transition-transform duration-500 hover:scale-105"/>
        </div>

        <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl">
            <img src={imagePaths.img2} alt="Top view of a clean building" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>

        {/* Image 3: Middle Right - Span one row */}
        <div className="aspect-[4/4] overflow-hidden rounded-xl shadow-2xl">
            <img src={imagePaths.img3} alt="Curving structural abstract" className="w-full h-full object-cover grayscale transition-transform duration-500 hover:scale-105"/>
        </div>
        
        {/* Image 4 & 5: Bottom Row - Full color */}
        <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl">
            <img src={imagePaths.img4} alt="Pink and yellow minimalist building" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>
        <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl">
            <img src={imagePaths.img5} alt="Skyline with architectural blocks" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>
        <div className="">
            <img src={imagePaths.img6} alt="Skyline with architectural blocks" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>
   
    </div>
)
}


const ScrollingImageGrid = ({HeroData, BASE_CONTENT, BASE_API}) => {
  const copies = 3; 

  return (
    // Outer container: clips the content
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-full overflow-hidden">
      
      {/* Inner container: scrolls up. Now using the animation style from globals.css. */}
      <div 
        className="absolute inset-0 w-full"
        // Applying the animation property here, referencing the keyframes in globals.css
        style={{ 
          height: `${copies * 100}%`,
          animation: 'scroll-up 10s linear infinite', // 'scroll-up' is now global
        }}
      >
        
        {/* Duplicate the single grid content N times */}
        {[...Array(copies)].map((_, idx) => (
          <ImageGridContent key={idx} HeroData={HeroData} BASE_CONTENT={BASE_CONTENT} BASE_API={BASE_API}/>
        ))}

      </div>
      
      {/* White shadow overlays */}
      <div className="absolute top-0 left-0 w-full h-1/6 bg-gradient-to-b from-white to-transparent opacity-90 z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-white to-transparent opacity-90 z-10 pointer-events-none"></div>

    </div>
  );
};

// Main Hero Section Component
const Home1 = async() => {

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
      <Head>
        <title>{HeroData?.hero?.[0]?.title}</title>
      </Head>
      
      <section className="bg-white  pt-12 md:pt-20 lg:pt-24 max-w-[1400px] mx-auto">
        
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col justify-center py-8 lg:py-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-blue-600 leading-tight">
            {HeroData?.hero?.[0]?.title}
             
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-gray-600 max-w-lg">
             {HeroData?.hero?.[0]?.description}
            </p>

            <div className="mt-10 md:flex-row md:gap-1 gap-[10px] flex-col flex space-x-4">
          <RoundedBgBtn label={HeroData?.hero?.[0]?.button1Text}></RoundedBgBtn>
            <RoundedNotBGBtn label={HeroData?.hero?.[0]?.button2Text}></RoundedNotBGBtn>
            </div>
          </div>
          
          <div className="lg:h-full lg:min-h-[700px]">
            <ScrollingImageGrid HeroData={HeroData} BASE_CONTENT={BASE_CONTENT} BASE_API={BASE_API}/>
          </div>
        </div>
        
      </section>
    </>
  );
};

export default Home1;