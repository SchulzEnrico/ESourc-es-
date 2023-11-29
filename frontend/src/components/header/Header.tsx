import "./Header.css";
import HeaderNavbar from "../nav/HeaderNavbar.tsx";
import GetMore from "./GetMore.tsx";
import {ButtonGroup, DropdownButton} from "react-bootstrap";

function Header() {

    return (
        <header>
            <div id={"heading"} className={"align-items-baseline"}>
                <img alt={"Dashboard Icon"} id={"dash-icon-header"} src="../src/assets/dash-red-192x192.png" />
                <h1 className={"modal-{sm}"}>Sourc(es)</h1>
            </div>
            <div data-bs-theme={"dark"} className={"d-flex justify-content-between"}>
                    <HeaderNavbar />
                <DropdownButton variant={"outline-danger text-light"} drop={"start"} as={ButtonGroup} title="get more" id="bg-nested-dropdown">
                    <GetMore />
                </DropdownButton>
            </div>
        </header>
    )
}

export default Header