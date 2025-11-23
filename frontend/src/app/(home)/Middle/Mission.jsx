// components/MissionVisionValues.js

import React from 'react';
import { Target, Eye, Gem } from 'lucide-react'; // Using lucide-react for icons
import img from "../../../../public/img/imghydroportrait.jpeg"

// Data for Mission, Vision, and Values cards
// const mvvData = [
//   {
//     id: 'mission',
//     title: 'Our Mission',
//     description: 'To generate clean, reliable, and sustainable energy by harnessing the natural power of water—empowering communities, protecting the environment, and driving a greener future.',
//     icon: Target, // Icon for Mission
//   },
//   {
//     id: 'vision',
//     title: 'Our Vision',
//     description: 'To be a global leader in hydropower, setting the standard for sustainable energy development while creating a positive impact on people, ecosystems, and the planet.',
//     icon: Eye, // Icon for Vision
//   },
//   {
//     id: 'values',
//     title: 'Our Values',
//     description: 'Our work is guided by ethical principles and a dedication to transparency, ensuring that every project we undertake meets the highest standards of safety and accountability.',
//     icon: Gem, // Icon for Values
//   },
// ];

// Reusable MVV Card Component
const MvvCard = ({ BASE_CONTENT, BASE_API, Data,idx, IconComponent }) => {
  const IconComponent1 = Target;


  const cardData = Data?.mission?.[0]?.[`box${idx + 1}`]; 

  return (
    <div
      className={`p-6 md:p-8 rounded-xl border border-gray-200 bg-white
                  transition-all duration-300 ease-in-out cursor-pointer h-full
                  flex flex-col justify-start text-left
                  hover:bg-[var(--primary1)] hover:text-white hover:border-transparent 
                  hover:shadow-lg group`} // group per card
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full mr-4 bg-[var(--primary1)] bg-opacity-10 text-white 
                         transition-all duration-300 ease-in-out 
                         group-hover:bg-white group-hover:text-[var(--primary1)]`}>
           <IconComponent size={24} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300 ease-in-out group-hover:text-white">
          {cardData?.title}
        </h3>
      </div>
      <p className="mt-2 text-base text-gray-600 leading-relaxed transition-colors duration-300 ease-in-out group-hover:text-white">
        {cardData?.desc}
      </p>
    </div>
  );
};





const Mission = async() => {
  // Placeholder for the main image
  const mainImageAlt = "Hydropower dam in a lush valley";
  
  const BASE_API = process.env.BASE_API;
  const BASE_CONTENT = process.env.BASE_CONTENT;
  let Data = [];
  let error = null;
  
  try {
    const response = await fetch(`${BASE_API}/homepage/mission`, {
    });
    
    
    if (!response.ok) {
      error = "Something went wrong.";
      throw new Error('Failed to fetch data');
    }
    Data = await response.json();
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
      
      const icons = [Target, Eye, Gem];
      
      const mainImageSrc = BASE_CONTENT+Data?.mission?.[0]?.images?.[0];
      

        
        return (
          <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: 2 columns on large screens, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Intro Text, and MVV Cards */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
             {Data?.mission?.[0]?.upper.title} 
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
             {Data?.mission?.[0]?.upper.desc}
            </p>

            {/* MVV Cards Container */}
            <div className="space-y-6">
            
               
                 <div className="flex  flex-col gap-4">
 
     {[0, 1, 2].map((idx) => {
    const cardData = Data?.mission?.[0]?.[`box${idx + 1}`];
    const IconComponent = icons[idx]; // pick icon for this card
    return <MvvCard key={idx} idx={idx} Data={Data} BASE_CONTENT={BASE_CONTENT} IconComponent={IconComponent} />;
  
  })}

</div>


         
            </div>
          </div>
          
          {/* Right Column: Large Image */}
          <div className="lg:col-span-1 h-full min-h-[400px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src={mainImageSrc}
                alt={mainImageAlt}
                className="w-full h-full object-cover"
                // For Next.js Image component, remove 'w-full h-full object-cover'
                // and use 'fill' prop: <Image src="..." alt="..." fill style={{ objectFit: 'cover' }} />
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;