import React from "react";
import "./style.css"
import { InformationCircleIcon } from "@heroicons/react/outline"
const Button4 = ({ children, onClick = () => { }, Icon = InformationCircleIcon, className, ...props }) => {
    return (<div className="button-4">
        <button class={` ${className} radius`}>
            <svg class="icon-arrow after" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 403.8 200.3" style="enable-background:new 0 0 403.8 200.3;" xml:space="preserve">
                <style type="text/css">
                    .st0 {
                        fill: #E5EFF5;
          }
                </style>
                <g>
                    <g>
                        <path class="st0" d="M25.2,114.3h317.3L290,166.6c-5.9,5.8-5.9,15.3-0.1,21.2c5.8,5.9,15.3,5.9,21.2,0.1l78.3-77.9c0,0,0,0,0,0
               c5.9-5.8,5.9-15.4,0-21.2c0,0,0,0,0,0l-78.3-77.9c-5.9-5.8-15.4-5.8-21.2,0.1c-5.8,5.9-5.8,15.4,0.1,21.2l52.6,52.3H25.2
               c-8.3,0-15,6.7-15,15C10.2,107.6,16.9,114.3,25.2,114.3z" />
                    </g>
                </g>
            </svg>
            <span>Sign Up</span>
        </button>
        <button
            className={ }
            onClick={(e) => onClick(e)}
            {...props}
        >
            {children}
        </button>
    </div>);
}
export default Button4