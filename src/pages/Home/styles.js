import styled from "styled-components/native"

// Style Guide
import StyleGuide from '../../styles/guide'

export const Container = styled.SafeAreaView`
  width:100%;
  height:100%;
  background-color: ${StyleGuide.background.secundaryColor};

  flex-flow:column;
  justify-content:flex-end;
  align-items:center;
`

export const Content = styled.View`
  width:100%;
  height:50%;

  flex-flow:column;
  justify-content:center;
  align-items:center;
`
