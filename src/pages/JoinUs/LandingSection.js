import Button2 from "components/Buttons/Button2/index";
import React from "react"
const LandingSection = ({ }) => {
    return (<>
        <main style={{ backgroundColor: "rgba(0,0,0,0.35)", minHeight: "100vh" }} className="lg:relative text-white">
            <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48  flex justify-center">
                <div data-aos="fade-up" className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                    <h1 className="text-6xl tracking-tight font-extrabold  sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                        <span className="block xl:inline">Join the Cafe</span>{' '}
                    </h1>

                    <div className="mt-10 md:flex md:justify-between md:w-full md:px-16 ">
                        <a href="https://discord.gg/D4pZ66j2av" target={"_blank"}>
                            <Button2 className="btn-2-blue">

                                Join Discord
                            </Button2>
                        </a>
                        <a href="https://twitter.com/ChibiCatCafe" target={"_blank"}>

                            <Button2 className="btn-2-blue">
                                Join Twitter
                            </Button2>
                        </a>

                    </div>
                </div>
            </div>

        </main>
    </>);
}
export default LandingSection