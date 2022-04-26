import React from "react"
import "./roadmapStyle.css";
const Roadmap = ({ }) => {
    return (<div class="bg-white">
        <h3 data-aos="fade-up" className="pt-8 pb-16 text-3xl w-full text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Roadmap
        </h3>
        <div class="timeline mt-4">

            <div data-aos="fade-left" class="timeline__content">
                <span class="content_date">Cat #1 - #2222</span>
                <p class="content_p">
                    <ul style={{ "listStyle": "disc" }}>
                        <li>7% of price of each cat minted will be distributed equally to every Harmony chibi cat holder (at the time of minting)</li>
                        <li>5 random lucky cats between #1 - #2222 win 1000 ONE (harmony) each</li>
                    </ul>
                </p>


            </div>

            <div data-aos="fade-right" class="timeline__content">
                <span class="content_date">Cat #2223 - #4444</span>
                <p class="content_p">
                    <ul style={{ "listStyle": "disc" }}>
                        <li>10% of price of each cat minted will be distributed equally to every Harmony chibi cat holder (at the time of minting)</li>
                        <li>after #4444 cat is minted, 10% of price of each cat (#4445 - #8888) will de distributed to the holders of cat #1 - #4444 (at the time minting)</li>
                        <li>5 random lucky cats between #2223 - #4444 win 1000 ONE (harmony) each</li>
                    </ul>
                </p>
                {/* <a href="#" class="content_link">
                    Read more
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.78413 5.49505L1.25827 9.79476C0.970375 10.0684 0.503596 10.0684 0.215837 9.79476C-0.0719456 9.52135 -0.0719456 9.0779 0.215837 8.80451L4.22052 4.99993L0.215953 1.19548C-0.0718292 0.921955 -0.0718292 0.478552 0.215953 0.205141C0.503736 -0.0683804 0.970491 -0.0683804 1.25839 0.205141L5.78424 4.50492C5.92814 4.64169 6 4.82075 6 4.99991C6 5.17915 5.928 5.35835 5.78413 5.49505Z" fill="#1F1F1F" />
                    </svg>

                </a> */}
            </div>

            <div data-aos="fade-left" class="timeline__content">
                <span class="content_date">Cat #4445 - #6666</span>
                <ul style={{ "listStyle": "disc" }}>
                    <li>After cat #5555 is minted, setting up the secondary marketplace will begin</li>
                    <li>5 random lucky cats between #4445 - #6666 win 1000 ONE (harmony) each</li>
                </ul>
                <p class="content_p"> </p>
                {/* <a href="#" class="content_link">
                    View on GitHub
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.78413 5.49505L1.25827 9.79476C0.970375 10.0684 0.503596 10.0684 0.215837 9.79476C-0.0719456 9.52135 -0.0719456 9.0779 0.215837 8.80451L4.22052 4.99993L0.215953 1.19548C-0.0718292 0.921955 -0.0718292 0.478552 0.215953 0.205141C0.503736 -0.0683804 0.970491 -0.0683804 1.25839 0.205141L5.78424 4.50492C5.92814 4.64169 6 4.82075 6 4.99991C6 5.17915 5.928 5.35835 5.78413 5.49505Z" fill="#1F1F1F" />
                    </svg>

                </a> */}
            </div>

            <div data-aos="fade-right" class="timeline__content">
                <span class="content_date">Cat #6667 - #8888</span>
                <p class="content_p">
                    <ul style={{ "listStyle": "disc" }}>

                        <li> 5 random lucky cats between #6667 - #8888 win 1000 ONE (harmony) each</li>
                    </ul>
                </p>

                {/* <a href="#" class="content_link">
                    View Profile
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.78413 5.49505L1.25827 9.79476C0.970375 10.0684 0.503596 10.0684 0.215837 9.79476C-0.0719456 9.52135 -0.0719456 9.0779 0.215837 8.80451L4.22052 4.99993L0.215953 1.19548C-0.0718292 0.921955 -0.0718292 0.478552 0.215953 0.205141C0.503736 -0.0683804 0.970491 -0.0683804 1.25839 0.205141L5.78424 4.50492C5.92814 4.64169 6 4.82075 6 4.99991C6 5.17915 5.928 5.35835 5.78413 5.49505Z" fill="#1F1F1F" />
                    </svg>

                </a> */}
            </div>

        </div>
    </div >);
}
export default Roadmap