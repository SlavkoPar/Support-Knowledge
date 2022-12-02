import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom' // useRouteMatch

import { IQuestion, ICategoriesProps, initialQuestion } from '../types';

import { AutoSuggest } from '../../components/AutoSuggest';
import ContainerQuestionForm from '../containers/ContainerQuestionForm'
import { ThemeContext } from "../../ThemeContext";

import { COLORS } from '../../formik/theme';
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Select } from '../../common/Select';
import { Col, Container, Row } from 'react-bootstrap';

const color = 'blue';

type SupportParams = {
	tekst: string;
};

const SupportPage: React.FC<ICategoriesProps> = (props: ICategoriesProps) => {
	let { tekst } = useParams<SupportParams>();
	const { categories, categoryQuestions, category, question, showQuestionForm, onSelectQuestion, add, closeQuestionForm, canEdit } = props;
	console.log('tekst:', tekst)
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const open = categories && (category || question)

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	// if (showQuestionForm)
	// 	closeQuestionForm();
	
	return (
		<Container fluid>
			<Row className={`${darkMode ? "dark" : ""}`}>
				<Col md={open ? 6 : 12} lg={open ? 6 : 12}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{/* Support Page tekst: {tekst} */}
						<AutoSuggest
							categories={categories}
							categoryQuestions={categoryQuestions}
							tekst={tekst}
							onSelectQuestion={(categoryId: number, questionId: number) => onSelectQuestion(categoryId, questionId)}
						/>
						<Button
							variant={variant}
							className="button-edit"
							title="Create a new Question"
							onClick={() => { add(0, tekst ?? '', true); handleShow(); }}
						>
							<FontAwesomeIcon icon={faPlus} size="lg" />
						</Button>
					</div>
					<div className="b">
						{categories && question && showQuestionForm &&
							<div>
								<h4>Question</h4>
								<ContainerQuestionForm canEdit={canEdit} handleClose={() => { }} />
							</div>
						}
					</div>
				</Col>
			</Row>
			<Modal show={show} onHide={handleClose} animation={true} size="sm" centered 
				className={`${darkMode ? "dark" : ""}`}
				contentClassName={`${darkMode ? "dark" : ""}`}>
				<Modal.Header closeButton>
					<Modal.Title>Store question</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ContainerQuestionForm canEdit={canEdit} handleClose={handleClose} />
				</Modal.Body>
				{/* <Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer> */}
			</Modal>
		</Container>

	);
}

export default SupportPage

