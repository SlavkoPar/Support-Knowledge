import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IAppState } from '../../store/Store';

import { AnswerActions,  addAnswer, editAnswer, removeAnswer, storeAnswer, cancelAnswer } from '../actions' // , IAddAnswer

import { IAnswer } from '../types'

import Page from '../components/Page'
import { IQuestionAnswer, ICategoriesState } from '../../Categories/types';

const getUsedAnswers = (categoriesState: ICategoriesState) : IQuestionAnswer[]=> {
	const { categories, categoryMap } = categoriesState;
	let questionAnswers: IQuestionAnswer[] = [];
	for (let category of categories) {
		const categoryState = categoryMap.get(category.categoryId)!;
		for (let question of categoryState.questions) {
			const arr = question.answers.map(a => ({
				...a,
				categoryId: category.categoryId,
				questionId: question.questionId
			}))
			questionAnswers = questionAnswers.concat(arr)
		}
	}
	return questionAnswers;
}

const getCategoryQuestion = (categoriesState: ICategoriesState, categoryId: number, questionId: number) : string => {
	const { categories, categoryMap } = categoriesState;
	const category = categories.find( g => g.categoryId === categoryId);
	const categoryState = categoryMap.get(category!.categoryId)!;
	const question = categoryState.questions.find(q => q.questionId === questionId);
	return `${category!.title}/${question!.text}`;

}

const mapStateToProps = (store: IAppState) => {
  return {
	answers: store.answerState.answers,
	answer: store.answerState.answer!,
	formMode: store.answerState.formMode,
	usedAnswers: getUsedAnswers(store.categoriesState),
	getCategoryQuestion: (categoryId: number, questionId: number): string => getCategoryQuestion(store.categoriesState, categoryId, questionId),
	who: store.topState.top.auth!.who,
	canEdit: store.topState.top.canEdit
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnswerActions>) => {
	return {
		//setFormMode: (formMode: string) => dispatch<any>(setFormMode(formMode)),
		add: () => dispatch<any>(addAnswer()),
		edit: (answerId: number) => dispatch<any>(editAnswer(answerId)),
		remove: (answerId: number) => dispatch<any>(removeAnswer(answerId)),
		saveForm: (answer: IAnswer, formMode: string) => dispatch<any>(storeAnswer(answer, formMode)),
		cancel: () => dispatch<any>(cancelAnswer()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);