import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../context/ThemeContext";

const SegmentedControl = ({ options }) => {
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Container>
      {options.map((option, index) => (
        <SegmentButton
          key={index}
          active={selectedIndex === index}
          onPress={() => setSelectedIndex(index)}
        >
          <SegmentText active={selectedIndex === index}>{option}</SegmentText>
        </SegmentButton>
      ))}
    </Container>
  );
};

// Styled Components
const Container = styled(View)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.segmented_control};
  border-radius: 12px;
  padding: 3px;
  margin: 10px 16px;
  height: 34px;
`;

const SegmentButton = styled(TouchableOpacity)`
  flex: 1;
  background-color: ${({ active, theme }) =>
    active ? theme.background : "transparent"};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const SegmentText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ active, theme }) => (active ? theme.text : theme.text_secondary)};
`;

export default SegmentedControl;
