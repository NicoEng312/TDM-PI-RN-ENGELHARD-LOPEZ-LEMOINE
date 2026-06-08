import {useState} from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { auth } from '../../firebase/config';

function Login(props){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function onSubmit(){
    auth.signInWithEmailAndPassword(email, password)
      .then( response => {
        props.navigation.navigate('Home')
      })
      .catch( error => {
        setError('Credenciales inválidas.')
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder='Email'
        onChangeText={ text => setEmail(text) }
        value={email} />
      <TextInput
        style={styles.input}
        keyboardType='default'
        secureTextEntry={true}
        placeholder='Contraseña'
        onChangeText={ text => setPassword(text) }
        value={password} />
      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Pressable>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <Pressable onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.link}>No tenés cuenta? Registrate</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#5C67F2', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
  link: { color: '#5C67F2', textAlign: 'center', marginTop: 16, fontSize: 15 },
});

export default Login;