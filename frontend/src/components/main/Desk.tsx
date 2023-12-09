import './DeskGrid.css';
import './DeskStyles.css'
import { Container, Row, Col } from 'react-bootstrap';

function Desk() {
    return (
        <Container className="esources-desk">
            <Row className="garage">
                <Col className="ins_pro panel shadow--raised">
                    <Container className="panel-items-container">
                        <div className="iframe-bounding shadow--sunken">
                            <iframe></iframe>
                        </div>
                        <div className="panel-controls">sunken/controls</div>
                    </Container>
                </Col>
                <Col className="snip_gen panel shadow--raised">
                    <Container className="panel-items-container">
                        <div className="iframe-bounding shadow--sunken">
                            <iframe></iframe>
                        </div>
                        <div className="panel-controls">sunken/controls</div>
                    </Container>
                </Col>
            </Row>
            <Row className="workstation">
                <Col className="development panel shadow--raised">
                    <Container className="panel-items-container">
                        <div className="iframe-bounding shadow--sunken">
                            <iframe></iframe>
                        </div>
                        <div className="panel-controls">sunken/controls</div>
                    </Container>
                </Col>
            </Row>
            <Row className="library">
                <Col className="know_guide panel shadow--raised">
                    <Container className="panel-items-container">
                        <div className="iframe-bounding shadow--sunken">
                            <iframe></iframe>
                        </div>
                        <div className="panel-controls">sunken/controls</div>
                    </Container>
                </Col>
                <Col className="lip_doc panel shadow--raised">
                    <Container className="panel-items-container">
                        <div className="iframe-bounding shadow--sunken">
                            <iframe></iframe>
                        </div>
                        <div className="panel-controls">sunken/controls</div>
                    </Container>
                </Col>
            </Row>
            <Row className="managements">
                <Col className="project panel shadow--raised">
                    <Container className="panel-items-container">
                        <div className="iframe-bounding shadow--sunken">
                            <iframe></iframe>
                        </div>
                        <div className="panel-controls">sunken/controls</div>
                    </Container>
                </Col>
                <Col className="personal panel shadow--raised">
                    <Container className="panel-items-container">
                        <div className="iframe-bounding shadow--sunken">
                            <iframe></iframe>
                        </div>
                        <div className="panel-controls">sunken/controls</div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Desk;