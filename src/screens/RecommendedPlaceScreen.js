import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Для отступов на iOS

const RecommendedPlaceScreen = ({navigation}) => {
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
                    <Text style={styles.headerTitle}>Recomended Place</Text>
                </View>

                {/* Main Content */}
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.card}>
                        {/* Main Image */}
                        <Image
                            source={require('../assets/images/RIDEwithCARLEDON/image8.png')} // Замените на актуальный путь к изображению
                            style={styles.mainImage}
                        />

                        {/* Side Icons */}
                        <View style={styles.sideIconsContainer}>
                            <TouchableOpacity style={styles.sideIconButton}>
                                <Image
                                    source={require('../assets/images/iconoir_bookmark.png')} // Замените на актуальный путь
                                    style={styles.sideIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sideIconButton}>
                                <Image
                                    source={require('../assets/images/tabler_share-3.png')} // Замените на актуальный путь
                                    style={styles.sideIcon}
                                />
                            </TouchableOpacity>

                        </View>

                        {/* Place Name */}
                        <Text style={styles.placeName}>Banff National Park</Text>

                        {/* Coordinates Box */}
                        <View style={styles.coordinatesBox}>
                            <Image
                                source={require('../assets/images/hugeicons_maps-location-02.png')} // Замените на актуальный путь к иконке
                                style={styles.coordinatesIcon}
                            />
                            <Text style={styles.coordinatesText}>Coordinates: 51.1784, -115.5708</Text>
                        </View>

                        {/* Description */}
                        <Text style={styles.description}>
                            <Text style={styles.boldText}>Banff National Park</Text>, founded in 1885, is the jewel
                            of the Canadian Rockies, combining majestic peaks covered with ice caps and crystal-clear
                            glacial lakes. Here you can build routes of varying difficulty: from short hiking trails along the shores
                            of lakes to multi-day hikes through alpine passes.
                        </Text>
                        <Text style={styles.description}>
                            In the summer, the park roars with waterfalls and
                            is filled with a variety of flora and fauna, including
                            moose, musk oxen and brown bears. In the winter,
                            Banff turns into a real ski resort with world-class
                            slopes and modern lifts. Must-see attractions are
                            the Banff Upper Hot Springs, where you can relax
                            after a long route, and the Sulphur Mountain
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
        backgroundColor: '#11100D', // Темно-серый фон
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
        tintColor: '#FFFFFF', // Белый цвет для иконки
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    scrollViewContent: {
        paddingBottom: 20, // Отступ снизу для скролла
    },
    card: {
        backgroundColor: '#202020', // Более светлый темно-серый фон для карточки
        borderRadius: 15,
        padding: 15,
        position: 'relative', // Для позиционирования боковых иконок
        marginBottom: 20,
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
        backgroundColor: '#B18626', // Темно-серый фон для кнопок
        borderRadius: 10,
        padding: 8,
        marginRight: 10,
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
    coordinatesBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#151515', // Фон для блока координат
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 15,
        alignSelf: 'flex-start', // Чтобы блок не растягивался на всю ширину
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
        color: '#D4D4D4', // Светло-серый текст
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default RecommendedPlaceScreen;
