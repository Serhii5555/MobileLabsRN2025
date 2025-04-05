import React from "react";
import styled from "styled-components/native";
import { ScreenHeader } from "../components/ScreenHeader";
import SegmentedControl from "../components/SegmentedControl";
import ButtonList from "../components/ButtonList";
import SteamGuard from "../components/SteamGuard";

const SafetyScreen = ({ route }) => {
  return (
    <Container>
      <ScreenHeader
        title={`${route.name}`}
        iconName="steam"
        showSearch={false}
      />
      <SegmentedControl options={["Guard", "Confirmations"]} />
      <SteamGuard />
      <InfoText>
        You’ll enter your code each time you enter your password to sign in to
        your Steam account.
      </InfoText>
      <ActionText>
        Tip: If you don't share your PC, you can select "Remember my password"
        when you sign in to the PC client to enter your password and
        authenticator code less often.
      </ActionText>
      <ButtonList
        buttons={[
          { text: "Remove Authenticator" },
          { text: "My Recovery Code" },
          { text: "Help" },
        ]}
      />
    </Container>
  );
};

const Container = styled.View`
  padding-top: 44px;
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const InfoText = styled.Text`
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
  text-align: start;
  padding: 0 20px;
`;

const ActionText = styled.Text`
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.15px;
  color: #2fb4f1;
  margin-top: 10px;
  text-align: start;
  padding: 0 20px;
  margin-bottom: 16px;
`;

export default SafetyScreen;
