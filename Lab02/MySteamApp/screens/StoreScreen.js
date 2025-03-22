import React from "react";
import styled from "styled-components/native";
import { ScreenHeader } from "../components/ScreenHeader";
import { GameCarousel } from "../components/GameCarousel";

const games = [
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

const StoreScreen = ({ route }) => {
  return (
    <Container>
      <ScreenHeader
        title={`${route.name}`}
        iconName="steam"
        showSearch={true}
      />
      <GameCarousel games={games} />;
    </Container>
  );
};

// Styled components
const Container = styled.View`
  padding-top: 44px;
  background-color: ${({ theme }) => theme.background};
`;

export default StoreScreen;
