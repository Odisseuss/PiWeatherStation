import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import {
  BrowserRouter,
  Link,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PastData from "./pastDataPage";
import HomePage from "./homepage";
import "./navigationBar.css";

function navigationBar(props) {
  return (
    <Navbar expand="lg">
      <Navbar.Brand as={Link} to="/">
        Weather App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/pastData">
          Past Data
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
export default navigationBar;
