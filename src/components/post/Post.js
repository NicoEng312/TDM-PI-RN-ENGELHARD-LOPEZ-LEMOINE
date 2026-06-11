import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
        <Image style={styles.imagen} source={{ uri: post.data.image }} />
      ) : null}

      <Text style={styles.descripcion}>{post.data.description}</Text>

      <View style={styles.acciones}>
        <Pressable style={styles.accion} onPress={() => toggleLike()}>
          <AntDesign
            name={yaLikeo ? 'dislike' : 'like'}
            size={22}
            color={yaLikeo ? '#5C67F2' : '#555'}
          />
          <Text style={styles.textoAccion}>Me gusta ({likes.length})</Text>
        </Pressable>

        <Pressable
          style={styles.accion}
          onPress={() => props.navigation.navigate('Comentarios', { id: post.id })}
        >
          <FontAwesome name="comment-o" size={22} color="#555" />
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  usuario: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
  },
  imagen: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 14,
    marginBottom: 10,
  },
  acciones: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  textoAccion: {
    marginLeft: 6,
    color: '#555',
    fontWeight: '600',
  },
});

export default Post;