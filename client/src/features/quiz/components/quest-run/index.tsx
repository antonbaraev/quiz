import {FC} from 'react';
import {Question} from '../../types';
import * as getClassNames from 'classnames';
import {SHOW_HINT_TIME_SEC} from 'src/features/quiz/const';
import './styles.css';

interface SingleQuestionProps extends Omit<Question, 'question_id'> {
    timeLeft: number;
    timePassed: number;
    selectedAnswerIndex: number;
    onSelectAnswer: (answerIndex: number, timePassed: number) => void;
}

const QuizQuestion: FC<SingleQuestionProps> = ({
    question,
    answer_index,
    choices,
    hint,
    timeLeft,
    timePassed,
    selectedAnswerIndex,
    onSelectAnswer,
}) => {
    const isTimeExpired = timeLeft === 0;
    const isHintShown = timeLeft <= SHOW_HINT_TIME_SEC;

    return (
        <div className="question-wrapper">
            <div className="question-header">
                <p>{question}</p>
                <p>{timeLeft}</p>
            </div>
            <div className="question-choices">
                {choices?.map((choice, index) => {
                    const isSelected = selectedAnswerIndex === index;
                    const isCorrect = isTimeExpired && index === answer_index;
                    const isWrong = isTimeExpired && isSelected && selectedAnswerIndex !== answer_index;

                    const className = getClassNames(
                        'question-choice',
                        {
                            'question-choice__selected': isSelected,
                            'question-choice__correct': isCorrect,
                            'question-choice__wrong': isWrong,
                        },
                    );

                    return (
                        <button
                            key={choice}
                            className={className}
                            onClick={() => onSelectAnswer(index, timePassed)}
                            disabled={selectedAnswerIndex >= 0}
                        >
                            {choice}
                        </button>
                    );
                })}
            </div>
            {isHintShown && <div className="question-hint">{hint}</div>}
        </div>
    );
};

export default QuizQuestion;