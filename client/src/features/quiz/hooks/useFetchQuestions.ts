import {useEffect, useState} from 'react';
import {Question} from 'src/features/quiz/types';
import {mockedGetQuestionsRequest} from 'src/__mocks__/questionBase';

export const useFetchQuestions = (): {
    questions: Question[];
    isLoading: boolean;
} => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        mockedGetQuestionsRequest.then((questions) => {
            setQuestions(questions);
            setIsLoading(false);
        });
    }, []);

    return {
        questions,
        isLoading,
    };
};