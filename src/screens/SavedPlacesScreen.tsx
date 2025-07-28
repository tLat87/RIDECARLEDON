import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import Share from 'react-native-share';
import {removeCard} from "../redux/slices/cardsSlice";

const SavedPlacesScreen = ({ navigation }) => {
    // Получаем массив сохраненных мест из Redux-хранилища
    const savedPlaces = useSelector(state => state.cards.cards);
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState(savedPlaces);

    useEffect(() => {
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = savedPlaces.filter(place =>
                place.name.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredPlaces(filtered);
        } else {
            setFilteredPlaces(savedPlaces);
        }
    }, [searchQuery, savedPlaces]); // Добавляем savedPlaces в зависимости

    const handleRemoveBookmark = (placeId) => {
        dispatch(removeCard(placeId));
    };

    // Функция для шаринга
    const onShare = async (place) => {
        try {
            const shareOptions = {
                title: `Check out ${place.name}!`,
                message: `I found a great place to visit: ${place.name}!\nCoordinates: ${place.coordinates}\n\n${place.description.substring(0, 100)}...`,
                url: 'https://www.google.com/search?q=' + encodeURIComponent(place.name),
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const renderPlaceCard = ({ item: place }) => (
        <View style={styles.card}>
            {/* Main Image */}
            <Image
                source={place.image} // Используем объект require
                style={styles.mainImage}
            />

            {/* Side Icons */}
            <View style={styles.sideIconsContainer}>
                {/* Кнопка для удаления закладки */}
                <TouchableOpacity style={[styles.sideIconButton, styles.bookmarkedButton]} onPress={() => handleRemoveBookmark(place.id)}>
                    <Image
                        source={require('../assets/images/iconoir_bookmark.png')} // Заполненная иконка закладки
                        style={styles.sideIcon}
                    />
                </TouchableOpacity>
                {/* Кнопка поделиться */}
                <TouchableOpacity style={styles.sideIconButton} onPress={() => onShare(place)}>
                    <Image
                        source={require('../assets/images/tabler_share-3.png')}
                        style={styles.sideIcon}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.placeName}>{place.name}</Text>

            <Text style={styles.description}>
                <Text style={styles.boldText}>{place.name}</Text>, {place.description.split(',')[1]}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../assets/images/clarity_arrow-line.png')}
                            style={styles.headerIcon}
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
                            source={require('../assets/images/iconoir_search.png')}
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
                        <Image
                            source={require('../assets/images/54d4223f7f8ce6f1eaa407abce8993893162227d.png')} // Путь к вашей заглушке
                            style={styles.noSavedImage}
                        />
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
        backgroundColor: '#1C1C1C',
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
        tintColor: '#FFFFFF',
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
        backgroundColor: '#2A2A2A',
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
        backgroundColor: '#2A2A2A',
        borderRadius: 15,
        padding: 15,
        position: 'relative',
        marginBottom: 15,
    },
    mainImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    sideIconsContainer: {
        flexDirection: 'row', // Иконки в ряд
        position: 'absolute',
        top: 25,
        right: 15,
        zIndex: 1,
    },
    sideIconButton: {
        backgroundColor: '#3A3A3A',
        borderRadius: 10,
        padding: 8,
        marginLeft: 10, // Отступ между кнопками
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookmarkedButton: { // Стиль для кнопки "удалить закладку"
        backgroundColor: '#D9B43B',
    },
    sideIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF',
    },
    placeName: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        color: '#D4D4D4',
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
        marginTop: 20, // Отступ от иконки
    },
    noSavedImage: {
        width: 100, // Примерный размер
        height: 100,
        tintColor: '#888', // Затемненная иконка
    }
});

export default SavedPlacesScreen;
