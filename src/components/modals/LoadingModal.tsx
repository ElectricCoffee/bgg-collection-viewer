import _ from "lodash";
import React, { useMemo } from "react";
import { Modal, Spinner } from "react-bootstrap";

interface LoadingModalProps {
  show: boolean;
}

interface WittyMessage {
  title: string;
  subtitle: string;
}

const messages: WittyMessage[] = [
  { title: "Loading games...", subtitle: "Please wait" },
  { title: "Wait...", subtitle: "Loading takes awhile..." },
  {
    title: "Please Hold",
    subtitle: "Our robots are picking out your games from the catalogue.",
  },
  {
    title: "Vent venligst",
    subtitle: "Vores robotter er ved at indsamle dine spil fra kataloget.",
  },
  {
    title: "Your items have been shipped",
    subtitle: "Your order will arrive within 3-6 business weeks.",
  },
  { title: "Elihwa sekat gnidaol...", subtitle: "Tiaw..." },
];

const LoadingModal = ({ show }: LoadingModalProps) => {
  const message = useMemo(() => {
    const i = _.random(0, messages.length - 1);

    return messages[i];
  }, []);

  return (
    <Modal show={show}>
      <Modal.Body style={{ textAlign: "center" }}>
        <h5>{message.title}</h5>
        {message.subtitle}
        <br />
        <br />
        <Spinner animation="border" />
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(LoadingModal);
