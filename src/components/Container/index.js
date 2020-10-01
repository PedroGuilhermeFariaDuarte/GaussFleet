import styled from "styled-components/native"

// Style Guide
import StyleGuide from "../../styles/guide"

export default styled.ImageBackground.attrs({
  source: require("../../assets/background/home/home3.jpg"),
  resizeMode: 'cover'
})`
  width:100%;
  height:100%;
  background-color:${StyleGuide.background.fourthColor};
  flex-flow:column;
  justify-content:flex-end;
  align-items:center;
`
export const Container = styled.SafeAreaView`
  width:100%;
  height:100%;
`
