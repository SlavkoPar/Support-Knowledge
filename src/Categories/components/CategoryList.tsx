import * as React from 'react';
import { useRef } from 'react'
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICategoryListProps } from '../types'

import QuestionRow from './QuestionRow';
import CategoryRow from './CategoryRow';

import { COLORS } from '../../formik/theme';
const color = 'blue';

const CategoryList: React.FC<ICategoryListProps> = (props: ICategoryListProps) => {

	const { categories, categoryQuestions, 
		categoryIdEditing, onSelectCategory, onSelectQuestion, add, edit, remove, canEdit,
		addCategory, toggleCategory, editCategory, removeCategory, updateCategory, who } = props;


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
			<h3>Categories
				<button className="button-add-category" title="Add a new Category" onClick={() => addCategory()}>
					<FontAwesomeIcon icon={faPlus} size='xs' color='lightblue' />
				</button>
			</h3>

			{categories.map(category => {
				const { categoryId, title, isExpanded } = category;
				const categoryState = categoryQuestions.get(categoryId);
				const { questions } = categoryState!;
				return (
					<div key={categoryId} style={{ paddingBottom: '5px' }}>
						<div style={{ textAlign: 'start' }}>
							{categoryIdEditing === categoryId &&
								<input ref={inputEl} name="groupTitle" type="text"
									onBlur={(e) => updateCategory({ ...category, title: e.target.value })}
									defaultValue={title}
								/>
							}
							{categoryIdEditing !== categoryId && (
								<CategoryRow
									key={category.categoryId}
									category={category}
									onSelectCategory={onSelectCategory}
									toggleCategory={toggleCategory}
									editCategory={editCategory}
									removeCategory={removeCategory}
								/>
							)}
						</div>
						{isExpanded &&
							<div className="group-categories" style={{ textAlign: 'start' }}>
								{questions.map(question =>
									<QuestionRow
										key={question.questionId}
										question={question}
										onSelectQuestion={onSelectQuestion}
										edit={edit}
										remove={remove}
									/>
								)}
								<div style={{ marginLeft: '0%' }}>
									<button className="button-add" title="Add a new Question" onClick={() => add(category.categoryId, '', true)}>
										<FontAwesomeIcon icon={faPlus} size='xs' color='lightblue' />
									</button>
								</div>
							</div>
						}
					</div>
				);
			})
			}

		</>

	)
}

export default CategoryList