import {FC, useState} from 'react';
import './index.css';
import {QuizState} from './const';
import Start from './components/Start';
import QuestionRun from './components/QuestionRun';
import Finish from './components/Finish';

const Quiz: FC = () => {
    const [quizState, setQuizState] = useState<QuizState>(QuizState.IDLE);

    const onStartQuiz = () => setQuizState(QuizState.IN_PROGRESS);

    return (
        <div className="wrapper">
            {
                {
                    [QuizState.IDLE]: <Start onStartQuiz={onStartQuiz}/>,
                    [QuizState.IN_PROGRESS]: <QuestionRun/>,
                    [QuizState.FINISHED]: <Finish/>,
                }[quizState]
            }
        </div>
    );
};

export default Quiz;