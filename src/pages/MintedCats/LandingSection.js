import Button2 from "components/Buttons/Button2/index";
import React from "react"
import "./style.css"
import Loading from "./Loading";
const LandingSection = ({ }) => {
    return (<>
        <main style={{ backgroundColor: "rgba(0,0,0,1)" }} className="lg:relative text-white">
            <div className="mx-auto max-w-7xl w-full py-16 pb-20 text-center lg:py-24  flex justify-center">
                <div data-aos="fade-up" className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                    <h1 className="text-6xl tracking-tight font-extrabold  sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                        <span className="block xl:inline">All Cats</span>{' '}
                    </h1>


                </div>
            </div>

        </main>
        <svg className="bg-white" id="bigTriangleColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 102" preserveAspectRatio="none">
            <path d="M0 0 L50 100 L100 0 Z" />
        </svg>


    </>);
}
export default LandingSection