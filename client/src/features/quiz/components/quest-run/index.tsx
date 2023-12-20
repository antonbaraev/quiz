import {FC, useEffect, useState} from 'react';
import {mockedGetQuestionsRequest} from 'src/__mocks__/questionBase';
import {Question} from 'src/features/quiz/types';
import Loadable from 'src/shared-components/loadable';
import './styles.css';
import SingleQuestion from './SingleQuestion';
import {QUIZ_QUESTION_AMOUNT} from 'src/features/quiz/const';

interface QuestionRunProps {
    onFinishQuiz: () => void;
    incrementCorrectAnswersCount: () => void;
}

const QuestionRun: FC<QuestionRunProps> = ({ onFinishQuiz, incrementCorrectAnswersCount }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    
    useEffect(() => {
        mockedGetQuestionsRequest.then((questions) => {
            setQuestions(questions);
            setCurrentQuestionIndex(0);
        });
    }, []);

    const isLoading = questions.length === 0;
    const question = questions?.[currentQuestionIndex] || {};

    const onTimeExpired = (isCorrectAnswerChosen: boolean) => {
        if (isCorrectAnswerChosen) {
            incrementCorrectAnswersCount();
        }

        if (currentQuestionIndex === QUIZ_QUESTION_AMOUNT - 1) {
            onFinishQuiz();
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    return (
        <Loadable isLoading={isLoading}>
            <SingleQuestion {...question} onTimeExpired={onTimeExpired}/>
        </Loadable>
    );
};

export default QuestionRun;