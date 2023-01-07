import _ from "lodash";
import React from "react";
import RBNavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import usePlayerCountStore from "../stores/usePlayerCountStore";
import Button from "react-bootstrap/Button";
import useGameStore from "../stores/useGameStore";

function ResetButton() {
  const reset = useGameStore((st) => st.reset);

  return (
    <Button size="lg" variant="outline-warning" onClick={reset}>
      Reload List
    </Button>
  );
}

const NavBar = () => {
  const { count, setCount } = usePlayerCountStore();

  const variant = (num: number) =>
    num === count ? "outline-warning" : "outline-light";

  return (
    <RBNavBar
      variant="dark"
      style={{
        backgroundColor: "var(--purple)",
        alignItems: "center",
      }}
    >
      <RBNavBar.Brand
        style={{
          fontWeight: "bolder",
          fontVariant: "small-caps",
          fontSize: "x-large",
          marginLeft: 5,
        }}
      >
        <span style={{ color: "var(--orange)" }}>BGG</span> Collection Viewer
      </RBNavBar.Brand>
      <Container>
        <RBNavBar.Text style={{ fontSize: "x-large", marginRight: 5 }}>
          Player Count:
        </RBNavBar.Text>
        {_.range(21).map((i) => (
          <Nav.Item key={i}>
            <Button size="lg" onClick={() => setCount(i)} variant={variant(i)}>
              <strong>{!i ? "All" : i}</strong>
            </Button>
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
