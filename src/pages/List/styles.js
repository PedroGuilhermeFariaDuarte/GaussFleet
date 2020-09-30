import styled from "styled-components/native"

// Style Guide
import StyleGuide from '../../styles/guide'

export const Container = styled.SafeAreaView`
  width:100%;
  height:100%;
  background-color: ${StyleGuide.background.secundaryColor};
  padding-top:${StyleGuide.padding.all};
  flex-flow:column;
  justify-content:flex-end;
  align-items:center;
`

export const Content = styled.ScrollView`
  width:100%;
  height:auto;
  padding: ${StyleGuide.padding.scrolling.all};
`

export const Card = styled.View`
  width:100%;
  height:100px;
  margin-bottom: ${StyleGuide.margin.bottom};
  background-color: ${StyleGuide.background.primaryColor};
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
  background-color:${StyleGuide.background.secundaryColor};
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
