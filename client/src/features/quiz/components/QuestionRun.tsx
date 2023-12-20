import {FC, useEffect, useState} from 'react';
import {mockedGetQuestionsRequest} from 'src/__mocks__/questionBase';
import {Question} from 'src/features/quiz/types';
import Loadable from 'src/shared-components/loadable';

const QuestionRun: FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    
    useEffect(() => {
        mockedGetQuestionsRequest.then((questions) => setQuestions(questions));
    }, []);

    const isLoading = questions.length === 0;

    return (
        <Loadable isLoading={isLoading}>
            {questions.map(({ question_id, question, answer_index, choices, hint}) => {

            })}
        </Loadable>
    );
};

export default QuestionRun;