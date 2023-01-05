import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { IAnswer } from '../types';
import { IQuestionAnswer } from '../../Categories/types';

interface IProps {
	answer: IAnswer,
	usedAnswers: IQuestionAnswer[],
	getCategoryQuestion: (categoryId: number, questionId: number) => string,
	edit: (answerId: number) => void;
	remove: (answerId: number) => void;
	canEdit: boolean;
}

export const ListRow: React.FC<IProps> = (props: IProps) => {
	const { answer, usedAnswers, getCategoryQuestion, edit, remove, canEdit } = props;
	return (
		<tr key={answer.answerId} >
			<td>
				{answer.answerId}
			</td>
			<td>
				{answer.text}
			</td>
			{canEdit && <td>
				<button
					className="button-edit"
					title="Edit Answer"
					onClick={() => edit(answer.answerId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</button>
			</td>
			}
			{canEdit && <td>
				<button
					className="button-remove"
					title="Remove Answer"
					onClick={() => {
						const qa = usedAnswers.find(a => a.answerId === answer.answerId);
						if (qa)
							alert(`Answer is assigned to the question: \n"${getCategoryQuestion(qa.categoryId!, qa.questionId!)}". \nFirst unassign answer from question!`)
						else
							remove(answer.answerId)
					}}
				>
					<FontAwesomeIcon icon={faWindowClose} color='lightblue' />
				</button>

			</td>
			}
		</tr>
	);
}

