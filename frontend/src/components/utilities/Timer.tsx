import React, {useCallback, useEffect, useState} from 'react';
import {IoIosTimer} from 'react-icons/io';
import {Button, Modal} from 'react-bootstrap';
import {TfiControlPlay, TfiControlStop} from 'react-icons/tfi';
import {RxReset} from 'react-icons/rx';
import {IoClose} from 'react-icons/io5';
import TimeIsUpPopup from '../popUps/TimeIsUpPopup.tsx';

const Timer: React.FC = () => {
    const [showTimerModal, setShowTimerModal] = useState(false);
    const [customTime, setCustomTime] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [selectedTime, setSelectedTime] = useState(60);
    const [showTimeIsUpPopup, setShowTimeIsUpPopup] = useState(false);
    const intervalIdRef = React.useRef<number | undefined>(undefined);

    const timeOptions = [
        { label: "60 sec", value: 60 },
        { label: "90 sec", value: 90 },
        { label: "2 min", value: 120 },
        { label: "5 min", value: 300 },
        { label: "10 min", value: 600 },
        { label: "15 min", value: 900 },
        { label: "20 min", value: 1200 },
        { label: "25 min", value: 1500 },
        { label: "30 min", value: 1800 },
        { label: "45 min", value: 2700 },
        { label: "60 min", value: 3600 },
        { label: "90 min", value: 5400 },
        { label: "120 min", value: 7200 },
        { label: "180 min", value: 10800 },
        { label: "240 min", value: 14400 },
        { label: "300 min", value: 18000 },
    ];

    const handleTimerTick = useCallback(() => {
        setSeconds((prevSeconds) => {
            const newSeconds = prevSeconds + 1;

            if (newSeconds >= selectedTime) {
                setIsActive(false);
                setShowTimeIsUpPopup(true);
                clearInterval(intervalIdRef.current!);
                return 0;
            }

            return newSeconds;
        });
    }, [selectedTime]);

    const startInterval = useCallback(() => {
        intervalIdRef.current = window.setInterval(() => {
            handleTimerTick();
        }, 1000);
    }, [handleTimerTick]);

    useEffect(() => {
        if (isActive) {
            startInterval();
        } else {
            clearInterval(intervalIdRef.current);
        }
    }, [isActive, startInterval]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(Number(e.target.value));
    };

    const handleSetCustomTime = () => {
        setSelectedTime(Number(customTime));
        setCustomTime(0);
    };

    const handleCloseTimerModal = () => {
        setShowTimerModal(false);
        setShowTimeIsUpPopup(false);

    };

    const handleStartTimer = () => {
        setIsActive(true);
    };

    const handleStopTimer = () => {
        setIsActive(false);
        clearInterval(intervalIdRef.current);
    };

    const handleResetTimer = () => {
        setSeconds(0);
        clearInterval(intervalIdRef.current);
    };

    return (
        <div className={'timer'}>
            <button
                data-tooltip={"Open timer"}
                className={"footer-btn tooltip-btn tt_n"}
                onClick={() => setShowTimerModal(true)}>
                <IoIosTimer id={'timer-icon'} />
            </button>

            <Modal
                className={'edit-modal shadow--raised centered-modal'}
                show={showTimerModal}
                onHide={handleCloseTimerModal}
            >
                <Modal.Header>
                    <Button
                        className="close-button"
                        onClick={handleCloseTimerModal}
                        aria-label="Close"
                        title="Close"
                        name="Close"
                    >
                        <IoClose title="close" className="close-icon"/>
                    </Button>

                    <div className={'time-left'}>Time left: {selectedTime - seconds} s</div>

                    <Modal.Title className="introductions edit-modal-title">Choose Timer Option</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <select className={'form-input-timer form-select-timer shadow--ridge'}
                            onChange={handleChange}>
                        {timeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <p className={"or-set-your-own"}>... or set your own</p>
                    <input
                        className={'form-input-timer shadow--ridge'}
                        type="number"
                        min="0"
                        step="1"
                        value={customTime}
                        onChange={(e) => setCustomTime(Number(e.target.value))}
                    />
                    <button onClick={handleSetCustomTime}
                            className={"set-your-own-btn"}
                    >Set your own
                    </button>

                    <div className={"timer-controls"}>
                        <button className={'start-btn'} onClick={handleStartTimer}>
                            <TfiControlPlay className={'start-icon'}/>
                        </button>
                        <button className={'stop-btn'} onClick={handleStopTimer}>
                            <TfiControlStop className={'stop-icon'}/>
                        </button>
                        <button className={'reset-btn'} onClick={handleResetTimer}>
                            <RxReset className={'reset-icon'}/>
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Popup-Komponente für das Popup */}
            {showTimeIsUpPopup && <TimeIsUpPopup onClose={handleCloseTimerModal} />}
        </div>
    );
};

export default Timer;