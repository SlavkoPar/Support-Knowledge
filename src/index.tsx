import React from 'react';
import * as ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Link } from 'react-router-dom' // useRouteMatch

import { Provider } from 'react-redux';

import { Store } from 'redux';

import configureStore, { IAppState } from './store/Store';
import {
	loadCategories,
	removeCategory, storeCategory, updateCategory,
	removeQuestion, storeQuestion, updateQuestion
} from './Categories/actions';
import { getAllAnswers } from './Answers/actions';

//import './custom.scss'
import './index.css';
import './normalize.scss'
import './App.css';
//import './dashboard.css';

//import './formik/formikStyles.css';
import { getAllUsers, storeUser } from './user/actions';
import { authenticate } from './Top/actions'
import { getAllTags } from './roleTags/actions';
import { loadTop } from './Top/actions';
import { IUser } from './user/types';
import App from './App';
//import { coolColors } from './cool-colors';
import { IQuestion } from './Categories/types';

import { ThemeContext, ThemeProvider } from './ThemeContext';
import { ITop } from './Top/types';

import { useContext } from 'react'
interface IProps {
	store: Store<IAppState>;
}

// coolColors();

// Generate the store
//localStorage.clear(); // !!!!!!!!!!!!

interface IEvt {
	type: string;
	entity: IQuestion;
}

const store = configureStore();
store.dispatch(loadCategories());
store.dispatch(getAllAnswers());
store.dispatch(getAllUsers())
store.dispatch<any>(loadTop())
	.then((top: ITop)=> {
		console.log({top})
	})
	.catch((err: { getMessage: () => any; }) => {
		console.error(err.getMessage());
	});
store.dispatch(getAllTags());

const sessionId = Math.floor((Math.random() * 10000) + 1);
sessionStorage.setItem('sessionId', sessionId.toString())

window.addEventListener("PassToBackground", function (evt: any) {
	// alert('Dobio')
	const { detail } = evt;
	const sessionId = sessionStorage.getItem('sessionId');
	console.log('Session breeeeeee:', sessionId, ' detail:', detail)
	if (sessionId !== detail.sessionId) {
		switch (detail.type) {
			case "STORE_CATEGORY":
				detail.entity.created = new Date(detail.entity.created);
				store.dispatch(storeCategory(false, detail.entity));
				break;
			case "UPDATE_CATEGORY":
				detail.entity.created = new Date(detail.entity.created);
				store.dispatch(updateCategory(false, detail.entity));
				break;
			case "REMOVE_CATEGORY":
				store.dispatch(removeCategory(false, detail.entity));
				break;
			case "STORE_QUESTION":
				detail.entity.created = new Date(detail.entity.created);
				store.dispatch(storeQuestion(false, detail.entity));
				break;
			case "UPDATE_QUESTION": {
				const question = detail.entity;
				question.created = new Date(question.created);
				for (let i = 0; i < question.answers.length; i++) {
					const a = question.answers[i];
					a.assigned = new Date(a.assigned);
				}
				store.dispatch(updateQuestion(false, question));
			}
				break;
			case "REMOVE_Question": {
				const { categoryId, questionId } = detail.entity
				store.dispatch(removeQuestion(false, categoryId, questionId));
			}
				break;
			default:
				break;
		}
	}

}, false);


const userIdOwner = 101;
const state = store.getState();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store} >
			<ThemeProvider darkMode={state.topState.top.darkMode }>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// Render the App
// ReactDOM.render(<Root store={store} />, document.getElementById(
//   'root'
// ) as HTMLElement);

// React.StrictMode

