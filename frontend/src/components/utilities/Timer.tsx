import React, { useEffect, useState } from 'react';


const Timer: React.FC = () => {
    const [showTimer, setShowTimer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [customTime, setCustomTime] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [selectedTime, setSelectedTime] = useState(60);

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

    useEffect(() => {
        let interval: number | undefined;

        if (isActive) {
            interval = window.setInterval(() => {
                setSeconds((seconds) => seconds + 1);

                if (seconds >= selectedTime) {
                    setIsActive(false);
                    setSeconds(0);
                    setShowModal(true);
                }
            }, 1000);
        } else if (!isActive) {
            window.clearInterval(interval);
        }

        return () => {
            if (interval) window.clearInterval(interval);
        };
    }, [isActive, seconds]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(Number(e.target.value));
    };

    return (
        <div className={"timer"}>
            <button onClick={() => setShowTimer(!showTimer)}>Timer</button>

            {showTimer && (
                <>
                    <label>Choose...</label>
                    <select
                        className={"timer-input"}
                        onChange={handleChange}
                    >
                        {timeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <label>or set</label>
                    <input
                        className={"timer-input"}
                        type="number"
                        min="0"
                        step="1"
                        value={customTime}
                        onChange={(e) => setCustomTime(Number(e.target.value))}
                    />
                    <button onClick={() => setSelectedTime(Number(customTime))}>Set your own</button>

                    <div className={"time-left"}>
                        Time left {selectedTime - seconds} sec
                    </div>

                    <button className={"start-btn"} onClick={() => setIsActive(true)}>Start</button>
                    <button className={"stop-btn"} onClick={() => setIsActive(false)}>Stop</button>
                    <button className={"reset-btn"} onClick={() => setSeconds(0)}>reset</button>


                {showModal && (
                    <div className="timer-modal">
                        <h2>Time's up!</h2>
                        <button onClick={() => setShowModal(false)}>close</button>
                    </div>

                )}
                </>
            )}
        </div>
    );
}
export default Timer;