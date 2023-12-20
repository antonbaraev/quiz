import { FC } from 'react';
import './styles.css';
import {QUIZ_QUESTION_AMOUNT} from 'src/features/quiz/const';

interface FinishProps {
    correctAnswersCount: number;
}

const Finish: FC<FinishProps> = ({ correctAnswersCount }) => (
    <div className="finish-wrapper">
        {`Your scored ${correctAnswersCount} out of ${QUIZ_QUESTION_AMOUNT}!`}
    </div>
);

export default Finish;