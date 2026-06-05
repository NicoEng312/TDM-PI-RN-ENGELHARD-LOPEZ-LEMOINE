import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';

const Stack = createNativeStackNavigator();

function MenuStack(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={ Login } />
        <Stack.Screen name="Register" component={ Register } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MenuStack;