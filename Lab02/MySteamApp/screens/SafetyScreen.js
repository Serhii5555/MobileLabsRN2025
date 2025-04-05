import React from "react";
import styled from "styled-components/native";
import { ScreenHeader } from "../components/ScreenHeader";
import SegmentedControl from "../components/SegmentedControl";

const SafetyScreen = ({ route }) => {
  return (
    <Container>
      <ScreenHeader
        title={`${route.name}`}
        iconName="steam"
        showSearch={false}
      />
      <SegmentedControl options={["Guard", "Confirmations"]} />
    </Container>
  );
};

const Container = styled.View`
  padding-top: 44px;
  background-color: ${({ theme }) => theme.background};
`;

export default SafetyScreen;
