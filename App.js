import { NavigationContainer } from '@react-navigation/native';
import { NativeStackView, createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home.jsx';
import Register from './screens/Register';
import { Pressable, Text } from 'react-native';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='login' component={Login}/>
        <Stack.Screen 
        name='home' 
        component={Home}
        options={
          {
            headerRight : () => {
              <Pressable>
                <Text>Hello</Text>
              </Pressable>
            }
          }
        } />
        <Stack.Screen name='register' component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}