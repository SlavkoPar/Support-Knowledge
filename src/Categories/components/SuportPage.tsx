import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom' // useRouteMatch

import { ICategoriesProps } from '../types';

import { AutoSuggest } from '../../components/AutoSuggest';
import ContainerQuestionForm from '../containers/ContainerQuestionForm'
import { ThemeContext } from "../../ThemeContext";

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Row } from 'react-bootstrap';
import ContainerCategoryForm from '../containers/ContainerCategoryForm';

type SupportParams = {
	tekst: string;
};

const SupportPage: React.FC<ICategoriesProps> = (props: ICategoriesProps) => {
	let { tekst } = useParams<SupportParams>();
	const { categories, categoryMap, category, question, showQuestionForm, onSelectQuestion, add, canEdit, formMode, addCategory } = props;

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	
	const [showCategory, setShowCategory] = useState(false);
	const handleCloseCategory = (isCancel: boolean) => {
		if (category && category.categoryId !== 0) {
			setShowCategory(false);
			if (!isCancel) {
				add(category.categoryId, tekst ?? '', true); 
				setShow(true);
			}
		}
	}

	const open = categories && (category || question)

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	return (
		<Container fluid>
			<Row className={`${darkMode ? "dark" : ""}`}>
				<Col md={open ? 6 : 12} lg={open ? 6 : 12}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<AutoSuggest
							categories={categories}
							categoryMap={categoryMap}
							tekst={tekst}
							onSelectQuestion={(categoryId: number, questionId: number) => onSelectQuestion(categoryId, questionId, canEdit)}
						/>
						<Button
							variant={variant}
							className="button-edit"
							title="Create a new Question"
							onClick={() => { 
								if (categories.length === 0) {
									addCategory(); 
									setShowCategory(true);
								}
								else {
									add(0, tekst ?? '', true); 
									setShow(true); 
								}
							}}
						>
							<FontAwesomeIcon icon={faPlus} size="lg" />
						</Button>
					</div>
				</Col>
			</Row>
			<Row>
				<Col md={open ? 6 : 12} lg={open ? 6 : 12}>
					<div>
						{categories && question && showQuestionForm &&
							<div style={{ border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px' }}>
								<h4 style={{ textAlign: 'center' }}>Question</h4>
								<ContainerQuestionForm canEdit={canEdit} handleClose={() => { }} />
							</div>
						}
					</div>
				</Col>
			</Row>
			<Modal show={showCategory} animation={true} size="sm" centered
				className={`${darkMode ? "dark" : ""}`}
				contentClassName={`${darkMode ? "dark" : ""}`}>
				<Modal.Header closeButton>
					<Modal.Title>First create Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ContainerCategoryForm canEdit={formMode === 'display' ? false : canEdit} handleClose={handleCloseCategory} />
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

