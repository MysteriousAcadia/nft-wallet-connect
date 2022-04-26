import React from "react"
import Join from "assets/join_cafe.png";
import Button2 from "components/Buttons/Button2/index";
const JoinCafe = ({ }) => {
    return (<>
        <div className="bg-white overflow-hidden">
            <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">


                <div className="mt-8 lg:flex lg:justify-between lg:items-center">
                    <img data-aos="fade-right" className="w-96" src={Join} />

                    <div data-aos="fade-left" className=" lg:mt-0 lg:max-w-xl">
                        <div>
                            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Join The Cafe
                            </h3>
                        </div>
                        <div className="mt-8 text-base max-w-prose mx-auto lg:max-w-none">
                            <p className="text-lg text-gray-500">
                                Come and join the Cafe where all the Chibi Cat owners and enthusiasts chill together and have fun. Whether you own a Cat or not, The Chibi Cat Cafe is always open for anyone with welcoming paws.
                            </p>
                        </div>
                        <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                            <p>
                                You can join the Cafe by clicking “Join the Cafe” in the main menu bar at the top, or by using the buttons below.
                            </p>

                        </div>
                        <div className="mt-10 md:flex md:justify-start md:w-full">
                            <a href="https://discord.gg/D4pZ66j2av" target={"_blank"}>
                                <Button2 className="btn-2-blue">

                                    Join Discord
                                </Button2>
                            </a>
                            <a href="https://twitter.com/ChibiCatCafe" target={"_blank"}>

                                <Button2 className="md:ml-4 btn-2-blue">
                                    Join Twitter
                                </Button2>
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default JoinCafe