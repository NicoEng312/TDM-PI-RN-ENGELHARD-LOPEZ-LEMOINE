import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import MenuTab from '../menutab/MenuTab';

import { auth } from '../../firebase/config';

const Stack = createNativeStackNavigator();

function MenuStack() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(userFromFirebase => {
      setUser(userFromFirebase);
    });
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <MenuTab />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default MenuStack;