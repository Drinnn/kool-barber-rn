import React, { useState } from "react";
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

export default () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInClick = async () => {
    if (email !== "" && password !== "") {
      const res = await Api.signIn(email, password);
      if (res.token) {
        alert("Deu certo!");
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
