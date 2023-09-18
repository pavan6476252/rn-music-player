import React, { useEffect, useState } from 'react';
import { TextInput, Button, View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import useSearch from '../hooks/useSearchAll';
import SearchResults from '../components/SearchResults';
import SearchSongResults from '../components/SearchSongResults';
import SearchAlbumsResults from '../components/SearchAlbumsResults';
import SearchPlaylistsResults from '../components/SearchPlaylistsResults';
import SearchArtistsResults from '../components/SearchArtistsResults';
import { useSearchSuggestions } from '../hooks/youtube/useSearchSuggestions';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedOption, setSelectedOption] = useState('all');
    const { data, loading, refresh } = useSearchSuggestions();

    const handleSearch = () => {
        if (query.trim() !== '') {
            setShowResults(true);
        }
    };

    const renderSuggestions = () => {
        if (data.length > 0 && showSuggestions) {
            return (

                <View style={styles.suggestionsContainer} >
                    {/* <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
                        Search Suggestions:
                    </Text> */}
                    {data.map((item, index) => (

                        <Text key={index} style={styles.suggestionText} onPress={() => {
                            setShowSuggestions(false)
                            setQuery(item)
                        }}>
                            {item}
                        </Text>

                    ))}
                </View>
            );
        } else {
            return null;
        }
    };

    const renderSearchResults = () => {
        if (showResults) {
            switch (selectedOption) {
                case 'all':
                    return <SearchResults query={query} />;
                case 'songs':
                    return <SearchSongResults query={query} />;
                case 'albums':
                    return <SearchAlbumsResults query={query} />;
                case 'playlists':
                    return <SearchPlaylistsResults query={query} />;
                case 'artists':
                    return <SearchArtistsResults query={query} />;
                // default:
                //     return null;
            }
        } else {
            return null;
        }
    };

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for songs, albums, artists, etc."
                    onChangeText={(text) => {
                        setQuery(text);
                        refresh(text);
                        if (!showSuggestions) {
                            setShowSuggestions(true)
                        }
                    }}
                    value={query}
                    onSubmitEditing={handleSearch}
                />
                <Button title="Search" onPress={handleSearch} />
            </View>

            <View style={{ marginBottom: 10 }}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <TouchableOpacity
                        style={[
                            styles.option,
                            { marginLeft: 16 },
                            selectedOption === 'all' && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedOption('all')}
                    >
                        <Text style={[styles.optionText, selectedOption === 'all' && styles.selectedOptionText]}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.option,
                            selectedOption === 'songs' && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedOption('songs')}
                    >
                        <Text style={[styles.optionText, selectedOption === 'songs' && styles.selectedOptionText]}>Songs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.option,
                            selectedOption === 'albums' && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedOption('albums')}
                    >
                        <Text style={[styles.optionText, selectedOption === 'albums' && styles.selectedOptionText]}>Albums</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.option,
                            selectedOption === 'playlists' && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedOption('playlists')}
                    >
                        <Text style={[styles.optionText, selectedOption === 'playlists' && styles.selectedOptionText]}>Playlists</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.option,
                            selectedOption === 'artists' && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedOption('artists')}
                    >
                        <Text style={[styles.optionText, selectedOption === 'artists' && styles.selectedOptionText]}>Artists</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {renderSuggestions()}

            {renderSearchResults()}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        marginRight: 8,
    },
    optionsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedOption: {
        backgroundColor: '#007AFF', // Change to your desired selected background color
        borderColor: '#007AFF', // Change to your desired selected border color
    },
    selectedOptionText: {
        color: 'white',
    },
    optionText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    suggestionsContainer: {
        margin: 5,
        padding: 4,
    },
    suggestionText: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff', // Background color for search suggestion items
        borderRadius: 4,
        marginBottom: 8,
        elevation: 2, // Material Design elevation for a card-like effect
    },
});

export default SearchScreen;
