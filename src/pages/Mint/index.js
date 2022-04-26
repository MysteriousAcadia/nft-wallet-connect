import React, { useContext, useEffect, useState } from 'react'
import UnknownCat from "assets/unknown_trim.png";
import Button3 from 'components/Buttons/Button3/index';
import Button2 from 'components/Buttons/Button2/index';
import Navbar from 'components/Navbar/index';
import Web3Context from 'contexts/Web3Context';
import Presale from './Presale';
import Mint from './Mint';
import Loading from 'pages/MyCats/Loading';
import NoCats from 'pages/MyCats/NoCats';
const quantities = [1, 3, 6, 12];
const discounts = [
    "50% Off, because you own Harmoonies #201",
    "50% Off, because you own Harmoonies #202",
    "50% Off, because you own Harmoonies #203",
    "50% Off, because you own Harmoonies #204",
    "50% Off, because you own Harmoonies #205",
]
const epoch = new Date(1641168000000);
const MintPage = ({ }) => {
    const { account, isPreSale, isBlacklisted, isPaused } = useContext(Web3Context);
    const [presale, setPresale] = useState();
    const [timeDiff, setTimeDiff] = useState(false);
    const [blackList, setBlacklist] = useState(false);
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        if (new Date() < epoch) {
            let myInterval = setInterval(() => {
                const curTime = new Date();
                setTimeDiff(epoch - curTime);
            }, 1000)
            return () => {
                clearInterval(myInterval);
            };
        }

    }, []);

    useEffect(() => {
        const getPreSale = async () => {
            const getPause = await isPaused();
            setPaused(getPause)
            if (!getPause) {
                const result = await isPreSale();
                setPresale(result);
            }

        }

        getPreSale();
    }, [])
    useEffect(() => {
        const checkBlackList = async () => {
            const result = await isBlacklisted()
            setBlacklist(result);
        }
        if (account) {
            checkBlackList();
        }
    }, [account])



    return (<>
        <Navbar />

        <div className='w-full bg-white'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
                <div className="md:flex items-start justify-between bg-transparent mt-16">
                    <div data-aos="fade-right" className="flex-1">


                        <h1 className="text-4xl text-center font-bold ">Mint your own NFT</h1>
                        <img className='w-3/4 mx-auto my-8' src={UnknownCat} />
                        <h1 className="text-3xl text-center font-semibold ">Get your own cat today!</h1>

                    </div>
                    <div data-aos="fade-left" className='flex-1 text-center text-main-default'>
                        {paused ? <><NoCats title={"All transfers, including minting is paused right now. For more information, checkout our discord!"} /></> : <>
                            {blackList ? <><NoCats title={"You are not allowed to mint. Please reach out to us on Discord to know more."} /></> : <>

                                {timeDiff ? <div className='text-2xl font-bold'>You're early! Pre-Sale Starts in: {(timeDiff / 3600000).toFixed(1)} Hours</div> :
                                    <>
                                        {presale === true ? <Presale /> : presale === false ? <Mint />
                                            : <Loading title={"Loading mint page..."} />}
                                    </>}
                            </>}
                        </>}

                        {/* <Presale /> */}
                    </div>


                </div>



            </div>
        </div>
    </>);
}
export default MintPage