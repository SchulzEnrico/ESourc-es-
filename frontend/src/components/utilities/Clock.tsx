import React, {useEffect, useState} from "react";

const Clock: React.FC = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <div className={"clock shadow--outset"} >{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>;
};

export default Clock;