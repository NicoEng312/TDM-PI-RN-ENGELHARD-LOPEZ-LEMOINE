import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/config';

function Comentarios(props) {

  const id = props.route.params.id;
  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection('comentarios')
      .where('postId', '==', id)
      .onSnapshot(docs => {
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
      {loading ? (
        <ActivityIndicator size="large" color="#5C67F2" />
      ) : (
        <FlatList
          style={styles.lista}
          data={comentarios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.comentario}>
              <Text style={styles.autor}>{item.data.email}</Text>
              <Text style={styles.texto}>{item.data.texto}</Text>
            </View>
          )}
        />
      )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 40,
  },
  lista: {
    flex: 1,
  },
  comentario: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  autor: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  texto: {
    color: '#555',
  },
  formulario: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 8,
    paddingBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  boton: {
    backgroundColor: '#5C67F2',
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Comentarios;
