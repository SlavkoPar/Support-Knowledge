import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IQuestionFormProps } from '../types';

import { Select } from '../../common/Select';
import UserName from '../../common/containers/UserName';
//import { number } from 'yup/lib/locale';
import { ThemeContext } from "../../ThemeContext";
import { Button, Container, Form } from "react-bootstrap";

import { sourceOptions } from '../sourceOptions'
import { statusOptions } from '../statusOptions'
import ContainerQuestionAnswers from '../containers/ContainerQuestionAnswers';

const QuestForm: React.FC<IQuestionFormProps> = (props: IQuestionFormProps) => {

  let { question } = props;
  const { categoryId, questionId, text, source, status, answers, createdBy, created } = question;

  console.log('props.categoryOptions', props.categoryOptions)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { 
      categoryId,
      questionId,
      text,
      source,
      status,
      answers,
      createdBy,
      created
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
      categoryId: Yup.number()
        .moreThan(0, 'Select Category')
        .required('Required'),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      props.saveForm(values, props.formMode);
      if (props.formMode === 'add')
        props.handleClose();
    }
  });
  
  const isEdit = props.formMode === 'edit';
  const isDisabled = props.formMode === 'display';
console.log('isEdit, isDisabled', isEdit, isDisabled, props.canEdit)
  return (
    <Form onSubmit={formik.handleSubmit}>
      {isEdit &&
        <Form.Group controlId="questionId">
          <Form.Label>Id:</Form.Label>
          <span className="mx-1"> {formik.values.questionId}</span>
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
              formik.setFieldValue('categoryId', value)
                .then(() => { if (isEdit) formik.submitForm()})
          }}
          value={formik.values.categoryId}
          disabled={isDisabled}
        />
        <Form.Text className="text-danger">  {/* formik.submitCount > 0 && */}
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className="text-danger">{formik.errors.categoryId}</div>
          ) : null}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="text">
        <Form.Label>Text</Form.Label>
        <Form.Control
          size="sm"
          as="textarea"
          name="text"
          onChange={formik.handleChange}
          //onBlur={formik.handleBlur}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>): void => {
            if (isEdit && formik.touched.text) //  //.initialValues.text !== formik.values.text))
              formik.submitForm();
          }}
          value={formik.values.text}
          style={{ width: '100%' }}
          className="py-0"
          rows={2}
          disabled={isDisabled}
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
          onChange={(e, value) => {
            formik.setFieldValue('source', value)
            .then(() => { if (isEdit) formik.submitForm()})
          }}
          value={formik.values.source}
          disabled={isDisabled}
        />
        <Form.Text className="text-danger">
          {formik.touched.source && formik.errors.source ? (
            <div className="text-danger">{formik.errors.source}</div>
          ) : null}
        </Form.Text>
      </Form.Group>

      <br />
      <ContainerQuestionAnswers />
      <br />

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Select
          id="status"
          name="status"
          options={statusOptions}
          //onChange={formik.handleChange}
          onChange={(e, value) => {
            formik.setFieldValue('status', value)
            .then(() => { if (isEdit) formik.submitForm()})
          }}
          value={formik.values.status}
          disabled={isDisabled}
        />
        <Form.Text className="text-danger">
          {formik.touched.status && formik.errors.status ? (
            <div className="text-danger">{formik.errors.status}</div>
          ) : null}
        </Form.Text>
      </Form.Group>

      <br />
      <Form.Group controlId="createdBy">
        <Form.Label>Created by:</Form.Label>
        {' '}<UserName id={formik.values.createdBy} />
      </Form.Group>

      <Form.Group controlId="created">
        <Form.Label className="id">Created:</Form.Label>
        <span>{' '}{formik.values.created.toLocaleDateString()}</span>
      </Form.Group>

      {!isDisabled && !isEdit &&
        <div className="buttons">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                props.cancel();
                props.handleClose()
              }}>
              Cancel
            </Button>&nbsp;
            <Button
              variant="primary"
              size="sm"
              type='button'
              onClick={() => {
                formik.submitForm()
              }
            }
            >
              Save
            </Button>
        </div>
      }

      {isDisabled && props.canEdit &&
        <div className="buttons">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              props.editForm(formik.values, props.formMode);
            }}>
            Edit
          </Button>
        </div>
      }
    </Form>
  );
};


export const QuestionForm: React.FC<IQuestionFormProps> = (props: IQuestionFormProps) => {

  const theme = useContext(ThemeContext);
  const { darkMode, variant, bg } = theme.state;

  return (
    <Container className={`mb-1 ${darkMode ? "dark" : ""}`}>
      <QuestForm {...props} />
    </Container>
  )
}