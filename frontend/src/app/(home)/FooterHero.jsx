// components/CallToAction.jsx

import RoundedBgBtn from "@/components/Buttons/RoundedBgBtn";

// This is a Server Component by default in Next.js App Router
export default function FooterHero() {
  return (
    <section className="bg-white py-20 md:py-28 text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
          Make your own Dream <br className="hidden sm:inline" />project with us
        </h2>

        {/* Sub-description */}
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12">
          Lorem ipsum .lorem ipsum , lorem ipsum ajshxaj sgxaxasxasxasxa sxasdbteggweDV
        </p>

        {/* Call-to-Action Button */}
       <RoundedBgBtn label="Contact Us"></RoundedBgBtn>
      </div>
    </section>
  );
}