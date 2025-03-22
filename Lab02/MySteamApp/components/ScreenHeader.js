import React from "react";
import styled from "styled-components/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "../context/ThemeContext";

const ScreenHeader = ({ title, iconName, showSearch }) => {
  const { theme } = useTheme();

  return (
    <Header>
      <Left>
        <Icon name={iconName} size={36} color={theme.text} />
        <Title>{title}</Title>
      </Left>
      {showSearch && (
        <SearchIcon name="search" size={24} color={theme.primary_color} />
      )}
    </Header>
  );
};

// Styled components
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16px;
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Icon = styled(FontAwesome5)`
  margin-right: 8px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 28px;
  line-height: 39px;
  letter-spacing: -0.48px;
  margin-left: 6px;
`;

const SearchIcon = styled(Feather)`
  margin-left: auto;
  margin-right: 12px;
`;

export { ScreenHeader };
