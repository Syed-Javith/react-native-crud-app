import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../FirebaseConfig";

export default function Login({ navigation }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLogging, setIsLogging] = useState(false);
  const [isTapped , setIsTapped] = useState(false);

  function validateForm() {
   
    let error = {};
    
    if(username.split('@').length === 1  || username.split('@')[1].length === 0){
      error.username = 'username should be a valid email'
    }
    if(username.indexOf('@') === -1 || username.indexOf('.') === -1){
      error.username = 'username should be a valid email'
    }
    if (!username ) {
      error.username = "username required";
    }
    if (!password || password.length < 6) {
      error.password = "password incorrect";
    }
    setErrors(error);
  }

  useEffect(() => {
    validateForm();
  }, [username, password]);

  const login = async () => {
    setIsLogging(true);
    try{
      const response = await signInWithEmailAndPassword(auth,username,password);
      // console.log(response);
      Alert.alert("Login Successful",`Welcome ${username}`)
      navigation.navigate('home',{
        username : username
      });
    }catch(err){
      // console.log(err);
      Alert.alert('Invalid Credentials','try again')
    }finally{
      setUserName("");
    setPassword("");
    setIsLogging(false);
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Form}>
        <Text style={styles.Label}>Username </Text>
        <TextInput
          style={styles.InputFields}
          placeholder="enter your username"
          value={username}
          onTouchStart={setIsTapped}
          onChangeText={setUserName}
        />
        { (isTapped && errors?.username) && (
          <Text style={styles.Error}>*{errors?.username}</Text>
        )}
        <Text style={styles.Label}>Password </Text>
        <TextInput
          style={styles.InputFields}
          value={password}
          placeholder="enter your password"
          onTouchStart={setIsTapped}
          onChangeText={setPassword}
          secureTextEntry
        />
        { (isTapped && errors?.password) && (
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
      {
        isLogging && <ActivityIndicator  size={'large'} color={'#0074d9'}/>
      }
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
