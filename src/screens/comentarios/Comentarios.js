import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator } from 'react-native';
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
    <View>
      <Text>Comentarios</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#5C67F2" />
      ) : (
        <FlatList
          data={comentarios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.data.email}</Text>
              <Text>{item.data.texto}</Text>
            </View>
          )}
        />
      )}
      <View>
        <TextInput
          placeholder='Escribí un comentario...'
          value={texto}
          onChangeText={t => setTexto(t)}
        />
        <Pressable onPress={() => agregarComentario()}>
          <Text>Enviar</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Comentarios;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  formulario: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginRight: 8,
  },
  boton: {
    backgroundColor: '#5C67F2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: '600',
  },
  lista: {
    width: '100%',
    flex: 1,
  },
  comentario: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
  },
  autor: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
    marginBottom: 2,
  },
  texto: {
    fontSize: 14,
    color: '#333',
  },
});

export default Comentarios;