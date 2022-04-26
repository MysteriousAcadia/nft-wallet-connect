import React, { useState, useEffect, useContext } from 'react';
import Web3Context from 'contexts/Web3Context';
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Button3 from 'components/Buttons/Button3/index';
import Button2 from 'components/Buttons/Button2/index';
import Loading from 'pages/MyCats/Loading';
import NoCats from 'pages/MyCats/NoCats';
const quantities = [
    {
        amount: 1,
        pack: 0,

    },
    {
        amount: 3,
        pack: 1,

    },
    {
        amount: 6,
        pack: 2,

    },
    {
        amount: 12,
        pack: 3,

    }

]
const Mint = ({ }) => {
    const { account, getDiscountOptions, mint, } = useContext(Web3Context);
    const [availableQuantities, setAvailableQuantities] = useState(quantities);
    const [selectedQuantity, setSelectedQuantity] = useState(availableQuantities[0]);
    const [availableDiscounts, setAvailableDiscounts] = useState();
    const [selectedDiscounts, setSelectedDiscounts] = useState([])
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState(selectedQuantity.amount * 320);
    const [isMinting, setIsMinting] = useState(false);
    const fetch = async () => {

        setAvailableDiscounts();
        setSelectedDiscounts([]);
        setSelectedQuantity(availableQuantities[0]);
        setAvailableDiscounts(await getDiscountOptions());
        setSelectedDiscounts([]);
        setSelectedQuantity(availableQuantities[0]);
    }
    useEffect(() => {
        if (account) {
            fetch()
        }
    }, [account])
    const handleSelectCoupon = async (coupon) => {

        if (selectedDiscounts.map(e => e?.id + e?.tokenId).includes(coupon.id + coupon.tokenId)) {
            setSelectedDiscounts(selectedDiscounts.filter(e => e?.id + e.tokenId !== coupon.id + coupon.tokenId));
            return;
        }
        if (selectedDiscounts.length === selectedQuantity.amount) {
            let newSelectedDiscounts = [...selectedDiscounts];
            newSelectedDiscounts[selectedDiscounts.length - 1] = coupon
            setSelectedDiscounts(newSelectedDiscounts);
            return;
        }
        setSelectedDiscounts([...selectedDiscounts, coupon])
    }
    const handleMint = async () => {
        setIsMinting(true);
        if (selectedDiscounts.length == 0) {
            await mint(selectedQuantity.pack, undefined, undefined, utils.parseEther((price).toString()));
        }
        else {
            let contracts = [];
            let tokenIds = [];
            selectedDiscounts.map(({ contractAddress, tokenId }) => {
                contracts.push(contractAddress);
                tokenIds.push(tokenId);
            })
            await mint(selectedQuantity.pack, contracts, tokenIds, utils.parseEther((price).toString()))
        }
        setIsMinting(false);
        setSelectedDiscounts([]);
        setSelectedQuantity(availableQuantities[0]);
        fetch();
    }
    useEffect(() => {
        let totalDiscount = 0;
        selectedDiscounts.map(({ discount }) => totalDiscount += parseFloat(discount));
        setDiscount(totalDiscount);
        setPrice((320 * selectedQuantity.amount) - totalDiscount);
    }, [selectedDiscounts, selectedQuantity])


    return (<>
        {account ? isMinting ? <Loading title="Minting..." /> : <>
            <h1 className="text-2xl font-semibold ">Select Quantity</h1>
            <div className="flex flex-wrap items-center my-4 justiry justify-around">
                {availableQuantities.map(q => {
                    return (<Button3 className={`${selectedQuantity?.pack === q.pack ? "selected" : ""} w-8 md:w-auto  m-2`} onClick={() => {
                        setSelectedQuantity(q)
                        setSelectedDiscounts([])
                    }}>{q.amount}</Button3>)
                })}
            </div>
            <h1 className="text-2xl font-semibold  border-t border-gray-200 pt-6 ">Select Coupons <span className='font-normal text-lg'>(Only {selectedQuantity.amount} coupon{selectedQuantity.amount == 1 ? "" : "s"} can be selected, {selectedQuantity.amount - selectedDiscounts.length} remaining)</span></h1>
            {!availableDiscounts ? <><Loading title="Fetching Coupons..." /></> : availableDiscounts?.length === 0 ? <><NoCats title="No Coupons available" /></> : <div className='max-h-72 overflow-auto'>{availableDiscounts?.map((q, i) => {
                return (<Button3 className={`${selectedDiscounts?.map(e => e.id + e.tokenId)?.includes(q.id + q.tokenId) ? "selected" : ""} mx-auto my-2`} onClick={() => {
                    handleSelectCoupon(q);
                    // setSelectedVoucher(q);
                    // setDiscount(q.discount);
                    // setTransactionProgress(0);
                    // setVerified(false);
                }}>{q.discount} ONE off! Because you own {q.name} #{q?.tokenId}</Button3>)
            })}</div>}


            <h1 className="text-2xl mt-4 font-semibold  border-t border-gray-200 pt-6">Price</h1>
            <dl className="text-sm font-medium text-gray-500 space-y-6  pt-6">
                <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="text-gray-900">{selectedQuantity.amount * 320} ONE</dd>
                </div>

                <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd className="text-gray-900">{discount} ONE</dd>
                </div>



                <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                    <dt className="text-base">Total</dt>
                    <dd className="text-base">{price} ONE</dd>
                </div>
            </dl>
            <div className='w-1/2 mx-auto'>
                <Button2 onClick={handleMint} className="btn-2-blue">Mint!</Button2>
            </div>
        </> : <>
            <h1 className="text-4xl pt-16 text-center font-bold ">Connect to your wallet first!</h1>
        </>}
    </>);
}
export default Mint