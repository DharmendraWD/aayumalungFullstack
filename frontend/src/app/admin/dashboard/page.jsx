


import { FaGithub, FaTwitter, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa'; 
import adminimg from "../../../../public/img/admin.svg"
import { cookies } from 'next/headers';
import aayusLogo  from "../../../../public/img/logof.png"
import aayumLogo  from "../../../../public/img/wp1.jpg"

import Link from 'next/link'; 
import { FaHome, FaUsers, FaCog, FaChartLine, FaLayerGroup, FaQuestion, FaInfo, FaBullhorn, FaMap, FaImages, FaBuilding, FaNewspaper } from 'react-icons/fa';
import { IoIosArrowDown, IoMdSettings, IoMdCreate, IoMdImages, IoMdLink } from 'react-icons/io';
import Image from 'next/image';


const DASHBOARD_SECTIONS = [
  // {
  //   title: 'Dashboard',
  //   icon: FaHome,
  //   summary: 'Overview of all component statuses and recent activity.',
  //   stats: [{ label: 'Pages', value: 8 }, { label: 'Active Users', value: 120 }],
  //   color: 'bg-gray-500',
  //   href: '/dashboard', // Added href for the Link component
  // },
  {
    title: 'Hero Section',
    icon: FaBullhorn,
    summary: 'The main attention-grabbing part of your homepage.',
    content: [
      { type: 'Text & Paragraphs', count: 3, icon: IoMdCreate, value: 3, label: 'Text/Para' },
      { type: 'High-Resolution Images', count: 9, icon: IoMdImages, value: 9, label: 'Images' },
    ],
    color: 'bg-gray-600',
    href: '/hero-section',
  },
  {
    title: 'About Us Section',
    icon: FaInfo,
    summary: 'Detailed information about your company, history, and values.',
    content: [
      { type: 'Content Blocks', count: 4, icon: FaLayerGroup, value: 4, label: 'Blocks' },
      { type: 'Founders Images', count: 2, icon: FaUsers, value: 2, label: 'Founders' },
    ],
    color: 'bg-gray-600',
    href: '/about-us-section',
  },
  {
    title: 'Mission Section',
    icon: FaBuilding,
    summary: 'Your core mission statement and strategic goals.',
    content: [
        { type: 'Mission Statements', count: 1, icon: IoMdSettings, value: 1, label: 'Mission' },
        { type: 'Core Values', count: 5, icon: FaLayerGroup, value: 5, label: 'Values' },
    ],
    color: 'bg-gray-600',
    href: '/mission-section',
  },
  {
    title: 'Our Team',
    icon: FaUsers,
    summary: 'Profiles for team members and staff.',
    content: [
      { type: 'Team Members', count: 12, icon: FaUsers, value: 12, label: 'Members' },
      { type: 'Social Links', count: 48, icon: IoMdLink, value: 48, label: 'Socials' },
    ],
    color: 'bg-gray-600',
    href: '/our-team',
  },
  {
    title: 'Gallery',
    icon: FaImages,
    summary: 'Visual content organized into albums and collections.',
    content: [
      { type: 'Albums', count: 5, icon: FaLayerGroup, value: 5, label: 'Albums' },
      { type: 'Total Images', count: 150, icon: IoMdImages, value: 150, label: 'Images' },
    ],
    color: 'bg-gray-600',
    href: '/gallery',
  },
  {
    title: 'News and Case',
    icon: FaNewspaper,
    summary: 'Latest updates, articles, and case studies.',
    content: [
      { type: 'Published Articles', count: 15, icon: FaNewspaper, value: 15, label: 'Articles' },
      { type: 'Case Studies', count: 4, icon: FaChartLine, value: 4, label: 'Cases' },
    ],
    color: 'bg-gray-600',
    href: '/news-and-case',
  },
  {
    title: 'Contact Us',
    icon: FaMap,
    summary: 'Contact details, form status, and location maps.',
    content: [
      { type: 'Locations', count: 3, icon: FaMap, value: 3, label: 'Locations' },
      { type: 'Form Submissions (Today)', count: 7, icon: IoMdCreate, value: 7, label: 'Submissions' },
    ],
    color: 'bg-gray-600',
    href: '/contact-us',
  },
  {
    title: 'FAQs',
    icon: FaQuestion,
    summary: 'Frequently Asked Questions and organized answers.',
    content: [
      { type: 'Total Questions', count: 45, icon: FaQuestion, value: 45, label: 'Questions' },
      { type: 'Categories', count: 6, icon: FaLayerGroup, value: 6, label: 'Categories' },
    ],
    color: 'bg-gray-600',
    href: '/faqs',
  },
  {
    title: 'Footer',
    icon: FaLayerGroup,
    summary: 'Management of the site-wide bottom content links and details.',
    content: [
        { type: 'CTA Text', count: 1, icon: IoMdCreate, value: 1, label: 'CTA Text' },
        { type: 'Footer Links', count: 12, icon: IoMdLink, value: 12, label: 'Footer Links' },
        { type: 'Map Links', count: 2, icon: FaMap, value: 2, label: 'Map Links' },
        { type: 'Copyright By', count: 1, icon: IoMdSettings, value: 1, label: 'Copyright' },
    ],
    color: 'bg-gray-600',
    href: '/footer',
  },
];



const SummaryCard = ({ section }) => {
  // const [isHovered, setIsHovered] = useState(false);
  // const IconComponent = section.icon;


  // const targetHref = section.href || `/${section.title.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div 
      className={`p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out cursor-pointer h-full 
        ${section.color} text-white transform 
        ${isHovered ? 'scale-[1.03] shadow-2xl ring-4 ring-offset-2 ring-opacity-70 ring-white' : 'scale-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4 border-b border-white/30 pb-3">
        <h3 className="text-xl font-bold">{section.title}</h3>
        {IconComponent && <IconComponent className="w-8 h-8 opacity-70" />}
      </div>

      <p className="text-sm opacity-90 mb-4 h-12 overflow-hidden">{section.summary}</p>

      <div className="mt-4 pt-4 border-t border-white/30 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
          {section.content ? 'Editable Assets' : 'Key Metrics'}
        </p>
        
        {/* Dynamic Content/Stats Display */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {/* Using item.value and item.label for cleaner rendering, 
              or fallback to count/type if defined in the data array */}
          {(section.content || section.stats || []).map((item, index) => {
            const ItemIcon = item.icon || FaLayerGroup; 
            const value = item.value || item.count;
            const label = item.label || item.type;
            
            return (
              <div 
                key={index} 
             
              >
                <ItemIcon className="w-4 h-4 text-white/80" />
                <span className="font-semibold">{value}</span>
                <span className="text-xs opacity-80 truncate">{label}</span>
              </div>
            );
          })}
        </div>

        {/* Action Button/Link (Only visible on hover or mobile) */}
        <div className={`mt-4 pt-4 border-t border-white/30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
             <Link 
                href={targetHref}
                className="block text-center w-full py-2 border border-white rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
             >
                Go to {section.title}
             </Link>
        </div>
      </div>
    </div>
  );
};



function DashboardContent() {
  return (
    <div className="p-4 md:p-8 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Admin Panel Overview
      </h1>
      <p className="text-gray-500 mb-8">
        Quick summary of all editable sections and content statistics.
      </p>

      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      
        {DASHBOARD_SECTIONS.map((section, index) => (
          <SummaryCard key={index} section={section} />
        ))}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
// 2.  CRITICAL FIX: You must AWAIT the cookies() function 
 const cookieStore = await cookies(); 
    const BASE_CONTENT = process.env.BASE_CONTENT;


// 3. Now, 'cookieStore' is the actual store object with the .get() method
const email = cookieStore.get('email')?.value; 
const username = cookieStore.get('username')?.value; 


  return(

    <div>
    <div className="min-h-screen  mt-[40px]  text-gray-100 flex flex-col items-center p-4 sm:p-8">
      <div className=" w-full ">
        {/* Title and Emoji */}
        <h1 className="text-4xl capitalize sm:text-2xl font-extrabold mb-4 text-white">
          Welcome to Dashboard <b className='bold'> {username} </b>! 👋
        </h1>

        
        <p className="text-basetext-start sm:text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl">
        Quick summary of all editable sections and content statistics. Edit the content and stats to reflect your project's progress.
         
        </p>

        
      

<div className='flex flex-col lg:flex-row just justify-start items-center gap-8'>

        <div
  id="toast-notification"
  className="w-full max-w-xs p-4 text-gray-900 bg-[#152035] rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
  role="alert"
>

  <div className="flex items-center">
    <div className="relative inline-block shrink-0">
      <div
        className="w-12 h-12 rounded-full overflow-hidden bg-green-600 flex items-center justify-center text-white font-bold text-xl"
      >
        <Image src={aayumLogo} width={200} height={200} alt="" className='h-full w-full'/>
      </div>
 
    </div>
    <div className="ms-3 text-sm font-normal">
      <div className="text-sm font-semibold text-gray-400 dark:text-white">
        Developed and Maintained by
      </div>
      <Link href={"#"} className="text-sm font-normal flex items-center text-blue-300 dark:text-gray-400">Aayusoft Tech  
            <FaExternalLinkAlt className="ml-2 text-xs" />
      
      </Link>
  
    </div>
  </div>
</div>

{/* 22222222 */}
        
        <div
  id="toast-notification"
  className="w-full max-w-xs p-4 text-gray-900 bg-[#152035] rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
  role="alert"
>

  <div className="flex items-center">
    <div className="relative inline-block shrink-0">
      <div
        className="w-12 h-12 rounded-full overflow-hidden bg-green-600 flex items-center justify-center text-white font-bold text-xl"
      >
        <Image src={aayumLogo} width={200} height={200} alt="" className='h-full w-full'/>
      </div>
 
    </div>
    <div className="ms-3 text-sm font-normal">
      <div className="text-sm font-semibold text-gray-400 dark:text-white">
       Visit Aayumalun
      </div>
      <Link href={BASE_CONTENT} className="text-sm font-normal flex items-center text-blue-300 dark:text-gray-400">Aayumalung 
            <FaExternalLinkAlt className="ml-2 text-xs" />
      
      </Link>
  
    </div>
  </div>
</div>
     </div>   


        <div className="mt-[100px]"> 
          <img
            src={adminimg.src}
            alt="Developer working illustration"
            className=" w-full max-w-xl h-auto"
          />
        </div>
      </div>
    </div>


    </div>
  )
}