import React, { useContext, useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import CatOwnerAlpha from "assets/cafe_owner_cat_alpha.png"
import Web3Context from "contexts/Web3Context";
import Button2 from "components/Buttons/Button2/index";
import { useNavigate } from "react-router-dom";

const Stats = ({ }) => {
    const navigate = useNavigate()
    const [animatedProgress, setAnimatedProgress] = useState(0)
    const [sold, setSold] = useState(0);
    const [animatedSold, setAnimatedSold] = useState(0);
    const { totalSupply } = useContext(Web3Context);
    useEffect(() => {
        const getTotalSupply = async () => {
            const result = await totalSupply();
            setSold(result);
            setAnimatedProgress((result * 100 / 8688).toFixed(2))
            setAnimatedSold(result);
        }
        getTotalSupply();
    }, [])
    // const handleAnimate = () => {
    //     const interval = setInterval(() => {
    //         if (animatedSold >= sold) {
    //             console.log("clear")
    //             // return clearInterval(interval)
    //         };
    //         setAnimatedSold(animatedSold + 1);
    //         setAnimatedProgress(parseFloat((animatedSold + 1) / 8000).toFixed(1));
    //     }, 1000);
    //     // return () => clearInterval(interval);
    // }
    return (<>
        <div className="bg-white w-full py-16">
            <h3 data-aos="fade-up" className="pt-8 pb-16 text-3xl w-full text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                How many are minted?
            </h3>
            <div data-aos="fade-up" className="w-96 mx-auto">

                <CircularProgressbarWithChildren value={animatedProgress}>
                    {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                    {/* <img style={{ width: 40, marginTop: -5 }} src={CatOwnerAlpha} alt="doge" /> */}
                    <div className="text-5xl font-bold">
                        {animatedProgress}%
                    </div>
                    <div className="mb-1 text-xl font-semibold"> {animatedSold}/8688 minted!</div>
                </CircularProgressbarWithChildren>
            </div>
            <div data-aos="fade-up" className="mt-8 mx-auto w-64"><Button2 onClick={() => navigate("/allcats")} className="btn-2-blue">All Cats</Button2></div>

        </div>
    </>);
}
export default Stats