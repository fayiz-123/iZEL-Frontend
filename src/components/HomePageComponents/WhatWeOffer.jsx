import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { GiAmpleDress } from "react-icons/gi";
import { SiAdguard } from "react-icons/si";

const WhatWeOffer = () => {
  const offers = [
    {
      icon: <GiAmpleDress className="text-4xl text-black mx-auto" />,
      title: "Customized Bridal Wear",
      desc: "Expert bridal tailoring — unique designs & perfect fit.",
    },
    {
      icon: <SiAdguard className="text-4xl text-black mx-auto" />,
      title: "Guaranteed Workmanship",
      desc: "Expert handwork, embroidery & finishing — quality you can trust every time.",
    },
    {
      icon: <FaLayerGroup className="text-4xl text-black mx-auto" />,
      title: "Premium Fabric Selection",
      desc: "Choose from a wide range of high-quality fabrics for every occasion.",
    },
  ];

  return (
    <section className="py-10 px-6 bg-white text-center">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">What We Offer</h2>

      {/* Offer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {offers.map((offer, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {offer.icon}
            <h3 className="mt-4 text-lg font-semibold text-black">
              {offer.title}
            </h3>
            <p className="mt-2 text-gray-600 text-sm">{offer.desc}</p>
          </div>
        ))}
      </div>

      {/* Learn More Button */}
      {/* <div className="mt-8">
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base px-5 py-2 rounded-lg shadow-md">
          Learn More →
        </button>
      </div> */}
    </section>
  );
};

export default WhatWeOffer;
