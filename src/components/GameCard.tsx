import React, { useMemo, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import useGameStore from "../stores/useGameStore";
import GameData from "../types/GameData";
import ItemData from "../types/ItemData";
import GameInfoModal from "./modals/GameInfoModal";

interface GameCardProps {
  game: GameData;
}

const GameCard = ({ game }: GameCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const itemData = useGameStore((st) => st.itemData);

  const playerCount = useMemo(() => {
    const min = itemData[game.id]?.minPlayers;
    const max = itemData[game.id]?.maxPlayers;

    return min === max ? (
      <>{min} players</>
    ) : (
      <>
        {min} &ndash; {max} players
      </>
    );
  }, [game.id, itemData]);

  return (
    <Card>
      <Card.Body>
        <Row className="game-card">
          <Col>
            <img src={game.thumb} alt="thumbnail" />
          </Col>
          <Col>
            <strong>{game.name.replace("&amp;", "&")}</strong>
            {ItemData.isExpansion(game.id, itemData) && " (exp.)"}
          </Col>
          <Col>{game.year}</Col>
          <Col>{playerCount}</Col>
          <Col>
            <Button
              variant="outline-primary"
              onClick={() => setShowModal(true)}
            >
              Info
            </Button>
          </Col>
        </Row>
      </Card.Body>
      <GameInfoModal
        game={game}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </Card>
  );
};

export default React.memo(GameCard);
