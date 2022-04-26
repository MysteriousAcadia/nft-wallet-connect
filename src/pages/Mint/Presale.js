import React, { useState, useEffect, useContext } from 'react';
import Web3Context from 'contexts/Web3Context';
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Button3 from 'components/Buttons/Button3/index';
import Button2 from 'components/Buttons/Button2/index';
import Loading from 'pages/MyCats/Loading';
import NoCats from 'pages/MyCats/NoCats';
const Presale = ({ }) => {
    const { getVouchers, retrieveVoucher, voucherRetrieved, markAsUsed } = useContext(Web3Context);
    const { account } = useWeb3React();
    const [verified, setVerified] = useState(false);

    const [vouchers, setVouchers] = useState();
    const [discount, setDiscount] = useState(0);
    const [selectedVoucher, setSelectedVoucher] = useState();
    const [transactionProgress, setTransactionProgress] = useState(0);
    const fetchAvailableVouchers = async () => {
        setVouchers()
        setVerified(false);
        setDiscount(0);
        setSelectedVoucher();
        setTransactionProgress(0)
        const response = await getVouchers();
        setVouchers(response);

    }
    useEffect(() => {

        if (account) {
            fetchAvailableVouchers();
        }
    }, [account]);
    const handleMint = async () => {
        if (!verified) {
            const result = await voucherRetrieved(selectedVoucher.voucherId);
            if (result === false) {
                NotificationManager.success("Success", "Voucher Verified! You can proceed to mint.")
                setVerified(true);
            }
            else {
                const res = await markAsUsed([selectedVoucher.voucherId]);
                // console.log(res);
                setVouchers(vouchers.filter((e) => e.voucherId !== selectedVoucher.voucherId));
                setSelectedVoucher(undefined);
                NotificationManager.error("Failure", "Invalid Voucher! Please select a valid voucher.")

            }
        }
        else {
            setTransactionProgress(1)
            const result = await retrieveVoucher(selectedVoucher, utils.parseEther((320 - selectedVoucher.discount).toString()))
            if (result) {
                setVouchers(vouchers.filter((e) => e.voucherId !== selectedVoucher.voucherId));
                setSelectedVoucher(undefined);
            }
            else {
                NotificationManager.error("Failure", "Minting Failed")

            }
            // console.log(result);
            setTransactionProgress(0)
            setSelectedVoucher(undefined)
            setDiscount(0);
            setVerified(false);
            fetchAvailableVouchers();

        }
    }
    return (<>
        {account ?
            <>
                {transactionProgress === 0 ? <>

                    <h1 className="text-2xl font-semibold  border-t border-gray-200 pt-6 ">Select Voucher <span className='font-normal text-lg'>(Only one voucher can be applied for each transaction)</span></h1>
                    {selectedVoucher &&
                        <>
                            <h1 className="text-2xl">Selected Voucher</h1>
                            <div className=' w-full flex items-center justify-center'>
                                <Button3 onClick={() => {
                                    setSelectedVoucher(undefined)
                                    setTransactionProgress(0);
                                    setDiscount(0);
                                    setVerified(false);
                                }} className={"selected"}><div className='flex items-center justify-between'><div className="mt-1">{selectedVoucher.discount} ONE off! Because you own {selectedVoucher.type} #{selectedVoucher?.tokenId?.toString().slice(0, 3)}...{selectedVoucher?.tokenId?.toString().slice(-3)}</div><div className='leading-3 font-bold text-3xl ml-4 text-red-500'>×</div></div></Button3>
                            </div>
                        </>
                    }
                    <div className={`${vouchers && vouchers?.length > 0 && "max-h-72 border"}  rounded mt-6 mx-auto overflow-y-auto`}>
                        {!vouchers ? <><Loading title="Fetching Vouchers..." /></> : vouchers?.length === 0 ? <><NoCats title="No Vouchers available" /></> : vouchers?.map((q, i) => {
                            return (<Button3 className={`${selectedVoucher?.tokenId === q.tokenId ? "selected" : ""} mx-auto my-2`} onClick={() => {
                                setSelectedVoucher(q);
                                setDiscount(q.discount);
                                setTransactionProgress(0);
                                setVerified(false);
                            }}>{q.discount} ONE off! Because you own {q.type} #{q?.tokenId?.toString().slice(0, 3)}...{q?.tokenId?.toString().slice(-3)}</Button3>)
                        })}
                    </div>
                    {selectedVoucher && <>
                        <h1 className="text-2xl font-semibold  border-t border-gray-200 pt-6">Price</h1>
                        <dl className="text-sm font-medium text-gray-500 space-y-6  pt-6">
                            <div className="flex justify-between">
                                <dt>Subtotal</dt>
                                <dd className="text-gray-900">{320} ONE</dd>
                            </div>

                            <div className="flex justify-between">
                                <dt>Discount</dt>
                                <dd className="text-gray-900">{discount} ONE</dd>
                            </div>



                            <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">{320 - discount} ONE</dd>
                            </div>
                        </dl>
                        <div className='w-1/2 mx-auto'>

                            <Button2 onClick={handleMint} className="btn-2-blue">{verified ? "Mint!" : "Verify Voucher"}</Button2>


                        </div>

                    </>}
                </>
                    : <Loading title={"Minting your cat!"} />}</> : <>
                <h1 className="text-4xl pt-36 animate-pulse text-center font-bold ">Connect to your wallet first!</h1>
            </>}
    </>);
}
export default Presale