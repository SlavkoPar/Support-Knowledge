import { useRef, useContext } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ThemeContext } from "../../ThemeContext";

import { ICategoryListProps } from '../types'

import CategoryRow from './CategoryRow';

import { ListGroup } from 'react-bootstrap';

const CategoryList: React.FC<ICategoryListProps> = (props: ICategoryListProps) => {

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	const { categories, categoryQuestions,
		onSelectCategory, onSelectQuestion, add, edit, remove, 
		addCategory, toggleCategory, editCategory, removeCategory } = props;


	const inputEl = useRef<HTMLInputElement>(null);
	setTimeout(() => {
		if (inputEl.current !== null) {
			inputEl.current!.select();
			inputEl.current!.focus()
		}
	}, 100)

	// const expandCategory = (categoryId: number): void => {
	// 	const div = document.querySelector<HTMLDivElement>("#divCategory" + categoryId);
	// 	console.log(div)
	// 	div!.style.display = 'block';
	// }

	console.log('RENDERUJEM Categories ----------->>>>>>>>>>')

	return (
		<>
			<h5>Categories{' '}
				<button className="button-add-category button-edit" title="Add a new Category" onClick={() => addCategory()}>
					<FontAwesomeIcon icon={faPlus} size='xs' color='lightblue' />
				</button>
			</h5>

			<ListGroup as="ul" variant={variant}>
				{categories.map(category => {
					const { categoryId, title, isExpanded } = category;
					const categoryState = categoryQuestions.get(categoryId);
					const { questions } = categoryState!;
					return (
						// {categoryIdEditing === categoryId &&
						// 	<input ref={inputEl} name="groupTitle" type="text"
						// 		onBlur={(e) => updateCategory({ ...category, title: e.target.value })}
						// 		defaultValue={title}
						// 	/>
						// }
						// {categoryIdEditing !== categoryId && (
						<CategoryRow
							key={category.categoryId}
							category={category}
							questions={questions}
							onSelectCategory={onSelectCategory}
							toggleCategory={toggleCategory}
							editCategory={editCategory}
							removeCategory={removeCategory}
							onSelectQuestion={onSelectQuestion}
							add={add}
							edit={edit}
							remove={remove}
						/>

						// )}

					);
				})
				}
			</ListGroup>
		</>
	)
}

export default CategoryList