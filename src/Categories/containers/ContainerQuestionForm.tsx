import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { IQuestion } from '../types'

import { Dispatch } from 'redux';

import { QuestionActions,  
	updateQuestion,
	cancelQuestion,
	editQuestion,
	storeQuestion
} from '../actions'

import { QuestionForm } from '../components/QuestionForm';

interface IProps {
	handleClose: () => void
}

// Grab the categories from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const {categoriesState, answerState, topState } = store;
	const { question, categoryOptions, formMode } = categoriesState; 
	const { answers } = answerState;
	return {
		categoryOptions,
		question: question!,
		answers,
		formMode,
		canEdit: topState.top.canEdit,
		handleClose: ownProps.handleClose
	};
};


const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		editForm: (question: IQuestion, formMode: string) => 
			dispatch<any>(editQuestion(question.categoryId, question.questionId, true)),
		saveForm: (question: IQuestion, formMode: string) => 
		dispatch<any>(formMode==='add'
			? storeQuestion(question)
			: updateQuestion(question)
		),
		cancel: () => dispatch<any>(cancelQuestion())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);

