import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ResetModalProps {
  show: boolean;
  onClose: () => void;
  onClear: () => void;
}

const ResetModal = ({ show, onClose, onClear }: ResetModalProps) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Reloading the list causes the app to download the game list from
        BoardGameGeek anew. It may take a while. Are you sure you want to
        continue?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClear}>
          Yes. Do it!
        </Button>
        <Button variant="secondary" onClick={onClose}>
          No, nevermind.
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ResetModal);
