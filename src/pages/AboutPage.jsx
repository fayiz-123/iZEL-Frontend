import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function AboutPage() {
  window.scrollTo(0, 0);
  const navigate = useNavigate();

  return (
    <>
      <section className="min-h-screen bg-gray-50">
        {/* 🔹 Sticky Top Bar */}
        <div className="sticky top-0 z-20 bg-white shadow-sm">
          <div className="flex items-center max-w-6xl mx-auto px-4 py-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <FaArrowLeft className="text-2xl text-gray-800" />
            </button>
            <h2 className="flex-1 text-center text-2xl md:text-3xl font-bold text-gray-800">
              About Us
            </h2>
          </div>
        </div>

        {/* 🔹 About Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left - Image */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/images/aboutimage.png"
                alt="iZEL Studio"
                className="rounded-2xl shadow-lg w-[280px] sm:w-[320px] md:w-[400px] object-cover"
              />
            </div>

            {/* Right - Text */}
            <div className="text-center md:text-left max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Behind iZEL Design Studio
              </h3>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                At iZEL Design Studio, every thread tells a story. Rooted in the
                richness of tradition and elevated by modern aesthetics, our
                handcrafted ethnic wear is designed for women who embrace
                culture with confidence.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                From timeless bridal ensembles to elegant everyday couture, we
                blend heritage craftsmanship with contemporary finesse to create
                pieces that speak to the soul. Each creation is more than just
                clothing — it is an expression of artistry, passion, and a
                celebration of heritage.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                Our journey is about honoring traditional artisans, preserving
                age-old techniques, and ensuring that culture continues to live
                vibrantly in modern fashion. iZEL is not just a brand, but a
                bridge between the past and the present, designed for the future
                of fashion.
              </p>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-yellow-900 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To redefine ethnic wear by fusing culture with innovation,
                allowing every woman to feel both deeply rooted and beautifully
                modern in her attire.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-yellow-900 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To empower artisans, preserve traditional techniques, and create
                pieces that narrate stories of heritage while resonating with
                today’s lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AboutPage;
