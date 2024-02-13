import React, { useCallback, useEffect, useState, useRef } from 'react';
import { IoIosTimer } from 'react-icons/io';
import { DropdownButton } from 'react-bootstrap';
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
    const intervalIdRef = useRef<number>(0);
    const timeoutIdRef = useRef<number>(0);

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

    // Define your fixed options
    const fixedTimeOptions = [
        { label: "60 sec", value: 60 },
        { label: "90 sec", value: 90 },
        // Other fixed time options...
    ];

    // Generate the last 5 custom options based on the fixed options
    const lastFiveCustomOptions = fixedTimeOptions.map((option, index) => {
        return {
            label: `${option.value - index * 30} sec`,
            value: option.value - index * 30
        };
    });

    // Combine the fixed options and the last 5 custom options
    const timeOptions = [...lastFiveCustomOptions, ...fixedTimeOptions];

    return (
        <DropdownButton
            title={<IoIosTimer id={'timer-icon'} />}
            data-tooltip={"Open timer"}
            className={`tooltip-btn tt_n timer`}
            show={dropdownOpen}
            onToggle={handleToggleDropdown} // Toggle dropdown
        >
            <div className={"dropdown-container dc-timer"}>
                <div className={'time-left'}>Time left: {Math.max(selectedTime - seconds, 0)} s</div>
                <div className="introductions">Choose a Time</div>
                <select className={'form-input-timer form-select-timer shadow--ridge'}
                        onChange={handleChange}>
                    {timeOptions.map((option, index) => (
                        <option key={index}
                                value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <p className={"introductions or-set-your-own"}>... or set your own</p>
                <input
                    className={'form-input-timer shadow--ridge'}
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
                            <MdMoreTime title={"Time and Date"}/>
                        </button>
                    </a>
                </div>
            </div>
            {/* Popup-Komponente für das Popup */}
            {showTimeIsUpPopup && <TimeIsUpPopup onClose={handleCloseTimerModal}/>}
        </DropdownButton>
    );
};

export default Timer;
