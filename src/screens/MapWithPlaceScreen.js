// Пример файла MapWithPlaceScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const MapWithPlaceScreen = ({ route }) => {
    const navigation = useNavigation();

    // Получаем параметры из navigation.navigate
    const { latitude, longitude, placeName } = route.params;

    const initialRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View style={styles.container}>
            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Place on map</Text>
            </View>

            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                customMapStyle={mapStyle} // Применяем темный стиль карты
            >
                {/* Используем кастомный маркер в виде значка */}
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                >
                    <Image
                        source={require('../assets/images/4fe12aeb2b6b2f9afb1e0ee49ec743042849f816.png')} // Предполагается, что у вас есть изображение для маркера
                        style={styles.markerIcon}
                    />
                </Marker>
            </MapView>

            {/* Красивая карточка с информацией о месте */}
            <View style={styles.placeCard}>
                <Text style={styles.cardTitle}>{placeName}</Text>
                <Text style={styles.cardDescription}>
                    Banff National Park, established in 1885, is the jewel of the Canadian Rockies, combining majestic peaks and glaciers.
                </Text>
                {/*<TouchableOpacity style={styles.launchButton}>*/}
                {/*    <Text style={styles.launchButtonText}>Learn more</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        </View>
    );
};

// Стили для темной карты (пример)
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
    // ... остальной JSON-код стиля, чтобы карта была темной
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
    // Новый, красивый стиль для карточки
    placeCard: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#202020', // Темный фон, как в вашем HomeScreen
        borderRadius: 16,
        padding: 20,
        // Тени, как в ваших примерах
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
    },
    cardTitle: {
        color: '#fff', // Белый текст
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardDescription: {
        color: '#aaa', // Светло-серый текст
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 16,
    },
    launchButton: {
        backgroundColor: '#d9b43b', // Золотой/желтый акцентный цвет
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    launchButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    markerIcon: {
        width: 30,
        height: 40,
    }
});

export default MapWithPlaceScreen;
