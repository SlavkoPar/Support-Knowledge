import { connect } from 'react-redux';

import { IAppState } from '../../store/Store';
import { IRole } from '../types'

import { Dispatch } from 'redux';  // ActionCreatorsMapObject, 

import { UserActions,  
	getUser, 
	addUser, 
	editUser,
	removeUser,
	addRole,
	editRole,
	removeRole,
	storeRole,
	toggleRole
} from '../actions'

import UsersPage from '../components/UsersPage'

interface IProps {
}

// Grab the users from the store and make them available on props
const mapStateToProps = (store: IAppState, ownProps: IProps ) => {
	const { usersState,  topState} = store;
	const { roles, userEditing, formMode, roleIdEditing } = usersState; 
	return {
		who: topState.top.auth!.who,
		roles,
		userEditing,
		formMode,
		roleIdEditing,
		canEdit: topState.top.canEdit
	};
};

const mapDispatchToProps = (dispatch: Dispatch<UserActions>) => {
	return {
		// user
		onSelectUser: (userId: number) => dispatch<any>(getUser(userId)),
		add: (userRoleId: number, text: string, canEdit?: boolean) => dispatch<any>(addUser(userRoleId, text, canEdit)),
		edit: (userRoleId: number, userId: number) => dispatch<any>(editUser(userRoleId, userId)),
		remove: (userRoleId: number, userId: number) => dispatch<any>(removeUser(userRoleId, userId)),
		// groups
		addRole: () => dispatch<any>(addRole()),
		toggleRole: (roleId: number) =>  dispatch<any>(toggleRole(roleId)),
		editRole: (roleId: number) =>  dispatch<any>(editRole(roleId)),
		removeRole: (roleId: number) => dispatch<any>(removeRole(roleId)),
		storeRole: (role: IRole) => dispatch<any>(storeRole(role))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
