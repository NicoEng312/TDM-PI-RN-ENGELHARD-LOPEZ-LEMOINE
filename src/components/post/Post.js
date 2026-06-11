import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

function Post(props) {
  const post = props.post;
  const likes = post.data.likes || [];
  const yaLikeo = likes.includes(auth.currentUser.email);

  function toggleLike() {
    if (yaLikeo) {
      db.collection('posts')
        .doc(post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
        })
        .catch(e => console.log(e));
    } else {
      db.collection('posts')
        .doc(post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
        })
        .catch(e => console.log(e));
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.usuario}>{post.data.email}</Text>

      {post.data.image ? (
        <Image style={styles.imagen} source={{ uri: post.data.image }} resizeMode='contain' />
      ) : null}

      <Text style={styles.descripcion}>{post.data.description}</Text>

      <View style={styles.acciones}>
        <Pressable style={styles.accion} onPress={() => toggleLike()}>
          <Ionicons
            name={yaLikeo ? 'heart' : 'heart-outline'}
            size={22}
            color={yaLikeo ? '#5C67F2' : '#555'}
          />
          <Text style={styles.textoAccion}>Me gusta ({likes.length})</Text>
        </Pressable>

        <Pressable
          style={styles.accion}
          onPress={() => props.navigation.navigate('Comentarios', { id: post.id })}
        >
          <Ionicons name="chatbubble-outline" size={22} color="#555" />
          <Text style={styles.textoAccion}>Comentar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  usuario: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
  },
  imagen: {
    width: '100%',
    height: 240,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
  },
  descripcion: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  acciones: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
    paddingTop: 10,
  },
  accion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  textoAccion: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
});

export default Post;