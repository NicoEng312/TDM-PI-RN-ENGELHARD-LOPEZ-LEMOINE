import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/config';

function Comentarios(props) {
  const id = props.route.params.id;
  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection('comentarios').onSnapshot(docs => {
      let comments = [];
      docs.forEach(doc => {
        comments.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setComentarios(comments);
      setLoading(false);
    });
  }, []);

  function agregarComentario() {
    if (texto === '') {
      return;
    }
    db.collection('comentarios')
      .add({
        postId: id,
        email: auth.currentUser.email,
        texto: texto,
        createdAt: Date.now(),
      })
      .then(() => {
        setTexto('');
      })
      .catch(e => console.log(e));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comentarios</Text>
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder='Escribí un comentario...'
          value={texto}
          onChangeText={t => setTexto(t)}
        />
        <Pressable style={styles.boton} onPress={() => agregarComentario()}>
          <Text style={styles.textoBoton}>Enviar</Text>
        </Pressable>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#5C67F2" />
      ) : (
        <FlatList
          style={styles.lista}
          data={comentarios.filter(c => c.data.postId === id)}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.comentario}>
              <Text style={styles.autor}>{item.data.email}</Text>
              <Text style={styles.texto}>{item.data.texto}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
export default Comentarios;