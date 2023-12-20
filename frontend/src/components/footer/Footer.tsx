import "./Footer.css";
import {Col, Container, Row} from "react-bootstrap";
import React, {useState} from "react";
import Clock from "../utilities/Clock.tsx";


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
                <button className={"search-google-btn"} type="submit">Search</button>
            </form>
            <Container>
                <Row className="footer-row">
                    <Col className="footer-item">
                        <a href="https://github.com/SchulzEnrico" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <img
                                    title={"Overview on Github"}
                                    src="../../assets/overview.svg"
                                    className={"logo overview"}
                                    alt="Overview Icon"
                                />
                            </div>
                        </a>
                    </Col>
                    <p>Overview</p>
                    <Col className="footer-item">
                        <a href="https://github.com/SchulzEnrico?tab=repositories" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <img
                                    title={"Repositories on Github"}
                                    src="../src/assets/repositories.svg"
                                    className={"logo repositories"}
                                    alt="Repositories Icon"
                                />
                            </div>
                        </a>
                    </Col>
                    <p>Repositories</p>
                    <Col className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <img
                                    title={"Code on Github"}
                                    src="../src/assets/code.svg"
                                    className={"logo code"}
                                    alt="Code Icon"
                                />
                            </div>
                        </a>
                    </Col>
                    <p>Code</p>
                    <Col className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-/issues" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <img
                                    title={"Issues on Github"}
                                    src="../src/assets/issues.svg"
                                    className={"logo issues"}
                                    alt="Issues Icon"
                                />
                            </div>
                        </a>
                    </Col>
                    <p>Issues</p>
                    <Col className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-/pulls" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <img
                                    title={"Pull request on Github"}
                                    src="../src/assets/pullRequests.svg"
                                    className={"logo pullRequests"}
                                    alt="Pull request Icon"
                                />
                            </div>
                        </a>
                    </Col>
                    <p>Pull request</p>
                    <Col xs={12} md={4} className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-/actions" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <img
                                    title={"Actions on Github"}
                                    src="../src/assets/actions.svg"
                                    className={"logo actions"}
                                    alt="Actions Icon"
                                />
                            </div>
                        </a>
                    </Col>
                    <p>Actions</p>
                    <Col className="footer-item">
                        <a href="https://github.com/users/SchulzEnrico/projects/3" target="_blank" rel="noopener noreferrer">
                            <div className="svg-container">
                                <img
                                    title={"Project on Github"}
                                    src="../src/assets/projects.svg"
                                    className={"logo projects"}
                                    alt="Projects Icon"
                                />
                            </div>
                        </a>
                    </Col>
                    <p>Projects</p>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer