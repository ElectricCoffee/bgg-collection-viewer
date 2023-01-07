import React from "react";
import Button from "react-bootstrap/Button";
import usePlayerCountStore from "../stores/usePlayerCountStore";

// PC short for Player Count
const PCButton = ({ number }: { number: number }) => {
  const { count, setCount } = usePlayerCountStore();

  const variant = (num: number) =>
    num === count ? "outline-warning" : "outline-light";
  return (
    <Button
      size="lg"
      onClick={() => setCount(number)}
      variant={variant(number)}
    >
      <strong>{!number ? "All" : number}</strong>
    </Button>
  );
};

export default React.memo(PCButton);
