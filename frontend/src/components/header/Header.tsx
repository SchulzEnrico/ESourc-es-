import Navigation from "../nav/Navigation.tsx";
import "../../css/Header.css";
import {HeaderProps} from '../types/types.ts';
import React, {useState} from "react";
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
            <div id={"heading"}>
                <h1 className={"modal-{sm}"}><span className={"h1-letters"}>Sourc</span><span className={"header-brackets"}>(</span><span className={"h1-letters"}>és</span><span className={"header-brackets"}>)</span></h1>
            </div>
            <form id={"google-search"}
                  onSubmit={handleSearchSubmit}>
                <input className={"search-input shadow--inset"}
                       type="text"
                       value={searchText}
                       onChange={handleSearchChange}
                       placeholder="Google search..."
                />
                <button data-tooltip={"Search on Google"}
                        className={"footer-btn google-btn tooltip-btn tt_w"}
                        type="submit">
                    <FcGoogle id={"google-icon"}/>
                </button>
            </form>
            <div data-bs-theme={"dark"}>

                <Navigation isExternal={true}
                            showModal={showNavigationModal}
                            closeModal={() => setShowNavigationModal(false)}/>
            </div>
        </header>
    );
}

export default Header;