import React, { useContext, useEffect, useState } from "react";
import Navbar from "components/Navbar/index";
import JoinCafe from "./JoinCafe";
import LandingSection from "./LandingSection";
import Web3Context from 'contexts/Web3Context';
import "./catLoad.css"
import Loading from "./Loading";
import NoCats from "./NoCats";
import Cat from "components/Cards/Cat/index";
import OwnerOnly from "./OwnerOnly";
import Button2 from "components/Buttons/Button2"


const MyCats = ({ }) => {
    const { getVouchers, account, balanceOf, retrieveVoucher, voucherRetrieved, markAsUsed, getOwnerTokenData } = useContext(Web3Context);
    const [balance, setBalance] = useState();
    const [tokenIds, setTokenIds] = useState(undefined);
    const [tokenIdsToShow, setTokenIdsToShow] = useState(undefined);
    useEffect(async () => {
        if (account) {
            const fetchedTokenIds = await getOwnerTokenData();
            setTokenIds(fetchedTokenIds);

            setTokenIdsToShow(fetchedTokenIds?.slice(0, Math.min(9, fetchedTokenIds.length)))

            // const r = await balanceOf();
            // // console.log(r)
            // setBalance(r);
            // getOwnerTokenData(0, 6)
        }
    }, [account])
    useEffect(() => {
        if (balance > 0) {
            getOwnerTokenData(0, balance);
        }
    }, [balance])
    const loadMore = () => {
        setTokenIdsToShow(tokenIds?.slice(0, Math.min(tokenIdsToShow?.length + 9, tokenIds.length)));
    }
    return (<>
        <div className="mycats-background">
            <Navbar transparent={true} />
            <LandingSection />
            <div className="w-full bg-white">

                {tokenIdsToShow ? tokenIdsToShow?.length === 0 ? <><NoCats /></> : <>
                    <div className="pt-32 pb-16 text-2xl w-full text-center leading-8 font-semibold tracking-tight text-gray-900 sm:text-3xl">You have {tokenIds?.length} cat{tokenIds?.length != 1 ? "s" : ''}!</div>
                    <div className="max-w-7xl pt-12 mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {tokenIdsToShow.map(({ tokenId, reward }) => {

                            return (<Cat tokenId={tokenId} reward={reward} />)
                        })}
                    </div>

                    {tokenIdsToShow.length !== tokenIds.length && <div className="mx-auto pt-4 w-80"><Button2 className="btn-2-blue" onClick={loadMore}> Load more cats! ({tokenIds?.length - tokenIdsToShow?.length})</Button2></div>}
                </> :
                    <Loading />
                }
            </div>
            <OwnerOnly />

        </div>
        {/* <Loading /> */}

    </>);
}
export default MyCats