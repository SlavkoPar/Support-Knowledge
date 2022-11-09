import { useContext } from "react";

import { ThemeContext } from "./ThemeContext";
import SwitchButton from "./SwitchButton";


import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { IAppState } from "./store/Store";

import logo from './logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faHome, faPlus, faSurprise, faUser, faUserFriends, faSignOutAlt, faSignInAlt, faRegistered, faAnchor } from '@fortawesome/free-solid-svg-icons'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';


interface ISideBarProps {
  open: boolean,
  isAuthenticated: boolean | null;
  uuid: string | null;
  register: () => void;
  signIn: () => void;
  signOut: () => void;
  handleClose: () => void;
}

function SideBar({ isAuthenticated, uuid, signOut, open, handleClose }: ISideBarProps) {

  const theme = useContext(ThemeContext);
  const { darkMode, variant, bg } = theme.state;

  let navigate = useNavigate();

  const otkaciMe = () => {
    signOut();
    navigate('/landing');
  }

  // className="mb-3" 

  return (
    <Navbar expand={"md"} variant={variant} bg={bg} collapseOnSelect>
      <Container fluid>
        <Navbar.Brand href="#">Support Knowledge</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
          className={`text-bg-${bg}`}
        >
          <Offcanvas.Header closeButton closeVariant={darkMode ? "white" : ""}>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>Support
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav
              className="justify-content-end flex-grow-1 pe-3 d-flex flex-nowrap"
              onSelect={(eventKey) => {
                if (document.body.classList.contains('row-dark')) {
                  document.body.classList.remove('row-dark')
                }
                else {
                  document.body.classList.add('row-dark')
                }
                theme.dispatch({ type: eventKey })
              }
              }
            >
              <Nav.Link href="#/supporter/promo">
                <FontAwesomeIcon icon={faSurprise} color='lightblue' />{' '}Supporter
              </Nav.Link>
              <Nav.Link href="#/questions">
                <FontAwesomeIcon icon={faQuestion} color='lightblue' />{' '}Questions
              </Nav.Link>
              <Nav.Link href="#/answers/pera">
                <FontAwesomeIcon icon={faAnchor} color='lightblue' />{' '}Answers
              </Nav.Link>
              <NavDropdown
                title="Themes"
                id={`offcanvasNavbarDropdown-expand`}
                menuVariant={variant}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="DARKMODE">
                  Dark mode
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="LIGHTMODE">
                  Light mode
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = (store: IAppState) => ({
  isAuthenticated: store.topState.top.isAuthenticated,
  uuid: store.topState.top.uuid
});

export default connect(
  mapStateToProps
)(SideBar);

