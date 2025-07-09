import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MainScreen from "../screens/MainScreen";
import RecomendedPlaceScreen from "../screens/RecomendedPlaceScreen";
import MapScreen from "../screens/MapScreen";
import SavedPlacesScreen from "../screens/SavedPlacesScreen";

const Tab = createBottomTabNavigator();

const CustomHeader = () => (
    <View style={styles.headerContainer}>
        {/* Placeholder for your first header image */}
        <Image
            source={require('../assets/images/de6762d906015c05dae8600ed4aec6b1f6bd2317.png')} // Replace with your actual path
            style={{width:100,height:100}}
        />

        <Image
            source={require('../assets/images/73c76d4e26c00093205f81b6b6a12408f01cf8ac.png')} // Replace with your actual path
            style={styles.guitarIcon}
        />
    </View>
);

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#202020', height: 150},
                headerTitle: () => <CustomHeader />,
                headerShadowVisible: false,
                tabBarStyle: {
                    paddingTop: 10,
                    backgroundColor: '#202020',
                    height: 100,
                    borderTopWidth: 0, // Remove top border if any
                },
                tabBarShowLabel: false, // Hide labels as per the image
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIconContainer}>
                            <Image
                                source={require('../assets/images/proicons_home.png')}
                                style={[styles.tabIcon, { tintColor: focused ? '#FFFFFF' : '#888888' }]}
                            />
                            {focused && <View style={styles.activeDot} />}
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="MainScreen"
                component={MainScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIconContainer}>
                            <Image
                                source={require('../assets/images/proicons_info.png')}
                                style={[styles.tabIcon, { tintColor: focused ? '#FFFFFF' : '#888888' }]}
                            />
                            {focused && <View style={styles.activeDot} />}
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIconContainer}>
                            <Image
                                source={require('../assets/images/streamline-ultimate_task-list-pin.png')} // Replace with your map icon path (or another suitable icon)
                                style={[styles.tabIcon, { tintColor: focused ? '#FFFFFF' : '#888888' }]}
                            />
                            {focused && <View style={styles.activeDot} />}
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="SavedPlacesScreen"
                component={SavedPlacesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIconContainer}>
                            <Image
                                source={require('../assets/images/iconoir_bookmark.png')} // Replace with your bookmark icon path
                                style={[styles.tabIcon, { tintColor: focused ? '#FFFFFF' : '#888888' }]}
                            />
                            {focused && <View style={styles.activeDot} />}
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        width: '100%',
    },
    textBlock: {
        flexDirection: 'column',
    },
    rideText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    goldText: {
        color: '#d9b43b',
    },
    withText: {
        fontSize: 10,
        color: '#aaa',
        letterSpacing: 1,
    },
    carledonText: {
        fontSize: 16,
        color: '#ccc',
        fontWeight: 'bold',
    },
    guitarIcon: {
        width: 82,
        height: 82,
        borderRadius: 8,
        backgroundColor: '#151515',
        padding: 4,
    },
    tabIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 10, // Adjust this value to position icons vertically
    },
    tabIcon: {
        width: 30, // Adjust icon size as needed
        height: 30, // Adjust icon size as needed
        resizeMode: 'contain',
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FFFFFF', // White dot for active tab
        position: 'absolute',
        bottom: -15, // Position the dot below the icon
    },
});

export default TabNavigator;
