import { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../../firebase/config';
import Post from '../../components/post/Post';

function Home(props) {
  const [posteos, setPosteos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosteos(posts);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#5C67F2" />
      ) : (
        <FlatList
          style={styles.flatlist}
          data={posteos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Post post={item} navigation={props.navigation} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatlist: { width: '100%', flex: 1 },
});

export default Home;