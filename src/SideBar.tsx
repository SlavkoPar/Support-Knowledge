import { useContext } from "react";

import { ThemeContext } from "./ThemeContext";

import { connect } from "react-redux";
import { Dispatch } from 'redux';

import { useNavigate } from "react-router-dom";

import { IAppState } from "./store/Store";
import { IAuth } from "./Top/types";

// import logo from './logo.svg'
import JSZip from 'jszip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faSurprise, faUser, faUserFriends, faAnchor, faDatabase } from '@fortawesome/free-solid-svg-icons'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { toggleMode, TopActions } from "./Top/actions";
import { closeQuestionForm } from "./Categories/actions";

interface ISideBarProps {
  isAuthenticated: boolean | null;
  uuid: string | null;
  auth?: IAuth,
  signOut: () => void;
  handleClose: () => void;
  toggleMode: () => void;
  closeQuestionForm: () => void;
}

function SideBar({ isAuthenticated, uuid, auth, signOut, handleClose, toggleMode, closeQuestionForm }: ISideBarProps) {

  const theme = useContext(ThemeContext);
  const { darkMode, variant, bg } = theme.state;

  let navigate = useNavigate();

  const otkaciMe = () => {
    signOut();
    navigate('/landing');
  }

  // className="mb-3" 

  return (
    <Navbar expand={"md"} variant={variant} bg={bg} collapseOnSelect className="sticky-top">
      <Container fluid>
        <Navbar.Brand href="#" className="ps-3">Support Knowledge</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
          className={`text-bg-${bg}`}
        >
          {darkMode ? (
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>Support</Offcanvas.Title>
            </Offcanvas.Header>
          ) : (
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>Support</Offcanvas.Title>
            </Offcanvas.Header>
          )}

          < Offcanvas.Body >
            <Nav
              className="justify-content-end flex-grow-1 pe-3 d-flex flex-nowrap"
              onSelect={(eventKey) => {
                if (["LIGHTMODE", "DARKMODE"].includes(eventKey!)) {
                  if (document.body.classList.contains('dark')) {
                    document.body.classList.remove('dark')
                    document.body.classList.add('light')
                  }
                  else {
                    document.body.classList.add('dark')
                  }
                  theme.dispatch({ type: eventKey })
                  toggleMode();
                }
              }
              }
            >
              {isAuthenticated &&
                <Nav.Link href="#/supporter/promo" onClick={() => {
                  closeQuestionForm();
                }}>
                  <FontAwesomeIcon icon={faSurprise} color='lightblue' />{' '}Supporter
                </Nav.Link>
              }
              {isAuthenticated &&
                <Nav.Link href="#/questions">
                  <FontAwesomeIcon icon={faQuestion} color='lightblue' />{' '}Questions
                </Nav.Link>
              }
              {isAuthenticated &&
                <Nav.Link href="#/answers/pera">
                  <FontAwesomeIcon icon={faAnchor} color='lightblue' />{' '}Answers
                </Nav.Link>
              }
              {isAuthenticated && auth && auth!.who.roleId === 11 &&
                <Nav.Link href="#/users/2">
                  <FontAwesomeIcon icon={faUserFriends} color='lightblue' />{' '}Users
                </Nav.Link>
              }

              {!isAuthenticated &&
                <Nav.Link href="#/landing">
                  Landing
                </Nav.Link>
              }
              {!isAuthenticated &&
                <Nav.Link href="#/About">
                  About
                </Nav.Link>
              }

              {/* <NavDropdown
                title={<><FontAwesomeIcon icon={faCog} color='lightblue' />{' '}Settings</>}
                id={`offcanvasNavbarDropdown-expand`}
                menuVariant={variant}
              >
              </NavDropdown> */}

              {!isAuthenticated &&
                <Nav.Link href="#/Register">
                  Register
                </Nav.Link>
              }
              {!isAuthenticated &&
                <Nav.Link href="#/sign-in ">
                  Sign In
                </Nav.Link>
              }

              {isAuthenticated &&
                // <Nav.Link href="#" disabled>
                //   <FontAwesomeIcon icon={faUser} />{' '}{auth!.who.userName}
                // </Nav.Link>

                <NavDropdown
                  title={<><FontAwesomeIcon icon={faUser} />{' '}{auth!.who.userName}</>}
                  id={`offcanvasNavbarDropdown-expand`}
                  menuVariant={variant}
                  align="end"
                >
                  <NavDropdown.Item eventKey="DARKMODE">
                    Dark mode
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="LIGHTMODE">
                    Light mode
                  </NavDropdown.Item>
                  {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}

                  <NavDropdown.Divider />
                  <NavDropdown
                    title={<span style={{ padding: "0", fontSize: '0.75rem' }}><FontAwesomeIcon icon={faDatabase} />{' '}Local Storage</span>}
                    id={`offcanvasNavbarDropdown-expand2`}
                    menuVariant={variant}
                    align="end"
                    
                  >
                    <NavDropdown.Item href="#" onClick={() => displayLocalStorage()}>
                      Display
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#" onClick={() => clearLocalStorage}>
                      Clear
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#" onClick={() => exportLocalStorage()}>
                      Export
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#" onClick={() => importLocalStorage()}>
                      Import
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={otkaciMe}>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              }

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar >
  );
}
interface IOwnProps {
  signOut: () => void;
  handleClose: () => void;
}

const mapStateToProps = (store: IAppState, ownProps: IOwnProps) => ({
  isAuthenticated: store.topState.top.isAuthenticated,
  uuid: store.topState.top.uuid,
  auth: store.topState.top.auth,
  signOut: ownProps.signOut,
  handleClose: ownProps.handleClose
});

const mapDispatchToProps = (dispatch: Dispatch<TopActions>) => {
  return {
    toggleMode: () => dispatch<any>(toggleMode()),
    closeQuestionForm: () => dispatch<any>(closeQuestionForm())
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);


function expLocalStorage(data: any, zip?: boolean, filename?: string) {

  if (!data) {
    console.error('Console.save: No data')
    return;
  }

  if (!filename) filename = 'SupportKnowlegde' + (zip ? '.zip' : '.json')

  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4)
  }


  var blob = new Blob([data], { type:  'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')

  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
  return false
}

function displayLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log("========================================================");
    console.log(key);
    console.log("========================================================");
    console.log(key ? localStorage.getItem(key!) : "null");
  }
  return false
}

function clearLocalStorage() {
  if (window.confirm('Are you sure?') === true) {
    const top = localStorage.getItem('SUPPORT_TOP')
    const users = localStorage.getItem('SUPPORT_USERS')

    localStorage.clear();
    if (top)
      localStorage.setItem('SUPPORT_TOP', top!)
    if (users)
      localStorage.setItem('SUPPORT_USERS', users!)
  }
  return false
}

function exportLocalStorage() {
  expLocalStorage(JSON.stringify(localStorage));
}


function importLocalStorage() {
}
