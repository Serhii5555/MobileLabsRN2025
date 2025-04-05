import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

const ButtonList = ({ buttons }) => {
  const { theme } = useTheme();

  return (
    <ButtonListContainer>
      <FlatList
        data={buttons}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <>
            {index > 0 && <Divider />}
            <ButtonItem
              button={item}
              index={index}
              total={buttons.length}
              onPress={item.onPress}
            />
          </>
        )}
      />
    </ButtonListContainer>
  );
};

const ButtonItem = ({ button, index, total }) => {
  const { theme } = useTheme();

  return (
    <ButtonContainer index={index} total={total}>
      <ButtonContent>
        <ButtonText>{button.text}</ButtonText>
        <Entypo name="chevron-right" size={24} color={theme.text_secondary} />
      </ButtonContent>
    </ButtonContainer>
  );
};

/* Styled Components */
const ButtonListContainer = styled.View`
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  margin: 8px;
`;

const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: transparent;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.button_list};
  justify-content: center;
  padding: 0px 16px;
  height: 56px;
  margin: 0px 16px;

  border-top-left-radius: ${({ index, total }) =>
    index === 0 && total > 1 ? "8px" : "0px"};
  border-top-right-radius: ${({ index, total }) =>
    index === 0 && total > 1 ? "8px" : "0px"};
  border-bottom-left-radius: ${({ index, total }) =>
    index === total - 1 && total > 1 ? "8px" : "0px"};
  border-bottom-right-radius: ${({ index, total }) =>
    index === total - 1 && total > 1 ? "8px" : "0px"};
`;

const ButtonContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-family: "ABeeZee";
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.32px;
  color: ${({ theme }) => theme.text};
`;

export default ButtonList;
