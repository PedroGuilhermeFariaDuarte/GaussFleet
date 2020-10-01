import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

// Type Screens
import { ScreensTypes } from "../config/screen/types/screens";
// Config
import StackScreen from "../config/screen"

// Pages
import Home from "../pages/Home"
import SignIn from "../pages/SignIn"
import List from "../pages/List"
import Create from "../components/Create"

function Router() {
  const Stack = createStackNavigator<ScreensTypes>()

  return <NavigationContainer >
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={StackScreen}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
  </NavigationContainer>
}

export default Router;
