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
import PersonIcon from "../../../assets/person.svg";
import EmailIcon from "../../../assets/email.svg";
import LockIcon from "../../../assets/lock.svg";
import SignInput from "../../components/SignInput";
import { useNavigation } from "@react-navigation/native";

import Api from "../../Api";
import { UserContext } from "../../contexts/UserContext";

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = async () => {
    if (name !== "" && email !== "" && password !== "") {
      const res = await Api.signUp(name, email, password);
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
        alert(`Algo deu errado: ${res.error}`);
      }
    } else {
      alert("Preencha todos os campos!");
    }
  };
  const handleSignInClick = () => {
    navigation.reset({
      routes: [{ name: "SignIn" }],
    });
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={(t) => setName(t)}
        />
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

        <CustomButton onPress={handleSignUpClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleSignInClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
