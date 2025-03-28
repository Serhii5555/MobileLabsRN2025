import styled from "styled-components/native";

const GameCard = styled.View`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.primary_color};
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
`;

export default GameCard;
