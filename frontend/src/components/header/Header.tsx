import HeaderNavbar from "../nav/HeaderNavbar";
import "./Header.css";

function Header() {

    return (
        <header>
            <div id="heading" >
                <img alt="Dashboard Icon" id="dash-icon-header" src="../src/assets/dashboard.svg" />
                <h1 className="modal-{sm}">Sourc(es)</h1>
            </div>
            <HeaderNavbar />
        </header>
    );
}

export default Header;
