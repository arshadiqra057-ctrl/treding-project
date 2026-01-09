import React, { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const startValue = 0;

        // Parse the end value (remove 'k' or 'm' for calculation if needed, 
        // but here we assume 'end' is a number and we append suffix later)
        const endValue = parseInt(end, 10);

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            setCount(Math.floor(progress * (endValue - startValue) + startValue));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [end, duration]);

    return (
        <span>
            {count}{suffix}
        </span>
    );
};

export default CountUp;
