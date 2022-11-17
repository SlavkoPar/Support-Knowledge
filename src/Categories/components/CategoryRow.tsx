import { useContext } from 'react'
import { useHover } from '../../common/useHover'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit, faCaretRight, faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from "../../ThemeContext";
import { Button } from 'react-bootstrap'

import { ICategory } from '../types';


interface ICategoryRowProps {
	category: ICategory;
	toggleCategory: (categoryId: number) => void;
	editCategory: (categoryId: number) => void;
	removeCategory: (categoryId: number) => void;
	onSelectCategory: (categoryId: number) => void;
	add: (categoryId: number, text: string, canEdit?: boolean) => void;
}

const CategoryRow: React.FC<ICategoryRowProps> = (props: ICategoryRowProps) => {

	const [hoverRef, hoverProps] = useHover();
	const { category, toggleCategory, editCategory, removeCategory, onSelectCategory, add } = props;
	const { categoryId, title, questions: categories, isExpanded } = category;

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	return (
		<div ref={hoverRef} key={categoryId} className={`div-row ${bg}`}>
			<Button
				variant="variant"
				title="Expand"
				onClick={() => toggleCategory(categoryId)}
				style={{ marginLeft: '5px', background: 'transparent' }}
			>
				<FontAwesomeIcon icon={isExpanded ? faCaretDown : faCaretRight} color='orange' size='lg' />
			</Button>
			<span className={`question-group-title ${darkMode ? "dark" : "light"}`} onClick={() => onSelectCategory(categoryId)}>
				{title}
			</span>
			<span>
				<Button
					variant="primary"
					className="button-add button-edit" 
					title="Add a new Question" 
					onClick={() => add(category.categoryId, '', true)}
				>
					<FontAwesomeIcon icon={faPlus} size='xs' color='lightblue' />
				</Button>
			</span>
			{hoverProps.isHovered &&
				<Button 
					variant="primary"
					className="button-edit" 
					title="Edit Category" 
					onClick={() => editCategory(categoryId)}>
					<FontAwesomeIcon icon={faEdit} color='lightblue' />
				</Button>
			}
			{hoverProps.isHovered && categories.length === 0 &&
				<Button
					variant="primary"
					className="button-remove"
					title="Remove Category"
					onClick={() => removeCategory(categoryId)}
				>
					<FontAwesomeIcon icon={faWindowClose} color='lightblue' />
				</Button>
			}
		</div>
	)
}

export default CategoryRow

