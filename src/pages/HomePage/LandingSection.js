import Button2 from "components/Buttons/Button2/index";
import React from "react"
import { Link } from "react-router-dom";
const LandingSection = ({ }) => {
    return (<>
        <main style={{ backgroundColor: "rgba(0,0,0,0.35)", minHeight: "100vh" }} className="lg:relative text-white">
            <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-right flex justify-end">
                <div data-aos="fade-left" className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                    <h1 className="text-4xl tracking-tight font-extrabold  sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                        <span className="block xl:inline">Welcome to the</span>{' '}
                        <span className="block  xl:inline">Chibi Cat Cafe!</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-lg  sm:text-xl md:mt-5 md:max-w-3xl">
                        A place where you can find the most adorable Cat collectible waiting to be adopted and given a new home in the Blockchain…
                    </p>
                    <div className="mt-10 sm:flex sm:justify-center lg:justify-end">
                        <Link to="/mint">
                            <Button2>
                                Mint Now
                            </Button2>
                        </Link>

                    </div>
                </div>
            </div>

        </main>
    </>);
}
export default LandingSection