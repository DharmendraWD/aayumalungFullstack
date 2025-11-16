// components/FAQSection.jsx
"use client"; // This component requires client-side interactivity (useState, onClick)

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Using FaPlus and FaMinus for clarity

// --- MOCK FAQ DATA ---
const faqItems = [
  {
    id: 1,
    question: "Do you offer discounts?",
    answer: "Yes, we frequently offer discounts for new clients, bulk orders, and during seasonal promotions. Please contact our sales team to inquire about current offers that might apply to your needs. We also have special packages for long-term partnerships."
  },
  {
    id: 2,
    question: "I'm looking for different service",
    answer: "Our services are highly customizable. If you have a specific need that isn't explicitly listed, please reach out to us. We're happy to discuss your unique requirements and see how we can tailor our expertise to provide a bespoke solution just for you."
  },
  {
    id: 3,
    question: "How many package?",
    answer: "We offer a range of flexible packages designed to suit various budgets and requirements, from basic starter packs to comprehensive enterprise solutions. Each package includes different levels of features and support. Visit our 'Services' page or contact us for a detailed breakdown of each option."
  },
  {
    id: 4,
    question: "Do you offer combo packages?",
    answer: "Absolutely! We specialize in creating integrated combo packages that bundle multiple services together for maximum efficiency and cost savings. These packages are ideal for clients looking for a holistic approach to their challenges. Let us know your requirements, and we can design a custom combo for you."
  },
];

const FAQSection = () => {
  // State to manage which FAQ item is currently open/expanded
  const [openId, setOpenId] = useState(null);

  // Function to toggle the open state of an FAQ item
  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          
          {/* Left Column: Heading and Description */}
          <div className="lg:pr-8 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Some questions, <br />some answers.
            </h2>
            <p className="text-lg text-gray-700 max-w-sm mx-auto lg:mx-0">
              Have a look at my most frequently asked questions.
            </p>
          </div>

          {/* Right Column: Accordion FAQ Items */}
          <div className="w-full">
            {faqItems.map((item) => (
              <div key={item.id} className="border-b border-gray-300 py-6">
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="flex justify-between cursor-pointer items-center w-full text-left text-gray-900 focus:outline-none"
                  aria-expanded={openId === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="text-xl md:text-2xl ">{item.question}</span>
                  <span className="text-gray-500 transition-transform duration-300">
                    {openId === item.id ? 
                        <FaMinus className="w-5 h-5" /> : 
                        <FaPlus className="w-5 h-5" />
                    }
                  </span>
                </button>
                
                {/* Answer Section (conditionally rendered with animation) */}
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === item.id ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                  // Note: max-h-[200px] is a safe estimate for average answer length.
                  // For very long answers, you might need a larger max-h value.
                >
                  <p className="text-gray-600 text-lg pr-4">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;