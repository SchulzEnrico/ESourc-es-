import React, { useEffect, useState } from 'react';


const Timer: React.FC = () => {
    const [showTimer, setShowTimer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [customTime, setCustomTime] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [selectedTime, setSelectedTime] = useState(60);

    const timeOptions = [
        { label: "60 Sekunden", value: 60 },
        { label: "90 Sekunden", value: 90 },
        { label: "2 Minuten", value: 120 },
        { label: "5 Minuten", value: 300 },
        { label: "10 Minuten", value: 600 },
        { label: "15 Minuten", value: 900 },
        { label: "20 Minuten", value: 1200 },
        { label: "25 Minuten", value: 1500 },
        { label: "30 Minuten", value: 1800 },
        { label: "45 Minuten", value: 2700 },
        { label: "60 Minuten", value: 3600 }
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
                    <label>Timer:</label>
                    <select onChange={handleChange}>
                        {timeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <label>Own time in seconds:</label>
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={customTime}
                        onChange={(e) => setCustomTime(Number(e.target.value))}
                    />
                    <button onClick={() => setSelectedTime(Number(customTime))}>Set own time</button>


                    <div>
                        Time left {selectedTime - seconds} seconds
                    </div>


                    <button onClick={() => setIsActive(true)}>Start</button>
                    <button onClick={() => setIsActive(false)}>Stop</button>
                    <button onClick={() => setSeconds(0)}>reset</button>


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