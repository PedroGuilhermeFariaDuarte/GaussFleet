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
  padding:${StyleGuide.padding.all};
  border-radius:${StyleGuide.border.card.radius};

  flex-flow:column;
  justify-content:center;

`
