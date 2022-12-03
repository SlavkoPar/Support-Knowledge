

import React, { useCallback, useRef, useState, useContext, useEffect } from 'react';

import { HashRouter as Router, Route, Routes } from 'react-router-dom' // useRouteMatch

import { connect, Provider } from 'react-redux';
import { Store, Dispatch } from 'redux';

import { IAppState } from './store/Store';
import { ThemeContext } from "./ThemeContext";

import Support from './components/Support';
import AnswersPage from './Answers/containers/Page'
import containers from './Categories/containers/ContainerCategoriesPage'

import UsersPage from './Users/containers/UsersPage';
import { authenticate, unAuthenticate, TopActions, navbarToggle } from './Top/actions';
import LoginForm from './Top/containers/LoginForm';
import Landing from './components/Landing';
import { ILogin, IAuth } from './Top/types';

import { Container, Row, Col } from 'react-bootstrap';

import SideBar from './SideBar';

interface IProps {
	navbarOpen: boolean,
	isAuthenticated: boolean | null;
	uuid: string | null;
	auth?: IAuth,
	toggleNavbar: () => void,
	checkAuthentication: (login: ILogin) => void;
	signOut: () => void;
}

const App = ({ navbarOpen, isAuthenticated, uuid, auth, toggleNavbar, checkAuthentication, signOut }: IProps) => {

	//const [navbarOpen, setNavbarOpen] = useState(true);
	let main: null | HTMLDivElement = null;

	//const [open, setOpen] = useState(navbarOpen);
	const [mainMd, setMainMd] = useState(9);
	const [mainLg, setMainLg] = useState(10);

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	useEffect(() => {
		// const login = {
		// 	userName: 'Jack',
		// 	pwd: 'Daniels'
		// }
		// checkAuthentication(login);
		document.body.classList.add(bg)
	}, []);

	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	}

	// null is the third state false/true/null in reducer
	const app = //isAuthenticated !== null ? (  

		<Router>
			<SideBar handleClose={handleClose} signOut={signOut} />
			<Container fluid>
				<Row className={`${darkMode ? "dark" : ""}`}>
					{/* <Col id="main" md={mainMd} lg={mainLg} className="ms-sm-auto px-md-4"> */}
					<Col id="main" className="ms-sm-auto px-md-4" variant={variant} bg={variant}>
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
						</div>

						<div className={`${darkMode ? "dark" : ""}`}>
							<Routes>
								<Route path="/" element={<Landing />} />
								<Route path="/sign-in" element={
									<LoginForm canEdit={true} isRegister={false} />
								} />
								<Route path="/register" element={
									<LoginForm canEdit={true} isRegister={true} />
								} />
								<Route path="/supporter/:tekst" element={<Support />} />
								<Route path="/questions" element={<containers.categories canEdit={true} />} />
								<Route path="/answers/:slug" element={<AnswersPage />} />
								<Route path="/users/:slug" element={<UsersPage canEdit={true} />} />
							</Routes>
						</div>

					</Col>
				</Row>

			</Container>

		</Router>
	// )
	// : (
	// 	null
	// );

	return (
		<Container fluid className="App">
			{app}
		</Container>
	);
}

const mapStateToProps = (store: IAppState) => ({
	navbarOpen: store.topState.top.navbarOpen,
	isAuthenticated: store.topState.top.isAuthenticated,
	auth: store.topState.top.auth,
	uuid: store.topState.top.uuid
});

const mapDispatchToProps = (dispatch: Dispatch<TopActions>) => {
	return {
		toggleNavbar: () => dispatch<any>(navbarToggle()),
		checkAuthentication: async (login: ILogin) => await dispatch<any>(authenticate(login)),
		signOut: () => dispatch<any>(unAuthenticate())
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);



