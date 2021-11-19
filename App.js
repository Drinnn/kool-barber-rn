import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import UserContextProvider from "./src/contexts/UserContext";
import MainStack from "./src/stacks/MainStack";

export default () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
};
