import { FunctionComponent } from "react"
import { StackNavigationProp, } from "@react-navigation/stack"

// Type Router
import { ScreensTypes } from "../../config/screen/types/screens";

export type NavigationProp = {
  navigation: StackNavigationProp<ScreensTypes, 'List'>
  props: FunctionComponent
}

export interface IList {
  id: Number,
  email: String,
  first_name: String,
  last_name: String,
  avatar: String
}
