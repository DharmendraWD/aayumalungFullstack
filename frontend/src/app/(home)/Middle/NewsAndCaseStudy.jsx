
"use client";
import img1 from "../../../../public/img/hpower1.jpg"
import img2 from "../../../../public/img/hpower2.jpg"
import img3 from "../../../../public/img/hydroportrait.jpg"
import Image from "next/image";
import Link from "next/link";

// Sample data for the cards
const CASE_STUDIES = [
    {
        id: 1,
        title: "How I improved Landsum onboarding experience",
        summary: "I redesigned Landsum's onboarding process to create a more seamless experience for new users, improving retention rates...",
        img: img1,
    },
    {
        id: 2,
        title: "Helping Lorify to add new features that will attract millenials",
        summary: "I collaborated with Lorify to implement new features tailored for millenials, significantly enhancing platform engagement...",
        img: img2,
    },
    {
        id: 3,
        title: "Identifying cost saving opportunities for KM Ipsum",
        summary: "I conducted a comprehensive analysis for KM Ipsum to identify cost-saving opportunities, enhancing their overall efficiency...",
        img:img3,
    },
];

// Individual Card Component
const CaseStudyCard = ({ study }) => {
    return (
        <div className="bg-white rounded-2xl rounded-br-[95px] shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="w-full h-auto overflow-hidden p-4">
                <Image
                width={800}
                height={800}
                    src={study.img}
                    alt={study.title}
                    className="w-full h-full object-cover transition duration-500 ease-in-out hover:scale-[1.03]"
                    // Fallback placeholder image on error
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x500/94A3B8/FFFFFF?text=Image+Missing" }}
                />
            </div>
            
            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 leading-snug mb-3">
                    {study.title}
                </h3>
                <p className="text-base text-gray-600 mb-4 flex-grow">
                    {study.summary}
                </p>
                <Link href={`/news/${study.id}`} className="text-blue-600 font-medium hover:text-blue-700 transition duration-150 self-start">
                    Read more
                </Link>
            </div>
        </div>
    );
};

// Main App Component
export default function NewsAndCaseStudy() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 font-[Inter]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Centered */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
          News and Case Studies
        </h2>

        {/* Responsive Grid Container */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {CASE_STUDIES.map(study => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
        
      </div>
    </div>
  );
}