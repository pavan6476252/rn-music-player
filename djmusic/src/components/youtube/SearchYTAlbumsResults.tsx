import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import useYTAlbumSearch from '../../hooks/youtube/useYTAlbumSearch';

 

const SearchYTAlbumsComponent = (props: { query: string }) => {
  const { albums, loading, error } = useYTAlbumSearch(props.query);

  return (
    <View >
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={albums}
          keyExtractor={(item) => item.albumId}
          renderItem={({ item }) => (
            <View style={styles.albumContainer}>
              <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle}>{item.title}</Text>
                <Text style={styles.artistText}>{item.artist}</Text>
                <Text style={styles.yearText}>Year: {item.year}</Text>
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
  albumContainer: {
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
  albumInfo: {
    flex: 1,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistText: {
    fontSize: 14,
    marginTop: 4,
  },
  yearText: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
});

export default SearchYTAlbumsComponent;
