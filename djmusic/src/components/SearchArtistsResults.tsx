import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useSearchArtists, { Artist } from "../hooks/useSearchArtists";


const SearchArtistsResults = (props: { query: string }) => {
    // console.log(props.query)
    const { data, loading, error, loadMore } = useSearchArtists(props.query);

    return (
        <View style={{}}>
            {error && <Text>Error: {error}</Text>}
            {data?.length ?? 0 > 0 ? (
                <>
                    <FlatList
                        onEndReached={loadMore} // Invoke the loadMore function
                        onEndReachedThreshold={0.1} // Optional threshold for triggering the loadMore function
                        scrollEnabled={true}
                        data={data}
                        keyExtractor={(item: Artist) => item.id + Math.random()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                key={item.id} // Use a unique key for each item
                                style={{
                                    ...styles.resultItem,
                                    ...styles.container,
                                    marginBottom: index === data?.length ?? - 1 ? 16 : 8,
                                }}
                            >
                                <Image source={{ uri: item.image[0].link }} style={styles.resultImage} />
                                <View>
                                    <Text style={styles.resultTitle}>{item.name}</Text>
                                    <Text style={styles.resultSubtitle}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    {loading && <ActivityIndicator size="large" />}

                </>
            ) : (
                <Text>No results found.</Text>
            )}
        </View>
    );
};

export default SearchArtistsResults;

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
