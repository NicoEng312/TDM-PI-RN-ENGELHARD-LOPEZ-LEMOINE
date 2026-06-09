import { View, Text, Pressable, StyleSheet } from 'react-native';
import { auth } from '../../firebase/config';

function MiPerfil(){
  function logout(){
    auth.signOut();
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <Text style={styles.email}>{auth.currentUser.email}</Text>

      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  email: { color: '#888', textAlign: 'center', marginBottom: 40 },
  button: { backgroundColor: '#ffe3e3', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#e53e3e', fontWeight: 'bold', fontSize: 16 },
});

export default MiPerfil;