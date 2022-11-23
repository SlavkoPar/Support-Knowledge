import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IQuestionFormProps } from '../types';

import QuestionAnswers from './QuestionAnswers'
import { Select } from '../../common/Select';
import UserName from '../../common/containers/UserName';
//import { number } from 'yup/lib/locale';
import { ThemeContext } from "../../ThemeContext";
import { Button, Container, Row, Form } from "react-bootstrap";

import { sourceOptions } from '../sourceOptions'
import { statusOptions } from '../statusOptions'
import { initialQuestion } from '../categoriesReducer';

const QuestForm: React.FC<IQuestionFormProps> = (props: IQuestionFormProps) => {

  let { question } = props;
  if (!question) // it is still view in modal, although hidden
    question = { ...initialQuestion };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryId: question.categoryId,
      questionId: question.questionId,
      text: question.text,
      source: question.source,
      status: question.status,
      answers: question.answers,
      createdBy: question.createdBy,
      created: question.created
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
      categoryId: Yup.number()
        .moreThan(0, 'Select Category')
        .required('Required')
    }),
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      props.saveForm(values, props.formMode);
      props.handleClose();
    }
  });

  const isEdit = () => props.formMode === 'edit';

  console.log('RENDERING', formik.values)
  return (
    <Form onSubmit={formik.handleSubmit}>
      {isEdit() &&
        <Form.Group controlId="questionId">
          <Form.Label htmlFor="questionId">QuestionId: </Form.Label>
          <span> {formik.values.questionId}</span>
        </Form.Group>
      }

      <Form.Group controlId="categoryId">
        <Form.Label>Category</Form.Label>
        <Select
          id="categoryId"
          name="categoryId"
          options={props.categoryOptions}
          //onChange={formik.handleChange}
          onChange={(e, value) => {
            formik.setFieldValue("categoryId", value);
            if (isEdit()) formik.submitForm();
          }}
          value={formik.values.categoryId}
        />
        <Form.Text className="text-danger">
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className="text-danger">{formik.errors.categoryId}</div>
          ) : null}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="text">
        <Form.Label>Text</Form.Label>
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

      <Form.Group controlId="source">
        <Form.Label>Source</Form.Label>
        <Select
          id="source"
          name="source"
          options={sourceOptions}
          // onChange={formik.handleChange}
          onChange={(e, value) => {
            formik.setFieldValue("source", value)
            if (isEdit()) formik.submitForm();
          }}
          value={formik.values.source}
        />
        <Form.Text className="text-danger">
          {formik.touched.source && formik.errors.source ? (
            <div className="text-danger">{formik.errors.source}</div>
          ) : null}
        </Form.Text>
      </Form.Group>

      <br />
      <QuestionAnswers
        question={question}
        questionAnswers={props.questionAnswers}
        answers={props.answers}
        canEdit={props.canEdit}
        formMode={props.formMode}
        selectQuestionAnswer={props.selectQuestionAnswer}
        copyQuestionAnswer={props.copyQuestionAnswer}
        removeQuestionAnswer={props.removeQuestionAnswer}
        assignQuestionAnswer={props.assignQuestionAnswer}
        setIsDetail={props.setIsDetail}
      />
      <br />

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Select
          id="status"
          name="status"
          options={statusOptions}
          //onChange={formik.handleChange}
          onChange={(e, value) => {
            formik.setFieldValue("status", value)
            if (isEdit()) formik.submitForm();
          }}
          value={formik.values.status}
        />
        <Form.Text className="text-danger">
          {formik.touched.status && formik.errors.status ? (
            <div className="text-danger">{formik.errors.status}</div>
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
          {props.canEdit &&
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                props.cancel();
                props.handleClose()
              }}>
              Cancel
            </Button>}
          {props.canEdit &&
            <Button
              variant="primary"
              size="sm"
              type="submit"
            >
              Save
            </Button>}
        </div>
      }
    </Form>
  );
};


export const QuestionForm: React.FC<IQuestionFormProps> = (props: IQuestionFormProps) => {

  const theme = useContext(ThemeContext);
  const { darkMode, variant, bg } = theme.state;

  return (
    <Container className={`${darkMode ? "dark" : ""}`}>
      <QuestForm {...props} />
    </Container>
  )
}