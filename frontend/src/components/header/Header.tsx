import Navigation from "../nav/Navigation.tsx";
import "../../css/Header.css";
import {HeaderProps} from '../types/types.ts';
import React, {useState} from "react";
import DashboardIcon from "../svg/DashboardIcon.tsx";
import { Button } from "react-bootstrap";
import { TiThMenu } from "react-icons/ti";
import {FaSearch} from "react-icons/fa";

const Header: React.FC<HeaderProps> = () => {
    const [showNavigationModal, setShowNavigationModal] = useState(false);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchText)}`, '_blank');
    };

    return (
        <header>
            <div id={"heading"} className={"align-items-baseline"}>
                <DashboardIcon className={"dashboard-icon-header"}/>
                <h1 className={"modal-{sm}"}>Sourc(es)</h1>
            </div>
            <form onSubmit={handleSearchSubmit}>
                <input className={"search-input shadow--sunken"}
                       type="text"
                       value={searchText}
                       onChange={handleSearchChange}
                       placeholder="Google search..."
                />
                <button className={"footer-btn"} type="submit">
                    <FaSearch className={"search-icon"}/>
                </button>
            </form>
            <Button
                className={"external-links-btn"}
                onClick={() => setShowNavigationModal(true)}
            >
                <TiThMenu/>
            </Button>
            <div data-bs-theme={"dark"}>
                <Navigation isExternal={true} showModal={showNavigationModal}
                            closeModal={() => setShowNavigationModal(false)}/>
            </div>
        </header>
    );
}

export default Header;