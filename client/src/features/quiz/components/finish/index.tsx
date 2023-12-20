import { FC } from 'react';
import './styles.css';
import {QUIZ_QUESTION_AMOUNT} from 'src/features/quiz/const';

interface FinishProps {
    correctAnswersCount: number;
    answersTime: number;
}

const Finish: FC<FinishProps> = ({ correctAnswersCount, answersTime  }) => (
    <div className="finish-wrapper">
        <h1>{`Your scored ${correctAnswersCount} out of ${QUIZ_QUESTION_AMOUNT}!`}</h1>
        <h2>{`Total answers time ${answersTime} seconds`}</h2>
    </div>
);

export default Finish;