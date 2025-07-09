import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Fake data for saved places (using the same locations from MapScreen for consistency)
const savedLocations = [
    {
        id: '1',
        name: 'Banff National Park',
        latitude: 51.1784,
        longitude: -115.5708,
        description: 'Established in 1885, Banff National Park is a jewel of the Canadian Rockies, combining majestic peaks covered with ice caps and crystal-clear glacial lakes. Here you can make routes of varying difficulty: from short hiking trails along the shores of lakes to multi-day hikes through alpine passes.',
        image: 'https://placehold.co/600x400/2A2A2A/FFFFFF?text=Banff+National+Park',
    },
    {
        id: '2',
        name: 'Moraine Lake',
        latitude: 51.3216,
        longitude: -116.1857,
        description: 'Located in the Valley of the Ten Peaks in Banff National Park, Moraine Lake is a stunning turquoise lake that shimmers against the backdrop of sheer mountain walls. The glacial hue of the water is due to the suspension of finely dispersed mountain silt sediments raised by the melting glacier.',
        image: 'https://placehold.co/600x400/2A2A2A/FFFFFF?text=Moraine+Lake',
    },
    {
        id: '3',
        name: 'Lake Louise',
        latitude: 51.4167,
        longitude: -116.2125,
        description: 'Lake Louise, known for its rich turquoise color, is located in the valley of Banff National Park at the foot of Mount Victoria. This glacial lake is surrounded by dense coniferous forests and steep cliffs, creating the effect of a small lake amphitheater.',
        image: 'https://placehold.co/600x400/2A2A2A/FFFFFF?text=Lake+Louise',
    },
    {
        id: '4',
        name: 'Niagara Falls',
        latitude: 43.0962,
        longitude: -79.0377,
        description: 'Niagara Falls, one of the most powerful in the world, is located on the border of Canada and the USA. The Canadian side, known as Horseshoe Falls, stands out for its semicircular shape and a mass of water curtain more than 670 meters wide.',
        image: 'https://placehold.co/600x400/2A2A2A/FFFFFF?text=Niagara+Falls',
    },
    {
        id: '5',
        name: 'CN Tower, Toronto',
        latitude: 43.6426,
        longitude: -79.3871,
        description: 'The CN Tower in Toronto is one of the most famous architectural landmarks in North America, and for decades was the tallest tower in the world. Its height reaches 553 meters, and it is a symbol of a dynamic metropolis on the shores of Lake Ontario.',
        image: 'https://placehold.co/600x400/2A2A2A/FFFFFF?text=CN+Tower',
    },
];

const SavedPlacesScreen = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState(savedLocations);

    useEffect(() => {
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = savedLocations.filter(place =>
                place.name.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredPlaces(filtered);
        } else {
            setFilteredPlaces(savedLocations);
        }
    }, [searchQuery]);

    const renderPlaceCard = ({ item: place }) => (
        <View style={styles.card}>
            {/* Main Image */}
            <Image
                source={{ uri: place.image }}
                style={styles.mainImage}
                onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
            />

            {/* Side Icons */}
            <View style={styles.sideIconsContainer}>
                {/*<TouchableOpacity style={styles.sideIconButton}>*/}
                {/*    <Image*/}
                {/*        source={require('./assets/icons/bookmark_white.png')} // Замените на актуальный путь*/}
                {/*        style={styles.sideIcon}*/}
                {/*    />*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={styles.sideIconButton}>*/}
                {/*    <Image*/}
                {/*        source={require('./assets/icons/share_white.png')} // Замените на актуальный путь*/}
                {/*        style={styles.sideIcon}*/}
                {/*    />*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={[styles.sideIconButton, styles.circularButton]}>*/}
                {/*    <Image*/}
                {/*        source={require('./assets/icons/directions.png')} // Замените на актуальный путь к иконке*/}
                {/*        style={styles.sideIconGold}*/}
                {/*    />*/}
                {/*    <Text style={styles.circularButtonText}>D</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>

            {/* Place Name */}
            <Text style={styles.placeName}>{place.name}</Text>

            {/* Description */}
            <Text style={styles.description}>
                <Text style={styles.boldText}>{place.name}</Text>, {place.description}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {/* Иконка стрелки назад */}
                        <Image
                            source={require('../assets/images/clarity_arrow-line.png')} // Замените на актуальный путь
                            style={styles.sideIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Saved place</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#888"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.searchIconContainer}>
                        <Image
                            source={require('../assets/images/iconoir_search.png')} // Замените на актуальный путь к иконке поиска
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                </View>

                {/* Content Area */}
                {filteredPlaces.length > 0 ? (
                    <FlatList
                        data={filteredPlaces}
                        renderItem={renderPlaceCard}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.flatListContent}
                    />
                ) : (
                    <View style={styles.noSavedContainer}>
                        <Text style={styles.noSavedText}>Nothing saved</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1C1C1C', // Темно-серый фон
    },
    container: {
        flex: 1,
        backgroundColor: '#1C1C1C',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    headerIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF', // Белый цвет для иконки
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2A2A2A', // Фон для строки поиска
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 50,
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
    },
    searchIconContainer: {
        paddingLeft: 10,
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#FFFFFF',
    },
    flatListContent: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#2A2A2A', // Более светлый темно-серый фон для карточки
        borderRadius: 15,
        padding: 15,
        position: 'relative', // Для позиционирования боковых иконок
        marginBottom: 15,
    },
    mainImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    sideIconsContainer: {
        position: 'absolute',
        top: 25, // Отступ сверху от карточки
        right: 15, // Отступ справа от карточки
        zIndex: 1, // Чтобы иконки были поверх изображения
    },
    sideIconButton: {
        backgroundColor: '#3A3A3A', // Темно-серый фон для кнопок
        borderRadius: 10,
        padding: 8,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sideIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF',
    },
    circularButton: {
        backgroundColor: '#D9B43B', // Золотой фон
        borderRadius: 50, // Круглая форма
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // Для размещения иконки и буквы
    },
    sideIconGold: {
        width: 24,
        height: 24,
        tintColor: '#000000', // Черный цвет для иконки на золотом фоне
        position: 'absolute',
    },
    circularButtonText: {
        color: '#000000', // Черный текст
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10, // Отступ от иконки, если она будет
    },
    placeName: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        color: '#D4D4D4', // Светло-серый текст
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
    noSavedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noSavedText: {
        color: '#888',
        fontSize: 18,
        fontStyle: 'italic',
    },
});

export default SavedPlacesScreen;
