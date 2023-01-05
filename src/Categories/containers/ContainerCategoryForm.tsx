import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { ICategory } from '../types'

import { Dispatch } from 'redux';  // ActionCreatorsMapObject, 

import {
	storeCategory,
	updateCategory,
	cancelCategory,
	QuestionActions,
	categoryOptions
} from '../actions'

import { CategoryForm } from '../components/CategoryForm';

interface IProps {
	handleClose: (isCancel: boolean) => void
}

// Grab the categories from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const {categoriesState, topState } = store;
	const { category, formMode } = categoriesState; 
	return {
		category,
		formMode,
		canEdit: topState.top.canEdit,
		handleClose: ownProps.handleClose
	};
};


const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		saveForm: (category: ICategory, formMode: string) => {
			if (formMode==='add')
				dispatch<any>(storeCategory(category)).then(()=> dispatch(categoryOptions()))
			else
				dispatch<any>(updateCategory(category)).then(()=> dispatch(categoryOptions()))
		},
		cancel: () => dispatch<any>(cancelCategory())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
