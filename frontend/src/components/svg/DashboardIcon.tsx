import React from "react";
import {DashboardIconProps} from "../types/types.ts";

const DashboardIcon: React.FC<DashboardIconProps> = (props) => {
    const { className } = props;

    return (
        <svg version="1.2"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512 512"
             width="40"
             height="40"
             className={className}>
                <defs>
                    <image width="512" height="512" id="img1"
                           href="data:image/png;base64,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"/>
                </defs>
            <use id="Background" href="#img1" x="0" y="0"/>
        </svg>
    )
}

export default DashboardIcon