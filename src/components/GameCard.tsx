import React, { useMemo, useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import useGameStore from "../stores/useGameStore";
import GameData from "../types/GameData";
import GameInfoModal from "./modals/GameInfoModal";

interface GameCardProps {
  game: GameData;
}

const GameCard = ({ game }: GameCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [getItem, isExp] = useGameStore((st) => [st.getItem, st.isExpansion]);

  const playerCount = useMemo(() => {
    const min = getItem(game)?.minPlayers;
    const max = getItem(game)?.maxPlayers;

    return min === max ? (
      <>{min} players</>
    ) : (
      <>
        {min} &ndash; {max} players
      </>
    );
  }, [game, getItem]);

  return (
    <Card>
      <Card.Body>
        <Row className="game-card">
          <Col>
            <img src={game.thumb} alt="thumbnail" />
          </Col>
          <Col>
            <strong>{game.name.replace("&amp;", "&")}</strong>
            {isExp(game) && " (exp.)"}
          </Col>
          <Col>{game.year}</Col>
          <Col>{playerCount}</Col>
          <Col>{getItem(game)?.categories.join(", ")}</Col>
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
