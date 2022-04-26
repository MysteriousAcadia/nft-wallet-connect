import React from "react"
import "./additionalFeatures.css";
const AdditionalFeatures = ({ }) => {
    return (<div class="bg-white">
        <h3 data-aos="fade-up" className="pt-32 pb-16 text-3xl w-full text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Additional Features
        </h3>
        <div class="roadmap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-aos="fade-right" class="point">
                <div class="point-index text-3xl">I</div>
                <div class="point-label font-bold text-xl">Dust system</div>
                <div class="point-text">1. Earn cat dust from different activities and combine dust to mint a free "Chibi Dust Cat"<br />
                    2. Chibi Dust Cats can later be used to earn ONE coins passively</div>
            </div>
            <div data-aos="fade-left" class="point">
                <div class="point-index">II</div>
                <div class="point-label">Game Arena</div>
                <div class="point-text">1. Mini game arcades (winning awards cat dust)<br />
                    2. Multiplayer arcades (winning awards cat dust and ONE coins)<br />
                    3. Tournaments (winning awards lots of cat dust and ONE coins)<br />
                    4. Stake cats as npc to earn ONE coins (amount depends on wins)</div>
            </div>
            <div data-aos="fade-right" class="point">
                <div class="point-index">III</div>
                <div class="point-label">Virtual Cafe</div>
                <div class="point-text">1. Buy virtual beverages to earn chibi cat dust and real life beverage vouchers<br />
                    2. Stake cats as seller staff to earn ONE Coins (amount depends on the sale)
                </div>
            </div>
            <div data-aos="fade-left" class="point">
                <div class="point-index">IV</div>
                <div class="point-label"> Merch Store</div>
                <div class="point-text">1. Buy merch and earn lots of chibi cat dust<br />
                    2. Stake cats as seller staff to earn ONE Coins (amount depends on the sale)</div>
            </div>

        </div>
    </div>);
}
export default AdditionalFeatures