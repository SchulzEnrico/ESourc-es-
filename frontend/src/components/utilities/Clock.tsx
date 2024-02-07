import React, { useEffect, useState } from "react";

const Clock: React.FC = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={"clock"}>
            <div className={"clock-date"}>
                {time.toLocaleDateString('de-DE', { weekday: 'short' })}. {time.toLocaleDateString('de-DE', { day: '2-digit' })}. {time.toLocaleDateString('de-DE', { month: 'short' })}
            </div>
            <div className={"clock-time"}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default Clock;
