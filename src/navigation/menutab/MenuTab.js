import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../screens/home/Home';
import CrearPost from '../../screens/crearpost/CrearPost';
import MiPerfil from '../../screens/miperfil/MiPerfil';
import Comentarios from '../../screens/comentarios/Comentarios';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="Comentarios" component={Comentarios} />
    </HomeStack.Navigator>
  );
}

function MenuTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home-sharp';
          else if (route.name === 'Crear post') iconName = 'add';
          else if (route.name === 'Mi perfil') iconName = 'person-circle-sharp';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5C67F2',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStackNavigator} />
      <Tab.Screen name="Crear post" component={CrearPost} />
      <Tab.Screen name="Mi perfil" component={MiPerfil} />
    </Tab.Navigator>
  );
}

export default MenuTab;
