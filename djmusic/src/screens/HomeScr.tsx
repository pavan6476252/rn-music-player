import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import useSaavnApi from '../hooks/useSaavanHome';
import FloatingActionButton from '../package/components/FloatingActionButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import ExploreTab from './tabs/ExploreTab';
import YoutubeTab from './tabs/YoutubeTab';
import OfflineTab from './tabs/OfflineTab';
import ProfileTab from './tabs/ProfileTab';
import MiniPlayer from './utils/MiniPlayer';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
const navigation = useNavigation()
  return (<>
    <Tab.Navigator
    screenOptions={{header:(a)=><Button title='search' onPress={()=>navigation.navigate('SearchScreen')}/>}}
    >
      <Tab.Screen name="ExploreTab" component={ExploreTab} />
      <Tab.Screen name="YoutubeTab" component={YoutubeTab} />
      <Tab.Screen name="OfflineTab" component={OfflineTab} />
      <Tab.Screen name="ProfileTab" component={ProfileTab} />
    </Tab.Navigator>
    <View style={{
      paddingHorizontal: 5,
      width: "100%",
      bottom: 52,
    
      right: 0,
      left: 0,
      position: "absolute",
      alignSelf: "center",
      justifyContent: "center",
    }}>

      <MiniPlayer />
    </View>
  </>
  )
}

export default HomeScreen;
