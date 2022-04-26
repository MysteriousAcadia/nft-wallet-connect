import React, { useContext, useEffect, useState } from "react";
import Navbar from "components/Navbar/index";
import LandingSection from "./LandingSection";



const AuthorizeDiscord = ({ }) => {

    return (<>
        <div className="mycats-background">
            <Navbar transparent={true} />
            <LandingSection />


        </div>
        {/* <Loading /> */}

    </>);
}
export default AuthorizeDiscord