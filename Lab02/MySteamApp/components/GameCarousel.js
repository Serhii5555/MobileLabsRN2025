import React from "react";
import { FlatList, ImageBackground } from "react-native";
import styled from "styled-components/native";
import Entypo from "@expo/vector-icons/Entypo";

const GameCarousel = ({ games }) => {
  return (
    <CarouselContainer>
      <FlatList
        data={games}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <GameCard source={{ uri: item.image }}>
            <InfoContainer>
              <GameTitle>{item.name}</GameTitle>
              <GameDescription>{item.description}</GameDescription>
              <PriceContainer>
                {item.discount > 0 && (
                  <DiscountText>-{item.discount}%</DiscountText>
                )}
                {item.discount > 0 && <OldPrice>${item.oldPrice}</OldPrice>}
                <NewPrice>${item.newPrice}</NewPrice>
              </PriceContainer>
            </InfoContainer>
            <Platform>
              <Entypo name="windows-store" size={24} />
            </Platform>
          </GameCard>
        )}
      />
    </CarouselContainer>
  );
};

// Styled Components
const CarouselContainer = styled.View`
  margin-vertical: 12px;
  margin-left: 20px;
  width: auto;
  height: 230px;
`;

const GameCard = styled(ImageBackground)`
  width: 350px;
  height: 230px;
  border-radius: 16px;
  overflow: hidden;
  justify-content: space-between;
  margin-right: 16px;
  padding: 12px;
`;

const InfoContainer = styled.View`
  position: absolute;
  bottom: 12px;
  left: 12px;
  width: 100%;
`;

const GameTitle = styled.Text`
  font-family: Gilroy;
  font-weight: 700;
  font-size: 20px;
  line-height: 39px;
  letter-spacing: -0.34px;
  color: white;
`;

const GameDescription = styled.Text`
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.14px;
  color: rgba(255, 255, 255, 0.7);
`;

const PriceContainer = styled.View`
  margin-top: 6px;
  padding-horizontal: 8px;
  height: 22px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-width: 95px;
  align-self: flex-start;
`;

const DiscountText = styled.Text`
  background-color: green;
  color: white;
  font-family: "PingFang SC";
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.13px;
  text-transform: uppercase;
  padding: 2px 8px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  margin-right: 6px;
`;

const OldPrice = styled.Text`
  color: gray;
  text-decoration: line-through;
  font-family: "PingFang SC";
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.13px;
  text-transform: uppercase;
`;

const NewPrice = styled.Text`
  margin-left: 4px;
  color: white;
  font-family: "PingFang SC";
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.13px;
  text-transform: uppercase;
`;

const Platform = styled(Entypo)`
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 14px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7);
`;

export { GameCarousel };
