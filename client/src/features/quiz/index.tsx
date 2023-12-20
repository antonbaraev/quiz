import {FC, useState} from 'react';
import './styles.css';
import {QuizView} from './const';
import Start from './components/start';
import QuestionRun from './components/quest-run';
import Finish from './components/finish';

const Quiz: FC = () => {
    const [quizState, setQuizState] = useState<QuizView>(QuizView.START);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [answersTime, setAnswersTime] = useState(0);

    const onStartQuiz = () => setQuizState(QuizView.QUIZ);
    const onFinishQuiz = () => setQuizState(QuizView.FINISH);
    const incrementCorrectAnswersCount = () => setCorrectAnswersCount((prevCount) => prevCount + 1);

    return (
        <div className="wrapper">
            {
                {
                    [QuizView.START]: <Start {...{onStartQuiz}}/>,
                    [QuizView.QUIZ]: <QuestionRun {...{onFinishQuiz, incrementCorrectAnswersCount, setAnswersTime}}/>,
                    [QuizView.FINISH]: <Finish {...{answersTime, correctAnswersCount}}/>,
                }[quizState]
            }
        </div>
    );
};

export default Quiz;