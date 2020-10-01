import React, { useRef, useState, useEffect } from "react"
import { ActivityIndicator } from 'react-native'

// Icons
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Navigaion Props
import { NavigationProp } from "./types"

// Components
import ContainerInput from "../../components/ContainerInput"
import ContainerForm from "../../components/ContainerForm"
import BackgroundImage from "../../components/Container"
import Button from "../../components/Button"
import Title from "../../components/Title"
import Input from "../../components/Input"
import Label from "../../components/Label"

// Styles
import { Container, Content } from "./styles"

// Schemas
import SchemaSignIn from "../../utils/schemas/SignIn"

// Services
import axios from "../../services/axios"

// Hanlders
import HandlerError from "../../utils/handlers/error";
import HanlderNetwork from "../../utils/handlers/network";

// Database
import SQLite from "../../database"

// Databse Statements
import UserReadStatement from "../../database/statements/read/user"
import UserCreateStatement from "../../database/statements/create/user"

const SignIn: React.FC<NavigationProp> = ({ navigation }) => {
  const [ networkStatus, setNetWorkStatus ] = useState<boolean | undefined>()
  const [ showIndicator, setShowIndicator ] = useState<boolean | undefined>(false)
  const formRef = useRef()

  useEffect(() => HanlderNetwork(setNetWorkStatus), [])

  async function handlerSubmitForm(dataForm: any) {
    try {
      setShowIndicator(old => !old)

      await SchemaSignIn.validate(dataForm, {
        abortEarly: false
      })

      if (networkStatus) {
        await handlerSignIn(dataForm)
      } else {
        await handlerSignInLocal(dataForm)
      }

      return
    } catch (error) {
      HandlerError(error, formRef)
      setShowIndicator(old => !old)
    }
  }

  async function handlerSignIn(dataForm: any) {
    try {
      const response = await axios.post("/api/login", dataForm)

      if (!response || !response?.data?.token) {
        HandlerError({ message: "Não foi possivel realizar o login" })
        return;
      }

      SQLite.transaction(tt => {
        tt.executeSql(
          UserReadStatement,
          [ dataForm.email, dataForm.password ],
          (transaction, success) => {
            if (success?.rows?.length <= 0) {
              SQLite.transaction(tt => {
                tt.executeSql(UserCreateStatement,
                  [ dataForm.email, dataForm.password, response?.data?.token ],
                  (transaction, succes) => navigation.navigate("List")
                )
              })
            } else {
              navigation.navigate("List")
            }
          }
        )
      })
    } catch (error) {
      HandlerError(error)
      setShowIndicator(old => !old)
    }
  }

  async function handlerSignInLocal(dataForm: any) {
    try {
      SQLite.transaction(tt => {
        tt.executeSql(
          UserReadStatement,
          [ dataForm?.email, dataForm?.password ],
          (_transaction, success) => {
            if (success?.rows?.length > 0) {
              navigation.navigate("List")
            } else {
              SQLite.transaction(tt => {
                tt.executeSql(UserCreateStatement,
                  [ dataForm?.email, dataForm?.password, "token" ],
                  (_transaction, _success) => navigation.navigate("List")
                )
              })
            }
          }
        )
      })
    } catch (error) {
      HandlerError(error)
      setShowIndicator(old => !old)
    }
  }

  return (<Container>
    <BackgroundImage>
      <Content>
        <Title color="#fff">Create<Title>User</Title></Title>
      </Content>
      <Content>
        <ContainerForm onSubmit={handlerSubmitForm} ref={formRef}>
          <ContainerInput>
            <Label>
              email
            </Label>
            <Input
              type="text"
              name="email"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            >
              <AntDesign name="user" size={24} color="black" />
            </Input>
          </ContainerInput>
          <ContainerInput>
            <Label>
              password
            </Label>
            <Input
              type="password"
              name="password"
              autoCapitalize="none"
              secureTextEntry={true}
              returnKeyType="done"
            >
              <MaterialCommunityIcons name="textbox-password" size={24} color="black" />
            </Input>
          </ContainerInput>
          <Button
            onPress={() => formRef?.current.submitForm()}
          >
            {
              showIndicator ? (<ActivityIndicator size="small" color="#FFF" animating={showIndicator} />) : (<Label active={true}>continue</Label>)
            }

          </Button>
        </ContainerForm>
      </Content>
    </BackgroundImage>
    <StatusBar style="auto" />
  </Container>)
}

export default SignIn
