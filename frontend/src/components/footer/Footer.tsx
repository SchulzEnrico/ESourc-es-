import "../../css/Footer.css";
import {Dropdown, DropdownButton} from "react-bootstrap";
import { useState } from "react";
import { GoBook, GoCode, GoGitPullRequest, GoIssueOpened, GoRepo, GoTable } from "react-icons/go";
import {PiPlayCircleLight, PiStarFourDuotone} from "react-icons/pi";
import { ImGithub } from "react-icons/im";
import Clock from "../utilities/Clock.tsx";
import Timer from "../utilities/Timer.tsx";
import {SiMicrosoftbing, SiOpenai} from "react-icons/si";
import {MdGrain} from "react-icons/md";
import {TfiSharethis} from "react-icons/tfi";

const Footer = () => {
    const [open, setOpen] = useState(false);

    const handleCloseMenu = () => {
        setOpen(false);
    };

    return (
        <footer>

            <div className={"clock-timer"}>
                <Clock/>
                <Timer/>
            </div>

            <div className={"AI-area"}>
                <a href="https://chat.openai.com/" target="_blank">
                    <button data-tooltip={"ChatGPT 3.5 openAI"} className={"footer-btn tooltip-btn tt_n"} type="button">
                        <SiOpenai id={"openAI-icon"} title={"ChatGPT 3.5 openAI"}/>
                    </button>
                </a>
                <a href="https://www.blackbox.ai/" target="_blank">
                    <button data-tooltip={"BLACKBOX AI"} className={"footer-btn tooltip-btn tt_n"} type="button">
                        <MdGrain id={"blackbox-icon"} title={"BLACKBOX AI"}/>
                    </button>
                </a>
                <a href="https://gemini.google.com/app" target="_blank">
                    <button data-tooltip={"Gemeni"} className={"footer-btn tooltip-btn tt_n"} type="button">
                        <PiStarFourDuotone id={"gemini-icon"} title={"Bard Google"}/>
                    </button>
                </a>
                <a href="https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx"
                   target="_blank">
                    <button data-tooltip={"bing Copilot"} className={"footer-btn tooltip-btn tt_n"} type="button">
                        <SiMicrosoftbing id={"bing-icon"} title={"bing Copilot"}/>
                    </button>
                </a>
                <a href="https://www.deepl.com/de/write?utm_term=&utm_campaign=DE%7CSearch%7CC%7CWrite%7CDSA%7CGerman&utm_source=adwords&utm_medium=ppc&hsa_acc=1083354268&hsa_cam=20494065589&hsa_grp=152392033363&hsa_ad=671244402383&hsa_src=g&hsa_tgt=dsa-2215640289084&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAiAzc2tBhA6EiwArv-i6YylCoSXtOGxhB-n7BbCrUOs3JEfWKQxI8XBSrjUefNYjVZfRxmtmBoCs-YQAvD_BwE"
                   target="_blank">
                    <button data-tooltip={"DeepL Write"} className={"footer-btn tooltip-btn tt_n"} type="button">
                        <TfiSharethis id={"deepl-icon"} title={"DeepL Write"}/>
                    </button>
                </a>
            </div>

            <DropdownButton id={"github-dropdown"}
                            title={<ImGithub id={"github-icon"} />}
                            className="tooltip-btn tt_ne"
                            show={open}
                            onToggle={() => setOpen(!open)}>
                <div className={"dropdown-container"}>
                <Dropdown.Item
                    data-tooltip={"Github Overview"}
                    className={"tooltip-btn tt_n"}
                    href="https://github.com/SchulzEnrico"
                    target="_blank"
                    onClick={handleCloseMenu}>
                    <GoBook className={"github-icon logo"}/>
                </Dropdown.Item>
                <Dropdown.Item
                    data-tooltip={"Github Repositories"}
                    className={"tooltip-btn tt_n"}
                    href="https://github.com/SchulzEnrico?tab=repositories"
                    target="_blank"
                    onClick={handleCloseMenu}>
                    <GoRepo className={"github-icon logo"}/>
                </Dropdown.Item>
                <Dropdown.Item
                    data-tooltip={"Github Code"}
                    className={"tooltip-btn tt_n"}
                    href="https://github.com/SchulzEnrico/ESourc-es-"
                    target="_blank"
                    onClick={handleCloseMenu}>
                    <GoCode className={"github-icon logo"}/>
                </Dropdown.Item>
                <Dropdown.Item
                    data-tooltip={"Github Issues"}
                    className={"tooltip-btn tt_n"}
                    href="https://github.com/SchulzEnrico/ESourc-es-/issues"
                    target="_blank"
                    onClick={handleCloseMenu}>
                    <GoIssueOpened className={"github-icon logo"}/>
                </Dropdown.Item>
                <Dropdown.Item
                    data-tooltip={"Github Pull Requests"}
                    className={"tooltip-btn tt_n"}
                    href="https://github.com/SchulzEnrico/ESourc-es-/pulls"
                    target="_blank"
                    onClick={handleCloseMenu}>
                    <GoGitPullRequest className={"github-icon logo"}/>
                </Dropdown.Item>
                <Dropdown.Item
                    data-tooltip={"Github Actions"}
                    className={"tooltip-btn tt_n"}
                    href="https://github.com/SchulzEnrico/ESourc-es-/actions"
                    target="_blank"
                    onClick={handleCloseMenu}>
                    <PiPlayCircleLight className={"github-icon logo"}/>
                </Dropdown.Item>
                <Dropdown.Item
                    data-tooltip={"Github Projects"}
                    className={"tooltip-btn tt_n"}
                    href="https://github.com/users/SchulzEnrico/projects/3"
                    target="_blank"
                    onClick={handleCloseMenu}>
                    <GoTable className={"github-icon logo"}/>
                </Dropdown.Item>
                </div>
            </DropdownButton>
        </footer>
    );
}

export default Footer;