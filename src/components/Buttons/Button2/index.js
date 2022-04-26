import React from "react";
import "./style.css"
const Button2 = ({ children, onClick, className = "" }) => {
    return (<>
        <div class="wrapper">
            <div onClick={onClick} className={`btn-2 cursor-pointer ${className}`}><span className="py-6 px-8 text-lg">{children}</span></div>
        </div>
    </>);
}
export default Button2