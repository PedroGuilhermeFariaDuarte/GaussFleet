import { ReactElement } from "react"
import { FunctionComponent } from "react"
import { StackNavigationProp } from "@react-navigation/stack"

// Type Router
import { ScreensTypes } from "../../config/screen/types/screens"

export interface NavigationProp extends ReactElement {
  navigation: StackNavigationProp<ScreensTypes, 'Create'>,
  route: StackNavigationProp<ScreensTypes, 'Create'>,
  props: FunctionComponent,
  callback: Function,
  closeback: Function
}
