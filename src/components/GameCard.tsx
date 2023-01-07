import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import useGameStore from "../stores/useGameStore";
import GameData from "../types/GameData";
import ItemData from "../types/ItemData";

interface GameCardProps {
  game: GameData;
}

const GameCard = ({ game }: GameCardProps) => {
  const itemData = useGameStore((st) => st.itemData);
  return (
    <Card>
      <Row style={{ alignItems: "center" }}>
        <Col>
          <img src={game.thumb} alt="thumbnail" />
        </Col>
        <Col>
          <strong>{game.name.replace("&amp;", "&")}</strong>
          {ItemData.isExpansion(game.id, itemData) && " (exp.)"}
        </Col>
        <Col>{game.year}</Col>
        <Col>Min: {itemData[game.id]?.minPlayers}</Col>
        <Col>Max: {itemData[game.id]?.maxPlayers}</Col>
      </Row>
    </Card>
  );
};

export default React.memo(GameCard);
