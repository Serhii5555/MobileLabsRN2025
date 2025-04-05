import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";

const ProfileIcon = ({ picture, fullName, group, statusColor }) => {
  return (
    <ProfileContainer>
      <AvatarContainer>
        <Avatar source={picture} />
        <StatusIndicator color={statusColor} />
      </AvatarContainer>
      <ProfileInfo>
        <InfoText>{fullName}</InfoText>
        <InfoText>{group}</InfoText>
      </ProfileInfo>
    </ProfileContainer>
  );
};

// Styled Components
const ProfileContainer = styled.View`
  margin-top: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AvatarContainer = styled.View`
  width: 92px;
  height: 92px;
  position: relative;
`;

const Avatar = styled.Image`
  width: 92px;
  height: 92px;
  border-radius: 90px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
`;

const StatusIndicator = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 26px;
  height: 26px;
  border-radius: 90px;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ theme }) => theme.background};
`;

const ProfileInfo = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InfoText = styled.Text`
  font-family: "ABeeZee";
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.18px;
  margin-top: 4px;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

export default ProfileIcon;
