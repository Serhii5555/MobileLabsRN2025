import React from "react";
import styled from "styled-components/native";
import { useTheme } from "../context/ThemeContext";
import { Button } from "react-native";
import ProfileIcon from "../components/ProfileIcon";
import ButtonList from "../components/ButtonList";

const ProfileScreen = ({ route }) => {
  const { toggleTheme } = useTheme();

  return (
    <Container>
      <ProfileIcon
        picture={require("../assets/avatar.jpg")}
        fullName="Beilakh Serhii"
        group="IPZ-23-3"
        statusColor="#00D44B"
      />
      <Margin></Margin>
      <ButtonList
        buttons={[
          { text: "Settings", onPress: toggleTheme },
          { text: "Logout" },
        ]}
      />
      <Margin></Margin>
      <Margin></Margin>
      <Margin></Margin>
      <Margin></Margin>
      <Margin></Margin>
      <Margin></Margin>
      <Margin></Margin>
      <Margin></Margin>

      <Button title="Toggle Theme" onPress={toggleTheme} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Margin = styled.View`
  margin-top: 40px;
`;

export default ProfileScreen;
