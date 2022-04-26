import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UnknownCat from "assets/unknown_cat.png";
import Web3Context from 'contexts/Web3Context';
import Button2 from "components/Buttons/Button2/index";
import { utils } from "ethers";



const Cat = ({ tokenId, reward, isPublic = false }) => {
    const { retrieveReward, axiosInstance, BACKEND_URL } = useContext(Web3Context)
    const [metaData, setMetaData] = useState();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [taken, setTaken] = useState(false);
    useEffect(() => {
        // if (tokenId) {
        //     axiosInstance.get(`${tokenId}`).then((res) => setMetaData(res.data)).catch(error => { }// console.log(error)
        //     );
        // }
    }, [tokenId])
    return (<>
        <div key={tokenId} className="m-2 p-2 border border-black">
            <img className={`${imageLoaded ? "" : "hidden"}`} src={tokenId ? `${BACKEND_URL}image/${tokenId}` : UnknownCat} onLoad={() => setImageLoaded(true)} />
            <img className={`${imageLoaded ? " hidden" : ""}`} src={UnknownCat} />
            <div className="flex justify-between">
                <div className="mt-2 font-extrabold text-lg ">#{('000' + tokenId).slice(-4)}</div>
                {!isPublic && <div className="mt-2 font-extrabold text-lg ">Reward: {taken ? "0" : parseFloat(utils.formatEther(reward)).toFixed(3)} ONE</div>}

            </div>
            {!isPublic &&
                <div className="mt-4 px-4">
                    <Button2 className="btn-2-blue" onClick={() => {
                        if (retrieveReward(tokenId)) {
                            setTaken(true)
                                ;
                        }
                    }}>Claim Reward</Button2>
                </div>
            }

        </div>
    </>);
}
export default Cat