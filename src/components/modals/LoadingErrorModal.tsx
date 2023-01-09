import React from "react";
import { Modal, Button } from "react-bootstrap";

interface LoadingErrorModalProps {
  error: Error | undefined;
  onClose: () => void;
}

const LoadingErrorModal = ({ error, onClose }: LoadingErrorModalProps) => {
  return (
    <Modal show={error !== undefined} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Something went Wrong</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error?.message}
        <br />
        Please try again in about a minute.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(LoadingErrorModal);
