import styled from "styled-components/native"

// Style Guide
import StyleGuide from '../../styles/guide'

export const Container = styled.SafeAreaView`
  width:100%;
  height:100%;
  background-color: #fff;

  flex-flow:column;
  justify-content:flex-end;
  align-items:center;
`

export const Content = styled.View`
  width:100%;
  min-height:30%;
  max-height:60%;

  justify-content:center;
  align-items:center;
`

export const Card = styled.View`
  width:96.5%;
  height:100px;
  margin-bottom: ${StyleGuide.margin.bottom};
  background-color: ${StyleGuide.background.secundaryColor};
  padding:15px 10px 10px ${StyleGuide.padding.all};
  border-radius:${StyleGuide.border.card.radius};

  flex-flow:column;
`

export const CardHeader = styled.View`
  width:100%;
  height:auto;

  flex-flow:row;
  justify-content:center;
`
export const CardAvatar = styled.Image`
  width:60px;
  height:60px;
  border-radius:30px;
  background-color:${StyleGuide.background.primaryColor};
`

export const CardLabel = styled.View`
  width:100%;
  height:auto;
  padding-left:${StyleGuide.padding.left};
  flex-flow:column;
`

export const ButtonCreate = styled.TouchableOpacity`
  width:70px;
  height:70px;
  border-radius: 35px;
  background-color:${StyleGuide.background.fourthColor};
  position:absolute;
  bottom:50px;
  right:20px;
  z-index:100;

  flex-flow:row;
  justify-content:center;
  align-items:center;
`
