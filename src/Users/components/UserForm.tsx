import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'

import { Select } from '../../common/Select';
import { IFormProps } from '../types'
import UserName from '../../common/containers/UserName';

import { Button, Container, Form } from "react-bootstrap";
import { ThemeContext } from '../../ThemeContext';

const UsrForm: React.FC<IFormProps> = (props: IFormProps) => {
  const { userEditing, auth } = props;
  const { who } = auth!;
  const { roleId, userId, userName, pwd, department, createdBy, created } = userEditing!;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      roleId,
      userId,
      userName,
      pwd,
      department,
      createdBy,
      created
    },
    validationSchema: Yup.object({
      roleId: Yup.string()
        .required('Required'),
      //.notOneOf(['11']),
      userName: Yup.string()
        .max(64, 'Must be 64 characters or less')
        .required('Required'),
      pwd: Yup
        .string()
        .min(7)
        .max(16)
        .required()
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      if (who.roleId !== 11)
        alert("Only Owner can maintain Users")
      else
        props.saveForm(values, props.formMode)
    }
  });

  const isEdit = () => props.formMode === 'edit';

  console.log('RENDERING user', formik.values)

  return (
    <Form onSubmit={formik.handleSubmit}>

      <Form.Group controlId="userId">
        <Form.Label>UserId:</Form.Label><span id="userId">{' '}{formik.values.userId}</span>
      </Form.Group>

      <Form.Group controlId="roleId">
        <Form.Label>Role</Form.Label>
        <Select
          id="roleId"
          name="roleId"
          options={roleId === 11 ? props.roleOptions : props.roleOptions.filter(r => r.value !== 11)}
          //onChange={formik.handleChange}
          onChange={(e, value) => {
            formik.setFieldValue("roleId", value);
            if (isEdit()) formik.submitForm();
          }}
          value={formik.values.roleId}
          disabled={roleId === 11}
        />
      </Form.Group>

      <Form.Group controlId="userName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          as="input"
          name="userName"
          onChange={formik.handleChange}
          //onBlur={formik.handleBlur}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>): void => {
            if (isEdit() && formik.initialValues.userName !== formik.values.userName)
              formik.submitForm();
          }}
          value={formik.values.userName}
          style={{ width: '100%' }}
        />
        <Form.Text className="text-danger">
          {formik.touched.userName && formik.errors.userName ? (
            <div className="text-danger">{formik.errors.userName}</div>
          ) : null}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="pwd">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="pwd"
          value={formik.values.pwd}
          onChange={formik.handleChange}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>): void => {
            if (isEdit() && formik.initialValues.pwd !== formik.values.pwd)
              formik.submitForm();
          }}
        />
        <Form.Text className="text-danger">
          {formik.touched.pwd && formik.errors.pwd ? (
            <div className="text-danger">{formik.errors.pwd}</div>
          ) : null}
        </Form.Text>
      </Form.Group>

      {/* <button type="submit">Submit</button> */}
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
                // props.handleClose()
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


export const UserForm: React.FC<IFormProps> = (props: IFormProps) => {
  const theme = useContext(ThemeContext);
  const { darkMode, variant, bg } = theme.state;
  return (
    <Container className={`${darkMode ? "dark" : ""}`}>
      <UsrForm {...props} />
    </Container>
  )
}