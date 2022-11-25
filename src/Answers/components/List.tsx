import * as React from 'react';
import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { IQuestionAnswer } from '../../Categories/types';
import { ThemeContext } from '../../ThemeContext';

import { IAnswer } from '../types';
import { ListRow } from './ListRow';

interface IProps {
	answers: IAnswer[],
	usedAnswers: IQuestionAnswer[],
	getCategoryQuestion: (categoryId: number, questionId: number) => string,
	edit: (answerId: number) => void;
	remove: (answerId: number) => void;
}

const List: React.FC<IProps> = (props: IProps) => {
	const { answers, usedAnswers, getCategoryQuestion, edit, remove } = props;

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	return (
		<Table variant={variant} responsive striped bordered hover size="sm">
			<thead>
				<tr>
					<th>Id</th>
					<th>Answer</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{ answers.map(answer => 
					<ListRow
						key={answer.answerId}
						answer={answer}
						usedAnswers={usedAnswers}
						getCategoryQuestion={getCategoryQuestion}
						edit={edit}
						remove={remove}
					/>
				)}
			</tbody>
		</Table>
	);
  }

export default List

