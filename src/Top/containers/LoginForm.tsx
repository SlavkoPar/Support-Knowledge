// import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';

import { Dispatch } from 'redux'; 

import { register, authenticate, cancelLogin, TopActions } from '../actions'

import { LoginForm } from '../components/LoginForm';
import { ILogin } from '../types';

interface IProps {
	isRegister: boolean
}

const mapStateToProps = (store: IAppState, ownProps: IProps) => {
	const { topState } = store;
	const { top } = topState;
	return {
		isAuthenticated: top.isAuthenticated,
		uuid: top.uuid,
		authError: top.authError,
		canEdit: top.canEdit,
		isRegister: ownProps.isRegister,
		formMode: 'edit'
	};
};


const mapDispatchToProps = (dispatch: Dispatch<TopActions>) => {
	return {
		saveForm: (login: ILogin, formMode: string, isRegister: boolean) => 
			dispatch<any>(isRegister ? 
				register(login)	: authenticate(login)),
		cancel: () => dispatch<any>(cancelLogin())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

