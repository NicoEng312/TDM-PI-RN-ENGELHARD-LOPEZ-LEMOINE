import { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../../firebase/config';

function MiPerfil() {

  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        docs.forEach(doc => {
          setUsername(doc.data().username);
        });
      });

    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let postsList = [];
        docs.forEach(doc => {
          postsList.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(postsList);
      });
  }, []);

  function logout() {
    auth.signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{auth.currentUser.email}</Text>

      <Text style={styles.subtitulo}>Mis posts</Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.descripcion}>{item.data.descripcion}</Text>
            <View style={styles.likesRow}>
              <Ionicons name="heart" size={14} color="#5C67F2" />
              <Text style={styles.likes}> {(item.data.likes || []).length} likes</Text>
            </View>
          </View>
        )}
      />

      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 40,
  },
  email: {
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  descripcion: {
    color: '#333',
    marginBottom: 6,
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likes: {
    color: '#5C67F2',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#ffe3e3',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#e53e3e',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MiPerfil;