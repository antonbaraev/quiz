import {useCallback, useEffect, useRef, useState} from 'react';
import {TIME_PER_QUESTION_SEC} from 'src/features/quiz/const';

export const useTimer = () => {
    const timerRef = useRef<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION_SEC);

    const setupTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current!);
            setTimeLeft(TIME_PER_QUESTION_SEC);
        }

        timerRef.current = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft > 0) {
                    return prevTimeLeft - 1;
                }

                return prevTimeLeft;
            });
        }, 1000);
    }, []);

    useEffect(() => {
        setupTimer();

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current!);
            }
        };
    }, []);

    return {
        timeLeft,
        setupTimer,
    };
};