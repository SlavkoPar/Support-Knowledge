import {useContext }  from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

import { IQuestion } from '../types';
import { ThemeContext } from '../../ThemeContext';


interface IQuestionRowProps {
	question: IQuestion;
	onSelectQuestion: (categoryId: number, questionId: number) => void;
	edit: (categoryId: number, questionId: number, showQuestionForm: boolean) => void;
	remove: (categoryId: number, questionId: number) => void;
}

const QuestionRow: React.FC<IQuestionRowProps> = (props: IQuestionRowProps) => {

	const [hoverRef, hoverProps] = useHover();

	const { question, onSelectQuestion, edit, remove } = props;
	const { categoryId, questionId } = question;

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;
	


   return (
		<div ref={hoverRef} className={bg}>
			<Button
				variant={bg}
				size="sm"
				onClick={() => onSelectQuestion(categoryId, questionId)}>
				{question.text}
			</Button>
			{hoverProps.isHovered && 
				<Button
					variant={bg}
					size="sm"
					title="Edit" 
					onClick={() => edit(categoryId, questionId, true)}
				>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</Button>
			}
			{hoverProps.isHovered &&
				<Button 
					variant={bg}
					size="sm" 
					title="Remove" 
					onClick={() => remove(categoryId, questionId)}
				>
					<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
				</Button>
			}
		</div>
	)
}

export default QuestionRow

