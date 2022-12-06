// import * as React from 'react';
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
	canEdit: boolean
}

// Grab the categories from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const {categoriesState } = store;
	const { category, formMode } = categoriesState; 
	return {
		category,
		formMode,
		canEdit: ownProps.canEdit
	};
};


const mapDispatchToProps = (dispatch: Dispatch<QuestionActions>) => {
	return {
		saveForm: (category: ICategory, formMode: string) => 
			dispatch<any>(formMode==='add'?storeCategory(true, category):updateCategory(true, category)),
		cancel: () => dispatch<any>(cancelCategory()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
