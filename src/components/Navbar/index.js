import React from 'react'
import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, CreditCardIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Logo from "assets/logo_text_1.png";
import Button1 from 'components/Buttons/Button1/index';
import Web3Context from 'contexts/Web3Context';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Link } from "react-router-dom";
import NftKey from "assets/nftkey.png"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({ transparent }) {
    const { onClickMetamask, account } = useContext(Web3Context);



    return (
        <Disclosure as="nav" style={{ backgroundColor: transparent ? "rgba(0,0,0,0.45)" : "rgba(2,69,133,1)" }} className=" shadow font-bold uppercase">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-24">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <Link to="/">
                                        <img className='h-24' src={Logo} />
                                    </Link>
                                </div>

                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <div className="hidden sm:mr-6 sm:flex sm:space-x-8 text-white">
                                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                    <Link
                                        to="/"
                                        className="  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Home
                                    </Link>

                                    <Link
                                        to="/jointhecafe"
                                        className="border-transparent  hover:border-gray-300  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Join the Cafe
                                    </Link>
                                    <Link
                                        to="/mint"
                                        className="border-transparent  hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Collect a Cat!
                                    </Link>
                                    <a
                                        target="_blank"
                                        href="https://discord.gg/D4pZ66j2av"
                                        className="border-transparent cursor-pointer  hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-discord mr-2 text-white" viewBox="0 0 16 16">
                                            <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                                        </svg>
                                        Join Discord
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://nftkey.app/collections/chibicats/"
                                        className="border-transparent cursor-pointer  hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        <img src={NftKey} className='h-8 w-8 rounded-full mr-1' /> View on NFTKey
                                    </a>


                                    {account ? <Link
                                        to="/mycats"
                                        className="border-transparent  hover:border-gray-300  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        My Cats
                                    </Link>
                                        : <></>}
                                </div>

                                {/* Profile dropdown */}
                                {account ? <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Link to="/mycats">
                                            <Menu.Button className=" bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="sr-only">Open user menu</span>
                                                <Jazzicon diameter={50} seed={jsNumberForAddress(account)} />

                                            </Menu.Button>
                                        </Link>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md z-50 shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div
                                                        href="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Address<br />
                                                        <span className='text-xs'>{account.slice(0, 5)}...{account.slice(-4)}</span>
                                                    </div>
                                                )}
                                            </Menu.Item>
                                            {/* <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Disconnect
                                                    </a>
                                                )}
                                            </Menu.Item> */}

                                        </Menu.Items>
                                    </Transition>
                                </Menu> : <Button1
                                    onClick={() => onClickMetamask()}

                                    Icon={CreditCardIcon}
                                ><div className="text-sm">
                                        Connect Wallet
                                    </div>
                                </Button1>}


                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-8 w-8" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-8 w-8" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="pt-2 pb-3 mx-auto space-y-1">
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                            <Disclosure.Button
                                as="a"
                                className="  text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                <Link to="/">
                                    Home
                                </Link>
                            </Disclosure.Button>

                            <Disclosure.Button
                                as="a"
                                className="border-transparent text-gray-100 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                <Link to="/jointhecafe">
                                    Join the Cafe
                                </Link>
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                className="border-transparent text-gray-100 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                <Link to="/mint">

                                    Collect a cat!
                                </Link>
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="https://discord.gg/D4pZ66j2av"
                                target="_blank"
                                className="border-transparent flex text-gray-100 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700  pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-discord mr-2 text-white" viewBox="0 0 16 16">
                                    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                                </svg>
                                Join Discord
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="https://nftkey.app/collections/chibicats/"
                                target="_blank"

                                className="border-transparent flex text-gray-100 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700  pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                <img src={NftKey} className='h-8 w-8 rounded-full mr-1' /> View on NFTKey
                            </Disclosure.Button>

                            {account &&
                                <Disclosure.Button
                                    as="a"
                                    className="border-transparent text-gray-100 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                >
                                    <Link to="/mycats">

                                        My Cats
                                    </Link>
                                </Disclosure.Button>
                            }
                            {account ? <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className=" bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="sr-only">Open user menu</span>
                                        <Jazzicon diameter={50} seed={jsNumberForAddress(account)} />

                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    <Link
                                                        to="/mycats">
                                                        Your Address<br />
                                                        <span className='text-xs'>{account.slice(0, 5)}...{account.slice(-4)}</span>
                                                    </Link>
                                                </div>
                                            )}
                                        </Menu.Item>
                                        {/* <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Disconnect
                                                </a>
                                            )}
                                        </Menu.Item> */}

                                    </Menu.Items>
                                </Transition>
                            </Menu> : <Button1
                                onClick={() => onClickMetamask()}

                                Icon={CreditCardIcon}
                            ><div className="text-sm">
                                    Connect Wallet
                                </div>
                            </Button1>}

                        </div>

                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}