import * as React from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit, faCopy } from '@fortawesome/free-solid-svg-icons'

import { IQuestion, IQuestionAnswer } from '../types';
import { Button } from 'react-bootstrap';


interface IQuestionAnswerRowProps {
	question: IQuestion;
	questionAnswer: IQuestionAnswer;
	selectQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void;
	copyQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void;
	removeQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void;
}

const QuestionAnswerRow: React.FC<IQuestionAnswerRowProps> = (props: IQuestionAnswerRowProps) => {

	const [hoverRef, hoverProps] = useHover();

	const { question, questionAnswer, selectQuestionAnswer, copyQuestionAnswer, removeQuestionAnswer } = props;
	const { categoryId, questionId } = question;
	const { answerId, text } = questionAnswer;

	return (
		<div ref={hoverRef}  className="d-flex justify-content-start align-items-center">
			{/* <input id={id} type="hidden" value={questionAnswer.text}></input> */}
			<Button
				style={{ fontSize: '13px' }}
				variant='link'
				size="sm"
				className="answer py-0 px-1 text-decoration-none"
				onClick={() => {
					// selectQuestionAnswer(categoryId, questionId, answerId)}
					alert('No action for the time being')
				}}
			>
				{text}
			</Button>
			{hoverProps.isHovered &&
				<button className="button-edit" title="Copy Answer to Cliboard"
					onClick={(e) => {
						//const input = document.querySelector<HTMLInputElement>('#' + id);
						if (navigator.clipboard) {
							navigator.clipboard.writeText(`${questionAnswer.text}`) // input!.value)
								.then(() => {
									console.log('Copied to clipboard successfully.');
								}, (err) => {
									console.log('Failed to copy the text to clipboard.', err);
								});
						}
						e.stopPropagation();
						// copyQuestionAnswer(categoryId, questionId, answerId);
					}
					}>
					<FontAwesomeIcon icon={faCopy} color='lightblue' />
				</button>
			}
			{hoverProps.isHovered &&
				<button 
					className="button-remove"
					title="Remove"
					onClick={(e) => {
							removeQuestionAnswer(categoryId, questionId, answerId);
							e.preventDefault();
						}
					}
				>
					<FontAwesomeIcon icon={faWindowClose} color='lightblue' />
				</button>
			}
		</div>
	)
}

export default QuestionAnswerRow

