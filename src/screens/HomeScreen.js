import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Share from 'react-native-share'; // Импортируем библиотеку для шаринга

const HomeScreen = ({ navigation }) => {

    const onShare = async () => {
        try {
            const shareOptions = {
                title: 'Check out this amazing place!',
                message: `I found a great place to visit: Banff National Park!\nIt's a beautiful place with majestic peaks and clear glacial lakes.`,
                url: 'https://www.pc.gc.ca/en/pn-np/ab/banff', // Ссылка на место
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.error('Error sharing:', error);
            Alert.alert('Sharing failed', 'Please try again later.');
        }
    };

    const placesData = {
        id: 'hopewell',
            name: 'Hopewell Rocks (Hopewell Rocks, Bay of Fundy)',
        coordinates: '45.6069, -64.7133',
        description: 'Towering above the waters of the Bay of Fundy, the Hopewell Rocks are impressive sea pillars of sandstone, formed by constant tides, the difference between which can reach up to 16 meters - some of the highest in the world. At low tide, visitors will walk along the bottom of the bay among the "landing caps" - the outlines of the rocks, resembling openwork columns. When the tide returns, the place becomes a theatrical stage of noise and splash, and the majestic pillars seem to be defenders of the bay. Guided tours will tell about the geological processes and traditions of the First Nations, and special observation platforms allow you to observe the phenomenon from a safe distance. Inspired photographers come here at dawn and in winter to capture perfect shots with the changing light and blue sea.',
        image: require('../assets/images/RIDEwithCARLEDON/image0.png'),
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.sectionTitle}>Recomended Place</Text>
                <TouchableOpacity style={styles.openAll} onPress={() => { navigation.navigate('RecomendedPlaceScreen') }}>
                    <Text style={styles.openAllText}>Open all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <Image
                    source={placesData.image}
                    style={styles.cardImage}
                />
                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{placesData.name}</Text>
                    <Text style={styles.cardDescription}>
                        {placesData.description}
                    </Text>
                </View>
                <View style={styles.cardButtons}>

                    {/* Кнопка "Поделиться" теперь с onPress */}
                    <TouchableOpacity style={styles.iconButton} onPress={onShare}>
                        <Image
                            source={require('../assets/images/tabler_share-3.png')}

                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.launchButton} onPress={()=>{navigation.navigate('RecommendedPlaceScreen', {place: placesData})}}>
                        <Image
                            source={require('../assets/images/lsicon_open-new-outline.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Map</Text>

            {/* Секция карты теперь кликабельна */}
            <TouchableOpacity onPress={() => navigation.navigate('MapWithPlaceScreen', {
                latitude: 51.1784,
                longitude: -115.5708,
                placeName: 'Banff National Park'
            })}>
                <View style={{ padding: 20, backgroundColor: '#202020', borderRadius: 16 }}>
                    <Image
                        source={require('../assets/images/3c8862bf2e3bc75a5d1e56b839301d9b97477654.png')}
                        style={styles.mapImage}
                        resizeMode="cover"
                    />
                </View>
            </TouchableOpacity>

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
    openAll: {},
    openAllText: {
        color: '#d9b43b',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#222',
        borderRadius: 16,
        padding: 12,
        marginTop: 16,
    },
    cardImage: {
        width: '100%',
        height: 160,
        borderRadius: 12,
    },
    cardInfo: {
        marginTop: 12,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardDescription: {
        color: '#aaa',
        marginTop: 4,
    },
    cardButtons: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 10,
    },
    launchButton: {
        backgroundColor: '#d9b43b',
        padding: 12,
        borderRadius: 12,
    },
    launchText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    mapImage: {
        width: '100%',
        height: 200,
        borderRadius: 16,
    },
});

export default HomeScreen;
