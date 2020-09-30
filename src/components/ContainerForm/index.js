import styled from "styled-components/native"
import { Form } from "@unform/mobile"

// Style Guide
import StyleGuide from "../../styles/guide"

export default styled(Form)`
  width:100%;
  min-height:550px;
  height:auto;
  padding: ${StyleGuide.padding.all};
  border-top-right-radius: ${StyleGuide.border.radius};
  border-top-left-radius: ${StyleGuide.border.radius};
  background-color: ${StyleGuide.background.secundaryColor};
  margin-top:${StyleGuide.margin.top};

  flex-flow:column;
  justify-content:flex-start;
  align-items:center;
`
