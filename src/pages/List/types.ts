import { FunctionComponent } from "react"
import { StackNavigationProp } from "@react-navigation/stack"

// Type Router
import { ScreensTypes } from "../../config/screen/types/screens";

export type NavigationProp = {
  navigation: StackNavigationProp<ScreensTypes, 'List'>,
  route: StackNavigationProp<ScreensTypes, 'List'>,
  props: FunctionComponent
}

export interface IList {
  id?: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}
