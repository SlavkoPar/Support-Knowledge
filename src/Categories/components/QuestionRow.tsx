import { useContext } from 'react';

import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Button, ListGroup } from 'react-bootstrap'

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
		<ListGroup.Item className="py-0" variant={variant} action>
			<div ref={hoverRef} className="d-flex justify-content-start align-items-center">
				<Button
					style={{fontSize: '13px'}}
					variant='link'
					size="sm"
					className="py-0 px-1 text-decoration-none"
					onClick={() => onSelectQuestion(categoryId, questionId)}>
					{question.text}
				</Button>
				{hoverProps.isHovered &&
					<>
					<Button
						variant={variant}
						size="sm"
						className="py-0 px-1"
						style={{backgroundColor: 'transparent', borderWidth:'0'}}
						title="Edit"
						onClick={() => edit(categoryId, questionId, true)}
					>
						<FontAwesomeIcon icon={faEdit} color='lightblue' />
					</Button>
					<Button
						variant={variant}
						size="sm"
						className="py-0 px-1"
						style={{backgroundColor: 'transparent', borderWidth: '0'}}
						title="Remove"
						onClick={() => remove(categoryId, questionId)}
					>
						<FontAwesomeIcon icon={faWindowClose} color='lightblue' />
					</Button>
					</>
				}
			</div>
		</ListGroup.Item>
	)
}

export default QuestionRow

