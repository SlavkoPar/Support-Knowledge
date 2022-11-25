import React, { useContext } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IAnswer } from '../types';
import UserName from '../../common/containers/UserName'
import { ThemeContext } from '../../ThemeContext';

interface IProps {
	answer: IAnswer;
	formMode: string;
	options?: string[];
	cancel: () => void;
	saveForm: (answer: IAnswer, formMode: string) => void;
}


const AnsForm: React.FC<IProps> = (props: IProps) => {
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			answerId: props.answer.answerId,
			text: props.answer.text,
			createdBy: props.answer.createdBy,
			created: props.answer.created,
		},
		validationSchema: Yup.object({
			text: Yup.string()
				.max(150, 'Must be 150 characters or less')
				.required('Required'),
		}),
		onSubmit: (values) => {
			// alert(JSON.stringify(values, null, 2));
			props.saveForm(values, props.formMode)
		},
	});

	const isEdit = () => props.formMode === 'edit';
	console.log('RENDERING', formik.values)

	return (
		<Form onSubmit={formik.handleSubmit}>
			{isEdit() &&
				<Form.Group controlId="answerId">
					<Form.Label>Id: </Form.Label>
					<span> {formik.values.answerId}</span>
				</Form.Group>
			}


			<Form.Group controlId="text">
				<Form.Label>Answer</Form.Label>
				<Form.Control
					as="textarea"
					name="text"
					onChange={formik.handleChange}
					//onBlur={formik.handleBlur}
					onBlur={(e: React.FocusEvent<HTMLTextAreaElement>): void => {
						if (isEdit() && formik.initialValues.text !== formik.values.text)
							formik.submitForm();
					}}
					value={formik.values.text}
					style={{ width: '100%' }}
					rows={2}
				/>
				<Form.Text className="text-danger">
					{formik.touched.text && formik.errors.text ? (
						<div className="text-danger">{formik.errors.text}</div>
					) : null}
				</Form.Text>
			</Form.Group>

			<Form.Group controlId="createdBy">
				<Form.Label>Created by:</Form.Label>
				<UserName id={formik.values.createdBy} />
			</Form.Group>
			{/* <br /> */}
			<Form.Group controlId="created">
				<Form.Label className="id">Created:</Form.Label>
				<span>{formik.values.created.toLocaleDateString()}</span>
			</Form.Group>

			{!isEdit() &&
				<div className="buttons">
					<Button
						variant="secondary"
						size="sm"
						onClick={() => {
							props.cancel();
							//props.handleClose()
						}}>
						Cancel
					</Button>
					<Button
						variant="primary"
						size="sm"
						type="submit"
					>
						Save
					</Button>
				</div>
			}
		</Form>
	);
};

export const AnswerForm: React.FC<IProps> = (props: IProps) => {
	const theme = useContext(ThemeContext);
	const { darkMode, variant, bg } = theme.state;

	return (
		<Container className={`${darkMode ? "dark" : ""}`}>
			<AnsForm {...props} />
		</Container>
	)
}