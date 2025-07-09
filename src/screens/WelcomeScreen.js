import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width for responsive layout

// Data for each welcome slide
const welcomeScreensData = [
    {
        id: '1',
        // Updated placeholder image path to a conventional local asset path
        image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
        title: 'Greetings, traveler!',
        description: 'I am Carledon. Fasten your seatbelts - an exciting journey through the land of the maple leaf awaits you!',
        buttonText: 'Let\'s go!',
        // For debugging, let's simplify the action to always scroll to next for now
        buttonAction: null, // Set to null so scrollToNext is always called
    },
    {
        id: '2',
        // Updated placeholder image path
        image: require('../assets/images/54d4223f7f8ce6f1eaa407abce8993893162227d.png'),
        title: 'Choose the route - I\'ll show you everything.',
        description: 'From cities to mountains, from oceans to lakes - just choose a point on the map, and I\'ll tell you all the secrets of that place.',
        buttonText: 'Look at the map',
        // For debugging, let's simplify the action to always scroll to next for now
        buttonAction: null, // Set to null so scrollToNext is always called
    },
    // The third slide was commented out by the user, keeping it that way.
    // {
    //     id: '3',
    //     image: require('../assets/images/welcome_bookmark.png'), // Updated placeholder image path
    //     title: 'Save the best',
    //     description: 'Like a place? Add it to your "Favorites." I\'ll remember everything - even how to get there on the wings of birds.',
    //     buttonText: 'On the road!',
    //     buttonAction: null, // Set to null so scrollToNext is always called
    // },
];

const WelcomeScreen = ({ navigation }) => { // Ensure navigation prop is received
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to scroll to the next slide
    const scrollToNext = () => {
        console.log('Button pressed! Current index:', currentIndex); // Debugging log
        if (currentIndex < welcomeScreensData.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
            setCurrentIndex(currentIndex + 1);
        } else {
            // Last screen, navigate to main app or perform final action
            console.log('Finished welcome screens! Navigating to MainTab.');
            // Ensure 'MainTab' is a valid route name in your navigation stack
            if (navigation && navigation.navigate) {
                navigation.navigate('MainTab');
            } else {
                console.warn('Navigation prop not available or navigate method missing.');
            }
        }
    };

    // Render item for FlatList
    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            {/* Top vertical indicator lines */}
            {/*<View style={styles.indicatorContainer}>*/}
            {/*    {welcomeScreensData.map((_, index) => (*/}
            {/*        <View*/}
            {/*            key={index}*/}
            {/*            style={[*/}
            {/*                styles.verticalIndicator,*/}
            {/*                { backgroundColor: index === currentIndex ? '#D9B43B' : '#444444' }, // Gold for active, grey for inactive*/}
            {/*            ]}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</View>*/}

            <Image
                source={item.image}
                style={styles.slideImage}
            />
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDescription}>{item.description}</Text>
            <TouchableOpacity
                style={styles.slideButton}
                // Simplified onPress to always call scrollToNext for debugging
                onPress={scrollToNext}
            >
                <Text style={styles.slideButtonText}>{item.buttonText}</Text>
            </TouchableOpacity>
        </View>
    );

    // Update current index on scroll
    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / width);
        setCurrentIndex(newIndex);
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={welcomeScreensData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16} // Adjust for smoother updates
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // Black background for the entire screen
    },
    slide: {
        width: width, // Each slide takes full screen width
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#000000', // Ensure slide background is black
    },
    indicatorContainer: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingTop: 20,
        zIndex: 1, // Ensure indicators are on top
    },
    verticalIndicator: {
        width: 3, // Thin vertical line
        height: 80, // Height of the line
        borderRadius: 1.5,
    },
    slideImage: {
        width: '100%', // Adjust as needed
        height: 300, // Adjust as needed
        resizeMode: 'contain', // Or 'cover' depending on your image aspect ratio
        marginBottom: 30,
    },
    slideTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 15,
    },
    slideDescription: {
        fontSize: 16,
        color: '#AAAAAA',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 22,
    },
    slideButton: {
        backgroundColor: '#D9B43B', // Gold button color
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '80%', // Adjust button width
        alignItems: 'center',
    },
    slideButtonText: {
        color: '#000000', // Black text for the button
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
