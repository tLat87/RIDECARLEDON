import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const MainScreen = () => {
    return (
        <View style={styles.container}>
            {/* Фоновое изображение 1: Текст "RIDE" и золотой треугольник */}
            {/*<Image*/}
            {/*    source={require('./assets/images/ride_gold_triangle.png')} // Замените на актуальный путь к вашему PNG изображению*/}
            {/*    style={styles.backgroundImageTop}*/}
            {/*    resizeMode="contain"*/}
            {/*/>*/}

            {/* Фоновое изображение 2: Текст "WITH CARLEDON" */}
            <Image
                source={require('../assets/images/de6762d906015c05dae8600ed4aec6b1f6bd2317.png')} // Замените на актуальный путь к вашему PNG изображению
                style={styles.backgroundImageMiddle}
                resizeMode="contain"
            />

            {/* Изображение человека */}
            <Image
                source={require('../assets/images/e5a651ab968475f24ab6f54c3addf36231cdf3b7.png')} // Замените на актуальный путь к вашему PNG изображению
                style={styles.personImage}
                resizeMode="contain"
            />

            {/* Блок текста внизу */}
            <View style={styles.bottomTextBlock}>
                <Text style={styles.bottomText}>
                    <Text style={styles.boldText}>RIDE with CARLEDON</Text>
                    <Text>— your personal guide to Canada: find the most striking locations, plan routes and save your favorite places. An interactive map and detailed descriptions will make your trip unforgettable.</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Темный фон, как на скриншоте
        alignItems: 'center',
        justifyContent: 'flex-start', // Выравнивание элементов сверху
    },
    backgroundImageTop: {
        width: width * 0.8, // Ширина 80% от ширины экрана
        height: height * 0.2, // Высота 20% от высоты экрана
        position: 'absolute',
        top: height * 0.05, // Отступ сверху
        zIndex: 1, // Поверх других элементов
    },
    backgroundImageMiddle: {
        width: width, // Ширина 90% от ширины экрана
        height: height * 0.4, // Высота 20% от высоты экрана
        position: 'absolute',
        right: 0,
        top: height * 0.01, // Отступ сверху, чтобы перекрывать первое изображение
        zIndex: 2, // Поверх других элементов
    },
    personImage: {
        width: width, // Ширина 70% от ширины экрана
        height: height * 0.7, // Высота 60% от высоты экрана
        position: 'absolute',
        left: -50,
        top: 100, // Отступ сверху, чтобы быть ниже текста
        zIndex: 3, // Поверх фоновых изображений
    },
    bottomTextBlock: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        padding: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон для читаемости
        borderRadius: 10,
        zIndex: 4, // Поверх всех элементов
    },
    bottomText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 20,
        fontWeight: '900',
    },
    boldText: {
        fontWeight: '900',
    },
});

export default MainScreen;
