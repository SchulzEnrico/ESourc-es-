import Navigation from "../nav/Navigation.tsx";
import "../../css/Header.css";
import Timer from "../utilities/Timer.tsx";
import {HeaderProps} from '../types/types.ts';
import React, {useState} from "react";
import DashboardIcon from "../svg/DashboardIcon.tsx";
import { Button } from "react-bootstrap";

const Header: React.FC<HeaderProps> = () => {
    const [showNavigationModal, setShowNavigationModal] = useState(false); // <--- Den State hier definieren

    return (
        <header>
            <div id={"heading"} className={"align-items-baseline"}>
                <DashboardIcon className={"dashboard-icon-header"} />
                <h1 className={"modal-{sm}"}>Sourc(es)</h1>
            </div>
            <Timer />
            <Button
                onClick={() => setShowNavigationModal(true)} // <--- Das showModal aktualisieren
            >
                Open navigation
            </Button>
            <div data-bs-theme={"dark"}>
                {/* Der showModal State muss auch an das Navigation Komponenten übergeben werden */}
                <Navigation isExternal={true} showModal={showNavigationModal} closeModal={() => setShowNavigationModal(false)} />
            </div>
        </header>
    );
}

export default Header;