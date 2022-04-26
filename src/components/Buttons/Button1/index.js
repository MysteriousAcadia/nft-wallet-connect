import React from "react";
import "./style.css"
import { InformationCircleIcon } from "@heroicons/react/outline"
const Button1 = ({ children, onClick = () => { }, Icon = InformationCircleIcon, className, ...props }) => {
    return (<>
        <button
            className={`btn cursor-pointer btn-1 btn-sep icon-info flex items-center ${className}`}
            onClick={(e) => {
                // console.log("Click");
                onClick(e)
            }}
            {...props}
        >
            <div style={{ backgroundColor: "rgba(0,0,0,0.15)" }} className=" px-3 py-4 ">
                <Icon className="h-6 text-white opacity-100" />
            </div>
            <div className="py-3 px-4">
                {children}
            </div>
        </button>
    </>);
}
export default Button1