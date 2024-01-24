import "../../css/Footer.css";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { GoBook, GoCode, GoGitPullRequest, GoIssueOpened, GoRepo, GoTable } from "react-icons/go";
import { PiPlayCircleLight } from "react-icons/pi";
import { ImGithub } from "react-icons/im";
import Clock from "../utilities/Clock.tsx";
import Timer from "../utilities/Timer.tsx";
import {SiMicrosoftbing, SiOpenai} from "react-icons/si";
import {RiBardLine} from "react-icons/ri";

const Footer = () => {
    const [open, setOpen] = useState(false);


    const toggleOpen = () => setOpen(prevOpen => !prevOpen);

    return (
        <footer>

            <div className={"clock-timer"}>
                <Clock/>
                <Timer/>
            </div>

            <div className={"google-ai"}>
                <a href="https://chat.openai.com/" target="_blank">
                    <button className={"footer-btn"} type="button">
                        <SiOpenai/>
                    </button>
                </a>

                <a href="https://bard.google.com/chat" target="_blank">
                    <button className={"footer-btn"} type="button">
                        <RiBardLine/>
                    </button>
                </a>
                <a href="https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx" target="_blank">
                    <button className={"footer-btn"} type="button">
                        <SiMicrosoftbing/>
                    </button>
                </a>
            </div>

            <Dropdown className="footer-item"
                      show={open}
                      onToggle={toggleOpen}>
                <Dropdown.Toggle
                    className={"footer-btn"}
                    variant="success"
                    id="dropdown-basic"
                    onClick={toggleOpen}>
                    <ImGithub/>
                </Dropdown.Toggle>
                <Dropdown.Menu className={"dropdown-container dc-github"}>
                    <Dropdown.Item href="https://github.com/SchulzEnrico"
                                   target="_blank">
                        <GoBook title={"Github Overview"} className={"footer-icon logo"}/>
                    </Dropdown.Item>
                    <Dropdown.Item href="https://github.com/SchulzEnrico?tab=repositories"
                                   target="_blank">
                        <GoRepo title={"Github Repositories"} className={"footer-icon logo"}/>
                    </Dropdown.Item>
                    <Dropdown.Item href="https://github.com/SchulzEnrico/ESourc-es-"
                                   target="_blank">
                        <GoCode title={"Github Code"} className={"footer-icon logo"}/>
                    </Dropdown.Item>
                    <Dropdown.Item href="https://github.com/SchulzEnrico/ESourc-es-/issues"
                                   target="_blank">
                        <GoIssueOpened title={"Github Issues"} className={"footer-icon logo"}/>
                    </Dropdown.Item>
                    <Dropdown.Item href="https://github.com/SchulzEnrico/ESourc-es-/pulls"
                                   target="_blank">
                        <GoGitPullRequest title={"Github Pull Request"} className={"footer-icon logo"}/>
                    </Dropdown.Item>
                    <Dropdown.Item href="https://github.com/SchulzEnrico/ESourc-es-/actions"
                                   target="_blank">
                        <PiPlayCircleLight title={"Github Actions"} className={"footer-icon logo"}/>
                    </Dropdown.Item>
                    <Dropdown.Item href="https://github.com/users/SchulzEnrico/projects/3"
                                   target="_blank">
                        <GoTable title={"Github Projects"} className={"footer-icon logo"}/>
                    </Dropdown.Item>

                </Dropdown.Menu>

            </Dropdown>
        </footer>
    );
}

export default Footer;