import Navigation from "../nav/Navigation.tsx";
import "../../css/Header.css";
import Timer from "../utilities/Timer.tsx";
import {HeaderProps} from '../types/types.ts';
import React from "react";
import DashboardIcon from "../svg/DashboardIcon.tsx";

const Header: React.FC<HeaderProps> = () => {

    return (
        <header>
            <div id={"heading"} className={"align-items-baseline"}>
                <DashboardIcon className={"dashboard-icon-header"} />
                <h1 className={"modal-{sm}"}>Sourc(es)</h1>
            </div>
            <Timer />
            <div data-bs-theme={"dark"}>
                <Navigation isExternal={true} />
            </div>
        </header>
    );
}

export default Header;