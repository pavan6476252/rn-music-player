import React, { useEffect, useState } from 'react';
import { TextInput, Button, View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import useSearch from '../hooks/useSearchAll';


const SearchResults = (props: { query: string }) => {
    const { searchResults, loading, error } = useSearch(props.query);

    // useEffect(() => {
    //     if (loading) {
    //         // Handle loading state
    //         console.log('Searching...');
    //     } else if (error) {
    //         // Handle error state
    //         console.error(`Error: ${error}`);
    //     }
    // }, [loading, error]);

    // Initialize empty arrays for each result type
    const songs = searchResults?.data.songs.results || [];
    const albums = searchResults?.data.albums.results || [];
    const artists = searchResults?.data.artists.results || [];
    const playlists = searchResults?.data.playlists.results || [];

    // Combine all results into a single array
    const allResults = [...songs, ...albums, ...artists, ...playlists];

    return (
        <View style={{}}>
            {loading && <ActivityIndicator size="large" />}
            {error && <Text>Error: {error}</Text>}
            {allResults.length > 0 ? (
                <>
                    <FlatList
                        scrollEnabled={true}
                        data={allResults}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    ...styles.resultItem,
                                    ...styles.container,
                                    marginBottom: index === allResults.length - 1 ? 16 : 8,
                                }}
                            >
                                <Image source={{ uri: item.image[0].link }} style={styles.resultImage} />
                                <View>
                                    <Text style={styles.resultTitle}>{item.title}</Text>
                                    <Text style={styles.resultSubtitle}>{item.type}</Text>
                                </View>
                            </TouchableOpacity>

                        )}
                    />

                </>
            ) : (
                <Text>No results found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        marginHorizontal: 16,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    resultImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 16,
    },
    resultTitle: {
        fontSize: 16,
    },
    resultSubtitle: {
        fontSize: 14, // Adjust the font size as needed
        color: 'gray', // Adjust the color as needed
    },
});



export default SearchResults