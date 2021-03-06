import React, { useState, useEffect } from "react"
import { Text, ActivityIndicator } from "react-native";

// Icons
import { Ionicons } from '@expo/vector-icons';

// Navigaion Props
import { NavigationProp, IList } from "./types"

// Components
import ContainerScroll from "../../components/ContainerScroll"
import BackgroundImage from "../../components/Container"
import Create from "../../components/Create"
import Title from "../../components/Title"

// Services
import axios from "../../services/axios"

// Handlers
import HandlerError from "../../utils/handlers/error";
// import HandlerSuccess from "../../utils/handlers/success";
import HandlerNetwork from "../../utils/handlers/network";

// Database
import SQLite from "../../database"

// Databse Statements
import ListCreateStatement from "../../database/statements/create/list"
import ListReadAllStatement, { ListReadEmailStatement } from "../../database/statements/read/list"

// Styles
import {
  Container, Content, Card, CardHeader,
  CardAvatar,
  CardLabel, ButtonCreate
} from "./styles"



const List: React.FC<NavigationProp> = ({ navigation, route }) => {

  const [ list, setList ] = useState<IList[]>([])
  const [ networkStatus, setNetworkStatus ] = useState<boolean | undefined>()
  const [ showNewPage, setShowNewPage ] = useState<boolean>(false)
  const [ showIndicator, setShowIndicator ] = useState<boolean | undefined>(false)

  let numberPage: Number = 1

  useEffect(() => {
    const data: IList = route?.params?.data
    if (data?.email) {
      const userExist = list.find(item => item?.email === data?.email)
      if (!userExist) {
        setList(oldList => [ ...oldList, data ])
      }
    }
  }, [ route ])

  useEffect(() => {
    async function handlerLoadData() {
      try {
        setShowIndicator(old => !old)
        if (networkStatus) {
          const response = await axios.get(`/api/users?page=${numberPage}`)

          if (!response || response?.data?.length <= 0) {
            HandlerError({ message: "Não foi possivel listar todos os usuários" })
            setShowIndicator(old => !old)
            return;
          }

          response.data.data.forEach((item: IList) => {

            SQLite.transaction(tt => {
              tt.executeSql(ListReadEmailStatement,
                [ item?.email ],
                (_transaction, success) => {
                  if (success.rows.length <= 0) {
                    tt.executeSql(ListCreateStatement,
                      [ item?.email, item?.first_name, item?.last_name, item?.avatar ],
                      (_transaction, success) => {
                        if (success?.insertId > 0) {
                          setList(oldList => {
                            if (oldList?.length > 0) {
                              return [ ...oldList, item ]
                            } else {
                              return [ item ]
                            }
                          })
                        }
                      }
                    )
                  }
                }
              )
            })

          })
        } else {
          handlerLocalListAllUser()
        }
        setShowIndicator(old => !old)
      } catch (error) {
        HandlerError(error)
        setShowIndicator(old => !old)
      }
    }

    handlerLoadData()
  }, [ networkStatus ])

  useEffect(() => HandlerNetwork(setNetworkStatus), [])

  function handlerShowNewPage() {
    // setShowNewPage(old => !old)
    navigation.navigate("Create")
  }

  function handlerLocalListAllUser() {
    SQLite.transaction(tt => {
      tt.executeSql(ListReadAllStatement,
        [],
        (_transaction, success) => {
          if (success.rows.length > 0) {
            let items: IList[] = []
            for (let i = 0; i <= success.rows.length; i++) {
              const row = success.rows.item(i)
              if (row?.email?.trim() !== "") {
                items.push(row)
              }
            }

            if (items.length > 0) {
              // @ts-ignore
              setList(oldList => {
                if (oldList?.length > 0) {
                  // @ts-ignore
                  return [ ...oldList, items.filter(item => item?.email !== oldList?.email) ]
                } else {
                  return items
                }
              })
            }
          }
        }
      )
    })
  }

  return (<Container>
    <BackgroundImage>
      {
        !showNewPage && (
          <ButtonCreate onPress={() => handlerShowNewPage()}>
            <Ionicons name="md-add" size={30} color="white" />
          </ButtonCreate>)
      }
      <Content>
        <Title color="#fff">ListOf<Title>Users</Title></Title>
      </Content>
      <Content>
        <ContainerScroll>
          {
            list.length <= 0 || showIndicator
              ?
              (<ActivityIndicator size="small" color="#D5D5D5" animating={showIndicator} />)
              :
              list.reverse().map((item, index) => {
                if (item && item?.email !== "") {
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <CardAvatar source={{ uri: item?.avatar }} />
                        <CardLabel>
                          <Text>{item?.first_name}{" "}{item?.last_name}</Text>
                          <Text>{item?.email}</Text>
                        </CardLabel>
                      </CardHeader>
                    </Card>
                  )
                }
              })
          }
        </ContainerScroll>
        {
          // @ts-ignore
          showNewPage && (<Create callback={handlerSetCreateUser} closeback={handlerShowNewPage} />)
        }
      </Content>
    </BackgroundImage>
  </Container>)
}

export default List
