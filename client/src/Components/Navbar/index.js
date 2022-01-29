import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { getCookie } from "../../helpers";

const NavbarComponent = ({ auth, setAuth }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("userRole", "");
        console.log("logging out ...", getCookie("username"));
        document.cookie = "username=";
        console.log("logging out ...", getCookie("username"));
        setAuth(false);
        navigate("/login", { replace: true });
    };
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/" className="text-light mx-5">
                    Shipment Contract
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end"
                >
                    <Nav>
                        {!auth ? (
                            <div className="d-flex">
                                <Nav.Link className="text-light" href="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link className="text-light" href="/signup">
                                    Signup
                                </Nav.Link>
                            </div>
                        ) : (
                            <div className="d-flex">
                                {/* <Nav.Link
                                    className="text-light"
                                    href="/dashboard"
                                >
                                    Dashboard
                                </Nav.Link> */}
                                <Nav.Link
                                    className="text-light btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export const NavBar = NavbarComponent;
export default NavBar;
