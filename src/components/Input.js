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
    return input.replace(/\D/g, "") // Remueve todos los caracteres que no sean dígitos
           .replace(/(\d{4})(?=\d)/g, "$1-"); // Agrega un guión después de cada grupo de 4 números
};

const isValidInput = (input) => {
    return /^(\d{0,4}-?\d{0,4}-?\d{0,4})?$/.test(input);
};  

const validateAndFormatCode = (text) => {
    if(text === "")
        return "";
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificación de Cuenta</Text>
      {/* Input para ingresar el codigo */}
      <Text style={styles.text}>Ingresa tu codigo</Text>
      <TextInput
        style={styles.input}
        placeholder="XXXX-XXXX-XXXX"
        onChangeText={(text) => {
            if(validateAndFormatCode(text) !== false){
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
        onPress={() => {
          console.log("Sending code", code);
          // generar nuevo codigo aleatorio
          setNewCode(Math.floor(Math.random() * 1000000).toString());
        }}
        style={styles.button}
      />
      {/* Texto donde se muestra el nuevo codigo */}
      <Text style={styles.text}>Tu nuevo codigo es: </Text>
      {/* {
        newCode && <Text style={styles.title}>{{}}</Text>
      } */}
    </View>
  );
}
