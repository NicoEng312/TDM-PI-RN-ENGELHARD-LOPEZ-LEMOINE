import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
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
            name={yaLikeo ? 'like1' : 'like2'}
            size={22}
            color={yaLikeo ? '#5C67F2' : '#555'}
          />
          <Text style={styles.contador}>{likes.length}</Text>
        </Pressable>

        <Pressable
          style={styles.accion}
          onPress={() => props.navigation.navigate('Comentarios', { id: post.id })}
        >
          <AntDesign name="message1" size={22} color="#555" />
          <Text style={styles.contador}>Comentar</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Post;