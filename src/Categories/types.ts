import { IAnswer } from '../Answers/types'
import { IOption } from '../common/types';
import { IAuth } from "../Top/types";

// Define the Question type
export interface IQuestionAnswer {
	categoryId?: number;
	questionId?: number;
	answerId: number,
	assignedBy: number,
	assigned: Date,
	text?: string
}

export interface IQuestionAnswerJson extends Omit<IQuestionAnswer, 'assigned'> {
	assigned: string
}

export interface IQuestion {
	categoryId: number,
	questionId: number,
	text: string,
	words?: string[],
	answers: IQuestionAnswer[],
	source: number,
	status: number,
	createdBy: number,
	created: Date
}

export interface IQuestionJson extends Omit<IQuestion, 'categoryId' | 'answers' | 'created'> {
	categoryId?: number,
	answers: IQuestionAnswerJson[],
	created: string
}

export interface ICategory {
	categoryId: number,
	title: string,
	questions: IQuestion[],
	isExpanded?: boolean,
	createdBy: number,
	created: Date
}

export interface ICategoryJson extends Omit<ICategory, 'created' | 'questions'> {
	questions: IQuestionJson[],
	created: string
}

export const initialQuestion: IQuestion = {
	categoryId: 0,
	questionId: 0,
	text: '',
	words: [],
	answers: [],
	source: 0,
	status: 0,
	createdBy: 0,
	created: new Date()
 };

export interface ICategoriesProps {
	categories: ICategory[];
	categoryMap: Map<number, ICategoryState>,
	showCategoryForm: boolean;
	showQuestionForm: boolean;
	category: ICategory | undefined;
	question: IQuestion | undefined;
	formMode: string,
	canEdit: boolean,
	auth?: IAuth,
	onSelectQuestion: (categoryId: number, questionId: number, canEdit: boolean) => void;
	add:  (categoryId: number, text: string, canEdit?: boolean) => void;
	addCategory: () => void,
	closeQuestionForm: () => void;
	handleClose: () => void;
}

export interface ICategoryListProps {
	categories: ICategory[];
	categoryMap: Map<number, ICategoryState>,
	categoryOptions: IOption<number>[],
	showCategoryForm: boolean;
	showQuestionForm: boolean;
	category: ICategory | undefined;
	question: IQuestion | undefined;
	lastAnswer?: IAnswer;
	formMode: string,
	categoryIdEditing: number,
	canEdit: boolean,
	auth?: IAuth,
	onSelectQuestion: (categoryId: number, questionId: number) => void;
	add: (categoryId: number, text: string, canEdit?: boolean) => void;
	edit: (categoryId: number, questionId: number, showQuestionForm: boolean) => void;
	remove: (categoryId: number, questionId: number) => void;
	closeQuestionForm: () => void;
	openQuestionForm: () => void;

	// groups
	onSelectCategory: (categoryId: number) => ICategory;
	addCategory: () => void;
	toggleCategory: (categoryId: number) => void;
	editCategory: (categoryId: number) => void;
	removeCategory: (categoryId: number) => void;
	storeCategory: (group: ICategory) => void;
	updateCategory: (group: ICategory) => void;
	// question answer
	addAndAssignNewAnswer: (categoryId: number, questionId: number, answer: IAnswer, formMode: string) => void
}


export interface ICategoryState {
	questions: IQuestion[];
}


// Define the Question State
export interface ICategoriesState {
	readonly categories: ICategory[];
	readonly category: ICategory | undefined;
	readonly question: IQuestion | undefined;
	showCategoryForm: boolean,
	showQuestionForm: boolean,
	categoryCopy?: ICategory;
	questionCopy?: IQuestion;
	categoryMap: Map<number, ICategoryState>,
	categoryOptions: IOption<number>[];
	loading: boolean,
	formMode: string;
	categoryIdEditing: number;
}


export interface IQuestionFormProps {
	question: IQuestion;
	answers: IAnswer[];
	formMode: string;
	canEdit: boolean,
	categoryOptions: IOption<number>[],
	handleClose: () => void;
	cancel: () => void;
	editForm: (question: IQuestion, formMode: string) => void;
 	saveForm: (question: IQuestion, formMode: string) => void;
  }

  export interface ICategoryFormProps {
	category: ICategory | undefined;
	formMode: string;
	canEdit: boolean;
	handleClose: (isCancel: boolean) => void;
	cancel: () => void;
	saveForm: (category: ICategory, formMode: string) => void;
  }

 