import React from "react";
import { FlatList, View, Text, Image } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../context/ThemeContext";

const MessageList = ({ messages, loadMoreMessages }) => {
  const { theme } = useTheme();

  const renderItem = ({ item }) => (
    <MessageContainer>
      <AvatarContainer>
        <Avatar source={{ uri: item.avatar }} />
        {item.status === "online" && <StatusIndicator color="#00D44B" />}
        {item.status === "inactive" && <StatusIndicator color="#31BCFC" />}
      </AvatarContainer>
      <MessageDetails>
        <MessageHeader>
          <UserName>{item.name}</UserName>
        </MessageHeader>
        <MessageText>
          {item.fromYou ? <YouText>You: </YouText> : <></>}
          {item.message} {item.time ? <>• {item.time}</> : ""}
        </MessageText>
      </MessageDetails>
      {item.unreadCount > 0 && (
        <UnreadBadgeContainer fromYou={item.fromYou}>
          {!item.fromYou && (
            <UnreadBadgeText>{item.unreadCount}</UnreadBadgeText>
          )}
        </UnreadBadgeContainer>
      )}
    </MessageContainer>
  );

  return (
    <FlatList
      data={messages}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      onEndReached={loadMoreMessages}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
    />
  );
};

// Styled Components
const MessageContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
  height: 72px;
`;

const AvatarContainer = styled(View)`
  width: 52px;
  height: 53px;
  margin-right: 12px;
  position: relative;
`;

const Avatar = styled(Image)`
  width: 52px;
  height: 53px;
  border-radius: 90px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
`;

const StatusIndicator = styled(View)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  border-radius: 90px;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ theme }) => theme.background};
`;

const MessageDetails = styled(View)`
  flex: 1;
`;

const MessageHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled(Text)`
  font-style: "ABeeZee";
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 8px;
  letter-spacing: -0.18px;
  color: ${({ theme }) => theme.text};
`;

const UnreadBadgeContainer = styled(View)`
  background-color: ${({ fromYou, theme }) =>
    fromYou ? theme.unread_badge : "#31bcfc"};
  width: ${({ fromYou }) => (fromYou ? "8px" : "20px")};
  height: ${({ fromYou }) => (fromYou ? "8px" : "20px")};
  margin-right: ${({ fromYou }) => (fromYou ? "6px" : "0")};
  border-radius: 90px;
  justify-content: center;
  align-items: center;
`;

const UnreadBadgeText = styled(Text)`
  color: ${({ theme }) => theme.background};
  font-family: "Segoe UI";
  font-size: 12px;
  font-weight: 300;
  letter-spacing: -0.13px;
`;

const MessageText = styled(Text)`
  font-size: 14px;
  font-style: "ABeeZee";
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.15px;
  color: ${({ theme }) => theme.chat_message_color};
`;

const YouText = styled(Text)`
  font-size: 14px;
  font-style: "ABeeZee";
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.15px;
  color: ${({ theme }) => theme.text};
`;

export default MessageList;
