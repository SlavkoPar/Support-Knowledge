import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { IQuestion, IQuestionAnswer } from '../types'
import { IAnswer } from '../../Answers/types'

import { Dispatch } from 'redux';

import {
	QuestionActions,
	removeQuestionAnswer,
	assignQuestionAnswer,
	addAndAssignNewAnswer,
	selectQuestionAnswer,
	copyQuestionAnswer
} from '../actions'

import { addAnswer, cancelAnswer, storeAnswer } from '../../Answers/actions';
import QuestionAnswers from '../components/QuestionAnswers';

const joinQuestionAnswers = (question: IQuestion | undefined, answers: IAnswer[]): IQuestionAnswer[] => {
	if (question === undefined || question.answers.length === 0 || answers === undefined)
		return [];
	console.log("question.answers", question.answers)
	const questionAnswers = question.answers.map(qa => ({
		...qa, text: answers.find(a => a.answerId === qa.answerId)!.text
	})
	);
	return questionAnswers.sort((a, b) => a.assigned > b.assigned ? 1 : -1);
}

interface IProps {
}

// Grab the categories from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps) => { // 
	const { categoriesState, answerState, topState } = store;
	const { question, categoryOptions, formMode } = categoriesState;
	const { answers, answer } = answerState;
	return {
		categoryOptions,
		question: question!,
		questionAnswers: joinQuestionAnswers(question, answers),
		answers,
		answer,
		formMode,
		canEdit: topState.top.canEdit
	};
};


const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		add: (categoryId: number, questionId: number) => dispatch<any>(addAnswer()),
		saveForm: (categoryId: number, questionId: number, answer: IAnswer) => {
			dispatch<any>(storeAnswer(answer, 'add'));
			dispatch<any>(assignQuestionAnswer(categoryId, questionId, answer.answerId))
		},
		cancel: () => dispatch<any>(cancelAnswer()),

		selectQuestionAnswer: (categoryId: number, questionId: number, answerId: number) =>
			dispatch<any>(selectQuestionAnswer(categoryId, questionId, answerId)),
		copyQuestionAnswer: (categoryId: number, questionId: number, answerId: number) =>
			dispatch<any>(copyQuestionAnswer(categoryId, questionId, answerId)),
		removeQuestionAnswer: (categoryId: number, questionId: number, answerId: number) =>
			dispatch<any>(removeQuestionAnswer(categoryId, questionId, answerId)),

		assignQuestionAnswer: (categoryId: number, questionId: number, answerId: number) =>
			dispatch<any>(assignQuestionAnswer(categoryId, questionId, answerId)),

		addAndAssignNewAnswer: (categoryId: number, questionId: number, answer: IAnswer, formMode: string) => {
			dispatch<any>(addAndAssignNewAnswer(categoryId, questionId, answer, formMode))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswers);

