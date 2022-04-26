import React from "react";
import "./cardBanner.css";
const CardBanner = ({ }) => {
    return (<>
        <div className="w-full py-24  bg-white text-white">
            <div class="container mx-auto md:flex justify-between">
                <div data-aos="fade-left" class="card blue">
                    <h1 className="text-4xl font-extrabold h-20">What are Chibi Cats?</h1>
                    <p className="text-lg mt-4 overflow-auto">Chibi Cats is a curated blockchain collectible with a total of 1,000 unique cats of different rarity. Each cat has some specific features that make it one of a kind and gives it a personality of its own. </p>

                </div>
                <div data-aos="zoom-in" class="card purple">
                    <h1 className="text-4xl font-extrabold h-20">Why adopt Chibi Cats?</h1>
                    <p className="text-lg mt-4 overflow-auto">Chibi Cats are not only adorable themselves but they also make for fantastic display pictures for all kinds of profiles. These cats are meant to be collected and serve as a medium for Chibi Cat loving people to connect. Chibi Cats will always be a community driven project.</p>

                </div>
                <div data-aos="fade-right" class="card pink">
                    <h1 className="text-4xl font-extrabold h-20">When to collect Chibi Cats?</h1>
                    <p className="text-lg mt-4 overflow-auto">Any time is a perfect time to adopt a cute little Chibi Cat! 50 new unique Cats are launched everytime the previous batch sells out for a total of 20 times.<br />Remember, every cat is curated by hand and is one of a kind.</p>

                </div>
            </div>
        </div>
    </>);
}
export default CardBanner