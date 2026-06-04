import {useState} from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { auth } from '../firebase/config';

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
    <View>
      <TextInput
        keyboardType='email-address'
        placeholder='Email'
        onChangeText={ text => setEmail(text) }
        value={email} />
      <TextInput
        keyboardType='default'
        secureTextEntry={true}
        placeholder='Password'
        onChangeText={ text => setPassword(text) }
        value={password} />
      <Pressable onPress={() => onSubmit()}>
        <Text> Iniciar sesión </Text>
      </Pressable>
      <Text>{error}</Text>
      <Pressable onPress={() => props.navigation.navigate('Register')}>
        <Text>No tenés cuenta? Registrate</Text>
      </Pressable>
    </View>
  );
}

export default Login;