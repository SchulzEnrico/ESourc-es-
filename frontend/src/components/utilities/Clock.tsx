import React, { useEffect, useState } from 'react';

const Clock: React.FC = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return <div>{time.toLocaleTimeString()}</div>;
};

export default Clock;