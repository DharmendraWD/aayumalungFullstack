// components/MissionVisionValues.js

import React from 'react';
import { Target, Eye, Gem } from 'lucide-react'; // Using lucide-react for icons
import img from "../../../../public/img/imghydroportrait.jpeg"

// Data for Mission, Vision, and Values cards
const mvvData = [
  {
    id: 'mission',
    title: 'Our Mission',
    description: 'To generate clean, reliable, and sustainable energy by harnessing the natural power of water—empowering communities, protecting the environment, and driving a greener future.',
    icon: Target, // Icon for Mission
  },
  {
    id: 'vision',
    title: 'Our Vision',
    description: 'To be a global leader in hydropower, setting the standard for sustainable energy development while creating a positive impact on people, ecosystems, and the planet.',
    icon: Eye, // Icon for Vision
  },
  {
    id: 'values',
    title: 'Our Values',
    description: 'Our work is guided by ethical principles and a dedication to transparency, ensuring that every project we undertake meets the highest standards of safety and accountability.',
    icon: Gem, // Icon for Values
  },
];

// Reusable MVV Card Component
const MvvCard = ({ item }) => {
  const IconComponent = item.icon;
  const hoverBgColor = '#424BD0'; // Placeholder for the blue hover background

  return (
    <div
      // Base card styling
      className={`p-6 md:p-8 rounded-xl border border-gray-200 bg-white
                  transition-all duration-300 ease-in-out cursor-pointer h-full
                  flex flex-col justify-start text-left
                  
                  // Hover Effect: Blue background, white text
                  hover:bg-[var(--primary1)] hover:text-white hover:border-transparent 
                  hover:shadow-lg`}
    >
      <div className="flex items-center mb-4">
        {/* Icon Container */}
        <div className={`p-3 rounded-full mr-4 bg-[var(--primary1)] bg-opacity-10 text-white 
                         transition-all duration-300 ease-in-out 
                         group-hover:bg-white group-hover:text-[var(--primary1)]`}>
            {/* The 'group-hover' classes are critical for children to react to parent hover */}
          <IconComponent size={24} />
        </div>
        
        {/* Title */}
        <h3 className={`text-xl font-semibold text-gray-900 
                       transition-colors duration-300 ease-in-out
                       group-hover:text-white`}>
            {item.title} "lssla"
        </h3>
      </div>
      
      {/* Description */}
      <p className="mt-2 text-base text-gray-600 leading-relaxed 
                    transition-colors duration-300 ease-in-out
                    group-hover:text-white">
        {item.description}
      </p>
    </div>
  );
};


const Mission = () => {
  // Placeholder for the main image
  const mainImageSrc = img;
  const mainImageAlt = "Hydropower dam in a lush valley";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: 2 columns on large screens, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Intro Text, and MVV Cards */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              Our Mission Vision & Values
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              We believe in harnessing the power of water to fuel a cleaner, more sustainable 
              future. Founded with a vision to lead the transition to renewable energy, our 
              company specializes in the development, operation, and maintenance of high-efficiency 
              hydropower plants that deliver reliable, eco-friendly electricity to communities 
              and industries.
            </p>

            {/* MVV Cards Container */}
            <div className="space-y-6">
              {mvvData.map((item) => (
                <div key={item.id} className="group"> {/* Use 'group' class for complex hover effects */}
                  <MvvCard item={item} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Large Image */}
          <div className="lg:col-span-1 h-full min-h-[400px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src={mainImageSrc.src}
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