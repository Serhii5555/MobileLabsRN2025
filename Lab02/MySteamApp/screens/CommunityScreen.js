import React from "react";
import styled from "styled-components/native";
import { ScreenHeader } from "../components/ScreenHeader";
import ButtonCarousel from "../components/ButtonCarousel";
import PostList from "../components/PostList";

const buttons = ["All", "Screenshots", "Artwork", "Workshop"];

const posts = [
  {
    id: 1,
    profileImage: "https://logowik.com/content/uploads/images/283_world.jpg",
    userName: "Eurogamer",
    time: "Yesterday • 2:20 PM",
    image:
      "https://s3-alpha-sig.figma.com/img/8dd5/48e7/dd2cc00470ae9a1b347738dc60176d49?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CveiF7WpRhEBQn4oJBj6cyrzpHliNKnprh-d41DZvis4JTO0m3wu2BUFlvzaE3x-j4K~7JHZ13W7~VLiIuLPYO2SQp~-5Cg320CctYOxHcmUwcHFUPt3Qa-XZ0Yly25EgCh~cxu3lUyUyauoFl9r~GtAV~3MuZARso1knYtJH8MtgDPEIrpXAMdjhr6m6E7z8MPy9hRcb78YEvyVTe5tAp1JU1CeHz5MkH4mT1WmBASqNlEHZWf5SQvosjKfPmc6a5~mgS-LJ79ymX~zmQECTiULFwIEpLrsHD8rJb3knVEqFr8qMgEfF2jc23tTghYztJ15~QcCB8mGmTwuNRpbVQ__",
    title:
      "Florida tourist attraction sues Fortnite, seeks removal of in-game castle",
    description:
      "Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.",
    likes: 324,
    comments: 12,
    tagColor: "#B63DB6",
    tagText: "NEWS",
  },
  {
    id: 2,
    profileImage:
      "https://ih1.redbubble.net/image.2655352161.3959/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
    userName: "StardewFan",
    time: "Today • 10:00 AM",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1711128146",
    title: "Stardew Valley received a major update!",
    description:
      "Developer ConcernedApe has released update 1.6 for Stardew Valley. It adds new content, balance improvements, and new possibilities for modders.",
    likes: 542,
    comments: 37,
  },
  {
    id: 3,
    profileImage:
      "https://yt3.googleusercontent.com/0r31CrZzRiYSl-_Zpg14rDNp0lSkHJnKKS7Jmj6sPZtUOFRpulRg1zqO-VYmRDNUSxBEgAeUzw=s900-c-k-c0x00ffffff-no-rj",
    userName: "IGN",
    time: "Today • 12:45 PM",
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg?t=1697635390",
    title: "CD Projekt Red announced a new expansion for The Witcher 3",
    description:
      "The developers of The Witcher 3 have confirmed work on a new free DLC, which will add a quest inspired by the Netflix series.",
    likes: 678,
    comments: 52,
    tagColor: "#FF9800",
    tagText: "GAMING",
  },
];

const CommunityScreen = ({ route }) => {
  return (
    <Container>
      <ScreenHeader
        title={`${route.name}`}
        iconName="steam"
        showSearch={false}
      />
      <StyledText>
        Community and official content for all games {"\n"}and software
      </StyledText>
      <ButtonCarousel buttons={buttons} showSearchButton={true} />
      <PostList posts={posts} />
    </Container>
  );
};

const StyledText = styled.Text`
  margin-left: 16px;
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.navigator_icon_inactive};
  letter-spacing: -0.15px;
`;

const Container = styled.View`
  padding-top: 44px;
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

export default CommunityScreen;
