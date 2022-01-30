import React, { useContext, useState } from 'react';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.svg';
import { isAutheticated } from "../../APIs/auth/index";
import Avatar from '@mui/material/Avatar';

const Navbars = () => {
    const { user } = isAutheticated();
    console.log(user);
    	const logout = () => {
        localStorage.removeItem("ClearITuser");
      };
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand to="#home">
              <img src={logo} alt="ClearIT" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav style={{ margin: "auto" }}>
                <Nav.Link>
                  <NavLink
                    className="nav"
                    exact
                    activeClassName="active"
                    to="/"
                  >
                    Home
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink className="nav" to="/about">
                    About
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink className="nav" to="/studymaterial/iit">
                    IIT
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink className="nav" to="/studymaterial/neet">
                    NEET
                  </NavLink>
                </Nav.Link>
                {/* <NavDropdown className="nav" title="NEET" id="basic-nav-dropdown">
                                <NavDropdown.Item to="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item to="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item to="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                <Nav.Link>
                  <NavLink className="nav" to="/studymaterial">
                    Study Material
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink className="nav" to="/testseries">
                    Test Series
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink className="nav" to="/teacherDashboard">
                    Teacher Portal
                  </NavLink>
                </Nav.Link>
              </Nav>
              <Nav>
                {user ? (
                  <>
                    <Nav.Link>
                      <NavLink className="nav" to="/profile">
                        <Avatar>{user.name.slice(0, 1)}</Avatar>
                      </NavLink>
                    </Nav.Link>
                    <Nav.Link>
                      <NavLink className="nav" to="/login">
                        <Button variant="danger" onClick={() => logout()}>
                          Logout
                        </Button>
                      </NavLink>
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link>
                      <NavLink to="/login">
                        <Button variant="text">Login</Button>
                      </NavLink>
                    </Nav.Link>
                    <Nav.Link>
                      <NavLink to="/signup">
                        <Button variant="danger">Signup</Button>
                      </NavLink>
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
}

export default Navbars;
