import React from "react";
import styled from "styled-components/native";

const SafetyScreen = ({ route }) => {
  return (
    <Container>
      <Title>{route.name} Screen</Title>
    </Container>
  );
};

// Styled components
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: bold;
`;

export default SafetyScreen;
