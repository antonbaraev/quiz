import {useState} from 'react';

export const useTrackActionDuration = (): {
    actionDuration: null | number;
    trackActionStart: () => void;
    trackActionEnd: () => void;
} => {
    const [startTimestamp, setStartTimestamp] = useState<Date | null>(null);
    const [endTimestamp, setEndTimestamp] = useState<Date | null>(null);

    const actionDuration = (startTimestamp && endTimestamp) ?
        (endTimestamp.getMilliseconds() - startTimestamp.getMilliseconds()) / 1000
        : null;

    return {
        actionDuration,
        trackActionStart: () => setStartTimestamp(new Date()),
        trackActionEnd: () => setEndTimestamp(new Date()),
    };
};