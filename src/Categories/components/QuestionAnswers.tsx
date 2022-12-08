import * as React from 'react';

import { IQuestion, IQuestionAnswer } from '../types';
import { IAnswer } from '../../Answers/types';
import { AutoSuggestAnswer } from '../../components/AutoSuggestAnswer';
import QuestionAnswerRow from './QuestionAnswerRow';
import { ThemeContext } from '../../ThemeContext';
import { useContext, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { AnswerForm } from '../../Answers/components/Form';

interface IProps {
	question: IQuestion,
	questionAnswers: IQuestionAnswer[],
	answers?: IAnswer[],
	answer?: IAnswer,
	canEdit: boolean,
	formMode: string,
	selectQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void,
	copyQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void,
	removeQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void,
	assignQuestionAnswer: (categoryId: number, questionId: number, answerId: number, tekst?: string) => void,
	setAnswerText?: (val: string) => void;
	add: (categoryId: number, questionId: number) => void,
	saveForm: (categoryId: number, questionId: number, answer: IAnswer) => void,
	cancel: () => void
}

const QuestionAnswers: React.FC<IProps> = (props: IProps) => {
	const {
		question,
		questionAnswers,
		answers,
		answer,
		canEdit,
		formMode,
		selectQuestionAnswer, copyQuestionAnswer, removeQuestionAnswer,
		assignQuestionAnswer, add, saveForm, cancel
	} = props;

	const answersUnassigned = answers!.filter(a => !question.answers.map(a => a.answerId).includes(a.answerId))

	const [tekst, setTekst] = React.useState('');
	const setAnswerText = (val: string) => {
		setTekst(val);
	}

	// const assignQuestionAnswerTekst = () => {
	// 	if (assignQuestionAnswer) {
	// 		//storeAnswer({ answerId: -1, text: tekst }, 'add')
	// 		assignQuestionAnswer(
	// 			question.categoryId,
	// 			question.questionId,
	// 			-1,
	// 			tekst
	// 		);
	// 	}
	// }

	const assignQA = (categoryId: number, questionId: number, answerId: number) => {
		assignQuestionAnswer(
			categoryId,
			questionId,
			answerId
		);
		setShowAssign(false);
	}


	const addAnswer = () => {
		add(question.categoryId, question.questionId);
		handleShow();
	}

	const saveAnswerForm = (answer: IAnswer, formMode: string) => {
		saveForm(question.categoryId, question.questionId, answer);
		handleClose();
	};

	const cancelAnswer = () => {
		cancel();
		handleClose();
	}

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showAssign, setShowAssign] = useState(false);

	return (
		<div className="name-container">
			{/* { questionAnswers.length === 0 && 
				<div>
					No answers yet
				</div>
			} */}
			{questionAnswers.length > -1 &&
				<div style={{ height: '100px', overflowY: 'auto' }}>
					<Table variant={variant} responsive striped bordered hover size="sm" className="mb-0">
						<thead>
							<tr>
								<th colSpan={2} className="py-0 px-5" style={{ color: 'lightblue' }}>{questionAnswers.length === 0 ? 'No answers yet' : 'Answers'}</th>
							</tr>
						</thead>
						<tbody>
							{questionAnswers.map(qa =>
								<tr key={qa.answerId}>
									<td
										title={`AnswerId:${qa.answerId}\nAssigned: ${qa.assigned.toLocaleDateString()} ${qa.assigned.toLocaleTimeString()}`}
										className="py-0 px-0"
										colSpan={2}
									>
										<QuestionAnswerRow
											key={qa.answerId}
											question={question}
											questionAnswer={qa}
											selectQuestionAnswer={selectQuestionAnswer}
											copyQuestionAnswer={copyQuestionAnswer}
											removeQuestionAnswer={removeQuestionAnswer}
										/>
									</td>
									{/* <td title={`AnswerId:${qa.answerId}\nAssigned: ${qa.assigned.toLocaleDateString()} ${qa.assigned.toLocaleTimeString()}`}>
									{qa.text}
								</td>
								{ canEdit && formMode !== 'display' &&
									<td>
										<button className="button-remove" title="Remove Answer" 
											onClick={(e) => { 
												e.stopPropagation();
												e.preventDefault();
												removeQuestionAnswer!(question.categoryId, question.questionId, qa.answerId)
												}}>
											<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
										</button>
									</td>
								} */}
								</tr>
							)}

						</tbody>
					</Table>
				</div>
			}
			{canEdit && formMode !== 'display' &&
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-1">
					<Button size="sm" className="button-edit py-0" title="Assign a new Answer" style={{border:'1px solid silver', fontSize: '12px'}}
						variant={variant}
						onClick={
							(e) => {
								setShowAssign(true);
								e.preventDefault()
							}
						}>
						Assign a new answer
					</Button>
					<Button size="sm" className="button-edit py-0" title="Add a new Answer" style={{border:'1px solid silver', fontSize: '12px'}}
						variant={variant}
						onClick={
							(e) => {
								addAnswer();
								e.preventDefault()
							}
						}>
						Create a new answer{/* <FontAwesomeIcon icon={faPlus} color='lightblue' /> */}
					</Button>
				</div>
			}
			<Modal show={show} onHide={handleClose} animation={true} centered size="lg"
				className={`${darkMode ? "dark" : ""}`}
				contentClassName={`${darkMode ? "dark" : ""}`}>
				<Modal.Header closeButton>
					<Modal.Title>Add answer</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ height: '40vh', width: '50vw' }} >
					<AnswerForm
						answer={answer!}
						formMode='add'
						cancel={cancelAnswer}
						saveForm={saveAnswerForm} />
				</Modal.Body>
			</Modal>
			<Modal show={showAssign} onHide={() => setShowAssign(false)} animation={true} size="lg" centered
				className={`${darkMode ? "dark" : ""}`}
				contentClassName={`${darkMode ? "dark" : ""}`}>
				<Modal.Header closeButton>
					<Modal.Title>Add answer</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ height: '40vh', width: '50vw' }} className="question-answers">
					<AutoSuggestAnswer
						question={question}
						answersUnassigned={answersUnassigned!}
						assignQuestionAnswer={assignQA}
						setAnswerText={setAnswerText}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default QuestionAnswers

