import axios from "axios";
import React, { useState } from "react";
import { TextInput, Button, Text, View } from "react-native";

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 60,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  button: {
    marginVertical: 10,
    width: "100%",
  },
  text: {
    marginVertical: 10,
  },
};

const formatCode = (input) => {
  return input
    .replace(/\D/g, "") // Remueve todos los caracteres que no sean dígitos
    .replace(/(\d{4})(?=\d)/g, "$1-"); // Agrega un guión después de cada grupo de 4 números
};

const isValidInput = (input) => {
  return /^(\d{0,4}-?\d{0,4}-?\d{0,4})?$/.test(input);
};

const validateAndFormatCode = (text) => {
  if (text === "") return "";
  const formattedCode = formatCode(text);
  const isValid = isValidInput(formattedCode);
  if (isValid) {
    return formattedCode;
  }
  return false;
};

export default function Input() {
  const [code, setCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const handleSendCode = () => {
    console.log("Enviando código", code);
    const config = {
    };
    const URL = "http://192.0.2.6:80/api/code/mobile";
    axios
      .post(URL, { code: code.replace("-",'').replace("-",'') }, config)
      .then((response) => {
        setNewCode(response.data.message);
      })
      .catch((error) => {
        // Manejar los errores aquí
          setNewCode(JSON.stringify(error));
        if(error.response.status === 401){
          setNewCode('Codigo incorrecto');    
        }else if(error.response.status === 500){
          setNewCode('Error en el servidor');
        }else{
          setNewCode(JSON.stringify(error));
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificación de Cuenta</Text>
      {/* Input para ingresar el codigo */}
      <Text style={styles.text}>Ingresa tu codigo</Text>
      <TextInput
        style={styles.input}
        placeholder="XXXX-XXXX-XXXX"
        onChangeText={(text) => {
          if (validateAndFormatCode(text) !== false) {
            setCode(validateAndFormatCode(text));
          }
        }}
        value={code}
        keyboardType="numeric"
      />
      {/* Boton para enviar el codigo */}
      <Button
        title="Send"
        disabled={!(code.length === 14)}
        onPress={handleSendCode}
        style={styles.button}
      />
      {/* Texto donde se muestra el nuevo codigo */}
      <Text style={styles.text}>Tu nuevo codigo es: {newCode}</Text>
      {/* {
        newCode && <Text style={styles.title}>{{}}</Text>
      } */}
    </View>
  );
}
