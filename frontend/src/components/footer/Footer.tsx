import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <Container>
                <Row className="footer-row">
                    <Col xs={12} md={4} className="footer-item">
                        <a href="https://github.com/SchulzEnrico" target="_blank">
                            <div className="svg-container">
                                <img
                                    title={"Overview on Github"}
                                    src="../src/assets/overview.svg"
                                    className={"logo overview"}
                                    alt="Overview Icon"
                                />
                            </div>
                        </a>
                    </Col>
                    <p>Overview</p>
                    <Col xs={12} md={4} className="footer-item">
                        <a href="https://github.com/SchulzEnrico?tab=repositories" target="_blank">
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
                    <p className={"gitGab"}>{'\u2666'}</p>
                    <Col xs={12} md={4} className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-" target="_blank">
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
                    <Col xs={12} md={4} className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-/issues" target="_blank">
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
                    <Col xs={12} md={4} className="footer-item">
                        <a href="https://github.com/SchulzEnrico/ESourc-es-/pulls" target="_blank">
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
                        <a href="https://github.com/SchulzEnrico/ESourc-es-/actions" target="_blank">
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
                    <Col xs={12} md={4} className="footer-item">
                        <a href="https://github.com/users/SchulzEnrico/projects/3" target="_blank">
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

export default Footer;
