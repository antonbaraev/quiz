import { FC } from 'react';

interface StartProps {
    onStartQuiz: () => void;
}

const Start: FC<StartProps> = ({ onStartQuiz }) => (
    <button
        className="start-btn"
        onClick={onStartQuiz}
    >
        Start Quiz
    </button>
);

export default Start;