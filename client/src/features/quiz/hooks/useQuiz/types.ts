import {QuizView} from 'src/features/quiz/const';

export enum QuizActions {
    START = 'START',
    FINISH = 'FINISH',
    GO_TO_NEXT_QUESTION = 'GO_TO_NEXT_QUESTION',
    SELECT_ANSWER = 'SELECT_ANSWER',
}

export type QuizStore = {
    view: QuizView,
    currentQuestionIndex: number,
    selectedAnswerIndices: Record<string, number>,
    correctAnswersCount: number,
    totalAnswersTime: number,
}

export type QuizAction<P> = {
    readonly type: QuizActions;
    readonly payload?: P;
}

