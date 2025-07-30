// src/screens/MapAndStatsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';

const MapAndStatsScreen = () => {
    const [visitedLocations, setVisitedLocations] = useState([]);
    const [totalTrips, setTotalTrips] = useState(0);
    const [uniquePlaces, setUniquePlaces] = useState(0);
    const [uniqueCountries, setUniqueUniqueCountries] = useState(0); // Renamed to avoid conflict
    const [modalVisible, setModalVisible] = useState(false);
    const [newLocationName, setNewLocationName] = useState('');
    const [newLocationCountry, setNewLocationCountry] = useState('');
    const [tempCoordinate, setTempCoordinate] = useState(null);
    const [countryList, setCountryList] = useState([]); // To store unique countries for the list

    // Load data on component mount
    useEffect(() => {
        loadVisitedLocations();
    }, []);

    const loadVisitedLocations = async () => {
        try {
            const storedLocations = await AsyncStorage.getItem('visitedLocations');
            if (storedLocations) {
                const locations = JSON.parse(storedLocations);
                setVisitedLocations(locations);
                updateStatistics(locations);
            }
        } catch (error) {
            console.error('Error loading visited locations:', error);
            Alert.alert('Loading Failed', 'Could not load your visited locations.');
        }
    };

    const saveVisitedLocations = async (locations) => {
        try {
            await AsyncStorage.setItem('visitedLocations', JSON.stringify(locations));
            updateStatistics(locations);
        } catch (error) {
            console.error('Error saving visited locations:', error);
            Alert.alert('Save Failed', 'Could not save the location.');
        }
    };

    const updateStatistics = (locations) => {
        setTotalTrips(locations.length);
        const uniqueNames = new Set(locations.map(loc => loc.name));
        setUniquePlaces(uniqueNames.size);

        const uniqueCountriesSet = new Set(locations.map(loc => loc.country).filter(Boolean));
        setUniqueUniqueCountries(uniqueCountriesSet.size);

        // Prepare data for the country list
        const countryCounts = {};
        locations.forEach(loc => {
            if (loc.country) {
                countryCounts[loc.country] = (countryCounts[loc.country] || 0) + 1;
            }
        });
        const sortedCountries = Object.keys(countryCounts).map(country => ({
            name: country,
            count: countryCounts[country]
        })).sort((a, b) => b.count - a.count); // Sort by count descending

        setCountryList(sortedCountries);
    };

    // Handler for long press on the map to add a new visited location
    const handleMapLongPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setTempCoordinate(coordinate);
        setNewLocationName('');
        setNewLocationCountry('');
        setModalVisible(true); // Open modal for input
    };

    // Add new location after input
    const addNewLocation = async () => {
        if (!newLocationName.trim()) {
            Alert.alert('Error', 'Please enter a place name.');
            return;
        }

        const newLocation = {
            latitude: tempCoordinate.latitude,
            longitude: tempCoordinate.longitude,
            name: newLocationName.trim(),
            country: newLocationCountry.trim() || 'Unknown', // Default to 'Unknown' if no country
            date: new Date().toISOString().split('T')[0], // Current date
        };
        const updatedLocations = [...visitedLocations, newLocation];
        setVisitedLocations(updatedLocations);
        await saveVisitedLocations(updatedLocations);
        setModalVisible(false);
        setTempCoordinate(null);
        Alert.alert('Location Added!', `You marked: ${newLocation.name}`);
    };

    const renderCountryCard = ({ item }) => (
        <View style={styles.countryCard}>
            <Text style={styles.countryName}>{item.name}</Text>
            <Text style={styles.countryCount}>{item.count} places visited</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Your Travel Map</Text>

            <View style={{ padding: 20, backgroundColor: '#202020', borderRadius: 16 }}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 100,
                        longitudeDelta: 100,
                    }}
                    onLongPress={handleMapLongPress}
                >
                    {visitedLocations.map((location, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                            title={location.name}
                            description={`${location.country} - ${location.date}`}
                        />
                    ))}
                </MapView>
                <Text style={styles.mapInstructionText}>
                    Long-press on the map to mark a place you've visited!
                </Text>
            </View>

            ---

            <Text style={styles.sectionTitle}>Your Trip Statistics</Text>
            <View style={styles.statisticsContainer}>
                <View style={styles.statisticCard}>
                    <Text style={styles.statisticNumber}>{totalTrips}</Text>
                    <Text style={styles.statisticLabel}>Total Trips</Text>
                </View>
                <View style={styles.statisticCard}>
                    <Text style={styles.statisticNumber}>{uniquePlaces}</Text>
                    <Text style={styles.statisticLabel}>Unique Places</Text>
                </View>
                <View style={styles.statisticCard}>
                    <Text style={styles.statisticNumber}>{uniqueCountries}</Text>
                    <Text style={styles.statisticLabel}>Visited Countries</Text>
                </View>
            </View>

            ---

            <Text style={styles.sectionTitle}>Visited Countries</Text>
            <FlatList
                data={countryList}
                keyExtractor={(item, index) => item.name + index}
                renderItem={renderCountryCard}
                horizontal={true} // Display cards horizontally
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.countryListContainer}
            />
            {countryList.length === 0 && (
                <Text style={styles.noCountriesText}>No countries visited yet. Start marking places on the map!</Text>
            )}


            {/* Modal for entering place details */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Mark a New Place</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Place Name (e.g., Eiffel Tower)"
                            placeholderTextColor="#999"
                            value={newLocationName}
                            onChangeText={setNewLocationName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Country (e.g., France)"
                            placeholderTextColor="#999"
                            value={newLocationCountry}
                            onChangeText={setNewLocationCountry}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonAdd]}
                                onPress={addNewLocation}
                            >
                                <Text style={styles.textStyle}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{ marginBottom: 100 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        padding: 16,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
        textShadowColor: '#fff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        color: '#fff',
        textShadowColor: '#fff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
        marginBottom: 8,
    },
    map: {
        width: '100%',
        height: 300,
        borderRadius: 16,
        marginTop: 10,
    },
    mapInstructionText: {
        color: '#aaa',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 14,
    },
    statisticsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
        backgroundColor: '#222',
        borderRadius: 16,
        padding: 12,
    },
    statisticCard: {
        alignItems: 'center',
        flex: 1,
    },
    statisticNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#d9b43b',
    },
    statisticLabel: {
        fontSize: 14,
        color: '#fff',
        marginTop: 4,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#333',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    input: {
        height: 50,
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 15,
        color: '#fff',
        backgroundColor: '#444',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 10,
        padding: 15,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonClose: {
        backgroundColor: '#666',
    },
    buttonAdd: {
        backgroundColor: '#d9b43b',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    countryListContainer: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    countryCard: {
        backgroundColor: '#333',
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 8,
        minWidth: 150, // Minimum width for cards
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    countryName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    countryCount: {
        color: '#aaa',
        fontSize: 14,
        textAlign: 'center',
    },
    noCountriesText: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    }
});

export default MapAndStatsScreen;
