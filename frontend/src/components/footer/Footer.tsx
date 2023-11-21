import "./Footer.css";

function Footer() {

    return (
        <footer>
            <div id={"on-github"}>
                <p>
                    Click one of the logos to see code, project and issues on Github...
                </p>
                <a href="https://github.com/SchulzEnrico/ESourc-es-" target="_blank">
                    <img title={"Code on Github"} src="../public/icons/github.png" className="logo" alt="View Code on Github" />
                </a>
                <a href="https://github.com/users/SchulzEnrico/projects/3" target="_blank">
                    <img title={"Project on Github"} src="../public/icons/compass-invert.png" className="logo" alt="Project on Github" />
                </a>
                <a href="https://github.com/SchulzEnrico/ESourc-es-/issues" target="_blank">
                    <img title={"Issues on Github"} id={"chuck"} src="../public/icons/base_chuck.svg" className="logo" alt="Issues on Github" />
                </a>
            </div>
        </footer>
    )
}

export default Footer