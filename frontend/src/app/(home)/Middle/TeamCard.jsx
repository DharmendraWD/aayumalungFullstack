"use client";
import Image from "next/image";
import img1 from "../../../../public/img/people/1.png"
import img2 from "../../../../public/img/people/2.png"
import img3 from "../../../../public/img/people/3.png"
import img4 from "../../../../public/img/people/4.png"
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const teamMembers = [
  {
    name: "Sabin Adhikari",
    title: "Founder & CEO",
    img: img1,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel nisl eu lorem aliquam fermentum.",
  },
  {
    name: "Rasmika Adhikari",
    title: "Founder & CEO",
    img:img2,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod justo a congue condimentum.",
  },
  {
    name: "Kanak Adhikari",
    title: "HR Manager",
    img:img3,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel nisl eu lorem aliquam fermentum.",
  },
  {
    name: "Sabin Adhikari",
    title: "Designer",
    img:img4,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod justo a congue condimentum.",
  },
  {
    name: "David Smith",
    title: "CTO",
    img:img4,
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod justo a congue condimentum.",
  },
];

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const TeamCarousel = () => {
const [data, setdata] = useState({ team: [] })
let BASE_CONTENT = process.env.NEXT_PUBLIC_BASE_CONTENT

const getData = async () => {
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/homepage/team`)
  const data = await res.json()
  setdata(data)
    
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  getData()
}, [])


  return (
    <div className="team-section max-w-[1440px] mx-auto" id="about-teams">
      <div className="team-header flex lg:flex-row gap-8 items-start max-w-[100%] w-full flex-col">
        <h1>Meet the talented team who make all this happen</h1>
        <p>
          Our philosophy is simple, hire great people and give them the
          resources and support to do their best work.
        </p>
      </div>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={2000}
        transitionDuration={800}
        containerClass="carousel-container fade-carousel"
        arrows={false}

      >
        {data?.team.map((member, index) => (
          <div className="team-card" key={index}>
            <img  src={`${BASE_CONTENT}/${member.image.replace(/\\/g, '/')}`}  className="team-img" />

            <h3 className="font-semibold">{member.title}</h3>
            <h4>{member.desig}</h4>
            <p>{member.desc}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TeamCarousel;


