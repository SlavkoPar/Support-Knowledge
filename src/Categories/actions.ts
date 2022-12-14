// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Import Question Typing
import { IQuestion, ICategory, ICategoryJson, ICategoriesState, IQuestionJson, ICategoryState } from './types';

import { addAnswer, AnswerActionTypes, storeAnswer } from '../Answers/actions'
import { IAnswer } from '../Answers/types';

///////////////////////////////////////////////////
// localStorage
import { initialCategory, SUPPORT_CATEGORIES } from './categoriesReducer';

import data from "./data.json"
import { IAppState } from '../store/Store';

const parseFromJson = (): ICategory[] => {
	return data.map(g => parseDates(g));
}

const parseQuestionsFromLocalStorage = (questions: IQuestionJson[]): IQuestion[] => {
	return questions.map(q => ({
		...q,
		categoryId: q.categoryId!,
		words: q.text.split(' '),
		answers: q.answers.map(a => ({ ...a, assigned: new Date(a.assigned) })),
		created: new Date(q.created)
	})
	)
}

const parseFromLocalStorage = (arr: ICategoryJson[]): ICategory[] => {
	return arr.map(g => parseDates(g));
}

const parseDates = (g: ICategoryJson): ICategory => {
	return {
		...g,
		questions: g.questions.map(q => ({
			...q,
			categoryId: g.categoryId,
			answers: q.answers.map(a => ({ ...a, assigned: new Date(a.assigned) })),
			created: new Date(q.created)
		})),
		created: new Date(g.created)
	}
}

// Create Action Constants
export enum QuestionActionTypes {
	LOAD_CATEGORIES = 'LOAD_CATEGORIES',
	GET_QUESTION = 'GET_QUESTION',
	ADD_QUESTION = 'ADD_QUESTION',
	EDIT_QUESTION = 'EDIT_QUESTION',
	REMOVE_QUESTION = 'REMOVE_QUESTION',
	STORE_QUESTION = 'STORE_QUESTION',
	UPDATE_QUESTION = 'UPDATE_QUESTION',
	CANCEL_QUESTION = 'CANCEL_QUESTION',
	CLOSE_QUESTION_FORM = 'CLOSE_QUESTION_FORM',
	OPEN_QUESTION_FORM = 'OPEN_QUESTION_FORM',

	// groups
	GET_CATEGORY = 'GET_CATEGORY',
	ADD_CATEGORY = 'ADD_CATEGORY',
	TOGGLE_CATEGORY = 'TOGGLE_CATEGORY',
	EDIT_CATEGORY = 'EDIT_CATEGORY',
	REMOVE_CATEGORY = 'REMOVE_CATEGORY',
	STORE_CATEGORY = 'STORE_CATEGORY',
	UPDATE_CATEGORY = 'UPDATE_CATEGORY',
	CANCEL_CATEGORY = 'CANCEL_CATEGORY',
	CATEGORY_OPTIONS = 'CATEGORY_OPTIONS',
	// question answers
	REMOVE_QUESTION_ANSWER = 'REMOVE_QUESTION_ANSWER',
	ASSIGN_QUESTION_ANSWER = 'ASSIGN_QUESTION_ANSWER',
	// localSTorage
	SET_LAST_ANSWER_ID = 'SET_LAST_ANSWER_ID',
	CLEAR = 'CLEAR'
}


// Interface for Get All Action Type
export interface ILoad {
	type: QuestionActionTypes.LOAD_CATEGORIES;
	categories: ICategory[];
	categoryMap: Map<number, ICategoryState>
}


export interface IGet {
	type: QuestionActionTypes.GET_QUESTION;
	categoryId: number;
	questionId: number;
}

export interface IAdd {
	type: QuestionActionTypes.ADD_QUESTION;
	// createdBy: number;
	// categoryId: number;
	// text: string;
	question: IQuestion
}

export interface IEdit {
	type: QuestionActionTypes.EDIT_QUESTION;
	categoryId: number;
	questionId: number;
	showQuestionForm: boolean;
}

export interface IRemove {
	type: QuestionActionTypes.REMOVE_QUESTION;
	categoryId: number;
	questionId: number;
}



export interface IStore {
	type: QuestionActionTypes.STORE_QUESTION;
	question: IQuestion;
}

export interface IUpdate {
	type: QuestionActionTypes.UPDATE_QUESTION;
	question: IQuestion;
}

export interface ICancel {
	type: QuestionActionTypes.CANCEL_QUESTION;
}

export interface ICloseQuestionForm {
	type: QuestionActionTypes.CLOSE_QUESTION_FORM;
}

export interface IOpenQuestionForm {
	type: QuestionActionTypes.OPEN_QUESTION_FORM;
}




// group

export interface IGetCategory {
	type: QuestionActionTypes.GET_CATEGORY;
	categoryId: number,
	showCategoryForm: boolean
}

export interface IAddCategory {
	type: QuestionActionTypes.ADD_CATEGORY;
	category: ICategory,
	showCategoryForm: boolean
}

export interface ICancelCategory {
	type: QuestionActionTypes.CANCEL_CATEGORY;
}


export interface IToggleCategory {
	type: QuestionActionTypes.TOGGLE_CATEGORY;
	categoryId: number
}

export interface IEditCategory {
	type: QuestionActionTypes.EDIT_CATEGORY;
	categoryId: number,
	showCategoryForm: boolean
}

export interface IRemoveCategory {
	type: QuestionActionTypes.REMOVE_CATEGORY;
	categoryId: number
}

export interface IStoreCategory {
	type: QuestionActionTypes.STORE_CATEGORY;
	category: ICategory;
}

export interface IUpdateCategory {
	type: QuestionActionTypes.UPDATE_CATEGORY;
	category: ICategory;
}

export interface ICancelCategory {
	type: QuestionActionTypes.CANCEL_CATEGORY;
}


// question answers
export interface IRemoveQuestionAnswer {
	type: QuestionActionTypes.REMOVE_QUESTION_ANSWER;
	categoryId: number,
	questionId: number,
	answerId: number
}

export interface IAssignQuestionAnswer {
	type: QuestionActionTypes.ASSIGN_QUESTION_ANSWER;
	categoryId: number,
	questionId: number,
	answerId: number,
	assignedBy: number,
	tekst?: string
}

export interface IAddAndAssignNewAnswer {
	type: AnswerActionTypes.STORE_ANSWER;
	categoryId: number,
	questionId: number,
	answer: IAnswer;
}

export interface IAddAndAssignNewAnswer {
	type: AnswerActionTypes.STORE_ANSWER;
	categoryId: number,
	questionId: number,
	answer: IAnswer;
}

export interface IClear {
	type: QuestionActionTypes.CLEAR;
}

export interface ICategoryOptions {
	type: QuestionActionTypes.CATEGORY_OPTIONS;
}



// Combine the action types with a union (we assume there are more)
export type QuestionActions = ILoad | IGet | IAdd | IEdit | IRemove | IStore | IUpdate | ICancel |
	IGetCategory | IAddCategory | IToggleCategory | IEditCategory | IRemoveCategory |
	IStoreCategory | IUpdateCategory | ICancelCategory | ICategoryOptions |
	IRemoveQuestionAnswer | IAssignQuestionAnswer |
	IAddAndAssignNewAnswer |
	ICloseQuestionForm | IOpenQuestionForm | IClear;

const isWebStorageSupported = () => 'localStorage' in window


// Get All Action <Promise<Return Type>, State Interface, Type of Param, Type of Action>
export const loadCategories: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, ILoad>
> = () => {
	return async (dispatch: Dispatch) => {
		try {
			let categories: ICategory[] = [];
			let loadedFromStorage = false;
			if (isWebStorageSupported()) {
				const sCategories = localStorage.getItem(SUPPORT_CATEGORIES);
				console.log("sCategories", sCategories)
				if (sCategories !== null) {
					// load from storage
					const categoriesJson = JSON.parse(sCategories);
					categories = parseFromLocalStorage(categoriesJson);
					categories.forEach(category => {
						const sQuestions = localStorage.getItem(`CATEGORY_${category.categoryId}`);
						if (sQuestions) {
							const json = JSON.parse(sQuestions);
							category.questions = parseQuestionsFromLocalStorage(json);
						}
					})
					loadedFromStorage = true;
				}
			}
			console.log({ categories })

			if (!loadedFromStorage) {
				// load from data
				categories = parseFromJson();
				for (let category of categories) {
					category.questions.forEach(q => q.categoryId = category.categoryId);
					localStorage.setItem(`CATEGORY_${category.categoryId}`, JSON.stringify(category.questions));
					category.questions.forEach(q => q.words = q.text.split(' '));
				}
			}

			const categoryMap = new Map<number, ICategoryState>();
			for (let category of categories) {
				const categoryState: ICategoryState = {
					questions: [...category.questions]
				}
				categoryMap.set(category.categoryId, categoryState);
				category.questions = [];
			}

			if (!loadedFromStorage) {
				localStorage.setItem(SUPPORT_CATEGORIES, JSON.stringify(categories));
			}

			dispatch<any>({
				type: QuestionActionTypes.LOAD_CATEGORIES,
				categories,
				categoryMap
			})
		}
		catch (err) {
			console.error(err);
		}
	};
};


// Get Question <Promise<Return Type>, State Interface, Type of Param, Type of Action> 
export const getQuestion: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, string, IGet>
> = (categoryId: number, questionId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.GET_QUESTION,
				categoryId,
				questionId
			});
		} catch (err) {
			console.error(err);
		}
	};
};

interface IMsg {
	ttype: string,
	data: object
}



export const addQuestion: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IAdd>
> = (categoryId: number, text: string, canEdit?: boolean) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			dispatch({
				type: QuestionActionTypes.ADD_QUESTION,
				question: {
					categoryId,
					createdBy: getState().topState.top!.auth!.who!.userId,
					text,
					words: text.split(' ')
				},
				showCategoryForm: false
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const editQuestion: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IEdit>
> = (categoryId: number, questionId: number, showQuestionForm: boolean) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.EDIT_QUESTION,
				categoryId,
				questionId,
				showCategoryForm: false,
				showQuestionForm
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const removeQuestion: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IRemove>
> = (categoryId: number, questionId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			// warning: store answer, after upodate, to local storage
			dispatch({
				type: QuestionActionTypes.REMOVE_QUESTION,
				categoryId,
				questionId
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const selectQuestionAnswer: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IRemoveQuestionAnswer>
> = (categoryId: number, questionId: number, answerId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			// warning: store answer, after upodate, to local storage
			dispatch({
				type: QuestionActionTypes.REMOVE_QUESTION_ANSWER,
				categoryId: categoryId,
				questionId: questionId,
				answerId: answerId,
			});
			//dispatch<any>(getQuestion(questionId))	// refresh state of question
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const copyQuestionAnswer: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IRemoveQuestionAnswer>
> = (categoryId: number, questionId: number, answerId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			// warning: store answer, after upodate, to local storage
			dispatch({
				type: QuestionActionTypes.REMOVE_QUESTION_ANSWER,
				categoryId: categoryId,
				questionId: questionId,
				answerId: answerId,
			});
			//dispatch<any>(getQuestion(questionId))	// refresh state of question
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const removeQuestionAnswer: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IRemoveQuestionAnswer>
> = (categoryId: number, questionId: number, answerId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			dispatch({
				type: QuestionActionTypes.REMOVE_QUESTION_ANSWER,
				categoryId: categoryId,
				questionId: questionId,
				answerId: answerId,
			});
			// dispatch<any>(getQuestion(questionId))	// refresh state of question
		}
		catch (err) {
			console.error(err);
		}
	};
};


export const assignQuestionAnswer: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IRemoveQuestionAnswer>
> = (categoryId: number, questionId: number, answerId: number, tekst?: string) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			await delay();
			// warning: store answer, after upodate, to local storage
			dispatch({
				type: QuestionActionTypes.ASSIGN_QUESTION_ANSWER,
				categoryId,
				questionId,
				answerId,
				assignedBy: getState().topState.top!.auth!.who!.userId
			});
			//dispatch<any>(getQuestion(questionId))	// refresh state of question
		}
		catch (err) {
			console.error(err);
		}
	};
};


/*
const syncWithOthers = (type: string, entity: any) => {
	
	const btnSync = document.getElementById('btnSync');
	localStorage.setItem('syncAction', JSON.stringify({
			type,
			entity,
			sessionId: sessionStorage.getItem('sessionId')
		})
	);
	btnSync!.click();
};
*/


export const updateQuestion: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IUpdate>
> = (question: IQuestion) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			await delay();
			dispatch({
				type: QuestionActionTypes.UPDATE_QUESTION,
				question
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};


export const storeQuestion: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IStore>
> = (question: IQuestion) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		const { categoryId } = question;
		try {
			//await delay();
			dispatch({
				type: QuestionActionTypes.STORE_QUESTION,
				question
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};

const delay = (): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({
				'status': 200,
				'content-type': 'application/json',
				'data': {
					'results': 1
				}
			})
		}, 50)
	})
}

export const cancelQuestion: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.CANCEL_QUESTION
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const closeQuestionForm: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.CLOSE_QUESTION_FORM
			});
		} catch (err) {
			console.error(err);
		}
	};
};




export const openQuestionForm: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.OPEN_QUESTION_FORM
			});
		} catch (err) {
			console.error(err);
		}
	};
};


export const getCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, string, IGet>
> = (categoryId: number, showCategoryForm: boolean) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.GET_CATEGORY,
				categoryId,
				showCategoryForm
			});
		} catch (err) {
			console.error(err);
		}
	};
};


export const addCategory: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IAddCategory>
> = () => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			dispatch({
				type: QuestionActionTypes.ADD_CATEGORY,
				category: {
					...initialCategory,
					createdBy: getState().topState.top!.auth!.who!.userId
				},
				showCategoryForm: true
			});
		} catch (err) {
			console.error(err);
		}
	};
};

export const toggleCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IEditCategory>
> = (categoryId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.TOGGLE_CATEGORY,
				categoryId
			});
		} catch (err) {
			console.error(err);
		}
	};
};


export const editCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IEditCategory>
> = (categoryId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.EDIT_CATEGORY,
				categoryId,
				showCategoryForm: true
			});
		} catch (err) {
			console.error(err);
		}
	};
}

export const removeCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IRemoveCategory>
> = (categoryId: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await delay()
			// warning: store answer, after update, to local storage
			dispatch({
				type: QuestionActionTypes.REMOVE_CATEGORY,
				categoryId
			});
			return Promise.resolve(0)
		} catch (err) {
			console.error(err);
		}
	};
};

export const storeCategory: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IStoreCategory>
> = (category: ICategory) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			dispatch({
				type: QuestionActionTypes.STORE_CATEGORY,
				category
			});
			return Promise.resolve(category.categoryId)
		}
		catch (err) {
			console.error(err);
		}
	};
};


export const updateCategory: ActionCreator<
	ThunkAction<Promise<any>, ICategoriesState, null, IUpdateCategory>
> = (category: ICategory) => {
	return async (dispatch: Dispatch) => {
		try {
			// await updateCategoryFromLocalStorage(group);
			dispatch({
				type: QuestionActionTypes.UPDATE_CATEGORY,
				category
			});
			return Promise.resolve(category.categoryId)
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const cancelCategory: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.CANCEL_CATEGORY
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const categoryOptions: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.CATEGORY_OPTIONS
			});
		}
		catch (err) {
			console.error(err);
		}
	};
};


export const addAndAssignNewAnswer: ActionCreator<
	ThunkAction<Promise<any>, IAppState, null, IStore>
> = (categoryId: number, questionId: number, answer: IAnswer, formMode: string) => {
	return async (dispatch: Dispatch, getState: () => IAppState) => {
		try {
			answer.createdBy = getState().topState.top!.auth!.who!.userId;
			dispatch<any>(addAnswer());
			dispatch<any>(storeAnswer(answer, formMode))
				.then((answerId: number) => {
					dispatch<any>(assignQuestionAnswer(categoryId, questionId, answerId))
				});
		}
		catch (err) {
			console.error(err);
		}
	};
};

export const clearQuestions: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		try {
			dispatch({
				type: QuestionActionTypes.CLEAR
			});
		} catch (err) {
			console.error(err);
		}
	};
};