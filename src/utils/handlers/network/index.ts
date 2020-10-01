import NetInfo from '@react-native-community/netinfo'

// Handlers
import HandlerError from "../error"

export default (callback: Function) => {
  try {
    NetInfo.addEventListener(state => {
      callback(state?.isConnected)
    })
  } catch (error) {
    HandlerError(error)
  }
}
