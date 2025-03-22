import React, { useState } from "react";
import styled from "styled-components/native";
import { ScreenHeader } from "../components/ScreenHeader";
import { GameCarousel } from "../components/GameCarousel";
import ButtonCarousel from "../components/ButtonCarousel";
import GameDisplayList from "../components/GameDisplayList";

const carousel_games = [
  {
    id: 1,
    name: "Dead By Daylight",
    description: "Horror survival game",
    discount: 70,
    oldPrice: 18,
    newPrice: 5,
    image:
      "https://s3-alpha-sig.figma.com/img/061c/d8d3/53d02b7634d37092b2c8b07d8f54876e?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pjdvAyQQIzJRfSkhdQaNBMQpGOPxkuJVXWeZztCTdGvIVYocESPZ2~Ynb76WIrjZZi-5XqOof43NuBZe~jEHzQ~XYi878ZV9CymDT4D~d1po1idqU84X5tgy9gHcuhSxathf8XIe4okwYcA2eFVfvDLjZysACzZ67ERb2HVrLzsmHHFFyaujUPHo2tyAkNtlYIG3Fp3UPDsWnB9lTT8ZPMLOhy90VcB9PUG~yYFtFXNFoLGRdtH03AmGix6OYuQJoJrGIE6Uc0bxVtgjIscYlPpJwyuFGX3Wn-vmAnPNoxiO3vle3ZeofPmTY5D8L0QjQUXG6RwvIZaNCRVAGi8m9A__",
    platform: "PC",
  },
  {
    id: 2,
    name: "The Witcher 3",
    description: "Epic RPG adventure",
    discount: 0,
    newPrice: 40,
    image:
      "https://cdn-l-thewitcher.cdprojektred.com/meta/TW3NG_thumbnail_en.png",
    platform: "PS5",
  },
];

const buttons = ["Top Sellers", "Free to Play", "Early Access", "Steam Deck"];

const games = [
  {
    id: 1,
    logo: "https://cdn-l-thewitcher.cdprojektred.com/meta/TW3NG_thumbnail_en.png",
    name: "Game 1",
    platform: [
      { name: "Mac", icon: "apple" },
      { name: "Windows", icon: "windows" },
    ],
    basePrice: "$60",
    newPrice: "$50",
    salePercent: 20,
  },
  {
    id: 2,
    logo: "https://cdn-l-thewitcher.cdprojektred.com/meta/TW3NG_thumbnail_en.png",
    name: "Game 2",
    platform: [
      { name: "Linux", icon: "linux" },
      { name: "Windows", icon: "windows" },
    ],
    basePrice: "$40",
    newPrice: "$35",
    salePercent: 10,
  },
  {
    id: 3,
    logo: "https://cdn-l-thewitcher.cdprojektred.com/meta/TW3NG_thumbnail_en.png",
    name: "Game 2",
    platform: [
      { name: "Linux", icon: "linux" },
      { name: "Windows", icon: "windows" },
    ],
    basePrice: "$40",
    newPrice: "$35",
    salePercent: 10,
  },
  {
    id: 4,
    logo: "https://cdn-l-thewitcher.cdprojektred.com/meta/TW3NG_thumbnail_en.png",
    name: "Game 2",
    platform: [{ name: "Windows", icon: "windows" }],
    newPrice: "$35",
    basePrice: "$35",
  },
  {
    id: 5,
    logo: "https://cdn-l-thewitcher.cdprojektred.com/meta/TW3NG_thumbnail_en.png",
    name: "Game 2",
    platform: [{ name: "Windows", icon: "windows" }],
    basePrice: "$40",
    newPrice: "$35",
    salePercent: 10,
  },
];

const StoreScreen = ({ route }) => {
  const [gameList, setGameList] = useState(games);

  const loadMoreGames = () => {
    setGameList((prevGames) => {
      const maxId = Math.max(...prevGames.map((game) => game.id));
      const newGames = prevGames.map((game, index) => ({
        ...game,
        id: maxId + index + 1,
      }));

      return [...prevGames, ...newGames];
    });
  };

  return (
    <Container>
      <ScreenHeader
        title={`${route.name}`}
        iconName="steam"
        showSearch={true}
      />
      <GameCarousel games={carousel_games} />;
      <ButtonCarousel buttons={buttons} showSearchButton={false} />
      <GameDisplayList games={gameList} loadMoreGames={loadMoreGames} />
    </Container>
  );
};

// Styled components
const Container = styled.View`
  flex: 1;
  padding-top: 44px;
  background-color: ${({ theme }) => theme.background};
`;

export default StoreScreen;
