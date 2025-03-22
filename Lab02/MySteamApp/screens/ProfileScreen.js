import React from "react";
import styled from "styled-components/native";
import { useTheme } from "../context/ThemeContext";
import { Button } from "react-native";

const ProfileScreen = ({ route }) => {
  const { toggleTheme } = useTheme();

  return (
    <Container>
      <Title>{route.name} Screen</Title>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </Container>
  );
};

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

export default ProfileScreen;
