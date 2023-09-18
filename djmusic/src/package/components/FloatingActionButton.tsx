import { StyleSheet, Text, TouchableOpacity } from "react-native";

const FloatingActionButton = ({ onPress,title }: { onPress: () => void,title:string }) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        backgroundColor: 'rgba(0,0,0,0.5)', // Change the background color
        padding:10,
        borderRadius: 8, // Make it a circle by setting borderRadius to half of width/height
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 16, // Adjust the position as needed
        right: 16,  // Adjust the position as needed
        elevation: 6, // Add shadow (for Android)
        zIndex:300000,
    },
    text: {
        color: 'white', // Change the text color
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default FloatingActionButton;