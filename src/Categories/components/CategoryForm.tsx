import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ICategoryFormProps } from '../types';

import { ThemeContext } from "../../ThemeContext";
import { Button, Container, Form } from "react-bootstrap";
import UserName from '../../common/containers/UserName';
import { initialCategory } from '../categoriesReducer';
//import { number } from 'yup/lib/locale';

const CategForm: React.FC<ICategoryFormProps> = (props: ICategoryFormProps) => {

  let category = props.category;
  if (!category)
    category = {...initialCategory} // we have form in Modal, although hidden

  const { categoryId, title, questions, isExpanded, createdBy, created } = category;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      categoryId,
      title,
      questions,
      isExpanded,
      createdBy,
      created
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required')
    }),
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      props.saveForm(values, props.formMode)
      props.handleClose(false);
    }
  });

  const isEdit = () => props.formMode === 'edit';

  console.log('RENDERING category', formik.values)
  return (
    <Form onSubmit={formik.handleSubmit}>

      {isEdit() &&
        <Form.Group controlId="categoryId">
          <Form.Label>Id: </Form.Label>
          <span> {formik.values.categoryId}</span>
        </Form.Group>
      }

      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          as="textarea"
          name="title"
          onChange={formik.handleChange}
          //onBlur={formik.handleBlur}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>): void => {
            if (isEdit() && formik.initialValues.title !== formik.values.title)
              formik.submitForm();
          }}
          value={formik.values.title}
          style={{ width: '100%' }}
          rows={2}
          placeholder={'New Category'}
        />
        <Form.Text className="text-danger">
          {formik.touched.title && formik.errors.title ? (
            <div className="text-danger">{formik.errors.title}</div>
          ) : null}
        </Form.Text>
      </Form.Group>

      <br />

      <Form.Group controlId="createdBy">
        <Form.Label>Created by:</Form.Label>
        <UserName id={formik.values.createdBy} />
      </Form.Group>
      {/* <br /> */}
      <Form.Group controlId="created">
        <Form.Label className="id">Created:</Form.Label>
        <span>{formik.values.created.toLocaleDateString()}</span>
      </Form.Group>
      <br />
      {!isEdit() &&
        <div className="buttons">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                props.cancel();
                props.handleClose(true)
              }}>
              Cancel
            </Button>&nbsp;
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

export const CategoryForm: React.FC<ICategoryFormProps> = (props: ICategoryFormProps) => {

  const theme = useContext(ThemeContext);
  const { darkMode, variant, bg } = theme.state;

  return (
    <Container className={`${darkMode ? "dark" : ""}`}>
      <CategForm {...props} />
    </Container>
  )
}