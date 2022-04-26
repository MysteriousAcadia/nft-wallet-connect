import React from "react"
import Cat from "assets/cafe_owner_cat_alpha.png";
import { CameraIcon } from '@heroicons/react/solid'

export default function Example() {
    return (
        <div className="bg-white overflow-hidden">
            <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">


                <div className="mt-8 lg:flex lg:justify-between lg:items-center">

                    <div data-aos="fade-right" className=" lg:mt-0 lg:max-w-xl">
                        <div>
                            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                How Rare is my Cat?
                            </h3>
                        </div>
                        <div className="mt-8 text-base max-w-prose mx-auto lg:max-w-none">
                            <p className="text-lg text-gray-500">
                                Always remember that your cat is unique and awesome in it’s own way. As a collectible, the rarity of a Cat can depend on a lot of factors. Usually “Rare” traits give rise to rare cats, but some cats can also have a specific combination of common traits that together makes it more rare.
                            </p>
                        </div>
                        <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                            <p>
                                You can check rarity of your cat by clicking “Rarity” in the main menu bar at the top, or by clicking the the “Ultra Rare” text below the Cafe Owner Cat’s Image.
                            </p>

                        </div>
                    </div>
                    <img data-aos="fade-left" className="w-96" src={Cat} />
                </div>
            </div>
        </div>
    )
}