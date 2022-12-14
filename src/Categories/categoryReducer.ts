// Import Reducer type
import { Reducer } from 'redux';

import {
	QuestionActions,
	QuestionActionTypes
} from './actions';

import { IQuestion, ICategoryState, initialQuestion } from './types'

export const CATEGORY = 'CATEGORY';

// Define the initial state
export const initialCategoryState: ICategoryState = {
	questions: []
};

const storeToStorage: string[] = [
	QuestionActionTypes.ADD_QUESTION,
	QuestionActionTypes.STORE_QUESTION,
	QuestionActionTypes.UPDATE_QUESTION,
	QuestionActionTypes.REMOVE_QUESTION,
	QuestionActionTypes.REMOVE_QUESTION_ANSWER,
	QuestionActionTypes.ASSIGN_QUESTION_ANSWER
]

const aTypesToStore = Object.keys(QuestionActionTypes)
	.filter(a => storeToStorage.includes(a));

export const reduceCategory = (
	categoryMap: Map<number, ICategoryState>,
	action: QuestionActions,
	categoryId: number,
	questionId?: number
): {categoryMap: Map<number, ICategoryState>, question: IQuestion|undefined} => {
	const categoryState = categoryMap.get(categoryId)!;
	const newState: ICategoryState = myReducer(categoryState, action);

	if (aTypesToStore.includes(action.type)) {
		newState.questions.forEach(q => q.words = []);
		localStorage.setItem(`CATEGORY_${categoryId}`, JSON.stringify(newState.questions));
		newState.questions.forEach(q => q.words = q.text.split(' '));
	}
	categoryMap.set(categoryId, newState);
	const question = newState.questions.find(q => q.questionId === questionId);
	return { categoryMap, question }
}

const myReducer: Reducer<ICategoryState, QuestionActions> = (
	state = initialCategoryState,
	action
) => {
	switch (action.type) {

		case QuestionActionTypes.GET_QUESTION: {
			const question = state.questions.find(q => q.questionId === action.questionId);
			return {
				...state,
				question
			};
		}

		case QuestionActionTypes.ADD_QUESTION: {
			const { questions } = state;
			return {
				...state,
				questions: [...questions, {...action.question}]
			};
		}

		case QuestionActionTypes.EDIT_QUESTION: {
			const question = state.questions
				.find(question => question.questionId === action.questionId);
			return {
				...state,
				formMode: 'edit',
				question
			};
		}

		case QuestionActionTypes.STORE_QUESTION: {
			const { question } = action;
			question.words = question.text.split(' ');
			return {
				...state,
				questions: [...state.questions, {...question}]
			};
		}

		case QuestionActionTypes.UPDATE_QUESTION: {
			const { question } = action;
			question.words = question.text.split(' ');
			const { questionId } = question;
			return {
				...state,
				questions: state.questions
					.map(q => q.questionId !== questionId
						? q
						: { ...question }
					)
			};			
		}

		case QuestionActionTypes.CANCEL_QUESTION: {
			return {
				...state,
				formMode: 'display'
			};
		}

		case QuestionActionTypes.REMOVE_QUESTION: {
			return {
				...state,
				questions: state.questions.filter(q => q.questionId !== action.questionId)
			};
		}

		// Question answers
		case QuestionActionTypes.REMOVE_QUESTION_ANSWER: {
			return {
				...state,
				questions: state.questions.map(q => q.questionId !== action.questionId
					? { ...q, answers: [...q.answers] }
					: { ...q, answers: q.answers.filter(qa => qa.answerId !== action.answerId) }
				)
			}
		}

		case QuestionActionTypes.ASSIGN_QUESTION_ANSWER: {
			const { questionId, answerId, assignedBy } = action;
			return {
				...state,
				questions: state.questions.map(q => q.questionId !== questionId
					? { ...q, answers: [...q.answers] }
					: { ...q, answers: [...q.answers, { answerId, assignedBy, assigned: new Date() }] }
				)
			}
		}

		default:
			return state;
	}
};

