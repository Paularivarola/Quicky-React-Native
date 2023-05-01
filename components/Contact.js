import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TextArea,
} from "react-native"

const Contact = () => {
  return (
    <View style={styles.containerInput}>
      <Text style={styles.title}>Centro de Ayuda</Text>
      <TextInput
        placeholder="Numero alternativo"
        placeholderTextColor="#8C9197"
        style={styles.input}
      />
      {/* <TextInput
        placeholder="consulta"
        placeholderTextColor="#333333"
        style={styles.input}
      /> */}
      <TextInput
        multiline={true}
        numberOfLines={10}
        placeholderTextColor="#8C9197"
        placeholder="Escribe tu consulta"
        style={{
          height: 200,
          textAlignVertical: "top",
          borderWidth: 1,
          width: 300,
          borderRadius: 6,
          marginBottom: 10,
          paddingTop: 6,
          color: "#8C9197",
          fontSize: 17,
          borderColor: "#8C9197",
          paddingLeft: 15,
        }}
      />

      <TouchableOpacity
        onPress={() => props.navigation.navigate("home")}
        style={styles.button}
      >
        <Text style={{ color: "white", fontSize: 22, textAlign: "center" }}>
          Enviar
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "tomato",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center",
    padding: 15,
  },
  containerInput: {
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#FE6849",
    width: "35%",
    borderRadius: 50,
    padding: 15,
  },

  input: {
    width: 300,
    borderRadius: 6,
    color: "#8C9197",
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    marginBottom: 10,
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#8C9197",
  },
})

export default Contact
