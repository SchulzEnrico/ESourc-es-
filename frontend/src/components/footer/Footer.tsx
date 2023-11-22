import "./Footer.css";

function Footer() {

    return (
        <footer>
            <div id={"on-github"}>
                <p>
                    Click one of the logos to see code, project and issues on Github...
                </p>
                <a href="https://github.com/SchulzEnrico/ESourc-es-" target="_blank">
                    <img title={"Code on Github"} src="../src/assets/github.png" className={"logo"} alt="Github icon" />
                </a>
                <a href="https://github.com/users/SchulzEnrico/projects/3" target="_blank">
                    <img title={"Project on Github"} src="../src/assets/compass-invert.svg" className={"logo"} alt="Compass icon" />
                </a>
                <a href="https://github.com/SchulzEnrico/ESourc-es-/issues" target="_blank">
                    <img title={"Issues on Github"} id={"chuck"} src="../src/assets/base_chuck.svg" className={"logo"} alt="Shoe icon" />
                </a>
            </div>
        </footer>
    )
}

export default Footer