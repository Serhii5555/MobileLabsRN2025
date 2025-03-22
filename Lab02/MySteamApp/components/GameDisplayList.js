import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../context/ThemeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const GameDisplayList = ({ games, loadMoreGames }) => {
  const { theme } = useTheme();

  const renderItem = ({ item }) => {
    const { logo, name, platform, basePrice, newPrice, salePercent } = item;

    const isOnSale = basePrice !== newPrice;

    return (
      <GameContainer>
        <GameLogoContainer>
          <GameLogo source={{ uri: logo }} />
        </GameLogoContainer>

        <GameInfoContainer>
          <GameName>{name}</GameName>
          <PlatformContainer>
            {platform.map((plat, index) => (
              <FontAwesome5
                key={index}
                name={plat.icon}
                size={20}
                color={theme.navigator_icon_inactive}
                style={{ marginRight: 5 }}
              />
            ))}

            <PlatformName>
              {platform.map((plat) => plat.name).join(", ")}
            </PlatformName>
          </PlatformContainer>
        </GameInfoContainer>

        <PriceContainer>
          {isOnSale && <BasePrice>{basePrice}</BasePrice>}

          <NewPrice
            style={{
              marginLeft: isOnSale ? 0 : "auto",
              marginTop: isOnSale ? 0 : 8,
            }}
          >
            {isOnSale ? newPrice : basePrice}
          </NewPrice>

          {isOnSale && <SalePercent>-{salePercent}%</SalePercent>}
        </PriceContainer>
      </GameContainer>
    );
  };

  return (
    <FlatList
      data={games}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreGames}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
    />
  );
};

const GameContainer = styled.View`
  width: 100%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
`;

const GameLogoContainer = styled.View`
  width: 72px;
  height: 50px;
`;

const GameLogo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const GameInfoContainer = styled.View`
  width: 146px;
  height: 46px;
  margin-left: 20px;
  justify-content: space-between;
`;

const GameName = styled.Text`
  width: 141px;
  height: 22px;
  font-family: "ABeeZee";
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.32px;
  color: ${({ theme }) => theme.text};
`;

const PlatformContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
`;

const PlatformName = styled.Text`
  width: auto;
  height: 22px;
  font-family: "ABeeZee";
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: ${({ theme }) => theme.navigator_icon_inactive};
`;

const PriceContainer = styled.View`
  width: 80px;
  height: 20px;
  margin-left: 60px;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 4px;
`;

const BasePrice = styled.Text`
  width: 22px;
  height: 18px;
  opacity: 0.7;
  font-family: "PingFang SC";
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.13px;
  text-transform: uppercase;
  text-decoration-line: line-through;
  color: ${({ theme }) => theme.text};
`;

const NewPrice = styled.Text`
  width: 50px;
  height: 18px;
  font-family: "PingFang SC";
  font-weight: 300;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: -0.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text};
`;

const SalePercent = styled.Text`
  width: auto;
  padding-horizontal: 6px;
  height: 20px;
  background-color: rgba(0, 212, 74, 0.68);
  font-family: "PingFang SC";
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.13px;
  text-transform: uppercase;
  color: white;
  border-radius: 5px;
  text-align: center;
`;

export default GameDisplayList;
