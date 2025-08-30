import React from 'react'

function AboutUsPriview() {
    return (
        <section className="py-12 px-6 md:px-16 bg-white">
            <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-yellow-900 italic mb-10">
                A Celebration of Heritage Through Every Thread
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left: Image */}
                <div className="flex justify-center md:justify-end md:mr-[20px]">
                    <img
                        src="/images/aboutimage.png"
                        alt="iZEL Design Studio"
                        className="rounded-2xl shadow-md w-[250px] sm:w-[270px] md:w-[300px] object-cover"
                    />
                </div>

                {/* Right: Text */}
                <div className="text-center md:text-left max-w-[330px]">
                    <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
                        Behind iZEL Design Studio
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                        At iZEL Design Studio, every thread tells a story. Rooted in the richness
                        of tradition and elevated by modern aesthetics, our handcrafted ethnic wear
                        is designed for the woman who embraces culture with confidence.
                        From timeless bridal ensembles to elegant everyday couture, we blend
                        heritage craftsmanship with contemporary finesse to create pieces
                        that speak to the soul.
                    </p>
                    <div className="mt-4">
                        <button className="bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base px-5 py-2 rounded-lg shadow-md">
                            Read Our Story →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUsPriview
