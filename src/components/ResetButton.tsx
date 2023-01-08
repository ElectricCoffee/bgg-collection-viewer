import React, { useState } from "react";
import useGameStore from "../stores/useGameStore";
import usePlayerCountStore from "../stores/usePlayerCountStore";
import Button from "react-bootstrap/Button";
import ResetModal from "./modals/ResetModal";

function ResetButton() {
  const [showModal, setShowModal] = useState(false);
  const resetGames = useGameStore((st) => st.reset);
  const resetCount = usePlayerCountStore((st) => st.reset);

  const reset = () => {
    resetGames();
    resetCount();
    setShowModal(false);
  };

  return (
    <>
      <Button
        className="nav-reload-button"
        size="lg"
        variant="outline-warning"
        onClick={() => setShowModal(true)}
      >
        Reload List
      </Button>
      <ResetModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onClear={reset}
      />
    </>
  );
}

export default React.memo(ResetButton);
