import {ReducerState, useCallback, useEffect, useReducer} from 'react';
import {DELAY_BEFORE_SHOW_NEXT_QUESTION_MSEC, QUIZ_QUESTION_AMOUNT, QuizView} from 'src/features/quiz/const';
import {quizActions, QuizActions, QuizActionsType, QuizStore} from 'src/features/quiz/hooks/useQuiz/utils';
import {useFetchQuestions} from 'src/features/quiz/hooks/useFetchQuestions';
import {useTimer} from 'src/features/quiz/hooks/useTimer';

const initialState = {
    view: QuizView.START,
    currentQuestionIndex: -1,
    selectedAnswerIndex: -1,
    correctAnswersCount: 0,
    totalAnswersTime: {},
} as ReducerState<QuizStore>;

const reducer = (state: QuizStore, {type, payload} : QuizActionsType) => {
    switch (type) {
        case QuizActions.START:
            return {
                ...state,
                view: QuizView.QUIZ,
                currentQuestionIndex: 0,
            };
        case QuizActions.FINISH:
            return {
                ...state,
                view: QuizView.FINISH,
            };
        case QuizActions.SELECT_ANSWER:
            return {
                ...state,
                selectedAnswerIndex: payload.answerIndex,
            };
        case QuizActions.GO_TO_NEXT_QUESTION:
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
                selectedAnswerIndex: -1,
            };
        default:
            return state;
    }
};

export const useQuiz = () => {
    const { isLoading, questions } = useFetchQuestions();

    const [state, dispatch] = useReducer(reducer, initialState);

    const onStartQuiz = useCallback(() => dispatch(quizActions.startQuiz()), [dispatch]);

    const onGoToNextQuestion = useCallback(() => {
        setTimeout(() => {
            if (state.currentQuestionIndex === QUIZ_QUESTION_AMOUNT - 1) {
                dispatch(quizActions.endQuiz());
            } else {
                dispatch(quizActions.goToNextQuestion());
            }
        }, DELAY_BEFORE_SHOW_NEXT_QUESTION_MSEC);
    }, [dispatch, state.currentQuestionIndex]);

    const onSelectAnswer = useCallback((answerIndex: number) => {
        const { selectedAnswerIndex } = state;

        if (selectedAnswerIndex >= 0) {
            return;
        }

        dispatch(quizActions.selectAnswer(answerIndex));
    }, [dispatch, state]);

    const {
        timeLeft,
        timePassed,
        setupTimer,
    } = useTimer({ onTimeEnds: onGoToNextQuestion });

    useEffect(() => {
        if (state.currentQuestionIndex >= 0 && !isLoading) {
            setupTimer();
        }
    }, [state.currentQuestionIndex, isLoading, setupTimer]);

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