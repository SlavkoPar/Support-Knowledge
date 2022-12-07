import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'

import { IQuestion, IQuestionAnswer } from '../types';
import { IAnswer } from '../../Answers/types';
import { AutoSuggestAnswer } from '../../components/AutoSuggestAnswer';
import QuestionAnswerRow from './QuestionAnswerRow';
import { ThemeContext } from '../../ThemeContext';
import { useContext, useState } from 'react';
import { Table } from 'react-bootstrap';
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
	assignQuestionAnswer?: (categoryId: number, questionId: number, answerId: number, tekst?: string) => void,
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

	const assignQuestionAnswerTekst = () => {
		if (assignQuestionAnswer) {
			//storeAnswer({ answerId: -1, text: tekst }, 'add')
			assignQuestionAnswer(
				question.categoryId,
				question.questionId,
				-1,
				tekst
			);
		}
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

	return (
		<div className="name-container question-answers">
			{/* { questionAnswers.length === 0 && 
				<div>
					No answers yet
				</div>
			} */}
			{questionAnswers.length > -1 &&
				<>
					<Table variant={variant} responsive striped bordered hover size="sm">
						<thead>
							<tr>
								<th className="py0 px-5" style={{color:'lightblue'}}>{questionAnswers.length === 0 ? 'No answers yet' : 'Answers'}</th>
								{canEdit && formMode !== 'display' && <th></th>}
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
							{canEdit && formMode !== 'display' &&
								<tr>
									<td className="question-answers">
										<AutoSuggestAnswer
											question={question}
											answersUnassigned={answersUnassigned!}
											assignQuestionAnswer={assignQuestionAnswer!}
											setAnswerText={setAnswerText}
										/>
									</td>
									<td width="35px">
										<button className="button-edit" title="Add a new Answer" onClick={
											(e) => {
												addAnswer();
												e.preventDefault()
											}
										}>
											<FontAwesomeIcon icon={faPlus} color='lightblue' />
										</button>
									</td>
								</tr>}
						</tbody>
					</Table>
				</>
			}
		<Modal show={show} onHide={handleClose} animation={true} size="sm" centered 
				className={`${darkMode ? "dark" : ""}`}
				contentClassName={`${darkMode ? "dark" : ""}`}>
				<Modal.Header closeButton>
					<Modal.Title>Add answer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AnswerForm 
						answer={answer!}
						formMode='add'
						cancel={cancelAnswer}
						saveForm={saveAnswerForm} />
				</Modal.Body>
			</Modal>    
		</div>
	);
}

export default QuestionAnswers

