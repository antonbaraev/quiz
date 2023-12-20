import {FC, useEffect, useState} from 'react';
import Loadable from 'src/shared-components/loadable';
import './styles.css';
import SingleQuestion from './SingleQuestion';
import {DELAY_BEFORE_SHOW_NEXT_QUESTION_MSEC, QUIZ_QUESTION_AMOUNT} from 'src/features/quiz/const';
import {useFetchQuestions} from 'src/features/quiz/hooks/useFetchQuestions';
import {useTimer} from 'src/features/quiz/hooks/useTimer';
import {Question} from 'src/features/quiz/types';
import {useTrackActionDuration} from 'src/features/quiz/hooks/useTrackActionDuration';

interface QuestionRunProps {
    onFinishQuiz: () => void;
    incrementCorrectAnswersCount: () => void;
    setAnswersTime: (value: (((prevState: number) => number) | number)) => void;
}

const QuestionRun: FC<QuestionRunProps> = ({ onFinishQuiz, incrementCorrectAnswersCount, setAnswersTime }) => {
    const { questions, isLoading } = useFetchQuestions();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(-1);

    const { question_id, ...questionParams} = questions?.[currentQuestionIndex] || {} as Question;

    const { timeLeft, setupTimer } = useTimer();
    const { actionDuration, trackActionStart, trackActionEnd } = useTrackActionDuration();

    useEffect(() => {
        if (!isLoading && questions.length > 0) {
            setCurrentQuestionIndex(0);
        }
    }, [isLoading, questions]);

    useEffect(() => {
        if (currentQuestionIndex >= 0) {
            setupTimer();
            trackActionStart();
        }
    }, [currentQuestionIndex, setupTimer]);

    useEffect(() => {
        if (timeLeft > 0) {
            return;
        }

        setTimeout(() => {
            if (actionDuration) {
                setAnswersTime((prevTime) => prevTime + actionDuration!);
            }

            if (selectedAnswerIndex === questionParams?.answer_index) {
                incrementCorrectAnswersCount();
            }

            if (currentQuestionIndex === QUIZ_QUESTION_AMOUNT - 1) {
                onFinishQuiz();
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswerIndex(-1);
            }
        }, DELAY_BEFORE_SHOW_NEXT_QUESTION_MSEC);
    }, [timeLeft]);

    const onSelectAnswer = (answerIndex: number) => {
        if (selectedAnswerIndex >= 0) {
            return;
        }

        setSelectedAnswerIndex(answerIndex);
        trackActionEnd();
    };

    return (
        <Loadable isLoading={isLoading}>
            {questionParams &&
                <SingleQuestion
                    key={question_id}
                    {...questionParams}
                    timeLeft={timeLeft}
                    selectedAnswerIndex={selectedAnswerIndex}
                    onSelectAnswer={onSelectAnswer}
                />
            }
        </Loadable>
    );
};

export default QuestionRun;