import React from "react";
import "./style.css"
import { InformationCircleIcon } from "@heroicons/react/outline"
const Button3 = ({ children, onClick = () => { }, Icon = InformationCircleIcon, className, ...props }) => {
    return (<>
        <button
            className={`btn-3 fifth cursor-pointer ${className}`}
            onClick={(e) => onClick(e)}
            {...props}
        >
            {children}
        </button>
    </>);
}
export default Button3