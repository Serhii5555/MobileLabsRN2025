import { useState, useEffect, React } from "react";
import styled from "styled-components/native";
import { ScreenHeader } from "../components/ScreenHeader";
import SegmentedControl from "../components/SegmentedControl";
import MessageList from "../components/MessageList";

const ChatScreen = ({ route }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const allMockMessages = [
    {
      avatar: "https://img.ekstat.com/profiles/kaltroh-638604866729209914.jpg",
      name: "Mark Dyson",
      message: "I'm already starting to play",
      time: "14 Jun",
      unreadCount: 1,
      fromYou: false,
      status: "online",
    },
    {
      avatar: "https://img.ekstat.com/profiles/kaltroh-638604866729209914.jpg",
      name: "Mark Dyson",
      message: "Ok",
      time: "14 Jun",
      unreadCount: 1,
      fromYou: true,
      status: "online",
    },
    {
      avatar: "https://i.imgur.com/znQvBMi.png",
      name: "Player123",
      message: "Ok",
      time: "14 Jun",
      unreadCount: 1,
      fromYou: true,
      status: "inactive",
    },
    {
      avatar: "https://i.imgur.com/znQvBMi.png",
      name: "Player123",
      message: "Ok",
      time: "14 Jun",
      unreadCount: 1,
      fromYou: true,
      status: "inactive",
    },
    {
      avatar:
        "https://images.steamusercontent.com/ugc/868480752636433334/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/",
      name: "Player",
      message: "Hello!",
      time: "12 Jun",
      unreadCount: 0,
      fromYou: false,
    },
    {
      avatar:
        "https://images.steamusercontent.com/ugc/868480752636433334/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/",
      name: "Player",
      message: "Hello!",
      time: "12 Jun",
      unreadCount: 0,
      fromYou: false,
    },
    {
      avatar:
        "https://s3-alpha-sig.figma.com/img/837b/029d/6428074703cc8a1e9f7b7ecd6dff1f6b?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kav-s22xgRTfNrEeTbZvL34rmUhL4yhi1~kWeCLEV6L0p25bNrZaNRusi0zpqJKNxsy2-ImdXB0egY3Lp7ESzf3U8jCTzg7DaCXqSZbQl-b3JEnqn3NnYSrysoik8~IGeCsAClf-GAm74mglk79cKzvRa5kjRPS3suDIp9llabNW5c0Bz0GrhQZGCfZOnKq91fBRxR2EFN4IzMFImjWaIomuI7GOB3HuI2wjs3E1UcNg-ipvJ-yAzwqChQc8PSPG2NLiRSvUaAYX~SofIgN3UQW9fpZtBWke9WxAEq7PMdg3Rk9YMOMlE3F~uU764MfeGn5kOJ-fz3NJNiMQzQX5xg__",
      name: "💎ϟ∑χρŗêssσϟ#=_-#",
      message: "Ok",
      time: "",
      unreadCount: 0,
      fromYou: false,
    },
    {
      avatar:
        "https://s3-alpha-sig.figma.com/img/837b/029d/6428074703cc8a1e9f7b7ecd6dff1f6b?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kav-s22xgRTfNrEeTbZvL34rmUhL4yhi1~kWeCLEV6L0p25bNrZaNRusi0zpqJKNxsy2-ImdXB0egY3Lp7ESzf3U8jCTzg7DaCXqSZbQl-b3JEnqn3NnYSrysoik8~IGeCsAClf-GAm74mglk79cKzvRa5kjRPS3suDIp9llabNW5c0Bz0GrhQZGCfZOnKq91fBRxR2EFN4IzMFImjWaIomuI7GOB3HuI2wjs3E1UcNg-ipvJ-yAzwqChQc8PSPG2NLiRSvUaAYX~SofIgN3UQW9fpZtBWke9WxAEq7PMdg3Rk9YMOMlE3F~uU764MfeGn5kOJ-fz3NJNiMQzQX5xg__",
      name: "💎ϟ∑χρŗêssσϟ#=_-#",
      message: "Ok",
      time: "",
      unreadCount: 0,
      fromYou: false,
    },
    {
      avatar:
        "https://images.steamusercontent.com/ugc/868480752636433334/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/",
      name: "Red",
      message: "Hello!",
      time: "15 Jun",
      unreadCount: 2,
      fromYou: false,
    },
  ];

  useEffect(() => {
    loadMoreMessages();
  }, []);

  useEffect(() => {
    loadMoreMessages();
  }, []);

  const loadMoreMessages = () => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      setAllMessages((prevMessages) => [...prevMessages, ...allMockMessages]);
      setLoading(false);
    }, 500);
  };

  return (
    <Container>
      <ScreenHeader
        title={`${route.name}`}
        iconName="steam"
        showSearch={true}
      />
      <SegmentedControl options={["Open chats", "My friends"]} />
      <MessageList messages={allMessages} loadMoreMessages={loadMoreMessages} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 44px;
  background-color: ${({ theme }) => theme.background};
`;

export default ChatScreen;
