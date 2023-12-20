import "../../css/Footer.css";
import {Col, Container, Row} from "react-bootstrap";
import React, {useState} from "react";
import Clock from "../utilities/Clock.tsx";
import {GoBook, GoCode, GoGitPullRequest, GoIssueOpened, GoRepo, GoTable} from "react-icons/go";
import {FaSearch} from "react-icons/fa";
import {PiPlayCircleLight} from "react-icons/pi";


const Footer = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchText)}`, '_blank');
    };

    return (
        <footer>
            <Clock />
            <form onSubmit={handleSearchSubmit}>
                <input className={"search-input shadow--sunken"} type="text" value={searchText} onChange={handleSearchChange} placeholder="Google search..." />
                <button className={"search-google-btn"} type="submit">
                    <FaSearch className={"search-icon"}/>
                </button>
            </form>
            <Container>
                <Row className="footer-row">
                    <Col className="footer-item">
                        <a href="https://github.com/SchulzEnrico" target="_blank" rel="noopener noreferrer">
                            <GoBook title={"Github Overview"} className={"footer-icon logo"} />
                        </a>
                    </Col>
                    <Col className="footer-item">
                        <a href="https://github.com/SchulzEnrico?tab=repositories" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <GoRepo title={"Github Repositories"} className={"footer-icon logo"} />
                            </div>
                        </a>
                    </Col>
                    <Col className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <GoCode title={"Github Code"} className={"footer-icon logo"} />
                            </div>
                        </a>
                    </Col>
                    <Col className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-/issues" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <GoIssueOpened title={"Github Issues"} className={"footer-icon logo"} />
                            </div>
                        </a>
                    </Col>
                    <Col className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-/pulls" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <GoGitPullRequest title={"Github Pull Request"} className={"footer-icon logo"} />
                            </div>
                        </a>
                    </Col>
                    <Col xs={12} md={4} className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-/actions" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <PiPlayCircleLight title={"Github Actions"} className={"footer-icon logo"} />
                            </div>
                        </a>
                    </Col>
                    <Col className="footer-item">
                        <a href="https://github.com/users/SchulzEnrico/projects/3" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <GoTable title={"Github Projects"} className={"footer-icon logo"} />
                            </div>
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer