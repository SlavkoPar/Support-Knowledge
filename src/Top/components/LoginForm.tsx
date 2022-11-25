import React, { useState } from 'react';
import { Button, Container, Form } from "react-bootstrap";

import { useFormik } from 'formik';
import * as Yup from 'yup'

import { COLORS } from '../../formik/theme';
import { IFormProps } from '../types';
//import { number } from 'yup/lib/locale';
import { useNavigate } from "react-router-dom";


const LogForm: React.FC<IFormProps> = (props: IFormProps) => {

  let { formMode, authError } = props;

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
        {formik.touched.userName && formik.errors.userName ? (
          <div>{formik.errors.userName}</div>
        ) : null}
      </Form.Group>

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
        {formik.touched.pwd && formik.errors.pwd ? (
          <div>{formik.errors.pwd}</div>
        ) : null}
      </Form.Group>

      {authError &&
        <div>{authError}</div>
      }

      <br/>

      <div className="buttons">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            props.cancel();
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


const color = 'blue';

export const LoginForm: React.FC<IFormProps> = (props: IFormProps) => {
  return (
    <div style={{ height: '100%', padding: '5%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
      <div>
        {props.isRegister ? (
          <span>Register</span>
        ) : (
          <span>Sign In</span>
        )}
      </div>
      <br />
      <div
        style={{
          height: '100%',
          background: COLORS[color][5],
          padding: '1rem 1rem',
          width: '300px'
        }}
      >
        <div
          style={{
            borderRadius: '4px',
            boxShadow: '0 8px 16px rgba(0,0,0,.2)',
            background: '#fff',
            maxWidth: '90%',
            margin: '0 auto',
            padding: '1rem',
            width: '250px'
          }}
        >
          <LogForm {...props} />
        </div>
      </div>
    </div>
  )
}