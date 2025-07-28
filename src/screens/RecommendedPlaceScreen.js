import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';
import {addCard, removeCard} from "../redux/slices/cardsSlice";

const RecommendedPlaceScreen = ({ navigation, route }) => {
    // Получаем данные о месте из route.params
    const { place } = route.params;

    const dispatch = useDispatch();
    const isBookmarked = useSelector(state =>
        state.cards.cards.some(card => card.id === place.id)
    );

    const toggleBookmark = () => {
        if (isBookmarked) {
            dispatch(removeCard(place.id));
            Alert.alert('Removed', 'Place removed from bookmarks.');
        } else {
            dispatch(addCard(place));
            Alert.alert('Saved', 'Place added to bookmarks!');
        }
    };

    const onShare = async () => {
        try {
            const shareOptions = {
                title: `Check out ${place.name}!`,
                message: `I found a great place to visit: ${place.name}!\nCoordinates: ${place.coordinates}\n\nRead more about it here: ...`,
                url: 'https://www.pc.gc.ca/en/pn-np/ab/banff', // Можно использовать динамический URL, если он есть в place
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.error('Error sharing:', error);
            Alert.alert('Sharing failed', 'Please try again later.');
        }
    };

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
                    <Text style={styles.headerTitle}>Recomended Place</Text>
                </View>

                {/* Main Content */}
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.card}>
                        <Image
                            source={place.image} // Используем изображение из переданных данных
                            style={styles.mainImage}
                        />

                        <View style={styles.sideIconsContainer}>
                            <TouchableOpacity
                                style={[styles.sideIconButton, isBookmarked ? styles.bookmarkedButton : null]}
                                onPress={toggleBookmark}
                            >
                                <Image
                                    source={require('../assets/images/iconoir_bookmark.png')}
                                    style={styles.sideIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sideIconButton} onPress={onShare}>
                                <Image
                                    source={require('../assets/images/tabler_share-3.png')}
                                    style={styles.sideIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.placeName}>{place.name}</Text>

                        <View style={styles.coordinatesBox}>
                            <Image
                                source={require('../assets/images/hugeicons_maps-location-02.png')}
                                style={styles.coordinatesIcon}
                            />
                            <Text style={styles.coordinatesText}>Coordinates: {place.coordinates}</Text>
                        </View>

                        <Text style={styles.description}>
                            <Text style={styles.boldText}>{place.name}</Text>, {place.description.split(',')[1]}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#11100D',
    },
    container: {
        flex: 1,
        backgroundColor: '#11100D',
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
    scrollViewContent: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#202020',
        borderRadius: 15,
        padding: 15,
        position: 'relative',
        marginBottom: 20,
    },
    mainImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    sideIconsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 25,
        right: 15,
        zIndex: 1,
    },
    sideIconButton: {
        backgroundColor: '#B18626',
        borderRadius: 10,
        padding: 8,
        marginLeft: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookmarkedButton: {
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
    coordinatesBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#151515',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    coordinatesIcon: {
        width: 18,
        height: 18,
        tintColor: '#FFFFFF',
        marginRight: 8,
    },
    coordinatesText: {
        color: '#FFFFFF',
        fontSize: 14,
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
});

export default RecommendedPlaceScreen;
