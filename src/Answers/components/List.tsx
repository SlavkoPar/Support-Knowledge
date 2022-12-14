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
	canEdit: boolean;
}

const List: React.FC<IProps> = (props: IProps) => {
	const { answers, usedAnswers, getCategoryQuestion, edit, remove, canEdit } = props;

	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	return (
		<Table variant={variant} responsive striped bordered hover size="sm">
			<thead>
				<tr>
					<th>Id</th>
					<th>Answer</th>
					{canEdit && <th></th>}
					{canEdit && <th></th>}
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
						canEdit={canEdit}
					/>
				)}
			</tbody>
		</Table>
	);
  }

export default List

