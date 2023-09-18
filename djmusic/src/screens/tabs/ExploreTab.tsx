import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useSaavnApi from '../../hooks/useSaavanHome';
import FloatingActionButton from '../../package/components/FloatingActionButton';
import TrackPlayer, { Track } from 'react-native-track-player'
import useSongDetails from '../../hooks/details/useSongDetails';
import YoutubeCard from '../../components/YoutubeCard';
import YouTubeMusicRecommendations from '../../components/YoutubeCard';

const ExploreTab = () => {
    const languages = ['hindi', 'english'];
    const { data, loading, error } = useSaavnApi(languages);

    // useEffect(() => {
    //     // Your useEffect code for data handling
    // }, [loading, error, data]);

    const navigation = useNavigation()
    return (
        <>
            <FloatingActionButton onPress={() => navigation.navigate('SearchScreen')} title='Search' />

            <ScrollView >
            <YouTubeMusicRecommendations />

                {loading && <Text>Loading...</Text>}
                {error && <Text>Error: {error}</Text>}

                {data && (
                    <>
                        <Text style={styles.sectionHeader}>Trending Songs</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {data.data.trending.songs.map((song) => (
                                <TouchableOpacity
                                    key={song.id}
                                    style={styles.songCard}
                                    onPress={async () => {
                                        navigation.navigate('SongDetails')
                                        //     await TrackPlayer.add([{
                                        //     url: song.url, // Load media from the network
                                        //     title: song.name,
                                        //     artist: 'deadmau5',
                                        //     album: 'while(1<2)',
                                        //     genre: 'Progressive House, Electro House',
                                        //     date: '2014-05-20T07:00:00+00:00', // RFC 3339
                                        //     artwork: song.image[0].link, // Load artwork from the network
                                        //     duration: 122
                                        // }])
                                        console.log(song)
                                    }
                                    }>
                                    <Image source={{ uri: song.image[song.image.length - 1].link }} style={styles.songImage} />
                                    <Text style={styles.songTitle}>{song.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={styles.sectionHeader}>Trending Albums</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {data.data.trending.albums.map((album) => (
                                <TouchableOpacity
                                    key={album.id}
                                    style={styles.albumCard}
                                    onPress={() => {/* Handle album click */ }}>
                                    <Image source={{ uri: album.image[album.image.length - 1].link }} style={styles.albumImage} />
                                    <Text style={styles.albumTitle}>{album.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={styles.sectionHeader}>Charts</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {data.data.charts.map((chart) => (
                                <TouchableOpacity
                                    key={chart.id}
                                    style={styles.chartCard}
                                    onPress={() => {/* Handle chart click */ }}>
                                    <Image source={{ uri: chart.image[0].link }} style={styles.chartImage} />
                                    <Text style={styles.chartTitle}>{chart.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Text style={styles.sectionHeader}> Albums</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {data.data.albums.map((album) => (
                                <TouchableOpacity
                                    key={album.id}
                                    style={styles.albumCard}
                                    onPress={() => {/* Handle abum click */ }}>
                                    <Image source={{ uri: album.image[album.image.length - 1].link }} style={styles.albumImage} />
                                    <Text style={styles.albumTitle}>{album.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Text style={styles.sectionHeader}>Playlists</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {data.data.playlists.map((playlist) => (
                                <TouchableOpacity
                                    key={playlist.id}
                                    style={styles.playlistCard}
                                    onPress={() => {/* Handle playlist click */ }}>
                                    <Image source={{ uri: playlist.image[0].link }} style={styles.playlistImage} />
                                    <Text style={styles.playlistTitle}>{playlist.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                )}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    songCard: {
        marginRight: 16,
        width: 150,
    },
    songImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    songTitle: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 20, // Adjust the line height as needed
        maxHeight: 40, // Set the maximum height for two lines
    },
    albumCard: {
        marginRight: 16,
        width: 150,
    },
    albumImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    albumTitle: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 20, // Adjust the line height as needed
        maxHeight: 40, // Set the maximum height for two lines

    },
    chartCard: {
        marginRight: 16,
        width: 150,
    },
    chartImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    chartTitle: {
        marginTop: 8,
        fontSize: 16,
        lineHeight: 20, // Adjust the line height as needed
        maxHeight: 40, // Set the maximum height for two lines  fontWeight: 'bold',
    },
    playlistCard: {
        marginRight: 16,
        width: 150,
    },
    playlistImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    playlistTitle: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 20, // Adjust the line height as needed
        maxHeight: 40, // Set the maximum height for two lines
    },
});

export default ExploreTab;
