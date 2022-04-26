import React, { useContext, useEffect, useState } from "react";
import Web3Context from "contexts/Web3Context";
import Button2 from "components/Buttons/Button2/index";
import { utils } from "ethers";
const OwnerOnly = ({ }) => {
    const { amIOwner, getContractBalance, account, retrieveBalance } = useContext(Web3Context);
    const [owner, setOwner] = useState(false);
    const [balance, setBalance] = useState(0);
    useEffect(() => {

        const getData = async () => {
            const isOwner = await amIOwner();
            console.log(isOwner);
            if (isOwner) {
                const balance = await getContractBalance();
                setBalance(balance);
            }
            setOwner(isOwner);
        }
        getData()
    }, [account]);

    const handleRetrieveBalance = async () => {
        await retrieveBalance();
        const balance = await getContractBalance();
        setBalance(balance);

    }


    return (<>{owner && <>
        <div className="w-full flex flex-col items-center bg-white">

            <h3 data-aos="fade-up" className="pt-32 pb-16 text-3xl w-full text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                What's up?<br />(Shhh....This section is only for the owner!)
            </h3>
            <div className="my-16 text-xl sm:text-3xl">Contract Balance: {parseFloat(utils.formatEther(balance.toString())).toFixed(3)} ONE</div>
            <Button2 onClick={handleRetrieveBalance} className="btn-2-blue w-72">Retrieve Balance</Button2>
        </div>
    </>}
    </>);
}
export default OwnerOnly