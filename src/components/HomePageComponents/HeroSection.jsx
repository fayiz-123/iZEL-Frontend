import React from "react";

const HeroSection = () => {
  return (
    <>
      <section className="relative w-full flex flex-col items-center justify-center bg-gray-100 overflow-hidden">
        {/* Background */}
        <div className="w-full">
          <img
            src="/images/izel.png"
            alt="Izel Design Studio"
            className="w-full h-auto object-fill md:h-[62vh]"
          />
        </div>

        {/* Overlay text */}
        <div
          className="
    absolute z-10
    flex flex-col items-center justify-center
    text-center
    px-4
    top-1/3
    left-0              /* 📱 Mobile shift */
    md:items-start md:text-left 
    md:left-90          /* 🖥 Desktop shift */
  "
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black tracking-wide">
            iZEL
          </h1>
          <p className="mt-1 text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl">
            DESIGN STUDIO
          </p>
          <p className="mt-2 text-red-400 text-sm sm:text-base italic md:text-base lg:text-base">
            Your Vision Our Creation
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
