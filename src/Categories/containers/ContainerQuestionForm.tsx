// import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { IQuestion, IQuestionAnswer, ICategory } from '../types'
import { IAnswer } from '../../Answers/types'

import { Dispatch } from 'redux';

import { QuestionActions,  
	storeQuestion,
	updateQuestion,
	cancelQuestion,
	removeQuestionAnswer,
	assignQuestionAnswer,
	setIsDetail,
	addAndAssignNewAnswer,
	selectQuestionAnswer,
	copyQuestionAnswer
} from '../actions'

import { QuestionForm } from '../components/QuestionForm';

const joinQuestionAnswers = (question: IQuestion | undefined, answers: IAnswer[]) : IQuestionAnswer[]=> {
	if (question === undefined || question.answers.length === 0 || answers === undefined)
		return [];
	const questionAnswers = question.answers.map(qa => ({
			...qa, text: answers.find(a => a.answerId === qa.answerId)!.text
		})
	);
	return questionAnswers.sort((a,b) => a.assigned < b.assigned ? 1 : -1);
}

interface IProps {
	canEdit: boolean,
	handleClose: () => void
}

// Grab the categories from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const {categoriesState, answerState } = store;
	const { question, categoryOptions, formMode } = categoriesState; 
	const { answers } = answerState;
	return {
		categoryOptions,
		question: question!,
		questionAnswers: joinQuestionAnswers(question, answers),
		answers,
		formMode,
		canEdit: ownProps.canEdit,
		handleClose: ownProps.handleClose
	};
};


const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		saveForm: (question: IQuestion, formMode: string) => 
			dispatch<any>(formMode==='add'?storeQuestion(true, question):updateQuestion(true, question)),
		cancel: () => dispatch<any>(cancelQuestion()),

		// question answers
		selectQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => 
			dispatch<any>(selectQuestionAnswer(categoryId, questionId, answerId)),
		copyQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => 
			dispatch<any>(copyQuestionAnswer(categoryId, questionId, answerId)),
		removeQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => 
			dispatch<any>(removeQuestionAnswer(categoryId, questionId, answerId)),

		assignQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => 
			dispatch<any>(assignQuestionAnswer(categoryId, questionId, answerId)),
		
		setIsDetail: (isDetail: boolean) => {
			dispatch<any>(setIsDetail(isDetail))
		},

		addAndAssignNewAnswer: (categoryId: number, questionId: number, answer: IAnswer, formMode: string) => {
			dispatch<any>(addAndAssignNewAnswer(categoryId, questionId, answer, formMode))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);

