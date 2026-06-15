import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/config';

function CrearPost(props) {

  const [descripcion, setDescripcion] = useState('');

  function publicar() {
    if (descripcion === '') {
      return;
    }
    db.collection('posts')
      .add({
        owner: auth.currentUser.email,
        descripcion: descripcion,
        likes: [],
        createdAt: Date.now(),
      })
      .then(() => {
        setDescripcion('');
      })
      .catch(e => console.log(e));
  }

  return (
    <text>Crear post</text>
    );
}
export default CrearPost;