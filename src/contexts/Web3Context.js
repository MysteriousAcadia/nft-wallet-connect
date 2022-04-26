import React, { useState, createContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import axios from "axios"
import chibiCatsAbi from "abi/chibiCatsAbi.json"
import chibiVouchersAbi from "abi/chibiVouchersAbi.json"
import { Contract } from "@ethersproject/contracts";
import { ethers, BigNumber, providers } from "ethers";
import { Contract as MultiContract, Provider } from "ethers-multicall";
import { NotificationContainer, NotificationManager } from 'react-notifications';






const RPC_URL = "https://api.harmony.one";
const BACKEND_URL = "http://localhost:4193/";
// const BACKEND_URL = "https://chibi-cat-cafe.herokuapp.com/";
const CHAIN_ID = 1666600000;
const CHIBI_CAT_CONTRACT_ADDRESS = "0xaDa4DbDD000B7Cd3C4a116044bcb5D5c61d1b9D4";
const CHIBI_VOUCHERS_CONTRACT_ADDRESS = "0x5BdBc6A92004733744b413BED6b6DB003f07B63f";
const MULTI_CALL_ADDRESS = "0x34b415f4d3b332515e66f70595ace1dcf36254c5"
const Web3Context = createContext();

export const Web3Provider = (props) => {
    const axiosInstance = axios.create({ baseURL: BACKEND_URL });
    const { activate, account, library } = useWeb3React();
    let chibiCatsContract, chibiVouchersContract;
    const { ethereum } = window;
    const injected = new InjectedConnector({
        supportedChainIds: [CHAIN_ID],
    });

    const onClickMetamask = async () => {

        const connector = injected;
        activate(connector, async (err) => {
            const hasSetup = await setupNetwork(
                CHAIN_ID,
                RPC_URL
            );
            if (hasSetup) activate(connector);
        });
        await ethereum.request({ method: 'eth_requestAccounts' })
        NotificationManager.success("Success", "Wallet Connected!")
    };
    const disconnect = async () => {
        // setAccount()
    }
    const connectContracts = async (signer) => {
        chibiCatsContract = new Contract(
            CHIBI_CAT_CONTRACT_ADDRESS,
            chibiCatsAbi,
            signer
        );
        chibiVouchersContract = new Contract(
            CHIBI_VOUCHERS_CONTRACT_ADDRESS,
            chibiVouchersAbi,
            signer
        );
        // console.log(chibiCatsContract);
        // console.log(chibiVouchersAbi);
    }
    useEffect(async () => {
        if (!library) return;
        const data =
            library?.messenger?.chainType === "hmy"
                ? library.provider
                : await library.getSigner(account);
        await connectContracts(data);
        // console.log(library);
    }, [library]);

    const setupNetwork = async (chainId, rpcUrl) => {
        const provider = window.ethereum;
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: `0x${chainId.toString(16)}` }],
            });
            onClickMetamask(injected)

        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: `0x${chainId.toString(16)}`,
                            rpcUrls: [RPC_URL],
                            chainName: "Harmony Mainnet",
                            nativeCurrency: {
                                name: "one",
                                symbol: "ONE", // 2-6 characters long
                                decimals: 18,
                            },
                        },
                    ],
                });
            } catch (addError) {
                // handle "add" error
                // console.log(addError);
            }

            // handle other "switch" errors
        }
    };



    const setupContracts = async () => {
        let signer
        if (library) {
            signer = await library?.getSigner();
        }
        else {
            signer = new providers.JsonRpcProvider(RPC_URL);
            signer = signer.getSigner("0x0000000000000000000000000000000000000000");
        }

        await connectContracts(signer);
    }





    const functionsToExport = { onClickMetamask };

    functionsToExport.isPreSale = async () => {
        await setupContracts();
        const resp = await chibiCatsContract.presaleActive();
        return resp;
    }

    functionsToExport.isBlacklisted = async () => {
        await setupContracts();
        const resp = await chibiCatsContract.isBlacklisted(account);
        return resp;
    }
    functionsToExport.amIOwner = async () => {
        await setupContracts();
        const resp = await chibiCatsContract.balanceRetriever();
        if (resp.toString().toLowerCase() == account?.toString()?.toLowerCase()) {
            return true;
        }
        return false;
    }
    functionsToExport.isBlacklisted = async () => {
        await setupContracts();
        const resp = await chibiCatsContract.isBlacklisted(account);
        return resp;
    }
    functionsToExport.isPaused = async () => {
        await setupContracts();
        const resp = await chibiCatsContract.isPaused();
        return resp;
    }
    functionsToExport.getVouchers = async () => {
        try {
            const resp = await axiosInstance.get(`${account}`)
            return resp.data;
        }
        catch (e) {
            return e;
        }
    }
    functionsToExport.markAsUsed = async (tokenIds = []) => {
        try {
            const resp = await axiosInstance.post(`/vouchers/${account}`, { vouchers: tokenIds })
            return resp.data;
        }
        catch (e) {
            return e;
        }
    }
    functionsToExport.voucherRetrieved = async (voucherId) => {
        await setupContracts()

        const result = await chibiVouchersContract.voucherRetrieved(voucherId);
        // console.log(result);
        return result;
    }
    functionsToExport.retrieveVoucher = async ({ voucherId, tokenId, discount, retrieverAddress, signature }, amount) => {
        try {
            await setupContracts()
            NotificationManager.info("Progress", "Transaction Initiated!")

            const result1 = await chibiVouchersContract.getSigner([voucherId, tokenId, discount, retrieverAddress, signature]);
            // console.log(amount);
            const result = await chibiVouchersContract.retrieveVoucher([voucherId, tokenId, discount, retrieverAddress, signature], { value: amount });
            // console.log(result);
            NotificationManager.info("Progress", "Transaction In Progress!")

            const finalResult = await result.wait();
            const resultHttp = await functionsToExport.markAsUsed([voucherId]);
            // console.log(result);
            NotificationManager.success("Transaction Success", "Mint Complete!")

            return finalResult
        }
        catch (e) {
            NotificationManager.error("Transaction Failed", e.toString())
        }
    }
    functionsToExport.mint = async (packCode, contractAddressList = undefined, tokenIdList = undefined, amount) => {
        try {
            let transaction;
            NotificationManager.info("Progress", "Transaction Initiated!")

            await setupContracts();

            if (!contractAddressList || !tokenIdList) {
                transaction = await chibiCatsContract.mint(packCode, { value: amount });

            }
            else {
                // console.log(packCode)
                // console.log(contractAddressList)
                // console.log(tokenIdList)
                // console.log(amount)
                transaction = await chibiCatsContract.discountMint(packCode, contractAddressList, tokenIdList, { value: amount })

            }
            NotificationManager.info("Progress", "Transaction In Progress!")

            const result = await transaction.wait();
            // console.log(result);
            NotificationManager.success("Transaction Success", "Mint Complete!")
        }
        catch (e) {
            NotificationManager.error("Transaction Failed", e.toString())

        }

    }


    functionsToExport.retrieveBalance = async () => {
        try {

            const signer = await library.getSigner(account);
            chibiCatsContract = new Contract(
                CHIBI_CAT_CONTRACT_ADDRESS,
                chibiCatsAbi,
                signer
            );
            const result = await chibiCatsContract.retrieveBalance();
            // console.log(result);
            NotificationManager.success("Reward Retrieved!", "Success")
            return true;
        }
        catch (e) {
            NotificationManager.error("No Reward to Retrieve", "Error");
            return false;
        }
    }


    functionsToExport.retrieveReward = async (tokenId) => {
        try {

            const signer = await library.getSigner(account);
            chibiCatsContract = new Contract(
                CHIBI_CAT_CONTRACT_ADDRESS,
                chibiCatsAbi,
                signer
            );
            const result = await chibiCatsContract.retrieveReward(tokenId);
            // console.log(result);
            NotificationManager.success("Reward Retrieved!", "Success")
            return true;
        }
        catch (e) {
            NotificationManager.error("No Reward to Retrieve", "Error");
            return false;
        }
    }

    functionsToExport.balanceOf = async () => {
        // console.log(chibiCatsContract);
        // console.log(chibiVouchersAbi);
        const result = await chibiCatsContract.balanceOf(account);
        // console.log(result);
        return parseInt(result.toString());
    }
    functionsToExport.getDiscountOptions = async () => {
        const availableDiscounts = (await axiosInstance.get("discounts/")).data;
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        const signer = provider.getSigner();
        const chibiContract = new MultiContract(
            CHIBI_CAT_CONTRACT_ADDRESS,
            chibiCatsAbi
        );

        const ethcallProvider = new Provider(provider);
        let contracts = {};
        const balancesCalls = availableDiscounts.map((discount) => {
            contracts[discount.contractAddress] = new MultiContract(discount.contractAddress, chibiCatsAbi);
            return contracts[discount.contractAddress].balanceOf(account);
        })
        await ethcallProvider.init(); // Only required when `chainId` is not provided in the `Provider` constructor
        ethcallProvider._multicallAddress =
            MULTI_CALL_ADDRESS;

        const balances = (await ethcallProvider.all(balancesCalls))?.map(e => e.toString());
        const discountTokens = []
        const discountTokenIdCalls = []
        const tokenIdCalls = availableDiscounts.map((discount, index) => {
            for (let i = 0; i < balances[index]; i++) {
                discountTokens.push({ ...discount, tokenIndex: i, });
                // console.log(i);
                // console.log(account)
                discountTokenIdCalls.push(contracts[discount.contractAddress].tokenOfOwnerByIndex(account, i));
            }
        });
        // console.log(balances);
        // console.log(discountTokenIdCalls);
        const discountTokenIds = (await ethcallProvider.all(discountTokenIdCalls));
        // console.log(discountTokenIds)
        const isDiscountRetrievedCalls = discountTokenIds.map((e, index) => {
            e = e.toString();
            discountTokens[index].tokenId = e;
            return chibiContract.holderDiscountRetrieved(discountTokens[index].contractAddress, e);
        });
        const isDiscountRetrieved = (await ethcallProvider.all(isDiscountRetrievedCalls)).map((e, index) => {
            discountTokens[index].isUsed = e;
            return e
        })
        // console.log(discountTokenIds);
        // console.log(isDiscountRetrieved);

        const filterDiscountTokens = discountTokens.filter(e => !e.isUsed);
        return filterDiscountTokens;



    }
    functionsToExport.totalSupply = async () => {
        await setupContracts();
        const supply = await chibiCatsContract.totalSupply();
        return (parseInt(supply.toString()) - 200);
    }
    functionsToExport.getTotalTokens = async () => {
        await setupContracts();
        return parseInt((await chibiCatsContract.balanceOf(account)).toString())
    }
    functionsToExport.getOwnerTokenData = async (start = 0, end = 0) => {
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        const signer = provider.getSigner();

        const ethcallProvider = new Provider(provider);
        const contract2 = new MultiContract(
            CHIBI_CAT_CONTRACT_ADDRESS,
            chibiCatsAbi
        );
        await ethcallProvider.init(); // Only required when `chainId` is not provided in the `Provider` constructor
        ethcallProvider._multicallAddress =
            MULTI_CALL_ADDRESS;
        let [balance] = await ethcallProvider.all([contract2.balanceOf(account)]);
        // console.log(balance.toString())
        const calls = [];

        const newData = [];
        for (let i = 0; i < parseInt(balance.toString()); i++) {
            calls.push(contract2.tokenOfOwnerByIndex(account, i));
        }
        const data = await ethcallProvider.all(calls);

        data.map((data) => {
            newData.push(contract2.calculateReward(data.toString()));
        });
        const newResult = await ethcallProvider.all(newData);
        const finalResult = newResult.map((e, index) => {
            return ({
                tokenId: data[index].toString(),
                reward: e.toString(),
            })
        })
        // console.log(data);
        return (finalResult);
    }
    functionsToExport.getContractBalance = async () => {
        await setupContracts();
        const provider = new providers.JsonRpcProvider(RPC_URL);
        const balance = await provider.getBalance(CHIBI_CAT_CONTRACT_ADDRESS);
        const reflectiveAmount = await chibiCatsContract.reflectiveAmount();
        const availableBalance = balance.sub(reflectiveAmount);

        return ((availableBalance).toString());
    }
    functionsToExport.getDiscordToken = async () => {

        const signer = await library?.getSigner(0);
        console.log(await signer.getAddress())
        console.log(signer);
        const domain = {
            name: 'Chibi Cat Cafe',
            version: '1',
            chainId: CHAIN_ID,
            verifyingContract: CHIBI_CAT_CONTRACT_ADDRESS,
        };
        const type = {
            Message:
                [
                    { "name": "description", "type": "string" },
                    { "name": "nonce", "type": "string" },
                ]

        }
        const value = {
            descripton: "This is a verification message to sign in to discord. Please sign this to verify your wallet",
            nonce: `nonce-${~~((new Date()) / (1000 * 60 * 60 * 24))}`
        }
        console.log(value);
        const signature = await signer.signMessage(`This is a verification message to sign in to discord. Please sign this to verify your wallet.\nNonce: ${~~((new Date()) / (1000 * 60 * 60 * 24))}`)
        const resp = await axiosInstance.post(`authorize/discord/`, { signature, address: account })
        if (resp?.data?.id) {
            return resp?.data?.id;
        }
        else {
            return false;
        }


    }



    return (<Web3Context.Provider value={{ account, axiosInstance, BACKEND_URL, ...functionsToExport }}>
        {props.children}
    </Web3Context.Provider>)
}
export default Web3Context;