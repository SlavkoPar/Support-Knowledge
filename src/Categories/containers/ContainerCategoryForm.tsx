import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { ICategory } from '../types'

import { Dispatch } from 'redux';  // ActionCreatorsMapObject, 

import {
	storeCategory,
	updateCategory,
	cancelCategory,
	QuestionActions
} from '../actions'

import { CategoryForm } from '../components/CategoryForm';

interface IProps {
	canEdit: boolean,
	handleClose: () => void
}

// Grab the categories from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const {categoriesState } = store;
	const { category, formMode } = categoriesState; 
	return {
		category,
		formMode,
		canEdit: ownProps.canEdit,
		handleClose: ownProps.handleClose
	};
};


const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		saveForm: (category: ICategory, formMode: string) => 
			dispatch<any>(formMode==='add' 
				? storeCategory(category)
				: updateCategory(category)),
		cancel: () => dispatch<any>(cancelCategory())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
