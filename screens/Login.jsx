import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as SQLite from "expo-sqlite";

export default function Login({ navigation }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLogging, setIsLogging] = useState(false);
  const db = SQLite.openDatabase("user.db");

  function validateForm() {
    let error = {};
    if (!username) {
      error.username = "username incorrect";
    }
    if (!password || password.length < 6) {
      error.password = "password incorrect";
    }
    setErrors(error);
  }

  useEffect(() => {
    validateForm();
  }, [username, password]);

  function login() {
    setIsLogging(true);
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS user ( username VARCHAR(45) , password VARCHAR(45) )"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM user WHERE username = ? AND password =?",
        [username, password],

        (tx, rs) => {
          console.log(rs.rows._array);
          if (rs.rows.length >= 1) {
            Alert.alert("logged in successful");
            console.log("logged in");
            navigation.navigate("home", {
              username: username,
            });
          } else {
            Alert.alert("invalid login");
          }
        },
        (tx, rs) => {
          console.log(rs);
        }
      );
    });

    setUserName("");
    setPassword("");
    setIsLogging(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Form}>
        <Text style={styles.Label}>Username </Text>
        <TextInput
          style={styles.InputFields}
          placeholder="enter your username"
          value={username}
          onChangeText={setUserName}
        />
        {errors?.username && (
          <Text style={styles.Error}>*{errors?.username}</Text>
        )}
        <Text style={styles.Label}>Password </Text>
        <TextInput
          style={styles.InputFields}
          value={password}
          placeholder="enter your password"
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors?.password && (
          <Text style={styles.Error}>*{errors?.password}</Text>
        )}
        <View style={styles.Button}>
          <Button
            disabled={errors?.username || errors?.password ? true : false}
            title={isLogging ? "Logging..." : "Login"}
            onPress={() => {
              login();
            }}
          />
        </View>
        <Pressable
          style={styles.Register}
          onPress={() => {
            navigation.navigate("register");
          }}
        >
          <Text style={styles.RegisterText}>If new user register here</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "rgba(128, 128, 128,0.5)",
  },
  Form: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    shadowOffset: {
      height: 3,
      width: 4,
    },
    shadowRadius: 10,
    elevation: 10,
  },
  Label: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },
  Button: {
    width: "50%",
    alignSelf: "center",
  },
  InputFields: {
    height: 50,
    marginVertical: 10,
    fontSize: 20,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#0074d9",
  },
  Error: {
    color: "red",
    textAlign: "center",
    padding: 10,
    fontSize: 16,
  },
  Register: {
    margin: 10,
  },
  RegisterText: {
    textAlign: "center",
    color: "#0074d9",
    fontSize: 15,
    fontWeight: "500",
  },
});
