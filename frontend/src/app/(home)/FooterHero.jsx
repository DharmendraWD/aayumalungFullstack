// components/CallToAction.jsx

import RoundedBgBtn from "@/components/Buttons/RoundedBgBtn";
import Link from "next/link";

// This is a Server Component by default in Next.js App Router
export default async function FooterHero() {
  let resData = []

try {
  let res = await fetch(`${process.env.BASE_API}/homepage/footer`)
let data = await res.json()

resData = data?.footer
} catch (error) {
  console.log("Something went wrong", error)
}


  return (
    <section className="bg-white py-20 md:py-28 text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
          {resData?.[0].footerAboveHeading} 
        </h2>

        {/* Sub-description */}
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12">
         {resData?.[0].footerAboveDesc}
        </p>

        {/* Call-to-Action Button */}
       <Link href={resData?.[0].footerAboveBtnLink} className="px-6  py-3 text-lg font-medium text-white bg-[var(--primary1)] m-0 rounded-[50px] cursor-pointer shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
{resData?.[0].footerAboveBtnValue}
       </Link>  
      </div>
    </section>
  );
}