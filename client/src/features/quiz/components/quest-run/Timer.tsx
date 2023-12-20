import {FC, useEffect, useState} from 'react';
import {TIME_PER_QUESTION_SEC, TIME_LEFT_WHEN_HINT_IS_SHOWN} from 'src/features/quiz/const';

interface TimerProps {
    onTimeExpired: () => void;
    onShowHint: () => void;
}

const Timer: FC<TimerProps> = ({ onTimeExpired, onShowHint }) => {
    const [timeLeft, setTimeLeft] = useState<number>(TIME_PER_QUESTION_SEC);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeLeft === TIME_LEFT_WHEN_HINT_IS_SHOWN + 1) {
                onShowHint();
            }

            if (timeLeft === 0) {
                onTimeExpired();
                setTimeLeft(TIME_PER_QUESTION_SEC);
            } else {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, onShowHint, onTimeExpired]);

    return (
        <p>{timeLeft}</p>
    );
};

export default Timer;