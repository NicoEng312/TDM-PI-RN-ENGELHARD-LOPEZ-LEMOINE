import {useState} from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';

function Register(props){
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function onSubmit(){
    auth.createUserWithEmailAndPassword(email, password)
      .then( response => {
        props.navigation.navigate('Login')
        db.collection('users').add({
          email: email,
          username: username,
          createdAt: Date.now(),
        })
          .then()
          .catch( e => console.log(e))
      })
      .catch( error => {
        setError('Fallo en el registro.')
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
        placeholder='Username'
        onChangeText={ text => setUsername(text) }
        value={username} />
      <TextInput
        keyboardType='default'
        secureTextEntry={true}
        placeholder='Password'
        onChangeText={ text => setPassword(text) }
        value={password} />
      <Pressable onPress={() => onSubmit()}>
        <Text> Registrate </Text>
      </Pressable>
      <Text>{error}</Text>
      <Pressable onPress={() => props.navigation.navigate('Login')}>
        <Text>Ya tenés cuenta? Iniciá sesión</Text>
      </Pressable>
    </View>
  );
}

export default Register;