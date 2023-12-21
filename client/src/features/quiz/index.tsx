import {FC} from 'react';
import './styles.css';
import {QuizView} from './const';
import Start from './components/start';
import QuizQuestion from './components/quest-run';
import Finish from './components/finish';
import {useQuiz} from 'src/features/quiz/hooks/useQuiz/useQuiz';
import Loadable from 'src/shared-components/loadable';

const Quiz: FC = () => {
    const {
        view,
        isLoading,
        currentQuestion,
        selectedAnswerIndex,
        correctAnswersCount,
        onStartQuiz,
        onSelectAnswer,
        timeLeft,
        timePassed,
        totalAnswersTime,
    } = useQuiz();

    return (
        <div className="wrapper">
            {
                {
                    [QuizView.START]: <Start {...{onStartQuiz}}/>,
                    [QuizView.QUIZ]: (
                        <Loadable {...{ isLoading}}>
                            <QuizQuestion
                                {...{
                                    question: currentQuestion,
                                    onSelectAnswer,
                                    timeLeft,
                                    timePassed,
                                    selectedAnswerIndex,
                                }}/>
                        </Loadable>),
                    [QuizView.FINISH]: <Finish {...{totalAnswersTime, correctAnswersCount}}/>,
                }[view]
            }
        </div>
    );
};

export default Quiz;