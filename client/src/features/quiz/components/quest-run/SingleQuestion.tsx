import {FC, useEffect, useState} from 'react';
import {Question} from '../../types';
import * as getClassNames from 'classnames';
import Timer from './Timer';

interface SingleQuestionProps extends Question {
    onTimeExpired: (isCorrectAnswerChosen: boolean) => void;
}

const SingleQuestion: FC<SingleQuestionProps> = ({
    question_id,
    question,
    answer_index,
    choices,
    hint,
    onTimeExpired: externalOnTimeExpired,
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isTimeExpired, setIsTimeExpired] = useState(false);
    const [isHintShown, setIsHintShown] = useState(false);

    useEffect(() => {
        setSelectedAnswer(null);
    }, [question_id]);

    const onSelectAnswer = (index: number) => setSelectedAnswer(index);

    const onTimeExpired = () => {
        setIsTimeExpired(true);

        setTimeout(() => {
            externalOnTimeExpired(selectedAnswer === answer_index);
            setIsTimeExpired(false);
            setIsHintShown(false);
        }, 1000);
    };

    const onShowHint = () => setIsHintShown(true);

    return (
        <div className="question-wrapper">
            <div className="question-header">
                <p>{question}</p>
                <Timer onTimeExpired={onTimeExpired} onShowHint={onShowHint}/>
            </div>
            <div className="question-choices">
                {choices?.map((choice, index) => {
                    const isSelected = selectedAnswer === index;
                    const className = getClassNames(
                        'question-choice',
                        {
                            'question-choice__selected': isSelected,
                            'question-choice__correct': isTimeExpired && index === answer_index,
                            'question-choice__wrong': isTimeExpired && isSelected && selectedAnswer !== answer_index,
                        },
                    );

                    return (
                        <button
                            key={choice}
                            className={className}
                            onClick={() => onSelectAnswer(index)}
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

export default SingleQuestion;