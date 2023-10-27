import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ActivityIndicatorBase,
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register({ navigation }) {
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

  const register = async () => {
    try{
      const response = await createUserWithEmailAndPassword(auth,username,password);
      // console.log(response);
      alert('registered successfully')
      navigation.navigate('login')
      setIsLogging(false)
    
    }catch(err){
      // console.log(err.code);
      if(err.code === 'auth/email-already-in-use'){
        Alert.alert('user already found','try login with the username');
        navigation.navigate('login')
      }
    }
  };

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
          onChangeText={setPassword}
          onTouchStart={setIsTapped}
          secureTextEntry
        />
        { (isTapped && errors?.password) && (
          <Text style={styles.Error}>*{errors?.password}</Text>
        )}
        <View style={styles.Button}>
          <Button
            disabled={
              isLogging || errors?.username || errors?.password ? true : false
            }
            title={isLogging ? "registering..." : "register"}
            onPress={() => {
              register();
            }}
          />
          
        </View>
      </View>
      {
        isLogging && <ActivityIndicator size={'small'} color={'#0074d9'}/>
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
});
