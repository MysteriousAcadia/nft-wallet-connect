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


const AllCats = ({ }) => {
    const { totalSupply } = useContext(Web3Context);
    const [balance, setBalance] = useState();
    const [total, setTotal] = useState();
    const [tokenIds, setTokenIds] = useState(undefined);
    const [tokenIdsToShow, setTokenIdsToShow] = useState(undefined);
    useEffect(async () => {
        const total = await totalSupply();
        setTotal(total);
        const fetchedTokenIds = Array.from({ length: total }, (_, index) => { return ({ tokenId: index + 1 }) });
        setTokenIds(fetchedTokenIds);

        setTokenIdsToShow(fetchedTokenIds?.slice(0, Math.min(12, fetchedTokenIds.length)))

    }, [])
    const loadMore = () => {
        setTokenIdsToShow(tokenIds?.slice(0, Math.min(tokenIdsToShow?.length + 12, tokenIds.length)));
    }
    return (<>
        <div className="mycats-background">
            <Navbar transparent={true} />
            <LandingSection />
            <div className="w-full bg-white">

                {tokenIdsToShow ? tokenIdsToShow?.length === 0 ? <><NoCats /></> : <>
                    <div className="max-w-7xl pt-12 mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        {tokenIdsToShow.map(({ tokenId, reward }) => {

                            return (<Cat isPublic={true} tokenId={tokenId} reward={reward} />)
                        })}
                    </div>

                    {tokenIdsToShow.length !== tokenIds.length && <div className="mx-auto pt-4 w-80"><Button2 className="btn-2-blue" onClick={loadMore}> Load more cats! ({tokenIds?.length - tokenIdsToShow?.length})</Button2></div>}
                </> :
                    <Loading title={"Loading All Minted Cats!"} />
                }
            </div>

        </div>
        {/* <Loading /> */}

    </>);
}
export default AllCats