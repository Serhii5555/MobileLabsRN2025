import React from "react";
import { View, Text, ImageBackground } from "react-native";
import styled from "styled-components/native";

const SteamGuard = () => {
  return (
    <GuardContainer>
      <ImageBackground
        source={require("../assets/guard_bg.png")}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ContentWrapper>
          <LoggedInText>Logged in as player</LoggedInText>

          <GuardCode>
            <Text>N5KCV</Text>
          </GuardCode>
          <ProgressContainer>
            <ProgressBar>
              <ProgressFill />
            </ProgressBar>
          </ProgressContainer>
        </ContentWrapper>
      </ImageBackground>
    </GuardContainer>
  );
};

// Styled Components
const GuardContainer = styled.View`
  width: 100%;
  height: 180px;
  align-items: center;
  margin-top: 16px;
`;

const ContentWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const GuardCode = styled.Text`
  font-family: Gilroy;
  font-weight: 700;
  font-size: 54px;
  letter-spacing: 5.52px;
  color: white;
`;

const ProgressContainer = styled.View`
  margin-top: 20px;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

const ProgressBar = styled.View`
  width: 160px;
  height: 8px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.View`
  width: 70%;
  height: 100%;
  background-color: #31bcfc;
`;

const LoggedInText = styled.Text`
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.15px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 10px;
`;

export default SteamGuard;
