import React from 'react';
import wp from "../../../../public/img/wp1.jpg"
import { Form } from './Form';
import Navbar from '@/components/Header/Navbar/Navbar';
import Footer from '@/components/Misc/Footer/Footer';

const STATISTICS = [
    { value: "500k", label: "cost savings" },
    { value: "$500k", label: "cost savings" },
    { value: "95%", label: "customer satisfactions" },
    { value: "5%", label: "market shares growth" },
];

const StatCard = ({ stat }) => (
    
    <div className="bg-[#e9e9e9] p-6 rounded-[24px] shadow-2xl text-center h-full transition duration-300 hover:shadow-blue-300/50">
        <p className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-1">
            {stat.value}
        </p>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {stat.label}
        </p>
    </div>
);

export default function NewsDets() {
    // Placeholder image URL is used for portability. 
    // In a real Next.js app, you would use the Image component with a local image asset.
    const backgroundImage = wp.src;

    return (
        <>
        <Navbar></Navbar>
        <div className="min-h-[100vh] flex items-end justify-center font-[Inter] relative overflow-hidden bg-gray-100">
            
            {/* Background Image and Overlay Container */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                </div>
            </div>

            {/* Content Container (z-10 for stacking above the background) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 m-auto">

                {/* Main Text Content */}
                <div className="text-center flex flex-col justify-around mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
                        Identifying cost saving opportunities for KM Ipsum
                    </h1>
                    <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto px-4 sm:px-0">
                        I conducted a comprehensive analysis for KM Ipsum to identify cost-saving opportunities, enhancing their overall efficiency...
                    </p>
                </div>

                {/* Statistics Cards Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {STATISTICS.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>
            </div>
        </div>
        
         {/* ------------------------------------- */}
         <div className="min-h-screen py-12 sm:py-16 md:py-20 font-[Inter] bg-[#e9e9e9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Responsive Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-12 lg:gap-x-16">
                    
                    {/* Column 1: Main Content (Takes up 2/3 of the width on medium/large screens) */}
                    <div className="md:col-span-2 mb-10 md:mb-0">
                        <NewsStudy />
                    </div>

                    {/* Column 2: Newsletter Sidebar (Takes up 1/3 of the width on medium/large screens) */}
                    <div className="md:col-span-1">
                        <NewsletterSidebar />
                    </div>

                </div>
            </div>
        </div>  <div className="min-h-screen py-12 sm:py-16 md:py-20 font-[Inter] bg-[#e9e9e9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Responsive Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-12 lg:gap-x-16">
                    
                    {/* Column 1: Main Content (Takes up 2/3 of the width on medium/large screens) */}
                    <div className="md:col-span-2 mb-10 md:mb-0">
                        <NewsStudy />
                    </div>

                    {/* Column 2: Newsletter Sidebar (Takes up 1/3 of the width on medium/large screens) */}
                    <div className="md:col-span-1">
                        <NewsletterSidebar />
                    </div>

                </div>
            </div>
        </div>
        </>
    );
}






// Newsletter Sidebar Component
const NewsletterSidebar = () => {
    return (
         <>
        {/* // The container uses a large, vibrant background for emphasis */}
        <div className="p-8 bg-indigo-700 rounded-3xl sticky top-8 md:top-12 self-start shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2">
                Join newsletter
            </h3>
            <p className="text-indigo-200 text-sm mb-6">
                Stay up to date with new case studies. We promise no spam, just good content.
            </p>


<Form></Form>
        </div>
       
        
        </>
    );
};

// Main Case Study Content Component
const NewsStudy = () => {
    return (
        <div className="text-gray-700 leading-relaxed  space-y-8">
            <section>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    What was the goal?
                </h2>
                <p className="text-lg">
                    Company XYZ, a well-established retail brand, was facing a significant decline in sales and struggling to adapt to the digital landscape. They lacked an effective online presence, had limited knowledge of Google Ads and marketing strategies, and were not utilizing social media platforms to their advantage.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Solution:
                </h2>
                <ul className="list-disc pl-6 space-y-4">
                    <li>
                        <strong className="font-semibold text-indigo-700">Business Consultation:</strong> Consult Me initiated the project by conducting a comprehensive business consultation with Company XYZ's stakeholders. This included an in-depth analysis of their current operations, target market, and competitors. By understanding the unique challenges and goals, Consult Me developed a tailored strategy to enhance Company XYZ's overall business performance.
                    </li>
                    <li>
                        <strong className="font-semibold text-indigo-700">Google Ads and Marketing Strategy:</strong> To boost online visibility and drive targeted traffic, Consult Me developed a comprehensive Google Ads and marketing strategy. This included thorough keyword research, ad copy optimization, and campaign structuring. By implementing effective ad placements and leveraging data-driven insights, Consult Me positioned Company XYZ as a prominent player in their industry, resulting in increased website traffic and higher conversions.
                    </li>
                    <li>
                        <strong className="font-semibold text-indigo-700">Social Media Optimization:</strong> Recognizing the power of social media, Consult Me developed a robust social media optimization plan for Company XYZ. By identifying the most relevant platforms for their target audience, Consult Me created engaging content, optimized profiles, and implemented a consistent posting schedule. This approach helped to build brand awareness, fostered customer engagement, and ultimately drove more sales through social media channels.
                    </li>
                </ul>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Results:
                </h2>
                <p className="text-lg mb-4">
                    The collaboration between Company XYZ and Consult Me yielded remarkable results, transforming the company's digital presence and business performance:
                </p>
                <ul className="list-disc pl-6 space-y-4">
                    <li>
                        <strong className="font-semibold text-indigo-700">Increased Sales and Revenue:</strong> By implementing effective Google Ads and marketing strategies, Consult Me helped Company XYZ experience a significant boost in sales and revenue. The targeted campaigns, optimized ad copies, and strategic placements resulted in improved conversion rates and a substantial return on investment.
                    </li>
                    <li>
                        <strong className="font-semibold text-indigo-700">Enhanced Online Visibility:</strong> Company XYZ's online visibility witnessed a dramatic improvement through the implementation of Consult Me's social media optimization strategies. The brand's social media profiles gained a significant following, and their engaging content generated significant organic reach and interactions, positioning Company XYZ as an industry leader.
                    </li>
                    <li>
                        <strong className="font-semibold text-indigo-700">Improved Brand Reputation:</strong> Consult Me's holistic approach to business consultation and digital marketing significantly contributed to enhancing Company XYZ's brand reputation. The company's consistent messaging across various online platforms and their active engagement with customers fostered trust and loyalty among their target audience.
                    </li>
                </ul>
            </section>

            <section className="pt-8">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Summing up
                </h2>
                <p className="text-lg">
                    With Consult Me's expertise in business consulting, Google Ads management, and social media optimization, Company XYZ successfully transformed its digital presence, reaping the rewards of increased sales, enhanced online visibility, and improved brand reputation. This case study stands as a testament to the efficacy of Consult Me's comprehensive approach in delivering exceptional results for their clients. If you're ready to revitalize your business and achieve outstanding digital growth, Consult Me is here to guide you every step of the way.
                </p>
            </section>
        </div>
    );
};

