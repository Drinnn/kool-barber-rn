import React, { useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container, LoadingIcon } from "./styles";
import BarberLogo from "../../../assets/barber.svg";

import Api from "../../Api";
import { UserContext } from "../../contexts/UserContext";

export default () => {
  const navigation = useNavigation();

  const { dispatch: userDispatch } = useContext(UserContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const res = await Api.checkToken(token);
        if (res.token) {
          await AsyncStorage.setItem("token", res.token);

          userDispatch({
            type: "setAvatar",
            payload: {
              avatar: res.data.avatar,
            },
          });

          navigation.reset({
            routes: [{ name: "MainTab" }],
          });
        } else {
          navigation.navigate("SignIn");
        }
      } else {
        navigation.navigate("SignIn");
      }
    };

    checkToken();
  }, []);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#fff" />
    </Container>
  );
};
