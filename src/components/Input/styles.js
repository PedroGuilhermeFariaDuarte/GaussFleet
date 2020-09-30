import styled from "styled-components/native"

// Style Guide
import StyleGuide from "../../styles/guide"

export default styled.TextInput`
  width:100%;
  height:55px;
  padding-left: ${StyleGuide.padding.left};



`

export const Container = styled.View`
  width:100%;
  height:auto;

  flex-flow:row;
  align-items:center;
`
