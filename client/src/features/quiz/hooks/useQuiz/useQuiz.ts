import {useCallback, useEffect, useReducer} from 'react';
import {DELAY_BEFORE_SHOW_NEXT_QUESTION_MSEC, QUIZ_QUESTION_AMOUNT} from '../../const';
import {useFetchQuestions} from '../../hooks/useFetchQuestions';
import {useTimer} from '../../hooks/useTimer';
import {quizActions} from './actions';
import {initialState, reducer} from './reducer';

export const useQuiz = () => {
    const { isLoading, questions } = useFetchQuestions();

    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        currentQuestionIndex,
        selectedAnswerIndex,
    } = state;

    const currentQuestionId = questions?.[currentQuestionIndex]?.question_id || null;

    const onStartQuiz = useCallback(() => dispatch(quizActions.startQuiz()), [dispatch]);

    const onGoToNextQuestion = useCallback(() => {
        setTimeout(() => {
            if (currentQuestionIndex === QUIZ_QUESTION_AMOUNT - 1) {
                dispatch(quizActions.endQuiz());
            } else {
                dispatch(quizActions.goToNextQuestion());
            }
        }, DELAY_BEFORE_SHOW_NEXT_QUESTION_MSEC);
    }, [dispatch, currentQuestionIndex]);

    const onSelectAnswer = useCallback((answerIndex: number, timePassed: number) => {
        if (selectedAnswerIndex >= 0) {
            return;
        }

        const isCorrect = answerIndex === questions?.[currentQuestionIndex]?.answer_index;

        dispatch(quizActions.selectAnswer(answerIndex, isCorrect, timePassed));
    }, [dispatch, selectedAnswerIndex, questions, currentQuestionIndex]);

    const {
        timeLeft,
        timePassed,
        setupTimer,
    } = useTimer({ onTimeEnds: onGoToNextQuestion });

    useEffect(() => {
        if (currentQuestionId) {
            setupTimer();
        }
    }, [currentQuestionId, setupTimer]);

    return {
        isLoading,
        currentQuestion: questions?.[state.currentQuestionIndex] || {},
        ...state,
        onStartQuiz,
        onGoToNextQuestion,
        onSelectAnswer,
        timeLeft,
        timePassed,
    };
};