import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useYouTubeMusicData, YouTubeMusicCard } from '../hooks/youtube/useRecomendations';

const YouTubeMusicRecommendations: React.FC = () => {
  const apiUrl = 'https://node-yt-music-yx.vercel.app/api/suggestions/szvt1vD0Uug';
  const { data, loading } = useYouTubeMusicData(apiUrl);

  return (
    <View >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
        <Text style={{fontSize:20,fontWeight:'bold',marginVertical:2}}>Recommended</Text>
        <FlatList
          data={data}
          horizontal
          renderItem={({ item }: { item: YouTubeMusicCard }) => (
              <View style={styles.card}>
              <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artists.map((artist) => artist.name).join(', ')}</Text>
              {/* <Text style={styles.album}>{item.album}</Text>
              <Text style={styles.duration}>{item.duration.label}</Text> */}
            </View>
          )}
          keyExtractor={(item) => item.youtubeId}
          />
          </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
  card: {
    width: 200,
    marginRight: 16,
    borderRadius:20,
    backgroundColor:'rgba(255,255,255,0.4)',
    paddingVertical:2,
    paddingBottom:4,
    paddingHorizontal:2,
    
  },
  thumbnail: {
    width: 200,
    height: 120,
    borderRadius:12
  },
  title: {
    fontSize: 16,
    lineHeight:20,
    maxHeight:20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  artist: {
    fontSize: 14,
    lineHeight:20,
    maxHeight:20,
    color: 'gray',
  },
  album: {
    fontSize: 14,
    color: 'gray',
  },
  duration: {
    fontSize: 14,
    color: 'gray',
  },
});

export default YouTubeMusicRecommendations;
