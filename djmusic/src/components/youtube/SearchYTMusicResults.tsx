import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import useYTMusicSearch from '../../hooks/youtube/useYTSongSearch';

const SearchYtMusicComponent = (props: { query: string }) => {
  const { musicData, loading, error, refreshYtSongsSearch } = useYTMusicSearch(props.query);
  // refreshYtSongsSearch(props.query);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View  >
      <Text style={styles.title}>Music List:</Text>
      <FlatList
        data={musicData}
        keyExtractor={(item) => item.youtubeId}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
            <View style={styles.itemTextContainer}>
              <Text numberOfLines={2} style={styles.itemTitle}>
                Title: {item.title}
              </Text>
              <Text numberOfLines={1} style={styles.itemText}>
                Artists: {item.artists.map((artist) => artist.name).join(', ')}
              </Text>
              <Text numberOfLines={1} style={styles.itemText}>
                Album: {item.album}
              </Text>
              <Text numberOfLines={1} style={styles.itemText}>
                Duration: {item.duration.label}
              </Text>
              <Text numberOfLines={1} style={styles.itemText}>
                Explicit: {item.isExplicit ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    elevation: 2, // Material Design elevation
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default SearchYtMusicComponent;
