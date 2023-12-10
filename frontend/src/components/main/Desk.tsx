import './DeskGrid.css';
import './DeskStyles.css'
import { Container, Row, Col } from 'react-bootstrap';
import Panel from "./Panel.tsx";

function Desk() {
    return (
        <Container className="esources-desk">
            <Row className="garage">
                <Col className="ins_pro panel shadow--raised">
                    <Panel className="ins_pro" />
                </Col>
                <Col className="snip_gen panel shadow--raised">
                    <Panel className="snip_gen" />
                </Col>
            </Row>
            <Row className="workstation">
                <Col className="development panel shadow--raised">
                    <Panel className="development" />
                </Col>
            </Row>
            <Row className="library">
                <Col className="know_guide panel shadow--raised">
                    <Panel className="know_guide" />
                </Col>
                <Col className="lip_doc panel shadow--raised">
                    <Panel className="lip_doc" />
                </Col>
            </Row>
            <Row className="managements">
                <Col className="project panel shadow--raised">
                    <Panel className="project" />
                </Col>
                <Col className="personal panel shadow--raised">
                    <Panel className="personal" />
                </Col>
            </Row>
        </Container>
    );
}

export default Desk;