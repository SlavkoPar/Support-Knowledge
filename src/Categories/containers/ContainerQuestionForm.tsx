import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { IQuestion } from '../types'

import { Dispatch } from 'redux';

import { QuestionActions,  
	updateQuestion,
	cancelQuestion,
	editQuestion
} from '../actions'

import { QuestionForm } from '../components/QuestionForm';

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
		answers,
		formMode,
		canEdit: ownProps.canEdit,
		handleClose: ownProps.handleClose
	};
};


const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		editForm: (question: IQuestion, formMode: string) => 
			dispatch<any>(editQuestion(question.categoryId, question.questionId, true)),
		saveForm: (question: IQuestion, formMode: string, fromSubmit: boolean) => 
			dispatch<any>(updateQuestion(question)
		),
		cancel: () => dispatch<any>(cancelQuestion())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);

