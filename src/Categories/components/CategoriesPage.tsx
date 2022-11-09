import * as React from 'react';
import { useRef, useState, useContext } from 'react'

import { ICategoriesProps } from '../types'

import { AutoSuggest } from '../../components/AutoSuggest';
import ContainerCategoryForm from '../containers/ContainerCategoryForm';
import ContainerQuestionForm from '../containers/ContainerQuestionForm';
import QuestionRow from './QuestionRow';
import CategoryRow from './CategoryRow';
import { useParams } from 'react-router-dom' // useRouteMatch
import { ThemeContext } from "../../ThemeContext";

import { COLORS } from '../../formik/theme';
import { Col, Collapse, Container, Row } from 'react-bootstrap';
import ContainerCategoryList from '../containers/ContainerCategoryList';

const color = 'blue';

type SupportParams = {
	tekst: string;
};

const Page: React.FC<ICategoriesProps> = (props: ICategoriesProps) => {

	let { tekst } = useParams<SupportParams>();

	const { 
		categories, 
		categoryQuestions, 
		showCategoryForm, 
		category, 
		showQuestionForm, 
		question, 
		formMode, 
		canEdit,
		onSelectQuestion } = props;

	//const [open, setOpen] = useState(false);
	const open = categories && (category || question)

	const inputEl = useRef<HTMLInputElement>(null);
	setTimeout(() => {
		if (inputEl.current !== null) {
			inputEl.current!.select();
			inputEl.current!.focus()
		}
	}, 100)

	console.log('RENDERUJEM Categories ----------->>>>>>>>>>')
	// if (showQuestionForm)
	// 	closeQuestionForm();
	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;


	return (
		<>
			<Container fluid>
				<Row className={`${darkMode ? "row-dark" : "row-light"}`}>
					<Col md={open ? 6 : 12} lg={open ? 6 : 12}>
						<div style={{ border: '0px solid silver' }}>
							<AutoSuggest
								categories={categories}
								categoryQuestions={categoryQuestions}
								tekst={tekst}
								onSelectQuestion={(categoryId: number, questionId: number) => onSelectQuestion(categoryId, questionId)}
							/>
							<hr />
							{/* <h3>Categories</h3> */}
							{categories && 
								<ContainerCategoryList {...props} />
							}
						</div>
					</Col>
					<Col md={open ? 6 : 0} lg={open ? 6 : 0} >
						<div style={{ border: '0px solid silver', backgroundColor: 'white' }}>
							{categories && showCategoryForm && category &&
								<div style={{ border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px', background: COLORS[color][5] }}>
									<h4 style={{ marginTop: 0, color: 'white' }}>Category</h4>
									{formMode === 'display' ?
										<ContainerCategoryForm canEdit={false} />
										:
										<ContainerCategoryForm canEdit={canEdit} />
									}
								</div>
							}

							{categories && showQuestionForm && question &&
								<div style={{ border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px', background: COLORS[color][5] }}>
									<h4 style={{ marginTop: 0, color: 'white' }}>Question</h4>
									<ContainerQuestionForm canEdit={formMode === 'display' ? false: canEdit} handleClose={() => { }} />
								</div>
							}
						</div>
					</Col>
					{/* </Collapse> */}
				</Row>
			</Container>
		</>
	);
}

export default Page;