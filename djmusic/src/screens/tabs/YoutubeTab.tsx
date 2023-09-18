import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useSearchSuggestions } from '../../hooks/youtube/useSearchSuggestions';
import SearchYtMusicComponent from '../../components/youtube/SearchYTMusicResults';
import SearchYTAlbumsComponent from '../../components/youtube/SearchYTAlbumsResults';
import SearchYTPlaylistsComponent from '../../components/youtube/SearchYTPlaylistsResults';

function YoutubeTab() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data, loading, refresh } = useSearchSuggestions();

  const handleSearch = () => { 
    if (query.trim() !== '') {
      setShowSuggestions(false);
     
    }
  };

  const handleInputChange = (text: string) => {
    setQuery(text);
    if (text.trim() === '') {
      setShowSuggestions(false);
    } else {
      refresh(text);

      setShowSuggestions(true);
    }
  };
  const renderItem = ({ item }: { item: string }) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };
  const renderSuggestions = () => {
    if (showSuggestions) {
      return (
        <View>
        <FlatList
        
        data={data?.suggestions}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.suggestionItem}
          onPress={() => {
                setQuery(item);
                setShowSuggestions(false);
              }}
              >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          />
          </View>
      );
    } else {
      return null;
    }
  };

  const renderContent = () => {
    if (query.trim() != '') {
      return <ScrollView>
        <SearchYtMusicComponent query={query} />
        <SearchYTAlbumsComponent query={query} />
        <SearchYTPlaylistsComponent query={query} />
      </ScrollView>
    } else {
      return null
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for songs, albums, artists, etc."
          onChangeText={handleInputChange}
          value={query}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      {renderSuggestions()}
      {/* {renderContent()} */}

      {!showSuggestions && renderContent()}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginRight: 8,
  },
  suggestionItem: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default YoutubeTab;
