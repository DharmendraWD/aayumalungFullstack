
import img1 from "../../../../public/img/hpower1.jpg"
import img2 from "../../../../public/img/hpower2.jpg"
import img3 from "../../../../public/img/hydroportrait.jpg"
import Image from "next/image";
import Link from "next/link";
import HTMLReactParser from 'html-react-parser';



// Individual Card Component
const CaseStudyCard = ({ study }) => {
  let BASE_CONTENT = process.env.BASE_CONTENT
    return (
        <div className="bg-white rounded-2xl rounded-br-[95px] shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="w-full h-auto overflow-hidden p-4">
                <Image
                width={300}
                height={300}
            // <img  src={`${BASE_CONTENT}/${member.image.replace(/\\/g, '/')}`}  className="team-img" />

                   src={`${BASE_CONTENT}/${study.image.replace(/\\/g, '/')}`}
                    alt={study.title}
                    className="w-[100%] h-[200px] object-cover transition duration-500 ease-in-out hover:scale-[1.03]"
                    // Fallback placeholder image on error\
                    unoptimized
                   
                />
            </div>
            
            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 leading-snug mb-3">
                   {study.title}
                </h3>
                <div className="text-base multiline-ellipsis text-gray-600 mb-4 flex-grow">
                                        {HTMLReactParser(study?.desc)} 

                </div>
                <Link href={`/blog/${study._id}`} className="text-blue-600 font-medium hover:text-blue-700 transition duration-150 self-start">
                    Read more
                </Link>
            </div>
        </div>
    );
};

// Main App Component
export default async function  NewsAndCaseStudy() {

const BASE_API = process.env.BASE_API;
  let Data = [];
  let error = null;
  
  try {
    const response = await fetch(`${BASE_API}/homepage/blog`, {
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
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 font-[Inter]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Centered */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
          News and Case Studies
        </h2>

        {/* Responsive Grid Container */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {Data?.blog?.splice(0, 3).map(study => (
            <CaseStudyCard key={study._id} study={study} />
          ))}
        </div>
        
      </div>
    </div>
  );
}