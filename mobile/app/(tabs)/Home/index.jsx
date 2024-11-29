import React from 'react'; 
import { View, Text, StyleSheet, TextInput, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter()

  const featuredPlaylists = [
    { id: 1, name: '20 Ligações', image: 'https://i.scdn.co/image/ab67616d0000b2739ba77e3ca38205c4dbfc5e8b' },
    { id: 2, name: 'La Noche', image: 'https://i.ytimg.com/vi/evwMiEh2u8Y/maxresdefault.jpg' },
    { id: 3, name: '6 BALAS', image: 'https://akamai.sscdn.co/uploadfile/letras/albuns/0/1/3/9/1990581697550361.jpg' },
  ];

  const popularArtists = [
    { name: 'Artista 1', image: 'https://revistaraca.com.br/wp-content/uploads/2022/01/Baco-2-e1643582141675.png' },
    { name: 'Artista 2', image: 'https://conteudo.imguol.com.br/c/entretenimento/68/2024/06/14/capa-do-album-oproprio-de-yago-oproprio-1718387308392_v2_450x450.jpg' },
    { name: 'Artista 3', image: 'data:image/png;base64,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' },
  ];

  const albums = [
    { name: 'Daily Mix', image: 'https://i.ytimg.com/vi/4J9_hMbj9vY/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgUihOMA8=&rs=AOn4CLCqKyjbCzekT-l-0gWaNvKZ7Gp78w' },
    { name: 'Mix Pop', image: 'https://www.usmagazine.com/wp-content/uploads/2022/08/Ariana-Grande-Through-Years-0004.jpg?quality=86&strip=all' },
    { name: 'Mix 2000', image: 'https://mixmag.com.br/assets/uploads/images/_full/50-Cent.jpeg' },
  ];

  return (
    <ScrollView style={styles.container}> 
      <View style={styles.topBar}>
        <Link href="/Perfil">
          <Ionicons name="person-circle-outline" size={28} color="#282828" />
        </Link>
        
        <TextInput
          style={styles.searchBar}
          placeholder="O que você quer ouvir?"
          placeholderTextColor="#AFAFAF"
        />
      </View>

      <Text style={styles.sectionTitle}>Artistas Populares</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollSection}>
        {popularArtists.map((artist, index) => (
          <Pressable key={index} onPress={() => ('Artist', { name: artist.name, image: artist.image })}>
            <View style={styles.artistCardContainer}>
              <Image style={styles.artistCard} source={{ uri: artist.image }} />
              <Text style={styles.artistName}>{artist.name}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Músicas</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollSection}>
        {featuredPlaylists.map((playlist) => (
          <Pressable
            key={playlist.id}
            style={styles.featuredCard}
            onPress={() => ('Player', { name: playlist.name, image: playlist.image })}
          >
            <Image source={{ uri: playlist.image }} style={styles.featuredImage} />
            <Text style={styles.featuredText}>{playlist.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Álbuns</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollSection}>
        {albums.map((album, index) => (
          <Pressable
            key={index}
            style={styles.playlistCard}
            onPress={() => ('Playlist', { name: album.name })}
          >
            <Image source={{ uri: album.image }} style={styles.playlistImage} />
            <Text style={styles.playlistText}>{album.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eadeee',
    padding: 15,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between', 
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#282828',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    color: '#282828',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF1493',
    marginVertical: 10,
  },
  scrollSection: {
    marginBottom: 20,
  },
  featuredCard: {
    marginRight: 15,
    alignItems: 'center',
  },
  featuredImage: {
    width: 100, 
    height: 100, 
    borderRadius: 10,
    marginBottom: 5,
  },
  featuredText: {
    color: '#282828',
    marginTop: 5,
    fontSize: 14,
  },
  artistCardContainer: {
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 30,
  },
  artistCard: {
    width: 90, 
    height: 90, 
    borderRadius: 50,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#FF1493',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  artistName: {
    color: '#282828',
    fontSize: 14,
  },
  playlistCard: {
    marginRight: 15,
    alignItems: 'center',
  },
  playlistImage: {
    width: 100, 
    height: 100, 
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF1493',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  playlistText: {
    color: '#282828',
    marginTop: 5,
    fontSize: 12,
  },
});

export default Home;
