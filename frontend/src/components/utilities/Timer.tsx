import React, { useCallback, useEffect, useState } from 'react';
import { IoIosTimer } from 'react-icons/io';
import {DropdownButton, Form} from 'react-bootstrap';
import { TfiControlPlay, TfiControlStop } from 'react-icons/tfi';
import { RxReset } from 'react-icons/rx';

import TimeIsUpPopup from '../popUps/TimeIsUpPopup.tsx';
import {MdMoreTime} from "react-icons/md";

const Timer: React.FC = () => {
    const [customTime, setCustomTime] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [selectedTime, setSelectedTime] = useState(60);
    const [showTimeIsUpPopup, setShowTimeIsUpPopup] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const intervalIdRef = React.useRef<number>(0);
    const timeoutIdRef = React.useRef<number>(0);

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
                clearInterval(intervalIdRef.current);
                return 0;
            }

            return newSeconds;
        });
    }, [selectedTime]);

    useEffect(() => {
        if (isActive && seconds >= selectedTime) {
            setIsActive(false);
            setShowTimeIsUpPopup(true);
            clearInterval(intervalIdRef.current);
        }
    }, [isActive, seconds, selectedTime]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(Number(e.target.value));
    };

    const handleSetCustomTime = () => {
        setSelectedTime(Number(customTime));
    };

    const handleStartTimer = () => {
        if (!isActive) {
            setIsActive(true);
            intervalIdRef.current = window.setInterval(handleTimerTick, 1000); // Start the interval
            timeoutIdRef.current = window.setTimeout(() => {
                setDropdownOpen(false); // Close dropdown after 1.5 seconds
            }, 1500);
        }
    };

    const handleStopTimer = () => {
        setIsActive(false);
        clearInterval(intervalIdRef.current);
        clearTimeout(timeoutIdRef.current); // Clear the timeout if the timer is stopped manually
    };

    const handleResetTimer = () => {
        setSeconds(0);
        setIsActive(false);
        clearInterval(intervalIdRef.current);
        clearTimeout(timeoutIdRef.current); // Clear the timeout if the timer is reset manually
    };

    const handleCloseTimerModal = () => {
        setShowTimeIsUpPopup(false);
    };

    const handleToggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <DropdownButton
            title={<IoIosTimer id={'timer-icon'} />}
            data-tooltip={"Open timer"}
            className={`tooltip-btn tt_n timer`}
            show={dropdownOpen}
            onToggle={handleToggleDropdown} // Toggle dropdown
        >

            <div className={"dropdown-container dc-timer"}>
                <Form className={"form-proportions timer"}>
                    <div className={'time-left'}>Time left: </div>
                            <div className={"time-left-seconds"}>{Math.max(selectedTime - seconds, 0)}</div>

                    <Form.Label className={"input-label"}>CHOOSE A TIME</Form.Label>
                    <select className={'form-control-custom select-field timer-options shadow--ridge'}
                            onChange={handleChange}>
                        {timeOptions.map((option) => (
                            <option key={option.value}
                                    value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <Form.Label className={"input-label"}>set your own</Form.Label>
                    <input
                        className={'form-control-custom select-field timer-input shadow--ridge'}
                        type="number"
                        min="0"
                        step="1"
                        value={customTime}
                        onChange={(e) => setCustomTime(Number(e.target.value))}
                        onFocus={(e) => e.target.select()} // Select all text on focus
                    />
                    <button onClick={handleSetCustomTime}
                            className={"set-your-own-btn"}>
                        Set your own
                    </button>

                    <div className={"timer-controls"}>
                        <button className={'start-btn'}
                                onClick={handleStartTimer}>
                            <TfiControlPlay className={'start-icon'}/>
                        </button>
                        <button className={'stop-btn'}
                                onClick={handleStopTimer}>
                            <TfiControlStop className={'stop-icon'}/>
                        </button>
                        <button className={'reset-btn'}
                                onClick={handleResetTimer}>
                            <RxReset className={'reset-icon'}/>
                        </button>
                    </div>
                    <div className={"online-timer"}>
                        <a href="https://webuhr.de/"
                           target="_blank"
                           rel="noreferrer">
                            <button
                                data-tooltip={"Get more time controller online"}
                                className={"more-time-controller-online-btn tooltip-btn tt_n"}
                                type="button">
                                <MdMoreTime id={"online-timer-icon"}/>
                            </button>
                        </a>
                    </div>
                </Form>
            </div>
            {/* Popup-Komponente für das Popup */}
            {showTimeIsUpPopup && <TimeIsUpPopup onClose={handleCloseTimerModal}/>}
        </DropdownButton>
    );
};

export default Timer;