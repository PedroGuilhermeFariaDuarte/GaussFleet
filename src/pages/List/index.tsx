import React, { useState, useEffect } from "react"
import { Text } from "react-native";
import * as Network from "expo-network"

// Icons
import { Ionicons } from '@expo/vector-icons';

// Navigaion Props
import { NavigationProp, IList } from "./types"

// Components
import ContainerScroll from "../../components/ContainerScroll"
import Create from "../../components/Create"

// Services
import axios from "../../services/axios"

// Handlers
import HandlerError from "../../utils/handlers/error";
import HandlerSuccess from "../../utils/handlers/success";

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



const List: React.FC<NavigationProp> = ({ navigation }) => {

  const [ list, setList ] = useState<Array<IList>>([])
  const [ networkStatus, setNetworkStatus ] = useState<boolean | undefined>(false)
  const [ showNewPage, setShowNewPage ] = useState<boolean>(false)
  let numberPage: Number = 1

  useEffect(() => {
    async function handlerLoadData() {
      try {
        // Rever o tempo de execução
        await handlerGetNetworkStatus()

        if (networkStatus) {
          const response = await axios.get(`/api/users?page=${numberPage}`)

          if (!response || response?.data?.length > 0) {
            HandlerError({ message: "Não foi possivel listar todos os usuários" })
            return;
          }

          response.data.data.forEach((item: IList) => {
            SQLite.transaction(tt => {
              tt.executeSql(ListCreateStatement,
                [ item?.email, item?.first_name, item?.last_name, item?.avatar ],
                (transaction, success) => {
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
            })
          })
        } else {
          SQLite.transaction(tt => {
            tt.executeSql(ListReadAllStatement,
              [],
              (transaction, success) => {
                if (success.rows.length > 0) {
                  // @ts-ignore
                  setList(oldList => {
                    if (oldList?.length > 0) {
                      return [ ...oldList, success.rows ]
                    } else {
                      let items: IList[] = []
                      for (let i = 0; i <= success.rows.length; i++) {
                        items.push(success.rows.item(i))
                      }

                      return [ ...items ]
                    }
                  })
                }
              }
            )
          })
        }
      } catch (error) {
        HandlerError(error)
      }
    }

    handlerLoadData()
  }, [ networkStatus ])

  async function handlerGetNetworkStatus() {
    const { isConnected } = await Network.getNetworkStateAsync()
    setNetworkStatus(isConnected)
  }

  function handlerShowNewPage() {
    setShowNewPage(old => !old)
  }

  function handlerSetCreateUser(dataForm: IList) {
    try {
      SQLite.transaction(tt => {
        tt.executeSql(
          ListReadEmailStatement,
          [ dataForm.email ],
          (transaction, success) => {
            if (success?.rows?.length <= 0) {
              SQLite.transaction(tt => {
                tt.executeSql(ListCreateStatement,
                  [ dataForm.email,
                  dataForm.first_name,
                  dataForm.last_name,
                  dataForm.avatar ],
                  (transaction, success) => {
                    setList(olds => [ ...olds, dataForm ])
                  }
                )
              })
            } else {
              HandlerError({
                message: `Já existe um usuario com este e-mail: ${dataForm.email}`
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
    <ButtonCreate onPress={() => handlerShowNewPage()}>
      <Ionicons name="md-add" size={30} color="white" />
    </ButtonCreate>
    <Content>
      <ContainerScroll>
        {
          list.length <= 0
            ?
            <>
              <Card />
              <Card />
              <Card />
            </>
            :
            list.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardAvatar source={{ uri: item?.avatar }} />
                  <CardLabel>
                    <Text>{item?.first_name}{" "}{item?.last_name}</Text>
                    <Text>{item?.email}</Text>
                  </CardLabel>
                </CardHeader>
              </Card>
            ))
        }
      </ContainerScroll>
      {
        showNewPage && (<Create callback={handlerSetCreateUser} />)
      }
    </Content>
  </Container>)
}

export default List
