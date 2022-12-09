import { useContext } from 'react'
import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit, faCaretRight, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from "../../ThemeContext";
import { Badge, Button, ListGroup } from 'react-bootstrap'

import { ICategory, IQuestion } from '../types';
import QuestionRow from './QuestionRow';


interface ICategoryRowProps {
	category: ICategory;
	questions: IQuestion[];
	toggleCategory: (categoryId: number) => void;
	editCategory: (categoryId: number) => void;
	removeCategory: (categoryId: number) => void;
	onSelectCategory: (categoryId: number) => void;
	onSelectQuestion: (categoryId: number, questionId: number) => void;
	add: (categoryId: number, text: string, canEdit?: boolean) => void;
	edit: (categoryId: number, questionId: number, showQuestionForm: boolean) => void;
	remove: (categoryId: number, questionId: number) => void;
}

const CategoryRow: React.FC<ICategoryRowProps> = (props: ICategoryRowProps) => {

	const [hoverRef, hoverProps] = useHover();
	const { category, questions, toggleCategory, editCategory, removeCategory, onSelectCategory,
		onSelectQuestion, add, edit, remove } = props;
	const { categoryId, title, isExpanded } = category;

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	return (
		<>
			<ListGroup.Item
				variant={variant}
				className="py-0 px-1"
				as="li"
			>
				<div ref={hoverRef} className="d-flex justify-content-start align-items-center">
					<Button
						variant='link'
						size="sm"
						className="py-0 px-1"
						style={{ backgroundColor: 'transparent', borderWidth: '0' }}
						onClick={() => toggleCategory(categoryId)}
						title="Expand"
					>
						<FontAwesomeIcon icon={isExpanded ? faCaretDown : faCaretRight} color='orange' size='lg' />
					</Button>
					<Button
						variant='link'
						size="sm"
						className="py-0 mx-1 text-decoration-none"
						onClick={() => onSelectCategory(categoryId)}
					>
						{title}
					</Button>
					<Badge bg="primary" pill>
						{questions.length}
					</Badge>
					<Button
						variant={variant}
						size="lg"
						className="py-0 px-1"
						style={{ backgroundColor: 'transparent', borderWidth: '0' }}
						title="Add a new Question"
						onClick={() => add(category.categoryId, '', true)}
					>
						<FontAwesomeIcon icon={faPlus} size='xs' color='orange' />
					</Button>
					{hoverProps.isHovered &&
						<Button
							variant={variant}
							size="sm"
							className="py-0 px-1"
							style={{ backgroundColor: 'transparent', borderWidth: '0' }}
							title="Edit Category"
							onClick={() => editCategory(categoryId)}>
							<FontAwesomeIcon icon={faEdit} color='lightblue' />
						</Button>
					}
					{hoverProps.isHovered && questions.length === 0 &&
						<Button
							size="sm"
							className="py-0 px-1"
							style={{ backgroundColor: 'transparent', borderWidth: '0' }}
							title="Remove Category"
							onClick={() => removeCategory(categoryId)}
						>
							<FontAwesomeIcon icon={faWindowClose} color='lightblue' />
						</Button>
					}
				</div>
			</ListGroup.Item>

			{isExpanded &&
				<ListGroup.Item className="py-0" variant={variant}>
					<ListGroup as="ul" variant={variant} className="inner-list">
						{questions.map(question =>
							<QuestionRow
								key={question.questionId}
								question={question}
								onSelectQuestion={onSelectQuestion}
								edit={edit}
								remove={remove}
							/>
						)}
					</ListGroup>
				</ListGroup.Item>
			}
		</>
	)
}

export default CategoryRow

