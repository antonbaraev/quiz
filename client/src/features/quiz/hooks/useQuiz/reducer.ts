import {QuizView} from '../../const';
import {ReducerState} from 'react';
import {QuizActions, QuizStore} from '../../hooks/useQuiz/types';
import {QuizActionsType} from '../../hooks/useQuiz/actions';

export const initialState = {
    view: QuizView.START,
    currentQuestionIndex: -1,
    selectedAnswerIndices: -1,
    correctAnswersCount: 0,
    totalAnswersTime: 0,
} as ReducerState<QuizStore>;

export const reducer = (state: QuizStore, {type, payload} : QuizActionsType) => {
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
            const { answerIndex, isCorrect, time } = payload;

            return {
                ...state,
                selectedAnswerIndex: answerIndex,
                correctAnswersCount: isCorrect ? state.correctAnswersCount + 1 : state.correctAnswersCount,
                totalAnswersTime: state.totalAnswersTime + time,
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