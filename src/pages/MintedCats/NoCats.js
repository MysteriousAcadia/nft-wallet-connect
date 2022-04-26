
import Button2 from "components/Buttons/Button2/index";
import React from "react"
import Cat from "assets/cafe_owner_cat_alpha.png";
import { useNavigate } from "react-router-dom";
const NoCats = ({ title }) => {
    const navigate = useNavigate();
    return (<div className="py-16">
        <img className="py-8 mx-auto" style={{ width: "400px" }} src={Cat} />
        <div className="mx-auto text-2xl font-semibold text-center"> {title || "You have no cats......yet."}<br />
        </div>
        {!title && <Button2 onClick={() => navigate("/mint")} className="btn-2-blue w-64 mx-auto my-16">Mint Cats Now</Button2>}

    </div>
    );
}
export default NoCats