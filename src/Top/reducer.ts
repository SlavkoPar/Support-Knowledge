// Import Reducer type
import { Reducer } from 'redux';
import {
	SUPPORT_TOP, TopActions, TopActionTypes
} from './actions';
import { ITop, ITopState } from './types';

const initialTop: ITop = {
	isAuthenticated: null,
	uuid: null,
	darkMode: true
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
					darkMode: false
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

		case TopActionTypes.NAVBAR_TOGGLE: {
			return {
				...state,
				top: {
					...state.top
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
					}
				}
			};
		}

		case TopActionTypes.UNAUTHENTICATE: {
			return {
				...state,
				top: {
					...state.top,
					isAuthenticated: false,
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