import Reactotron from "reactotron-react-native"

// Redux Integration
import { reactotronRedux } from 'reactotron-redux'

// @ts-ignore
const rectt = Reactotron.configure()
  .useReactNative()
  .use(reactotronRedux())

// @ts-ignore
console.tron = rectt

export default rectt
