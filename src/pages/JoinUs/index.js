import React from "react";
import Navbar from "components/Navbar/index";
import JoinCafe from "./JoinCafe";
import LandingSection from "./LandingSection";

const JoinUs = ({ }) => {
    return (<>
        <div className="join-background">
            <Navbar transparent={true} />
            <LandingSection />

            <JoinCafe />
        </div>
    </>);
}
export default JoinUs