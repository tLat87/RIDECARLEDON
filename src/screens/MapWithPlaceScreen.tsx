import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, TextInput } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// !!! ВАЖНО: Замените 'YOUR_Maps_API_KEY' на ваш реальный API ключ !!!
const Maps_APIKEY = 'AIzaSyAcpy1ylznYCgPuR1fK9paRojMi2fu3qKo';

const MapWithPlaceScreen = ({ route }) => {
    const navigation = useNavigation();
    const mapRef = useRef(null); // For controlling the map

    // Parameters from navigation (if any)
    const { latitude, longitude, placeName } = route.params || {};

    // States for building the route
    const [origin, setOrigin] = useState(null); // Point A
    const [destination, setDestination] = useState(null); // Point B
    const [routeCoords, setRouteCoords] = useState([]); // Route coordinates for Polyline
    const [routeDistance, setRouteDistance] = useState(null); // Route length
    const [routeDuration, setRouteDuration] = useState(null); // Travel time
    const [routeNameInput, setRouteNameInput] = useState(''); // Route name input
    const [routePhotoUrlInput, setRoutePhotoUrlInput] = useState(''); // Photo URL input

    // State for saved routes
    const [savedRoutes, setSavedRoutes] = useState([]);

    // Load saved routes on component mount
    useEffect(() => {
        loadRoutes();
        // If place coordinates are provided, set it as the default destination
        if (latitude && longitude) {
            setDestination({ latitude, longitude });
        }
    }, []);

    // Load routes from AsyncStorage
    const loadRoutes = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@custom_routes');
            if (jsonValue != null) {
                setSavedRoutes(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error('Error loading routes:', e);
            Alert.alert('Error', 'Failed to load saved routes.');
        }
    };

    // Save the current route
    const saveCurrentRoute = async () => {
        if (!origin || !destination || routeCoords.length === 0) {
            Alert.alert('Error', 'Please select origin and destination points and build a route first.');
            return;
        }
        if (!routeNameInput.trim()) {
            Alert.alert('Error', 'Please enter a name for the route.');
            return;
        }

        const newRoute = {
            id: Date.now().toString(), // Unique ID
            name: routeNameInput.trim(),
            origin: origin,
            destination: destination,
            coords: routeCoords,
            distance: routeDistance,
            duration: routeDuration,
            photoUrl: routePhotoUrlInput.trim(),
            timestamp: new Date().toISOString(),
        };

        const updatedRoutes = [...savedRoutes, newRoute];
        try {
            await AsyncStorage.setItem('@custom_routes', JSON.stringify(updatedRoutes));
            setSavedRoutes(updatedRoutes);
            Alert.alert('Success', `Route "${routeNameInput.trim()}" saved!`);
            resetRouteCreation(); // Clear fields after saving
        } catch (e) {
            console.error('Error saving route:', e);
            Alert.alert('Error', 'Failed to save the route.');
        }
    };

    // Load and display a saved route
    const loadAndDisplayRoute = (routeToLoad) => {
        setOrigin(routeToLoad.origin);
        setDestination(routeToLoad.destination);
        setRouteCoords(routeToLoad.coords);
        setRouteDistance(routeToLoad.distance);
        setRouteDuration(routeToLoad.duration);
        setRouteNameInput(routeToLoad.name);
        setRoutePhotoUrlInput(routeToLoad.photoUrl);

        // Center the map on the route
        if (mapRef.current && routeToLoad.coords.length > 0) {
            mapRef.current.fitToCoordinates(routeToLoad.coords, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
        Alert.alert('Route Loaded', `Displaying route "${routeToLoad.name}".`);
    };

    // Delete a route
    const deleteRoute = async (idToDelete) => {
        Alert.alert(
            'Delete Route',
            'Are you sure you want to delete this route?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        const updatedRoutes = savedRoutes.filter(route => route.id !== idToDelete);
                        try {
                            await AsyncStorage.setItem('@custom_routes', JSON.stringify(updatedRoutes));
                            setSavedRoutes(updatedRoutes);
                            Alert.alert('Success', 'Route deleted.');
                            // If deleted route was current, reset
                            if (origin && origin.id === idToDelete) {
                                resetRouteCreation();
                            }
                        } catch (e) {
                            console.error('Error deleting route:', e);
                            Alert.alert('Error', 'Failed to delete the route.');
                        }
                    },
                },
            ]
        );
    };

    // Reset route creation state
    const resetRouteCreation = () => {
        setOrigin(null);
        setDestination(null);
        setRouteCoords([]);
        setRouteDistance(null);
        setRouteDuration(null);
        setRouteNameInput('');
        setRoutePhotoUrlInput('');
        Alert.alert('Start New Route', 'Select Point A on the map.');
    };

    // Handle map press to set points
    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        if (!origin) {
            setOrigin({ latitude, longitude });
            Alert.alert('Point A Set', 'Now select Point B on the map.');
        } else if (!destination) {
            setDestination({ latitude, longitude });
            Alert.alert('Point B Set', 'The route will be generated.');
        } else {
            Alert.alert('Points Already Set', 'Tap "Create New Route" to reset.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Route</Text>
            </View>

            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={
                    (latitude && longitude) ?
                        { latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } :
                        { latitude: 51.7592, longitude: 19.4560, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } // Example: Lodz, Poland
                }
                customMapStyle={mapStyle}
                onPress={handleMapPress}
            >
                {origin && (
                    <Marker coordinate={origin} title="Point A" pinColor="blue" />
                )}
                {destination && (
                    <Marker coordinate={destination} title="Point B" pinColor="red" />
                )}

                {routeCoords.length > 0 && (
                    <Polyline
                        coordinates={routeCoords}
                        strokeWidth={4}
                        strokeColor="#d9b43b"
                    />
                )}

                {origin && destination && Maps_APIKEY !== 'YOUR_Maps_API_KEY' && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={Maps_APIKEY}
                        strokeWidth={0}
                        onReady={result => {
                            setRouteCoords(result.coordinates);
                            setRouteDistance(result.distance);
                            setRouteDuration(result.duration);
                            console.log(`Route Distance: ${result.distance} km, Duration: ${result.duration} min`);
                            if (mapRef.current) {
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                                    animated: true,
                                });
                            }
                        }}
                        onError={(errorMessage) => {
                            console.error('Error fetching directions:', errorMessage);
                            Alert.alert('Error', `Could not build route. Check your API key and service availability. ${errorMessage}`);
                            setRouteCoords([]);
                            setRouteDistance(null);
                            setRouteDuration(null);
                        }}
                    />
                )}
            </MapView>

            <ScrollView style={styles.placeCard}>
                <Text style={styles.cardTitle}>Create and Manage Routes</Text>

                <TouchableOpacity
                    style={[styles.launchButton, { backgroundColor: '#5cb85c', marginBottom: 15 }]}
                    onPress={resetRouteCreation}
                >
                    <Text style={styles.launchButtonText}>Create New Route</Text>
                </TouchableOpacity>

                {origin && destination && (
                    <View>
                        <Text style={styles.infoText}>
                            **Point A:** {origin.latitude.toFixed(4)}, {origin.longitude.toFixed(4)}
                        </Text>
                        <Text style={styles.infoText}>
                            **Point B:** {destination.latitude.toFixed(4)}, {destination.longitude.toFixed(4)}
                        </Text>
                    </View>
                )}

                {routeDistance !== null && (
                    <Text style={styles.distanceText}>
                        **Distance:** {routeDistance.toFixed(2)} km
                    </Text>
                )}
                {routeDuration !== null && (
                    <Text style={styles.distanceText}>
                        **Duration:** {Math.round(routeDuration)} min
                    </Text>
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Route Name"
                    placeholderTextColor="#999"
                    value={routeNameInput}
                    onChangeText={setRouteNameInput}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Photo URL (optional)"
                    placeholderTextColor="#999"
                    value={routePhotoUrlInput}
                    onChangeText={setRoutePhotoUrlInput}
                />

                <TouchableOpacity style={styles.launchButton} onPress={saveCurrentRoute}>
                    <Text style={styles.launchButtonText}>Save Route</Text>
                </TouchableOpacity>

                {savedRoutes.length > 0 && (
                    <View style={styles.savedRoutesContainer}>
                        <Text style={styles.savedRoutesTitle}>Saved Routes:</Text>
                        {savedRoutes.map((routeItem) => (
                            <View key={routeItem.id} style={styles.savedRouteItem}>
                                <TouchableOpacity
                                    style={styles.savedRouteButton}
                                    onPress={() => loadAndDisplayRoute(routeItem)}
                                >
                                    <View>
                                        <Text style={styles.savedRouteButtonText}>{routeItem.name}</Text>
                                        <Text style={styles.savedRouteDetails}>
                                            {routeItem.distance ? `${routeItem.distance.toFixed(1)} km, ` : ''}
                                            {routeItem.duration ? `${Math.round(routeItem.duration)} min` : ''}
                                        </Text>
                                        {routeItem.photoUrl ? (
                                            <Image source={{ uri: routeItem.photoUrl }} style={styles.savedRouteImage} />
                                        ) : null}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => deleteRoute(routeItem.id)}
                                >
                                    <Text style={styles.deleteButtonText}>X</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#384150"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#212a37"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9ca5b3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1f2835"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f3d19c"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2f3948"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#515c6d"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: '#1a1a2e',
    },
    backButton: {
        paddingRight: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    map: {
        flex: 1,
    },
    placeCard: {
        // position: 'absolute',
        // bottom: 100,
        zIndex:99,
        left: 0,
        right: 0,
        maxHeight: '50%',
        backgroundColor: '#202020',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 4,
    },
    distanceText: {
        color: '#d9b43b',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
    },
    launchButton: {
        backgroundColor: '#d9b43b',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 5,
    },
    launchButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    markerIcon: {
        width: 30,
        height: 40,
    },
    savedRoutesContainer: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 15,
    },
    savedRoutesTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    savedRouteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 8,
        marginBottom: 8,
    },
    savedRouteButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    savedRouteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    savedRouteDetails: {
        color: '#aaa',
        fontSize: 13,
        marginTop: 2,
    },
    savedRouteImage: {
        width: 80,
        height: 50,
        borderRadius: 5,
        marginTop: 8,
        resizeMode: 'cover',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        height: '100%',
        justifyContent: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default MapWithPlaceScreen;
