import React, { useEffect } from "react"
import { StatusBar } from 'expo-status-bar'
import { deleteAsync, documentDirectory } from "expo-file-system";

// Navigaion Props
import { NavigationProp } from "./types"

// Components
import BackgroundImage from "../../components/Container"
import Button from "../../components/Button"
import Title from "../../components/Title"
import Label from "../../components/Label"

// Database
import SQLite from "../../database"

// Databse Statements
import UserStatment from "../../database/statements/user"
import ListStatment from "../../database/statements/list"

// Handler
import HanlderError from "../../utils/handlers/error";

// Styles
import { Container, Content } from "./styles"

const Home: React.FC<NavigationProp> = ({ navigation }) => {

  useEffect(() => {
    async function handlerInitializaeDatabase() {
      try {
        await deleteAsync(`${documentDirectory}/SQLite/gaussfleet`).then(() => {
          SQLite.transaction(tt => {
            tt.executeSql(UserStatment)
            tt.executeSql(ListStatment)
          }, error => HanlderError(error))
        })
      } catch (error) {
        HanlderError(error)
      }
    }

    handlerInitializaeDatabase()
  }, [])

  function handlerNavigate(page: String): void {
    // @ts-ignore
    navigation.navigate(page)
  }

  return (<Container>
    <BackgroundImage>
      <Content>
        <Title color="#fff">Gauss<Title>Fleet</Title></Title>
      </Content>
      <Content>
        <Button
          active={true}
          onPress={() => handlerNavigate("SignIn")}
        >
          <Label>Sign In</Label>
        </Button>
      </Content>
    </BackgroundImage>
    <StatusBar style="auto" />
  </Container>)
}

export default Home
