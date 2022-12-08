import React, { useContext } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useFormik } from 'formik';
import * as Yup from 'yup'

import { ThemeContext } from '../../ThemeContext';

import { IFormProps } from '../types';
//import { number } from 'yup/lib/locale';
import { useNavigate } from "react-router-dom";


const LogForm: React.FC<IFormProps> = (props: IFormProps) => {

  let { authError } = props;

  let navigate = useNavigate();
  if (props.isAuthenticated) {
    navigate('/questions');
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: '',
      pwd: ''
    },
    validationSchema: Yup.object({
      userName: Yup
        .string()
        .max(32, 'Must be 32 characters or less')
        .required('Required'),
      pwd: Yup
        .string()
        .min(7)
        .max(16)
        //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$/)
        .required()
    }),
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      props.saveForm(values, props.formMode, props.isRegister)
    }
  });

  const isEdit = () => props.formMode === 'edit';

  console.log('RENDERING LoginForm', formik.values)

  return (
    <Form onSubmit={formik.handleSubmit}>

      {/* <label htmlFor="name">User name</label> */}
      <Form.Group controlId="userName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          as="input"
          name="userName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // onBlur={(e: React.FormEvent<HTMLInputElement>): void => {
          //   if (isEdit() && formik.initialValues.name !== formik.values.name)
          //     formik.submitForm();
          // }}
          value={formik.values.userName}
          placeholder="User name"
          maxLength={16}
        />
        <Form.Text className="text-danger">
          {formik.touched.userName && formik.errors.userName ? (
            <div className="text-danger">{formik.errors.userName}</div>
          ) : null}
        </Form.Text>
      </Form.Group>
      <br/>

      <Form.Group controlId="pwd">
        <Form.Label>Password</Form.Label>
        <Form.Control
          as="input"
          name="pwd"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.pwd}
          placeholder="password"
          // style={{ width: '40%' }}
          maxLength={16}
        />
        <Form.Text className="text-danger">
          {formik.touched.pwd && formik.errors.pwd ? (
            <div className="text-danger">{formik.errors.pwd}</div>
          ) : null}
        </Form.Text>
      </Form.Group>

      {authError &&
        <div>{authError}</div>
      }

      <br />

      <div className="buttons">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            props.cancel();
            navigate('/landing');
            // props.handleClose()
          }}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          type="submit"
        >
          Submit
        </Button>
      </div>

    </Form>
  );
};

export const LoginForm: React.FC<IFormProps> = (props: IFormProps) => {
  const theme = useContext(ThemeContext);
  const { darkMode, variant, bg } = theme.state;
  return (
    <Container className={`${darkMode ? "dark" : ""}`} >
      <Row className="py-2">
        <Col md="4" className="mx-auto">
          <h4 style={{textAlign: 'center'}}>
            {props.isRegister ? (
              'Register'
            ) : (
              'Sign In'
            )}
          </h4>
        </Col>
      </Row>
      <Row>
        <Col md="6" className="mx-auto">
          <LogForm {...props} />
        </Col>
      </Row>
    </Container>
  )
}