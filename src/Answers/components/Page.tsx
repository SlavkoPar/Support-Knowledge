import { useContext } from 'react';
import { useParams } from 'react-router-dom' // useRouteMatch
import { ThemeContext } from "../../ThemeContext";

import { IAnswer } from '../types';
import { AnswerForm } from './Form'
import List from './List';
import { IQuestionAnswer } from '../../Categories/types';
import { Button, Col, Container, Row } from 'react-bootstrap';

interface IProps {
	answers: IAnswer[],
	answer: IAnswer,
	usedAnswers: IQuestionAnswer[],
	getCategoryQuestion: (categoryId: number, questionId: number) => string,
	formMode: string,
	add: () => void;
	edit: (answerId: number) => void;
	remove: (answerId: number) => void;
	cancel: () => void;
	saveForm: (answer: IAnswer, formMode: string) => void;
	canEdit: boolean;
}

type MyParams = {
	slug: string;
};

const Page: React.FC<IProps> = (props: IProps) => {
	// let { slug } = useParams<MyParams>();

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	// slug = ''
	const { answers, answer, usedAnswers, getCategoryQuestion, formMode, add, edit, remove, cancel, saveForm, canEdit } = props;
	return (
		<Container fluid>
			<Row className={`${darkMode ? "dark" : "light"}`}>
				<Col md={7}>
					<div className={`${darkMode ? "dark" : ""}`}>
						<Button variant="primary" onClick={() => add()} className="mb-1">Add new</Button>
						{answers.length === 0 ? (
							<div>
								{'No answers at all  '}
							</div>
						)
							: (
								<div>
									<List
										answers={answers}
										usedAnswers={usedAnswers}
										getCategoryQuestion={getCategoryQuestion}
										edit={edit}
										remove={remove} 
										canEdit={canEdit}
									/>
								</div>
							)}
					</div>
				</Col>
				<Col md={5}>
					<div className={`${darkMode ? "dark" : "light"}`}>
						{answer &&
							<div style={{ border: '1px solid silver', borderRadius: '5px', padding: '5px 5px 15px 5px' }}>
								<h4>
									{formMode === 'add' ? 'New Answer' : 'Answer'}
								</h4>
								<AnswerForm
									answer={answer}
									formMode={formMode}
									cancel={cancel}
									saveForm={(answer: IAnswer) => saveForm(answer, formMode)}
								/>
							</div>
						}
					</div>

				</Col>
			</Row>
		</Container>
	);
}

export default Page

