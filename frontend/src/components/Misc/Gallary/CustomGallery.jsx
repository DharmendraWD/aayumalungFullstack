// components/CustomGallery.jsx
import Image from 'next/image';
import gl1 from "../../../../public/img/gallary/1.png"
import gl2 from "../../../../public/img/gallary/2.png"
import gl3 from "../../../../public/img/gallary/3.png"
import gl4 from "../../../../public/img/gallary/4.png"
import gl5 from "../../../../public/img/gallary/5.png"
import gl6 from "../../../../public/img/gallary/6.png"
import H1 from '@/components/Heading/H1';


const CustomGallery = async() => {
const BASE_API = process.env.BASE_API;
  const BASE_CONTENT = process.env.BASE_CONTENT;
  let Data = [];
  let error = null;
  
  try {
    const response = await fetch(`${BASE_API}/homepage/gallary`, {
    });
    
    
    if (!response.ok) {
      error = "Something went wrong.";
      throw new Error('Failed to fetch data');
    }
    Data = await response.json();
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
      



  const galleryImages = [
    { id: 1, src: gl1, alt: 'Boudhanath Stupa, Kathmandu' }, // Will be wider (3 units)
    { id: 2, src: gl2, alt: 'Hanuman Dhoka Palace, Kathmandu' }, // Narrow (1 unit)
    { id: 3, src: gl3, alt: 'Parliament House, Kathmandu' }, // Narrow (1 unit)
    { id: 4, src: gl4, alt: 'Sunset over Karnali Bridge' }, // Will be wider (3 units)
    
    { id: 5, src: gl5, alt: 'Dharan Clock Tower' },
    { id: 6, src: gl6, alt: 'Boats on Begnas Lake, Pokhara' },
  
  ]
  return (
    <>
    <div id='gallery'>
    <H1 label="Gallery"></H1>
  <div className="grid grid-cols-1 sm:grid-cols-4 max-w-[1440px]  mx-auto auto-rows-[300px] sm:auto-rows-[350px]">
      {Data?.gallary[0].images.map((image, index) => {
        let colSpan = 'col-span-1';

        if (index === 0 || index === 5) colSpan = 'sm:col-span-2'; // first and last images
        // Image 2 and 3 remain default (1 col)
        // Rest are standard

        return (
          <div
            key={index}
            className={`${colSpan}  relative rounded-lg group h-full w-full overflow-hidden`}
          >
            <Image
              width={300}
              height={300}
              src={BASE_CONTENT+image}
              alt={"ksm"}
unoptimized
              className="object-cover w-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        );
      })}
    </div>
    </div>
    </>
  );
};

export default CustomGallery;
