
import React from 'react';
import Head from 'next/head';
import RoundedBgBtn from '@/components/Buttons/RoundedBgBtn';
import RoundedNotBGBtn from '@/components/Buttons/RoundedNotBGBtn';

// Dummy image paths (using abstract images for better visual testing)
const imagePaths = {
  img1: 'https://www.shutterstock.com/shutterstock/photos/2146982431/display_1500/stock-vector-simple-rectangular-tiled-frames-of-various-sizes-colored-in-shades-of-blue-geometric-shapes-2146982431.jpg', // Top-left B&W
  img2: 'https://thumbs.dreamstime.com/b/d-rendering-low-poly-random-tiles-texture-white-color-abstract-geometric-pattern-background-medium-size-triangles-340818029.jpg',   // Top-right B&W
  img3: 'https://cdn.vectorstock.com/i/500p/46/04/purple-blue-pink-random-sizes-low-poly-background-vector-15064604.jpg', // Middle-right B&W/Abstract
  img4: 'https://media.istockphoto.com/id/1073416084/photo/shocked-young-woman-looking-at-laptop-screen.jpg?s=612x612&w=0&k=20&c=_2OwVoe5iwNnKWGg6auirOs5i5G7gVra69hq_OfYrR0=',  // Bottom-left color
  img5: 'https://media.istockphoto.com/id/667138552/photo/portrait-of-a-woman-working-online-at-home.jpg?s=170667a&w=0&k=20&c=HCSYdeBgMpqB_ealarmN4V2ZBUQHIaKYyjOhjAjxGyQ=',// Bottom-right color
};

// Component that renders a single set of the image grid
const ImageGridContent = () => (
    <div className="grid grid-cols-2 grid-rows-3 gap-3 p-4 md:p-6 lg:p-8">
        {/* ... (Image elements are unchanged) ... */}
        {/* Image 1: Top Left - Span two rows */}
        <div className="row-span-2 aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
            <img src={imagePaths.img1} alt="Modern steel architecture" className="w-full h-full object-cover grayscale transition-transform duration-500 hover:scale-105"/>
        </div>

        {/* Image 2: Top Right - Span one row */}
        <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
            <img src={imagePaths.img2} alt="Top view of a clean building" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>

        {/* Image 3: Middle Right - Span one row */}
        <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
            <img src={imagePaths.img3} alt="Curving structural abstract" className="w-full h-full object-cover grayscale transition-transform duration-500 hover:scale-105"/>
        </div>
        
        {/* Image 4 & 5: Bottom Row - Full color */}
        <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl">
            <img src={imagePaths.img4} alt="Pink and yellow minimalist building" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>
        <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl">
            <img src={imagePaths.img5} alt="Skyline with architectural blocks" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>
    </div>
);


const ScrollingImageGrid = () => {
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
          <ImageGridContent key={idx} />
        ))}

      </div>
      
      {/* White shadow overlays */}
      <div className="absolute top-0 left-0 w-full h-1/6 bg-gradient-to-b from-white to-transparent opacity-90 z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-white to-transparent opacity-90 z-10 pointer-events-none"></div>

    </div>
  );
};

// Main Hero Section Component
const Home1 = () => {
  return (
    <>
      <Head>
        <title>Building Spaces with Strength and Precision</title>
      </Head>
      
      <section className="bg-white  pt-12 md:pt-20 lg:pt-24 max-w-[1400px] mx-auto">
        
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col justify-center py-8 lg:py-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Building Spaces <br />
              with <span className="text-blue-600">Strength</span> <br />
              and <span className="text-blue-600">Precision</span>.
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-gray-600 max-w-lg">
              We don’t just construct buildings — we create spaces that inspire 
              confidence, stand strong against time, and bring real value to the 
              people who live and work in them.
            </p>

            <div className="mt-10 md:flex-row md:gap-1 gap-[10px] flex-col flex space-x-4">
          <RoundedBgBtn label="Get Started"></RoundedBgBtn>
            <RoundedNotBGBtn label="See Our Projects"></RoundedNotBGBtn>
            </div>
          </div>
          
          <div className="lg:h-full lg:min-h-[700px]">
            <ScrollingImageGrid />
          </div>
        </div>
        
      </section>
    </>
  );
};

export default Home1;