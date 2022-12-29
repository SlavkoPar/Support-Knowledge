import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';

import { Dispatch } from 'redux';  // ActionCreatorsMapObject, 

import { QuestionActions,  
	getQuestion, 
	addQuestion, 
	closeQuestionForm,
	openQuestionForm,
	editQuestion,
	addCategory,
} from '../actions'

import CategoriesPage from '../components/CategoriesPage'
import SupportPage from '../components/SuportPage'

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
		categoryIdEditing,
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
		onSelectQuestion: (categoryId: number, questionId: number, canEdit: boolean) => {
			dispatch<any>(canEdit?editQuestion(categoryId, questionId):getQuestion(categoryId, questionId));
			dispatch<any>(openQuestionForm());
		},
		add: (categoryId: number, text: string, canEdit?: boolean) => dispatch<any>(addQuestion(categoryId, text, canEdit)),
		addCategory: () => dispatch<any>(addCategory()),
		closeQuestionForm: () => dispatch<any>(closeQuestionForm())
	}
}


export default {
	categories: connect(mapStateToProps, mapDispatchToProps)(CategoriesPage),
	supporter: connect(mapStateToProps, mapDispatchToProps)(SupportPage)
};