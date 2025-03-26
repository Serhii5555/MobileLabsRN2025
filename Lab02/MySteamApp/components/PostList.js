import React, { useState } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../context/ThemeContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

const PostList = ({ posts }) => {
  const { theme } = useTheme();
  const [data, setData] = useState(posts);

  const loadMorePosts = () => {
    const newPosts = [
      {
        id: data.length + 1,
        profileImage:
          "https://yt3.googleusercontent.com/0r31CrZzRiYSl-_Zpg14rDNp0lSkHJnKKS7Jmj6sPZtUOFRpulRg1zqO-VYmRDNUSxBEgAeUzw=s900-c-k-c0x00ffffff-no-rj",
        userName: "IGN",
        time: "Today • 3:15 PM",
        image:
          "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1716740/header.jpg?t=1727384525",
        title: "Bethesda announces major update for Starfield",
        description:
          "Bethesda has revealed a new update for Starfield, bringing improved performance, additional quest content, and long-awaited modding tools.",
        likes: 731,
        comments: 48,
        tagColor: "#1E88E5",
        tagText: "UPDATE",
      },
    ];

    setData((prevPosts) => [...prevPosts, ...newPosts]);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <PostItem post={item} />}
    />
  );
};

const PostItem = ({ post }) => {
  const { theme } = useTheme();

  return (
    <>
      <Divider />
      <PostContainer>
        <Header>
          <LeftContainer>
            <ProfilePicture source={{ uri: post.profileImage }} />
            <View>
              <UserNameContainer>
                <UserName>{post.userName}</UserName>
                <PostTag style={{ backgroundColor: post.tagColor }}>
                  {post.tagText}
                </PostTag>
              </UserNameContainer>
              <PostTime>{post.time}</PostTime>
            </View>
          </LeftContainer>

          <TouchableOpacity>
            <FontAwesome5
              name="ellipsis-h"
              size={16}
              color={theme.text_secondary}
            />
          </TouchableOpacity>
        </Header>

        <PostImage source={{ uri: post.image }} />

        <PostTitle>{post.title}</PostTitle>
        <PostDescription>{post.description}</PostDescription>

        <Divider2 />
        <Footer>
          <Action>
            <LikeAction>
              <Feather name="thumbs-up" size={18} color={"#00D44B"} />
              <LikeActionText>{post.likes}</LikeActionText>
            </LikeAction>
            <CommentAction>
              <FontAwesome5
                name="comment-alt"
                size={18}
                color={theme.text_secondary}
              />
              <CommentActionText>{post.comments}</CommentActionText>
            </CommentAction>
          </Action>
          <Action>
            <Ionicons
              name="arrow-redo-outline"
              size={26}
              color={theme.text_secondary}
            />
          </Action>
        </Footer>
      </PostContainer>
    </>
  );
};

/* Styled Components */
const Divider = styled.View`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.navigator};
`;

const Divider2 = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.text_secondary};
  margin: 16px 0;
`;

const PostContainer = styled.View`
  background-color: ${({ theme }) => theme.background};
  padding: 12px;
  border-radius: 8px;
  margin: 8px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const ProfilePicture = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 8px;
`;

const UserNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PostTag = styled.Text`
  color: white;
  text-transform: uppercase;
  font-style: "sans-serif";
  padding: 2px 5px;
  border-radius: 5px;
  font-weight: 300;
  font-size: 10px;
  letter-spacing: -0.09px;
  margin-left: 16px;
`;

const UserName = styled.Text`
  font-family: "ABeeZee";
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const PostTime = styled.Text`
  margin-top: 4px;
  font-family: "ABeeZee";
  font-weight: 400;
  font-size: 12px;
  color: gray;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin: 12px 0;
`;

const PostTitle = styled.Text`
  margin-top: 6px;
  margin-left: 4px;
  font-family: "ABeeZee";
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const PostDescription = styled.Text`
  margin-top: 12px;
  margin-left: 4px;
  font-family: "ABeeZee";
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Action = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ActionText = styled.Text`
  font-family: "sans-seriff";
  font-weight: 400;
  font-size: 16px;
  margin-left: 4px;
`;

const LikeAction = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const LikeActionText = styled.Text`
  color: #00d44b;
  font-family: "sans-seriff";
  font-weight: 600;
  font-size: 16px;
  margin-left: 4px;
`;

const CommentAction = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-left: 24px;
`;

const CommentActionText = styled.Text`
  color: ${({ theme }) => theme.text_secondary};
  font-family: "sans-seriff";
  font-weight: 600;
  font-size: 16px;
  margin-left: 4px;
`;

export default PostList;
