import React from "react";
import { FlatList } from "react-native";
import GameCard from "../components/GameCard";
import styled from "styled-components/native";

const games = [
  { id: "1", title: "Cyberpunk 2077" },
  { id: "2", title: "The Witcher 3" },
  { id: "3", title: "Elden Ring" },
  { id: "4", title: "Red Dead Redemption 2" },
];

const StoreScreen = () => {
  const renderItem = ({ item }) => <GameCard>{item.title}</GameCard>;

  return (
    <Container>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

export default StoreScreen;
