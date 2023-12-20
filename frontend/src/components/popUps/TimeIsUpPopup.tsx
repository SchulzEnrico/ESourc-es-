import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface TimeIsUpPopupProps {
    onClose: () => void;
}

const TimeIsUpPopup: React.FC<TimeIsUpPopupProps> = ({ onClose }) => (
    <Modal className="timer-popup" show={true} onHide={onClose}>
    <Modal.Body>
        <h2>Time's up!</h2>
<Button onClick={onClose}>Close</Button>
    </Modal.Body>
    </Modal>
);

export default TimeIsUpPopup

