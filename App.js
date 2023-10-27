import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home.jsx';
import Login from './screens/Login';
import Register from './screens/Register';
import { Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome.js'

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen
          name="home"
          options={{
            headerRight: () => (
              <Pressable onPress={toggleSidebarVisibility}>
                { !isSidebarVisible ? <Icon name='user' size={30}/> : <Icon name='times' size={30}/> }
              </Pressable>
            ),
          }} >
          {(props) => (
            <Home
              {...props}
              isSidebarVisible={isSidebarVisible}
              toggleSidebarVisibility={toggleSidebarVisibility}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
