import React, { useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import useGameStore from "../../stores/useGameStore";
import GameData from "../../types/GameData";
import Str from "../../utils/helpers/stringHelper";

interface GameInfoModalProps {
  game: GameData;
  show: boolean;
  onClose: () => void;
}

const GameInfoModal = ({ game, show, onClose }: GameInfoModalProps) => {
  const itemData = useGameStore((st) => st.itemData);

  const parsed = useMemo(() => {
    const descr = itemData[game.id]?.description.replaceAll("&amp;", "&");
    return Str.parseEntities(descr);
  }, [game.id, itemData]);

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{game.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="newline-preserve">{parsed}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(GameInfoModal);
