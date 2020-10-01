import React, { useRef, useEffect } from "react"
import { Text } from "react-native";
import { FormHandles } from '@unform/core';

// Icons
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import ContainerScroll from "../ContainerScroll"
import BackgroundContainer from "../Container"
import ContainerInput from "../ContainerInput"
import ContainerForm from "../ContainerForm"
import Button from "../Button"
import Input from "../Input"
import Title from "../Title"
import Label from "../Label"

// Types
import { NavigationProp } from "./type"

// Types List
import { IList } from "../../pages/List/types"

// Handlers
import HandlerError from "../../utils/handlers/error";
import HandlerSuccess from "../../utils/handlers/success";

// Schemas
import SchemaCreate from "../../utils/schemas/Create"

// Database
import SQLite from "../../database"

// Databse Statements
import ListCreateStatement from "../../database/statements/create/list"
import { ListReadEmailStatement } from "../../database/statements/read/list"

// Styles
import {
  Container, Content
} from "./styles"


const Create: React.FC<NavigationProp> = ({ closeback, navigation, route }) => {
  const formRef = useRef<FormHandles>()

  async function handlerSubmitForm(dataForm: any) {
    try {
      await SchemaCreate.validate(dataForm, {
        abortEarly: false
      })

      handlerSetCreateUser(dataForm)
      return
    } catch (error) {
      HandlerError(error, formRef)
    }
  }

  function handlerSetCreateUser(dataForm: IList) {
    try {
      SQLite.transaction(tt => {
        tt.executeSql(
          ListReadEmailStatement,
          [ dataForm.email ],
          (_transaction, success) => {
            if (success?.rows?.length <= 0) {
              SQLite.transaction(tt => {
                tt.executeSql(ListCreateStatement,
                  [ dataForm?.email,
                  dataForm?.first_name,
                  dataForm?.last_name,
                  dataForm?.avatar ],
                  (_transaction, success) => {
                    //HandlerSuccess(success, `${dataForm?.email} foi cadastrado com sucesso`)
                    // @ts-ignore
                    navigation.navigate("List", { data: dataForm })
                  }
                )
              })
            } else {
              HandlerError({
                message: `Já existe um usuario com este e-mail ${dataForm?.email}`
              })
            }
          }
        )
      })
    } catch (error) {
      HandlerError(error)
    }
  }

  return (<Container>
    <BackgroundContainer>
      <Content>
        <Title color="#fff">Create<Title>User</Title></Title>
      </Content>
      <Content>
        <ContainerForm onSubmit={handlerSubmitForm} ref={formRef}>
          <ContainerScroll>
            <ContainerInput>
              <Label>
                email
            </Label>
              <Input
                type="text"
                name="email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
              >
                <MaterialCommunityIcons name="email-outline" size={24} color="black" />
              </Input>
            </ContainerInput>
            <ContainerInput>
              <Label>
                first name
            </Label>
              <Input type="text" name="first_name" autoCapitalize="none" returnKeyType="next">
                <AntDesign name="user" size={24} color="black" />
              </Input>
            </ContainerInput>
            <ContainerInput>
              <Label>
                last name
            </Label>
              <Input type="text" name="last_name" autoCapitalize="none" returnKeyType="next">
                <AntDesign name="user" size={24} color="black" />
              </Input>
            </ContainerInput>
            <ContainerInput>
              <Label>
                avatar
            </Label>
              <Input type="text" name="avatar" autoCapitalize="none" returnKeyType="done">
                <MaterialCommunityIcons name="image-auto-adjust" size={24} color="black" />
              </Input>
            </ContainerInput>
            <Button
              onPress={() => formRef.current.submitForm()}
            >
              <Label active={true}>continue</Label>
            </Button>
            <Text onPress={() => closeback()}>cancel</Text>
          </ContainerScroll>
        </ContainerForm>
      </Content>
    </BackgroundContainer>
  </Container>)
}

export default Create
