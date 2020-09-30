import styled from "styled-components/native"

// Style Guide
import StyleGuide from "../../styles/guide"

export default styled.Text`
  font-family: ${StyleGuide.font.family};
  font-size: ${StyleGuide.font.specialSize};
  font-weight: ${StyleGuide.font.weight};
  color: ${props => props.color ? props.color : StyleGuide.text.primaryColor};
`
