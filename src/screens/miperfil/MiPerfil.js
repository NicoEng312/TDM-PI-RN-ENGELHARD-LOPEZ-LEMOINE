import { View, Text, Pressable } from 'react-native';
import { auth } from '../../firebase/config';

function MiPerfil(){
  function logout(){
    auth.signOut()
  }

  return (
    <View>
      <Text>MiPerfil</Text>
      <Pressable onPress={() => logout()}>
        <Text>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

export default MiPerfil;