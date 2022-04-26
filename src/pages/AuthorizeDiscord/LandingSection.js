import Button2 from "components/Buttons/Button2/index";
// import "./style.css"
import React, { useContext, useEffect, useState } from "react";
import Web3Context from 'contexts/Web3Context';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const LandingSection = ({ }) => {
    const { account, getDiscordToken } = useContext(Web3Context);
    const [authToken, setAuthToken] = useState();
    const handleClick = async () => {
        const token = await getDiscordToken();
        if (!token) {
            NotificationManager.success("Token", "Failed to sign message")
            return;
        }
        setAuthToken(token);
        navigator.clipboard.writeText(token).then(function () {

        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(authToken).then(function () {
            NotificationManager.info("Token", "Copied to Clipboard!")
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    return (<>
        <main style={{ backgroundColor: "rgba(0,0,0,0.35)", minHeight: "100vh" }} className="lg:relative text-white">
            <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48  flex justify-center">
                <div data-aos="fade-up" className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                    <h1 className="text-6xl tracking-tight font-extrabold  sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                        <span className="block xl:inline">Connect your wallet to your discord</span>{' '}
                    </h1>
                    {account ?
                        <div className="mt-10 flex-col items-center md:w-full md:px-16 ">
                            {authToken ? <><div className="text-xl font-bold text-center">Auth Tooken generated!</div>
                                <div className="mt-4 text-center flex-wrap">Now Copy and paste this code to discord</div>
                                <div onClick={handleCopy} className="mt-4 cursor-pointer text-center">{authToken} (click to copy)</div>
                            </> :
                                <Button2
                                    onClick={handleClick}
                                    className="btn-2-blue">

                                    Generate Auth Token
                                </Button2>
                            }

                            <div></div>


                        </div> :
                        <div className="flex text-center justify-center mt-4 w-full items-center"><div className="text-center">Please connect to your wallet first!</div></div>
                    }
                </div>
            </div>

        </main>
    </>);
}
export default LandingSection