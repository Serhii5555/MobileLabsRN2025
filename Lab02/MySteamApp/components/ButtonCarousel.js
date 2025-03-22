import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../context/ThemeContext";
import Feather from "@expo/vector-icons/Feather";

const ButtonCarousel = ({ buttons, showSearchButton }) => {
  const { theme } = useTheme();

  const [activeIndex, setActiveIndex] = useState(showSearchButton ? 1 : 0);

  const handlePress = (index) => {
    setActiveIndex(index);
  };

  const buttonList = showSearchButton ? ["search", ...buttons] : buttons;

  return (
    <CarouselContainer>
      <FlatList
        data={buttonList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ButtonWrapper>
            {item === "search" ? (
              <SearchButton theme={theme}>
                <SearchIcon name="search" size={14} color="#555B6F" />
              </SearchButton>
            ) : (
              <Button
                onPress={() => handlePress(index)}
                active={activeIndex === index}
                theme={theme}
              >
                <ButtonText active={activeIndex === index}>{item}</ButtonText>
              </Button>
            )}
          </ButtonWrapper>
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </CarouselContainer>
  );
};

// Styled Components
const CarouselContainer = styled.View`
  margin-top: 18px;
  margin-bottom: 12px;
  margin-left: 12px;
`;

const ButtonWrapper = styled.View`
  margin-right: 10px;
`;

const Button = styled(TouchableOpacity)`
  background-color: ${({ active, theme }) =>
    active ? theme.secondary_color : theme.primary_color};
  padding-horizontal: 16px;
  height: 38px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.15px;
  color: ${({ theme }) => theme.text};
`;

const SearchButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.primary_color};
  width: 38px;
  height: 38px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const SearchIcon = styled(Feather)`
  font-size: 18px;
`;

export default ButtonCarousel;
