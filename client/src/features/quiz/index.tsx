import {FC, useCallback, useState} from 'react';
import './styles.css';
import {QuizState} from './const';
import Start from './components/start';
import QuestionRun from './components/quest-run';
import Finish from './components/finish';

const Quiz: FC = () => {
    const [quizState, setQuizState] = useState<QuizState>(QuizState.IDLE);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    const onStartQuiz = () => setQuizState(QuizState.IN_PROGRESS);

    const onFinishQuiz = useCallback(() => {
        setQuizState(QuizState.FINISHED);
    }, [setQuizState]);

    const incrementCorrectAnswersCount = useCallback(() => {
        setCorrectAnswersCount((prevCount) => prevCount + 1);
    }, [setCorrectAnswersCount]);

    return (
        <div className="wrapper">
            {
                {
                    [QuizState.IDLE]: <Start onStartQuiz={onStartQuiz}/>,
                    [QuizState.IN_PROGRESS]: (
                        <QuestionRun
                            onFinishQuiz={onFinishQuiz}
                            incrementCorrectAnswersCount={incrementCorrectAnswersCount}
                        />),
                    [QuizState.FINISHED]: <Finish correctAnswersCount={correctAnswersCount}/>,
                }[quizState]
            }
        </div>
    );
};

export default Quiz;