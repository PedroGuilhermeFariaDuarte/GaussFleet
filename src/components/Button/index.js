import styled, { css } from "styled-components/native";

// Style Guide
import StyleGuide from "../../styles/guide"

export default styled.TouchableOpacity`
  width:80%;
  height:75px;
    background-color:${StyleGuide.button.primaryColor};
  ${props => props.active && css`
    background-color:${StyleGuide.button.secundaryColor};
  `}
  border-radius:60px;
  margin-bottom:${StyleGuide.margin.bottom};

  flex-flow:row;
  justify-content:center;
  align-items:center;
`
