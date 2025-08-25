import { useEffect, useState } from 'react';

export function useCountdown(durationSec = 60) {
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        if (secondsLeft === 0) return;

        const interval = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft]);

    const start = () => setSecondsLeft(durationSec);

    return { secondsLeft, isRunning: secondsLeft > 0, start };
}
