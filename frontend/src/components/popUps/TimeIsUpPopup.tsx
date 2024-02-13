import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {IoClose} from "react-icons/io5";

interface TimeIsUpPopupProps {
    onClose: () => void;
}

const TimeIsUpPopup: React.FC<TimeIsUpPopupProps> = ({ onClose }) => (
    <Modal className="timer-popup dropdown-container" show={true} onHide={onClose}>
    <Modal.Body>
        <Button
            className={"close-button"}
            onClick={onClose}>
            <IoClose title={"close"} className={"close-icon"}/>
        </Button>
        <h2>Time's up!</h2>
    </Modal.Body>
    </Modal>
);

export default TimeIsUpPopup

