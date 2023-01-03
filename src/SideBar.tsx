import { useContext, useState } from "react";

import { ThemeContext } from "./ThemeContext";

import { connect } from "react-redux";
import { Dispatch } from 'redux';

import { useNavigate } from "react-router-dom";

import { IAppState } from "./store/Store";
import { IAuth } from "./Top/types";

import { LocalStorage } from "./ExportImport"

// import logo from './logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faSurprise, faUser, faUserFriends, faAnchor, faDatabase } from '@fortawesome/free-solid-svg-icons'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { setShowModalJSON, toggleMode, TopActions } from "./Top/actions";
import { categoryOptions, closeQuestionForm } from "./Categories/actions";

import { clearAnswers } from "./Answers/actions";
import { clearQuestions } from "./Categories/actions";
import { getAllAnswers } from './Answers/actions';
import { loadCategories } from './Categories/actions';

import { Modal } from "react-bootstrap";

interface ISideBarProps {
  isAuthenticated: boolean | null;
  showModalJSON: boolean;
  auth?: IAuth,
  signOut: () => void;
  toggleMode: () => void;
  closeQuestionForm: () => void;
  clearAnswers: () => void;
  clearQuestions: () => void;
  getAllAnswers: () => void;
  loadCategories: () => void;
  setShowModalJSON: (show: boolean) => void;
}

function SideBar(props: ISideBarProps) {
  const {
    isAuthenticated,
    showModalJSON,
    auth,
    signOut,
    toggleMode,
    closeQuestionForm,
    clearAnswers,
    clearQuestions,
    getAllAnswers,
    loadCategories,
    setShowModalJSON
  } = props;

  const theme = useContext(ThemeContext);
  const { darkMode, variant, bg } = theme.state;

  let navigate = useNavigate();

  const otkaciMe = () => {
    signOut();
    navigate('/landing');
  }

  const [show, setShow] = useState(false);
  const [strJSON, setStrJSON] = useState("");

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
              onSelect={eventKey => {
                switch (eventKey) {
                  case "LIGHTMODE":
                  case "DARKMODE":
                    if (document.body.classList.contains('dark')) {
                      document.body.classList.remove('dark')
                      document.body.classList.add('light')
                    }
                    else {
                      document.body.classList.add('dark')
                    }
                    theme.dispatch({ type: eventKey })
                    toggleMode();
                    break;

                  case "STORAGE_DISPLAY":
                    LocalStorage.display()
                      .then(s => { 
                        //setStrJSON(s) 
                        document.getElementById('bodi')!.innerHTML = s;
                      });
                    setShowModalJSON(true);
                    break;
                  case "STORAGE_CLEAR":
                    LocalStorage.clear(clearAnswers, clearQuestions)
                    break;
                  case "STORAGE_EXPORT":
                    LocalStorage.export()
                    break;
                  case "STORAGE_IMPORT":
                    setShow(true)
                    break;
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
                    title={<span style={{ padding: "0px 5px", fontSize: '0.9rem' }}><FontAwesomeIcon icon={faDatabase} />{' '}Local Storage</span>}
                    id={`offcanvasNavbarDropdown-expand2`}
                    menuVariant={variant}
                    align="end"
                  >
                    <NavDropdown.Item href="#" eventKey="STORAGE_DISPLAY">
                      Display
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#" eventKey="STORAGE_CLEAR">
                      Clear
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#" eventKey="STORAGE_EXPORT">
                      Export to zip file
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#" eventKey="STORAGE_IMPORT">
                      Import from zip file
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown.Divider />

                  <NavDropdown.Item href="#/About">
                    About
                  </NavDropdown.Item>

                  <NavDropdown.Item href="#" onClick={otkaciMe}>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Modal show={show} onHide={() => setShow(false)} animation={true} size="lg" centered
          className={`${darkMode ? "dark" : ""}`}
          contentClassName={`${darkMode ? "dark" : ""}`}>
          <Modal.Header closeButton>
            <Modal.Title>Select file to import</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="file" accept="application/zip" onChange={(e) => {
              //e.target.files![0].text().then(t => console.log(t)) 
              LocalStorage.import(e.target.files![0], getAllAnswers, loadCategories)
              setShow(false)
            }} />
          </Modal.Body>
          <Modal.Footer>
            Only Categories, Questions and Answers will be imported.
            <br />
            Registered user will stay unchanged.
          </Modal.Footer>
        </Modal>

        <Modal show={showModalJSON}
          onHide={() => { setShowModalJSON(false); setStrJSON('') }} animation={true} size="lg" centered
          className={`${darkMode ? "dark" : ""}`}
          contentClassName={`${darkMode ? "dark" : ""}`}>
          <Modal.Header closeButton>
            <Modal.Title>LOCAL STORAGE</Modal.Title>
          </Modal.Header>
          <Modal.Body  id='bodi'>
            {/* <pre style={{ whiteSpace: "pre-line" }}> */}
             
            {/* </pre> */}
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>

      </Container>
    </Navbar>
  );
}

interface IOwnProps {
  signOut: () => void;
}

const mapStateToProps = (store: IAppState, ownProps: IOwnProps) => ({
  isAuthenticated: store.topState.top.isAuthenticated,
  auth: store.topState.top.auth,
  showModalJSON: store.topState.top.showModalJSON,
  signOut: ownProps.signOut
});

const mapDispatchToProps = (dispatch: Dispatch<TopActions>) => {
  return {
    toggleMode: () => dispatch<any>(toggleMode()),
    closeQuestionForm: () => dispatch<any>(closeQuestionForm()),
    clearAnswers: () => dispatch<any>(clearAnswers()),
    clearQuestions: () => dispatch<any>(clearQuestions()),
    getAllAnswers: () => dispatch<any>(getAllAnswers()),
    loadCategories: () => dispatch<any>(loadCategories()).then(() => dispatch(categoryOptions())),
    setShowModalJSON: (show: boolean) => dispatch<any>(setShowModalJSON(show))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
