import { SQLResultSet } from "expo-sqlite"
import { Alert } from "react-native"
import * as Yup from "yup"

function handlerShowAlertMessage(title: string, message: string) {
  Alert.alert(title, message)
}

export default (succes: SQLResultSet, message: string): void => {
  if (succes?.insertId > 0 || succes?.rows.length > 0) {
    handlerShowAlertMessage("GaussFleet", message)
  }
}
