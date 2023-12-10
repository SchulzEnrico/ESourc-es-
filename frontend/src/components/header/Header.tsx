import Navigation from "../nav/Navigation.tsx";
import "./Header.css";

function Header() {

    return (
        <header>
            <div id={"heading"} className={"align-items-baseline"}>
                <img alt={"Dashboard Icon"} id={"dash-icon-header"} src="../src/assets/dashboard.svg"/>
                <h1 className={"modal-{sm}"}>Sourc(es)</h1>
            </div>
            <div data-bs-theme={"dark"}>
                <Navigation isExternal={true} />
            </div>
        </header>
    );
}

export default Header;