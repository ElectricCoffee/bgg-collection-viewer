import React from "react";
import useGameStore from "../stores/useGameStore";
import usePlayerCountStore from "../stores/usePlayerCountStore";
import Button from "react-bootstrap/Button";

function ResetButton() {
  const resetGames = useGameStore((st) => st.reset);
  const resetCount = usePlayerCountStore((st) => st.reset);

  return (
    <Button
      className="nav-reload-button"
      size="lg"
      variant="outline-warning"
      onClick={() => {
        resetGames();
        resetCount();
      }}
    >
      Reload List
    </Button>
  );
}

export default React.memo(ResetButton);
