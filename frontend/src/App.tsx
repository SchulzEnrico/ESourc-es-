import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Container, Row } from 'react-bootstrap';

function App() {
    return (
        <Container fluid>
            <Header />
            <Row className="justify-content-center">
            </Row>
            <Footer />
        </Container>
    );
}

export default App;
