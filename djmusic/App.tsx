import React, { useEffect } from 'react';
import { Text, View, Switch } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from './src/screens/SearchScr';
import HomeScreen from './src/screens/HomeScr';
import { createNativeStackNavigator, NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import TrackPlayer, { Capability } from 'react-native-track-player'
import MiniPlayer from './src/screens/utils/MiniPlayer';
import SongDetailsScr from './src/screens/SongDetailsScr';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="SongDetails" component={SongDetailsScr} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
