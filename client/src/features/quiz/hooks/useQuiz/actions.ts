import {QuizAction, QuizActions} from './types';

export function createAction<P>(type: QuizActions, payload?: P): QuizAction<P> {
    return { type, payload };
}

const startQuiz = () => createAction(QuizActions.START);
const endQuiz = () => createAction(QuizActions.FINISH);
const goToNextQuestion = () => createAction(QuizActions.GO_TO_NEXT_QUESTION);
const selectAnswer = (answerIndex: number, isCorrect: boolean, time: number) => (
    createAction<{answerIndex: number, isCorrect: boolean, time: number}>(
        QuizActions.SELECT_ANSWER,
        { answerIndex, isCorrect, time },
    ));

export const quizActions = {
    startQuiz,
    endQuiz,
    goToNextQuestion,
    selectAnswer,
};

export type QuizActionsType = ReturnType<typeof startQuiz>
    | ReturnType<typeof endQuiz>
    | ReturnType<typeof goToNextQuestion>
    | ReturnType<typeof selectAnswer>