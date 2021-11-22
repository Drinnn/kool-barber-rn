import React, { useContext, useState } from "react";
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from "./styles";

import BarberLogo from "../../../assets/barber.svg";
import EmailIcon from "../../../assets/email.svg";
import LockIcon from "../../../assets/lock.svg";
import SignInput from "../../components/SignInput";
import { useNavigation } from "@react-navigation/native";

import Api from "../../Api";
import { UserContext } from "../../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInClick = async () => {
    if (email !== "" && password !== "") {
      const res = await Api.signIn(email, password);
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
        alert("Verifique os campos!");
      }
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const handleSignUpClick = () => {
    navigation.reset({
      routes: [{ name: "SignUp" }],
    });
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
        <SignInput
          IconSvg={EmailIcon}
          type="email-address"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={(t) => setEmail(t)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite seu senha"
          value={password}
          onChangeText={(t) => setPassword(t)}
          password={true}
        />

        <CustomButton onPress={handleSignInClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleSignUpClick}>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
