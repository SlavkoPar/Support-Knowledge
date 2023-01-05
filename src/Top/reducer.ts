// Import Reducer type
import { Reducer } from 'redux';
import { RoleId } from '../Users/types';
import {
	SUPPORT_TOP, TopActions, TopActionTypes
} from './actions';
import { ITop, ITopState } from './types';

const initialTop: ITop = {
	isAuthenticated: null,
	uuid: null,
	darkMode: true,
	canEdit: false,
	showModalJSON: false
};

const initialTopState: ITopState = {
	top: initialTop
};

const aTypesToStore = Object.keys(TopActionTypes).filter(a => a !== TopActionTypes.LOAD_TOP);

export const topReducer: Reducer<ITopState, TopActions> = (state, action) => {
	const newState = myReducer(state, action);
	if (aTypesToStore.includes(action.type)) {
		localStorage.setItem(SUPPORT_TOP, JSON.stringify(newState.top));
	}
	return newState;
}

const myReducer: Reducer<ITopState, TopActions> = (
	state = initialTopState,
	action
) => {
	switch (action.type) {

		case TopActionTypes.LOAD_TOP: {
			return {
				...state,
				top: { 
					...action.top, 
					authError: ''
				}
			};
		}

		case TopActionTypes.REGISTER: {
			const { roleId } = action.user
			return {
				...state,
				top: {
					isAuthenticated: true,
					uuid: "placeholder-uuid",
					auth: {
						who: action.user,
						authenticated: new Date(),
						visited: new Date()
					},
					darkMode: false,
					canEdit: roleId === RoleId.OWNER || roleId === RoleId.ADMINS || roleId === RoleId.EDITORS,
					showModalJSON: false
				}
			};
		}

		case TopActionTypes.REGISTER_USERNAME_EXISTS: {
			return {
				...state,
				top: {
					...state.top,
					authError: "Username already exists, please chose another!"
				}
			};
		}		

		case TopActionTypes.SHOW_MODAL_JSON: {
			return {
				...state,
				top: {
					...state.top,
					showModalJSON: action.show
				}
			};
		}	
		
		case TopActionTypes.TOGGLE_MODE: {
			return {
				...state,
				top: {
					...state.top,
					darkMode: !state.top.darkMode
				}
			};
		}	

		case TopActionTypes.AUTHENTICATE: {
			const { roleId } = action.user;
			return {
				...state,
				top: {
					...state.top,
					isAuthenticated: true,
					uuid: "placeholder-uuid",
					auth: {
						who: action.user,
						authenticated: new Date(),
						visited: new Date()
					},
					canEdit: roleId === RoleId.OWNER || roleId === RoleId.ADMINS || roleId === RoleId.EDITORS
				}
			};
		}

		case TopActionTypes.UNAUTHENTICATE: {
			return {
				...state,
				top: {
					...state.top,
					isAuthenticated: false,
					canEdit: false,
					auth: undefined
				}
			};
		}

		case TopActionTypes.AUTHENTICATE_WRONG_USERNAME: {
			return {
				...state,
				top: {
					...state.top,
					authError: "User doesn't exist!"
				}
			};
		}

		case TopActionTypes.AUTHENTICATE_WRONG_PWD: {
			return {
				...state,
				top: {
					...state.top,
					authError: "Password doesn't match!"
				}
			};
		}


		default:
			return state;
	}
};