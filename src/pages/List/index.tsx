import React, { useState, useEffect } from "react"
import { Text } from "react-native";
import * as Network from "expo-network"

// Navigaion Props
import { NavigationProp, IList } from "./types"

// Styles
import { Container, Content, Card } from "./styles"

// Services
import axios from "../../services/axios"

// Hanlders
import HandlerError from "../../utils/handlers/error";
import HandlerSuccess from "../../utils/handlers/success";

// Database
import SQLite from "../../database"

// Databse Statements
import ListCreateStatement from "../../database/statements/create/list"
import ListReadAllStatement from "../../database/statements/read/list"

const List: React.FC<NavigationProp> = ({ navigation }) => {

  const [ list, setList ] = useState<Array<IList>>([])
  const [ networkStatus, setNetworkStatus ] = useState<boolean | undefined>(false)
  let numberPage: Number = 1

  useEffect(() => {
    async function handlerLoadData() {
      try {
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
                [ item.email, item.first_name, item.last_name, item.avatar ],
                (transaction, success) => {
                  if (success.insertId > 0) {
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
                  setList(oldList => {
                    if (oldList?.length > 0) {
                      return [ ...oldList, success.rows ]
                    } else {
                      return [ success.rows.item(0) ]
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
  }, [])

  async function handlerGetNetworkStatus() {
    const { isConnected } = await Network.getNetworkStateAsync()
    setNetworkStatus(isConnected)
  }
  return (<Container>
    <Content>
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
            <Card key={index}><Text>{item.first_name}</Text></Card>
          ))
      }
    </Content>
  </Container>)
}

export default List