import Navigation from "../nav/Navigation.tsx";
import "../../css/Header.css";
import {HeaderProps} from '../types/types.ts';
import React, {useState} from "react";
import { Button } from "react-bootstrap";
import {BsBookmarksFill} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";

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
                <h1 className={"modal-{sm}"}>Sourc(es)</h1>
            </div>
            <form id={"google-search"} onSubmit={handleSearchSubmit}>
                <button title={"Search on Google"} className={"footer-btn google-btn"} type="submit">
                    <FcGoogle id={"google-icon"}/>
                </button>
                <input className={"search-input shadow--inset"}
                       type="text"
                       value={searchText}
                       onChange={handleSearchChange}
                       placeholder="Google search..."
                />
            </form>
            <Button
                className={"external-links-btn"}
                title={"External bookmarks"}
                onClick={() => setShowNavigationModal(true)}
            >
                <BsBookmarksFill />
            </Button >
            <div data-bs-theme={"dark"}>
                <Navigation isExternal={true} showModal={showNavigationModal}
                            closeModal={() => setShowNavigationModal(false)}/>
            </div>
        </header>
    );
}

export default Header;