import styled, { css } from "styled-components/native"

// Style Guide
import StyleGuide from "../../styles/guide"

export default styled.Text`
  font-family: ${StyleGuide.font.family};
  font-size: ${StyleGuide.font.size};
  font-weight: ${StyleGuide.font.weight};
  color: ${StyleGuide.text.fourthColor};
  ${props => props.active && css`
    color: ${StyleGuide.text.therdColor};
  `}
`
