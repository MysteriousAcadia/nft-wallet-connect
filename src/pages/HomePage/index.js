import React from "react"
import "./style.css"
import LandingSection from "./LandingSection";
import Rarity from "./Rarity";
import JoinCafe from "./JoinCafe";
import CardBanner from "./CardBanner";
import Navbar from "components/Navbar/index";
import Roadmap from "./Roadmap";
import FinalComic from "assets/finalComic.png"
import Slider from "react-slick";
import ComicPlate1 from "assets/comic_plate_1.png";
import ComicPlate2 from "assets/comic_plate_2.png";
import ComicPlate3 from "assets/comic_plate_3.png";
import {
    ArrowCircleLeftIcon,
    ArrowCircleRightIcon,
} from "@heroicons/react/outline";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdditionalFeatures from "./AdditonalFeatures";
import Stats from "./Stats";
import 'react-circular-progressbar/dist/styles.css';

const HomePage = ({ }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: (
            <div className="focus:outline-none">
                <ArrowCircleLeftIcon className="text-gray-400 h-12 w-12 mx-auto hover:text-black transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer" />
            </div>
        ),
        nextArrow: (
            <div className="focus:outline-none">
                <ArrowCircleRightIcon className="text-gray-400 h-12 w-12 mx-auto hover:text-black transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer" />
            </div>
        ),

    };
    return (
        <div className="base-background">
            <Navbar />
            <LandingSection />
            <Stats />
            <div className="bg-white w-full py-16">
                <h3 data-aos="fade-up" className="pt-8 pb-16 text-3xl w-full text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    About us
                </h3>
                {/* <img data-aos="fade-in" src={FinalComic} className="w-full  md:hidden bg-white" /> */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    {/* <Slider className="bg-white mx-16 hidden md:block" {...settings}> */}
                    <img data-aos="fade-up" src={ComicPlate1} className="p-2 bg-white" />
                    <img data-aos="fade-up" src={ComicPlate2} className="p-2 bg-white" />
                    <img data-aos="fade-up" src={ComicPlate3} className="p-2 bg-white" />
                    {/* </Slider> */}
                </div>
            </div>




            <Roadmap />
            <AdditionalFeatures />
            <JoinCafe />
        </div>
    );
}
export default HomePage