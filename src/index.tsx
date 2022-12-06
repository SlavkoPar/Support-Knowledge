import React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './store/Store';
import { loadCategories } from './Categories/actions';
import { getAllAnswers } from './Answers/actions';

import './index.css';
import './normalize.scss'
import './App.css';

import { getAllUsers } from './Users/actions';
import { getAllTags } from './roleTags/actions';
import { loadTop } from './Top/actions';
import App from './App';

import { ThemeProvider } from './ThemeContext';
import { ITop } from './Top/types';

// Uncomment to clean up the localStorage
// localStorage.clear(); // !!!!!!!!!!!!

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
