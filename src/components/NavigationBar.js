import React from "react";
import { Navbar, Container } from "react-bootstrap";
import navIcon from "../img/calendar-icon.webp";

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src={navIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Vehicle Important Dates
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
