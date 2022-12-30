// Import Reducer type
import { Reducer } from 'redux';

import {
	QuestionActions,
	QuestionActionTypes
} from './actions';

import { IQuestion, ICategory, ICategoriesState, ICategoryState } from './types'
import { reduceCategory } from './categoryReducer'

export const SUPPORT_CATEGORIES = 'SUPPORT_CATEGORIES';

export const initialQuestion: IQuestion = {
	categoryId: 0,
	questionId: 0,
	text: '',
	words: [],
	source: 0,
	status: 0,
	answers: [],
	createdBy: 0,
	created: new Date()
};

export const initialCategory: ICategory = {
	categoryId: 0,
	title: '',
	questions: [],
	isExpanded: false,
	createdBy: 0,
	created: new Date()
};


// Define the initial state
export const initialCategoriesState: ICategoriesState = {
	categories: [],
	category: undefined,
	categoryMap: new Map<number, ICategoryState>(),
	question: {...initialQuestion}, // we still have QuestionForm in modal, although hidden
	showCategoryForm: false,
	showQuestionForm: false,
	categoryOptions: [],
	loading: false,
	formMode: 'display',
	categoryIdEditing: -1
};

const storeToStorage: string[] = [
	QuestionActionTypes.ADD_QUESTION,
	QuestionActionTypes.TOGGLE_CATEGORY,
	QuestionActionTypes.STORE_CATEGORY,
	QuestionActionTypes.UPDATE_CATEGORY,
	QuestionActionTypes.REMOVE_CATEGORY
]

const aTypesToStore = Object.keys(QuestionActionTypes)
	.filter(a => storeToStorage.includes(a));

export const categoriesReducer: Reducer<ICategoriesState, QuestionActions> = (state, action) => {
	const newState = myReducer(state, action);
	if (aTypesToStore.includes(action.type)) {
		localStorage.setItem(SUPPORT_CATEGORIES, JSON.stringify(newState.categories));
	}
	return newState;
}


const myReducer: Reducer<ICategoriesState, QuestionActions> = (
	state = initialCategoriesState,
	action
) => {
	switch (action.type) {

		case QuestionActionTypes.LOAD_CATEGORIES: {
			const { categories, categoryMap } = action;

			return {
				...state,
				categories,
				categoryMap
			};
		}

		case QuestionActionTypes.GET_QUESTION: {
			const { categoryId, questionId } = action;
			const { questions } = state.categoryMap.get(categoryId)!;
			const question = questions.find(q => q.questionId === questionId);
			return {
				...state,
				question
			};
		}

		case QuestionActionTypes.ADD_QUESTION: {
			const { categoryId } = action.question;
			let questionId = 1;
			action.question = {
				...initialQuestion,
				...action.question,
				questionId
			}
			if (categoryId === 0) {
				return {
					...state,
					formMode: 'edit', // adding => editing
					question: action.question,
					questionCopy: { ...action.question },
					showCategoryForm: false
				};
			}
			const { questions } = state.categoryMap.get(categoryId)!;
			questionId = questions.length === 0 ? 1 : Math.max(...questions.map(q => q.questionId)) + 1;
			const { categoryMap, question } = reduceCategory(state.categoryMap, action, categoryId, questionId);
			return {
				...state,
				formMode: 'edit', // adding => editing
				question,
				questionCopy: { ...question! },
				categoryMap,
				showCategoryForm: false
			};
		}

		case QuestionActionTypes.EDIT_QUESTION: {
			const { categoryId, questionId, showQuestionForm } = action;
			const { questions } = state.categoryMap.get(categoryId)!;
			const question = questions.find(q => q.questionId === questionId)!;
			return {
				...state,
				formMode: 'edit',
				question,
				questionCopy: { ...question },
				showCategoryForm: false,
				showQuestionForm
			};
		}

		// case QuestionActionTypes.STORE_QUESTION: {
		// 	const { question } = action;
		// 	const { categoryId } = question;
		// 	const { categoryMap } = reduceCategory(state.categoryMap, action, categoryId);
		// 	return {
		// 		...state,
		// 		formMode: 'edit',
		// 		categoryMap,
		// 		questionCopy: { ...question }
		// 	};
		// }

		case QuestionActionTypes.UPDATE_QUESTION: {
			let { questionCopy } = state;
			const { categoryId, questionId, categoryIdWas } = action.question; // comes from other user update
			const categoryIdCopy = categoryIdWas ? categoryIdWas : questionCopy!.categoryId;
			if (action.question.categoryId === categoryIdCopy) {
				// category hasn't been changed
				const { categoryMap, question } = reduceCategory(state.categoryMap, action, categoryId, questionId);
				return {
					...state,
					categoryMap,
					formMode: 'edit',
					question
				};
			}
			else {
				// assing question to another group
				// 1) remove question from old category
				let { categoryMap } = reduceCategory(state.categoryMap, {
					...action,
					type: QuestionActionTypes.REMOVE_QUESTION,
					categoryId: categoryIdCopy,
					questionId
				}, categoryIdCopy);
				// 2) add question  to new category
				categoryMap = reduceCategory(categoryMap, {
					...action,
					type: QuestionActionTypes.STORE_QUESTION
				}, categoryId).categoryMap;
				//
				return {
					...state,
					categoryMap,
					formMode: 'edit'
				};
			}
		}


		case QuestionActionTypes.CANCEL_QUESTION: {
			return {
				...state,
				formMode: 'display',
				question: undefined,
				showQuestionForm: false
			};
		}

		case QuestionActionTypes.REMOVE_QUESTION: {
			const { categoryId } = action;
			const { categoryMap } = reduceCategory(state.categoryMap, action, categoryId);
			return {
				...state,
				categoryMap,
				formMode: 'display',
				question: undefined
			};
		}


		// Question answers
		case QuestionActionTypes.REMOVE_QUESTION_ANSWER: {
			const { categoryId, questionId } = action;
			const { categoryMap, question } = reduceCategory(state.categoryMap, action, categoryId, questionId);
			return {
				...state,
				categoryMap,
				question
			};
		}

		case QuestionActionTypes.ASSIGN_QUESTION_ANSWER: {
			const { categoryId, questionId, answerId, assignedBy } = action;
			if (state.formMode === 'add') { 
				return {
					...state,
					question: {
						...state.question!,
						answers: [...state.question!.answers, { answerId, assignedBy, assigned: new Date() }]
					}
				}
			}
			const { categoryMap, question } = reduceCategory(state.categoryMap, action, categoryId, questionId)
			return {
				...state,
				categoryMap,
				question
			}
		}

		case QuestionActionTypes.CLOSE_QUESTION_FORM: {
			return {
				...state,
				showQuestionForm: false
			}
		}
		case QuestionActionTypes.OPEN_QUESTION_FORM: {
			return {
				...state,
				showQuestionForm: true
			}
		}

		///////////////////////////////////////////////////////////////////////////////////
		// Categories
		case QuestionActionTypes.GET_CATEGORY: {
			const { categoryId, showCategoryForm } = action;
			const category = state.categories.find(g => g.categoryId === categoryId);
			return {
				...state,
				category,
				question: undefined,
				showCategoryForm,
				showQuestionForm: false
			};
		}

		case QuestionActionTypes.ADD_CATEGORY: {
			// const group =  state.categories.find(g => g.categoryId === action.categoryId);
			const { categoryMap } = state;
			const { category, showCategoryForm } = action;
			const categoryId = state.categories.length === 0 ? 11 : Math.max(...state.categories.map(g => g.categoryId)) + 1;
			category.categoryId = categoryId
			const categoryState: ICategoryState = {
				questions: []
			}
			categoryMap.set(categoryId, categoryState)
			return {
				...state,
				formMode: 'add',
				categoryIdEditing: categoryId,
				category,
				question: undefined,
				showCategoryForm,
				showQuestionForm: false
			};
		}

		case QuestionActionTypes.TOGGLE_CATEGORY: {
			// const group = state.categories.find(g => g.categoryId === action.categoryId);
			return {
				...state,
				categories: state.categories.map(g => g.categoryId !== action.categoryId
					? g
					: { ...g, isExpanded: !g.isExpanded }
				)

			};
		}

		case QuestionActionTypes.EDIT_CATEGORY: {
			const { categories } = state;
			const { categoryId, showCategoryForm } = action;
			const category = categories.find(g => g.categoryId === categoryId)!
			return {
				...state,
				category,
				formMode: 'edit',
				categoryCopy: { ...category },
				categoryIdEditing: category.categoryId,
				showCategoryForm,
				showQuestionForm: false
				//,category for now lets keep inline editing
			};
		}

		case QuestionActionTypes.STORE_CATEGORY: {
			// const group = state.categories.find(g => g.categoryId === action.question.categoryId);
			const { category } = action;
			const { categoryMap } = state;
			const categoryState: ICategoryState = {
				questions: [] //...category.questions]
			}
			categoryMap.set(category.categoryId, categoryState)
			category.questions = [];
			const categories = [...state.categories, category]
			
			return {
				...state,
				formMode: 'edit',
				categoryIdEditing: -1,
				categories,
				categoryMap
			}
		}

		case QuestionActionTypes.UPDATE_CATEGORY: {
			// const group = state.categories.find(g => g.categoryId === action.question.categoryId);
			const { category } = action;
			const { categoryId, title } = category;
			let { categoryCopy } = state;
			return {
				...state,
				categoryIdEditing: -1,
				categories: state.categories.map(c => c.categoryId !== categoryId
					? c
					: { ...c, title }
				)
			}
		}

		case QuestionActionTypes.CANCEL_CATEGORY: {
			return {
				...state,
				formMode: 'display',
				category: undefined
			};
		}

		case QuestionActionTypes.REMOVE_CATEGORY: {
			const categories =  state.categories.reduce((acc: ICategory[], g) => {
				if (g.categoryId !== action.categoryId)
					acc.push({ ...g, questions: [...g.questions] })
				return acc
			}, [])

			return {
				...state,
				categories
			};
		}

		case QuestionActionTypes.CATEGORY_OPTIONS: {
			const categoryOptions = state.categories.map(g => ({ value: g.categoryId, label: g.title }))
			categoryOptions.unshift({ value: 0, label: 'Unknown' })
			return {
				...state,
				categoryOptions
			};
		}

		case QuestionActionTypes.CLEAR: {
			return {
				...initialCategoriesState
			};
		}

		default:
			return state;
	}
};

