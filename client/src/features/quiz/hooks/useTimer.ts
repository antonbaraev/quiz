import {useCallback, useEffect, useRef, useState} from 'react';
import {TIME_PER_QUESTION_SEC} from 'src/features/quiz/const';

type UseTimerParams = {
    onTimeEnds: () => void;
}

export const useTimer = ({ onTimeEnds }: UseTimerParams): {
    timeLeft: number;
    timePassed: number;
    setupTimer: () => void;
} => {
    const timerRef = useRef<number | null>(null);
    const onTimeEndsRef = useRef<() => void>();
    onTimeEndsRef.current = onTimeEnds;

    const [timePassed, setTimePassed] = useState(0);

    const setupTimer = useCallback(() => {
        let _timePassed = 0;

        if (timerRef.current) {
            clearInterval(timerRef.current!);
            setTimePassed(0);
        }

        timerRef.current = setInterval(() => {
            _timePassed += 1;

            setTimePassed(_timePassed);

            if (_timePassed >= TIME_PER_QUESTION_SEC) {
                clearInterval(timerRef.current!);
                onTimeEndsRef.current?.();
            }
        }, 1000);
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current!);
            }
        };
    }, []);

    return {
        timeLeft: TIME_PER_QUESTION_SEC - timePassed,
        timePassed,
        setupTimer,
    };
};
