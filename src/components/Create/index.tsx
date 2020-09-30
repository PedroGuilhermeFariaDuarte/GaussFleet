import React, { useRef, useState } from "react"
import { Text } from "react-native";
import { FormHandles } from '@unform/core';

// Icons
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import ContainerScroll from "../ContainerScroll"
import ContainerInput from "../ContainerInput"
import ContainerForm from "../ContainerForm"
import Button from "../Button"
import Title from "../Title"
import Input from "../Input"
import Label from "../Label"

// Types
import IProps from "./type"

// Handlers
import HandlerError from "../../utils/handlers/error";

// Schemas
import SchemaCreate from "../../utils/schemas/Create"

// Styles
import {
  Container, Content
} from "./styles"


const Create: React.FC<IProps> = ({ callback }) => {
  const formRef = useRef<FormHandles>()

  async function handlerSubmitForm(dataForm: any) {
    try {
      await SchemaCreate.validate(dataForm, {
        abortEarly: false
      })

      callback(dataForm)
      return
    } catch (error) {
      HandlerError(error, formRef)
    }
  }

  return (<Container>
    <Content>
      <ContainerForm onSubmit={handlerSubmitForm} ref={formRef}>
        {/* <ContainerScroll> */}
        <ContainerInput>
          <Label>
            email
            </Label>
          <Input type="text" name="email">
            <AntDesign name="user" size={24} color="black" />
          </Input>
        </ContainerInput>
        <ContainerInput>
          <Label>
            first name
            </Label>
          <Input type="text" name="first_name">
            <AntDesign name="user" size={24} color="black" />
          </Input>
        </ContainerInput>
        <ContainerInput>
          <Label>
            last name
            </Label>
          <Input type="text" name="last_name">
            <AntDesign name="user" size={24} color="black" />
          </Input>
        </ContainerInput>
        <ContainerInput>
          <Label>
            avatar
            </Label>
          <Input type="text" name="avatar">
            <AntDesign name="user" size={24} color="black" />
          </Input>
        </ContainerInput>
        {/* </ContainerScroll> */}
        <Button
          onPress={() => formRef.current.submitForm()}
        >
          <Label active={true}>continue</Label>
        </Button>
      </ContainerForm>
    </Content>
  </Container>)
}

export default Create
