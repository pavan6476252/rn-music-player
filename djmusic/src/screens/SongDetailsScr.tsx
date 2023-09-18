import React from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, Button } from 'react-native';
import useSongDetails from '../hooks/details/useSongDetails';
// import useSongDetails from './useSongDetails'; // Import your custom hook here

import TrackPlayer, { Track } from 'react-native-track-player'
const SongDetailsScr = () => {
  // const { songId } = route.params; // Get the songId from the route params

  const { data, loading, error } = useSongDetails("1glW_JN3");

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>An error occurred: {error}</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data available for this song.</Text>
      </View>
    );
  }

  const song = data[0]; // Assuming the API returns a single song based on the songId
  console.log(song.downloadUrl)
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: song.image[song.image.length-1]?.link }} // Assuming you want to display the first image
      />
      <Text style={styles.title}>{song.name}</Text>
      <Text style={styles.artist}>{song.primaryArtists}</Text>
      <Text style={styles.album}>{song.album.name}</Text>
      {/* Display other song details here */}
      <Button title='play' onPress={async () => {
        await TrackPlayer.add([{
          url: song.downloadUrl[song.downloadUrl.length-1].link, // Load media from the network
          title: song.name,
          artist: 'deadmau5',
          album: 'while(1<2)',
          genre: 'Progressive House, Electro House',
          date: '2014-05-20T07:00:00+00:00', // RFC 3339
          artwork: song.image[0].link, // Load artwork from the network
          duration: 122
        }])
      }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  artist: {
    fontSize: 18,
    marginTop: 8,
  },
  album: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default SongDetailsScr;
