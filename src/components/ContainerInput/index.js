import styled from "styled-components/native"

// Style Guide
import StyleGuide from "../../styles/guide"

export default styled.View`
  width:100%;
  height:auto;
  margin-bottom: ${StyleGuide.margin.bottom};
  border-bottom-width:1px;
  border-bottom-color: ${StyleGuide.border.primaryColor};

  flex-flow:column;
  justify-content:space-between;
  align-items:flex-start;
`
