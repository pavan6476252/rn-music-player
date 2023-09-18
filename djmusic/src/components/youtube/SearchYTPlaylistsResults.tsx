import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import useYTPlaylistSearch from '../../hooks/youtube/useYTPlaylistSearch';

 

const SearchYTPlaylistsComponent = (props: { query: string }) => {
  const { playlists, loading, error } = useYTPlaylistSearch(props.query);

  return (
    <View >
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.playlistId}
          renderItem={({ item }) => (
            <View style={styles.playlistContainer}>
              <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistTitle}>{item.title}</Text>
                <Text style={styles.totalSongsText}>Total Songs: {item.totalSongs}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 16,
  },
  playlistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 16,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalSongsText: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
});

export default SearchYTPlaylistsComponent;
