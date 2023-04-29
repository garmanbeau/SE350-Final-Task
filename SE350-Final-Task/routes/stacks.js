import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccountScreen from '../screens/createaccount';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';

const Stack = createNativeStackNavigator();

export default function App() {
      
    
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Create Account" component={CreateAccountScreen} />  
        </Stack.Navigator>
    </NavigationContainer>
  );
}