import React, { useEffect, useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../FirebaseConfig';
import { updatePassword } from 'firebase/auth';

export default function Home({ navigation, route, isSidebarVisible }) {
  console.log(route.params.username);
  const [username, setUserName] = useState(route.params.username);
  const [changedPassword , setChangedPassword] = useState('');
  const [isFormVisible , setIsFormVisible] = useState(false);
  
  function logout() {
    auth.signOut()
    .then((result) => {
      Alert.alert('Logut Successfully','you have logged out successfully')
      setUserName("");
    }).catch((err) => {
      
    });
  }

  const toggleChangePasswordForm = ()=> {
    setIsFormVisible(!isFormVisible);
  }

  const changePassword = () => {

    updatePassword(auth.currentUser , changedPassword)
    .then((result) => {
      Alert.alert('updated successfully')
      setIsFormVisible(false);
      setChangedPassword('');
    }).catch((err) => {
      Alert.alert('oops something went wrong')
    });

  }
  

  useEffect(()=>{
    if(username === null | username === undefined || username.length === 0 ){
      navigation.navigate('login')
    }
  })


  return (
    <View>
      <Text style={styles.User}>
        Welcome <Text style={styles.UserName}>{username}</Text>
      </Text>
      

      <View style={[ styles.ChangePasswordBox , !isFormVisible && { opacity: 0, height: 0 } ]} >
        <Text style={styles.ChangePasswordText} >Enter new Password</Text>
        <TextInput style={styles.ChangePasswordInput} value={changedPassword} onChangeText={setChangedPassword} secureTextEntry />
        <View style={ { flexDirection : 'row' , gap : 20 , justifyContent : 'center'} }>
        <Button disabled={changedPassword.length >= 6 ? false : true} title='OK' onPress={changePassword}  />
        <Button color={'red'} title='cancel' onPress={toggleChangePasswordForm} />
        </View>
      </View>

      {/* //side bar */}
      
      <View style={[styles.SideBar, { height: isSidebarVisible ? 700 : 0 , width : !isSidebarVisible && 0 }]}>
        <Text style={styles.SideBarText}>{username}</Text>
        <Pressable onPress={ logout }>
          <View style={styles.SpecialButtons}>
          <Text style={styles.SideBarText}>Logout</Text>
          </View>
        </Pressable>
        <Pressable onPress={ toggleChangePasswordForm }>
          <View style={styles.SpecialButtons}>
          <Text style={styles.SideBarText}>Change Password</Text>
          </View>
        </Pressable>
      </View>

      {/* // side bar */}
    </View>
  );
}

const styles = StyleSheet.create({
  User: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
  UserName: {
    fontWeight: 'bold',
    color: 'violet',
  },
  SideBar: {
    width: '60%',
    zIndex: 400,
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.8,
  },
  SideBarText: {
    color: 'white',
    paddingVertical: 20,
    textAlign : 'center',
    fontWeight : 'bold',
    fontSize : 16
  },
  SpecialButtons : {
    borderWidth : 2 ,
    borderColor : 'white'
  },
  ChangePasswordBox : {
    zIndex : 500 ,
    position : 'absolute',
    backgroundColor : 'white',
    top : 200,
    alignSelf : 'center',
    padding : 20 ,
    width : '80%' ,
    height : 200 ,
    alignItems : 'center',
    justifyContent : 'center'
  },
  ChangePasswordText : {
    fontSize : 20 , 
    fontWeight : 'bold',
    textAlign : 'center'
  },
  ChangePasswordInput : {
    borderColor : '#0074d9',
    borderWidth : 1 ,
    margin : 10 ,
    width : '100%',
    textAlign : 'center',
    padding : 5
  }
});
