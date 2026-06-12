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
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear post</Text>
      <TextInput
        style={styles.input}
        placeholder='¿Qué querés compartir?'
        value={descripcion}
        onChangeText={t => setDescripcion(t)}
        multiline
        numberOfLines={4}
      />
      <Pressable style={styles.boton} onPress={() => publicar()}>
        <Text style={styles.textoBoton}>Publicar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titulo: {
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 24,
    fontFamily: 'Times New Roman',

  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    textAlignVertical: 'top',
    minHeight: 120,
    marginBottom: 16,
  },
  boton: {
    backgroundColor: '#5C67F2',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CrearPost;