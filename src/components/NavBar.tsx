import _ from "lodash";
import React from "react";
import RBNavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import PCButton from "./PCButton";
import ResetButton from "./ResetButton";

const NavBar = () => {
  return (
    <RBNavBar variant="dark" className="nav-bar">
      <RBNavBar.Brand className="nav-brand">
        <span className="bgg">BGG</span> Collection Viewer
      </RBNavBar.Brand>
      <Container>
        <RBNavBar.Text className="nav-player-count">
          Player Count:
        </RBNavBar.Text>
        {_.range(21).map((i) => (
          <Nav.Item key={i}>
            <PCButton number={i} />
          </Nav.Item>
        ))}
      </Container>
      <Nav.Item>
        <ResetButton />
      </Nav.Item>
    </RBNavBar>
  );
};

export default React.memo(NavBar);
