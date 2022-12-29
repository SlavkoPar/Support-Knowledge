import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { ICategory } from '../types'
import { IAnswer } from '../../Answers/types'

import { Dispatch } from 'redux';

import { QuestionActions,  
	getQuestion, 
	addQuestion, 
	editQuestion,
	removeQuestion,
	closeQuestionForm,
	openQuestionForm,
	addCategory,
	editCategory,
	removeCategory,
	storeCategory,
	updateCategory,
	addAndAssignNewAnswer,
	toggleCategory,
	getCategory
} from '../actions'

import CategoryList from '../components/CategoryList'

interface IProps {
	canEdit: boolean
}

// Grab the categories from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const {categoriesState, tagState, topState} = store;
	
	const { 
		categories,
		categoryMap: categoryQuestions,
		showCategoryForm,
		category,
		showQuestionForm,
		question,
		categoryOptions,
		formMode,
		categoryIdEditing
	} = categoriesState;

	return {
		categories,
		categoryQuestions,
		categoryOptions,
		showCategoryForm,
		category,
		showQuestionForm,
		question,
		formMode,
		categoryIdEditing,
		canEdit: ownProps.canEdit,
		tagOptions: tagState.tags.map(f => ({ label: f.name, value: f.tagId, color: f.color })),
		auth: topState.top.auth
	};
};

const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		onSelectQuestion: (categoryId: number, questionId: number) => {
			dispatch<any>(getQuestion(categoryId, questionId));
			dispatch<any>(openQuestionForm());
		},
		add: (categoryId: number, text: string, canEdit?: boolean) => {
			dispatch<any>(addQuestion(categoryId, text, canEdit))
			dispatch<any>(openQuestionForm());
		},
		//edit: (categoryId: number, questionId: number) => dispatch<any>(editQuestion(categoryId, questionId)),
		edit: (categoryId: number, questionId: number, showQuestionForm: boolean) => dispatch<any>(editQuestion(categoryId, questionId, showQuestionForm)),
		remove: (categoryId: number, questionId: number) => dispatch<any>(removeQuestion(categoryId, questionId)),
		closeQuestionForm: () => dispatch<any>(closeQuestionForm()),
		openQuestionForm: () => dispatch<any>(openQuestionForm()),

		// question answer
		addAndAssignNewAnswer: (categoryId: number, questionId: number, answer: IAnswer, formMode: string) => {
			dispatch<any>(addAndAssignNewAnswer(categoryId, questionId, answer, formMode))
		},
		// groups
		onSelectCategory: (categoryId: number) => dispatch<any>(getCategory(categoryId, true)),
		addCategory: () => dispatch<any>(addCategory()),
		toggleCategory: (categoryId: number) =>  dispatch<any>(toggleCategory(categoryId)),
		editCategory: (categoryId: number) =>  dispatch<any>(editCategory(categoryId)),
		removeCategory: (categoryId: number) => dispatch<any>(removeCategory(categoryId)),
		storeCategory: (group: ICategory) => dispatch<any>(storeCategory(group)),
		updateCategory: (group: ICategory) => dispatch<any>(updateCategory(group)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
