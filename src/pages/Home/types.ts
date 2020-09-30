import { FunctionComponent } from "react"
import { StackNavigationProp, } from "@react-navigation/stack"

// Type Router
import { ScreensTypes } from "../../config/screen/types/screens";

export type NavigationProp = {
  navigation: StackNavigationProp<ScreensTypes, 'Home'>
  props: FunctionComponent
}
