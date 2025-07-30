// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
// import Share from 'react-native-share'; // Import library for sharing
//
// const TravelQuestionnaireScreen = ({ navigation }) => {
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);
//     const [recommendedPlace, setRecommendedPlace] = useState(null);
//
//     const questions = [
//         "What kind of climate do you prefer for your vacation? (e.g., Hot, Mild, Cold)",
//         "What type of activities do you enjoy most? (e.g., Adventure, Relaxation, Culture, Nature)",
//         "What's your preferred travel style? (e.g., Solo, Family, Romantic, Friends)",
//         "What's your budget level for a trip? (e.g., Low, Medium, High)",
//         "How important is nightlife to you? (e.g., Very, Moderately, Not important)",
//     ];
//
//     const handleAnswer = (answer) => {
//         const newAnswers = [...answers, answer];
//         setAnswers(newAnswers);
//
//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             // All questions answered, recommend a place
//             recommendDestination(newAnswers);
//         }
//     };
//
//     const recommendDestination = (userAnswers) => {
//         // Simple recommendation logic based on answers
//         let destination = {};
//
//         const climate = userAnswers[0].toLowerCase();
//         const activities = userAnswers[1].toLowerCase();
//         const budget = userAnswers[3].toLowerCase();
//
//         if (climate.includes('hot') && activities.includes('relaxation') && budget.includes('medium')) {
//             destination = {
//                 id: 'maldives',
//                 name: 'Maldives',
//                 coordinates: '3.2028, 73.2207',
//                 description: 'The Maldives offers breathtaking white-sand beaches, crystal-clear turquoise waters, and luxurious overwater bungalows, perfect for ultimate relaxation and romantic getaways. Enjoy snorkeling, diving, or simply unwinding by the ocean.',
//                 image: require('../assets/images/RIDEwithCARLEDON/image0.png'), // Placeholder image
//                 tips: "Explore the vibrant coral reefs, try a sunset cruise, and indulge in fresh seafood. Consider an all-inclusive resort for a hassle-free experience."
//             };
//         } else if (climate.includes('cold') && activities.includes('adventure') && budget.includes('high')) {
//             destination = {
//                 id: 'iceland',
//                 name: 'Iceland',
//                 coordinates: '64.9631, -19.0208',
//                 description: 'Iceland is a land of dramatic landscapes, including volcanoes, geysers, hot springs, and the Northern Lights. It\'s ideal for adventurous travelers seeking unique natural phenomena and outdoor activities.',
//                 image: require('../assets/images/RIDEwithCARLEDON/image0.png'), // Placeholder image
//                 tips: "Rent a car to explore the Golden Circle, visit the Blue Lagoon, and chase the Northern Lights during winter. Pack layers as the weather can change quickly."
//             };
//         } else if (climate.includes('mild') && activities.includes('culture') && budget.includes('medium')) {
//             destination = {
//                 id: 'rome',
//                 name: 'Rome, Italy',
//                 coordinates: '41.9028, 12.4964',
//                 description: 'Rome is a city steeped in history and culture, offering ancient ruins, stunning art, delicious cuisine, and a vibrant atmosphere. Perfect for those who love exploring historical sites and enjoying European charm.',
//                 image: require('../assets/images/RIDEwithCARLEDON/image0.png'), // Placeholder image
//                 tips: "Visit the Colosseum, Roman Forum, and Vatican City. Don't forget to toss a coin in the Trevi Fountain and enjoy authentic pasta and gelato."
//             };
//         } else if (climate.includes('nature') && activities.includes('adventure') && budget.includes('low')) {
//             destination = {
//                 id: 'patagonia',
//                 name: 'Patagonia (Chile & Argentina)',
//                 coordinates: '-51.7235, -72.6841',
//                 description: 'Patagonia offers breathtaking natural beauty with towering mountains, vast glaciers, and pristine lakes. It is an ideal destination for hikers, trekkers, and nature enthusiasts looking for an immersive outdoor experience.',
//                 image: require('../assets/images/RIDEwithCARLEDON/image0.png'), // Placeholder image
//                 tips: "Hike the Torres del Paine W-trek or explore El Chalten. Be prepared for unpredictable weather and book accommodations in advance, especially during peak season."
//             };
//         } else {
//             // Default recommendation if no specific match
//             destination = {
//                 id: 'banff',
//                 name: 'Banff National Park, Canada',
//                 coordinates: '51.1784, -115.5708',
//                 description: 'Banff National Park in the Canadian Rockies is a stunning destination with majestic peaks, clear glacial lakes, and abundant wildlife. It\'s perfect for nature lovers and outdoor enthusiasts.',
//                 image: require('../assets/images/RIDEwithCARLEDON/image0.png'), // Placeholder image
//                 tips: "Visit Lake Louise and Moraine Lake, hike one of the many scenic trails, and look out for wildlife. Book accommodations and popular activities well in advance, especially in summer."
//             };
//         }
//         setRecommendedPlace(destination);
//     };
//
//     const onShare = async () => {
//         if (!recommendedPlace) return;
//         try {
//             const shareOptions = {
//                 title: 'Check out this amazing place!',
//                 message: `I found a great place to visit: ${recommendedPlace.name}!\nIt's a beautiful place with ${recommendedPlace.description}\nHere's a tip: ${recommendedPlace.tips}`,
//                 url: `https://www.google.com/maps/search/?api=1&query=${recommendedPlace.coordinates}`, // Link to general area on Google Maps
//             };
//             await Share.open(shareOptions);
//         } catch (error) {
//             console.error('Error sharing:', error);
//             Alert.alert('Sharing failed', 'Please try again later.');
//         }
//     };
//
//     if (recommendedPlace) {
//         return (
//             <ScrollView style={styles.container}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
//                     <Text style={styles.sectionTitle}>Your Recommended Place</Text>
//                 </View>
//                 <View style={styles.card}>
//                     <Image
//                         source={recommendedPlace.image}
//                         style={styles.cardImage}
//                     />
//                     <View style={styles.cardInfo}>
//                         <Text style={styles.cardTitle}>{recommendedPlace.name}</Text>
//                         <Text style={styles.cardDescription}>
//                             {recommendedPlace.description}
//                         </Text>
//                         <Text style={styles.cardTips}>
//                             **Tip:** {recommendedPlace.tips}
//                         </Text>
//                     </View>
//                     <View style={styles.cardButtons}>
//                         <TouchableOpacity style={styles.iconButton} onPress={onShare}>
//                             <Image
//                                 source={require('../assets/images/tabler_share-3.png')} // Placeholder
//                             />
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.launchButton} onPress={() => { navigation.navigate('RecommendedPlaceScreen', { place: recommendedPlace }) }}>
//                             <Image
//                                 source={require('../assets/images/lsicon_open-new-outline.png')} // Placeholder
//                             />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//
//                 <TouchableOpacity onPress={() => navigation.navigate('MapScreen', {
//                     latitude: parseFloat(recommendedPlace.coordinates.split(',')[0]),
//                     longitude: parseFloat(recommendedPlace.coordinates.split(',')[1]),
//                     placeName: recommendedPlace.name
//                 })}>
//                     <View style={{ padding: 20, backgroundColor: '#202020', borderRadius: 16, marginTop: 20 }}>
//                         <Image
//                             source={require('../assets/images/3c8862bf2e3bc75a5d1e56b839301d9b97477654.png')} // Placeholder
//                             style={styles.mapImage}
//                             resizeMode="cover"
//                         />
//                     </View>
//                 </TouchableOpacity>
//
//                 <TouchableOpacity style={styles.resetButton} onPress={() => {
//                     setCurrentQuestionIndex(0);
//                     setAnswers([]);
//                     setRecommendedPlace(null);
//                 }}>
//                     <Text style={styles.resetButtonText}>Start Again</Text>
//                 </TouchableOpacity>
//
//                 <View style={{ marginBottom: 100 }} />
//             </ScrollView>
//         );
//     }
//
//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles.sectionTitle}>Create Your Trip</Text>
//             <View style={styles.questionContainer}>
//                 <Text style={styles.questionText}>
//                     Question {currentQuestionIndex + 1} of {questions.length}:
//                 </Text>
//                 <Text style={styles.questionPrompt}>
//                     {questions[currentQuestionIndex]}
//                 </Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Type your answer here..."
//                     placeholderTextColor="#777"
//                     onChangeText={text => setAnswers(prev => {
//                         const newAns = [...prev];
//                         newAns[currentQuestionIndex] = text;
//                         return newAns;
//                     })}
//                     value={answers[currentQuestionIndex] || ''}
//                     returnKeyType="done"
//                     onSubmitEditing={() => handleAnswer(answers[currentQuestionIndex])}
//                 />
//                 <TouchableOpacity
//                     style={styles.nextButton}
//                     onPress={() => handleAnswer(answers[currentQuestionIndex])}
//                     disabled={!answers[currentQuestionIndex]}
//                 >
//                     <Text style={styles.nextButtonText}>
//                         {currentQuestionIndex === questions.length - 1 ? "Get Recommendation" : "Next Question"}
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={{ marginBottom: 100 }} />
//         </ScrollView>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#111',
//         padding: 16,
//     },
//     sectionTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginTop: 30,
//         color: '#fff',
//         textShadowColor: '#fff',
//         textShadowOffset: { width: 0, height: 0 },
//         textShadowRadius: 8,
//         marginBottom: 8,
//     },
//     questionContainer: {
//         backgroundColor: '#222',
//         borderRadius: 16,
//         padding: 20,
//         marginTop: 16,
//     },
//     questionText: {
//         color: '#d9b43b',
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     questionPrompt: {
//         color: '#fff',
//         fontSize: 18,
//         marginBottom: 16,
//     },
//     input: {
//         backgroundColor: '#333',
//         color: '#fff',
//         borderRadius: 8,
//         padding: 12,
//         fontSize: 16,
//         marginBottom: 16,
//     },
//     nextButton: {
//         backgroundColor: '#d9b43b',
//         padding: 14,
//         borderRadius: 12,
//         alignItems: 'center',
//     },
//     nextButtonText: {
//         color: '#000',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     card: {
//         backgroundColor: '#222',
//         borderRadius: 16,
//         padding: 12,
//         marginTop: 16,
//     },
//     cardImage: {
//         width: '100%',
//         height: 160,
//         borderRadius: 12,
//     },
//     cardInfo: {
//         marginTop: 12,
//     },
//     cardTitle: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     cardDescription: {
//         color: '#aaa',
//         marginTop: 4,
//     },
//     cardTips: {
//         color: '#fff',
//         marginTop: 8,
//         fontStyle: 'italic',
//     },
//     cardButtons: {
//         flexDirection: 'row',
//         marginTop: 12,
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     iconButton: {
//         padding: 10,
//         backgroundColor: '#333',
//         borderRadius: 10,
//     },
//     launchButton: {
//         backgroundColor: '#d9b43b',
//         padding: 12,
//         borderRadius: 12,
//     },
//     mapImage: {
//         width: '100%',
//         height: 200,
//         borderRadius: 16,
//     },
//     resetButton: {
//         backgroundColor: '#555',
//         padding: 14,
//         borderRadius: 12,
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     resetButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });
//
// export default TravelQuestionnaireScreen;
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import Share from 'react-native-share'; // Import library for sharing
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Import MapView and Marker

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 5; // Zoom level for the map
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const TravelQuestionnaireScreen = ({ navigation }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(5).fill('')); // Initialize with empty strings
    const [recommendedPlace, setRecommendedPlace] = useState(null);

    const questions = [
        "What kind of climate do you prefer for your vacation? (e.g., Hot, Mild, Cold)",
        "What type of activities do you enjoy most? (e.g., Adventure, Relaxation, Culture, Nature)",
        "What's your preferred travel style? (e.g., Solo, Family, Romantic, Friends)",
        "What's your budget level for a trip? (e.g., Low, Medium, High)",
        "How important is nightlife to you? (e.g., Very, Moderately, Not important)",
    ];

    const handleAnswer = (answerText) => {
        // Update the answer at the current index
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answerText;
        setAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // All questions answered, recommend a place
            recommendDestination(newAnswers);
        }
    };

    const recommendDestination = (userAnswers) => {
        let destination = {};

        const climate = userAnswers[0].toLowerCase();
        const activities = userAnswers[1].toLowerCase();
        const budget = userAnswers[3].toLowerCase();

        if (climate.includes('hot') && activities.includes('relaxation') && budget.includes('medium')) {
            destination = {
                id: 'maldives',
                name: 'Maldives',
                coordinates: '3.2028, 73.2207',
                description: 'The Maldives offers breathtaking white-sand beaches, crystal-clear turquoise waters, and luxurious overwater bungalows, perfect for ultimate relaxation and romantic getaways. Enjoy snorkeling, diving, or simply unwinding by the ocean.',
                image: require('../assets/images/RIDEwithCARLEDON/image14.png'), // Replace with your image
                tips: "Explore the vibrant coral reefs, try a sunset cruise, and indulge in fresh seafood. Consider an all-inclusive resort for a hassle-free experience."
            };
        } else if (climate.includes('cold') && activities.includes('adventure') && budget.includes('high')) {
            destination = {
                id: 'iceland',
                name: 'Iceland',
                coordinates: '64.9631, -19.0208',
                description: 'Iceland is a land of dramatic landscapes, including volcanoes, geysers, hot springs, and the Northern Lights. It\'s ideal for adventurous travelers seeking unique natural phenomena and outdoor activities.',
                image: require('../assets/images/RIDEwithCARLEDON/image12.png'), // Replace with your image
                tips: "Rent a car to explore the Golden Circle, visit the Blue Lagoon, and chase the Northern Lights during winter. Pack layers as the weather can change quickly."
            };
        } else if (climate.includes('mild') && activities.includes('culture') && budget.includes('medium')) {
            destination = {
                id: 'rome',
                name: 'Rome, Italy',
                coordinates: '41.9028, 12.4964',
                description: 'Rome is a city steeped in history and culture, offering ancient ruins, stunning art, delicious cuisine, and a vibrant atmosphere. Perfect for those who love exploring historical sites and enjoying European charm.',
                image: require('../assets/images/RIDEwithCARLEDON/image11.png'), // Replace with your image
                tips: "Visit the Colosseum, Roman Forum, and Vatican City. Don't forget to toss a coin in the Trevi Fountain and enjoy authentic pasta and gelato."
            };
        } else if (climate.includes('nature') && activities.includes('adventure') && budget.includes('low')) {
            destination = {
                id: 'patagonia',
                name: 'Patagonia (Chile & Argentina)',
                coordinates: '-51.7235, -72.6841',
                description: 'Patagonia offers breathtaking natural beauty with towering mountains, vast glaciers, and pristine lakes. It is an ideal destination for hikers, trekkers, and nature enthusiasts looking for an immersive outdoor experience.',
                image: require('../assets/images/RIDEwithCARLEDON/image8.png'), // Replace with your image
                tips: "Hike the Torres del Paine W-trek or explore El Chalten. Be prepared for unpredictable weather and book accommodations in advance, especially during peak season."
            };
        } else {
            // Default recommendation if no specific match
            destination = {
                id: 'banff',
                name: 'Banff National Park, Canada',
                coordinates: '51.1784, -115.5708',
                description: 'Banff National Park in the Canadian Rockies is a stunning destination with majestic peaks, clear glacial lakes, and abundant wildlife. It\'s perfect for nature lovers and outdoor enthusiasts.',
                image: require('../assets/images/RIDEwithCARLEDON/image0.png'), // Replace with your image
                tips: "Visit Lake Louise and Moraine Lake, hike one of the many scenic trails, and look out for wildlife. Book accommodations and popular activities well in advance, especially in summer."
            };
        }
        setRecommendedPlace(destination);
    };

    const onShare = async () => {
        if (!recommendedPlace) return;
        try {
            const shareOptions = {
                title: 'Check out this amazing place!',
                message: `I found a great place to visit: ${recommendedPlace.name}!\nIt's a beautiful place with ${recommendedPlace.description}\nHere's a tip: ${recommendedPlace.tips}`,
                url: `http://maps.google.com/?q=${recommendedPlace.coordinates}`, // Direct link to Google Maps
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.error('Error sharing:', error);
            Alert.alert('Sharing failed', 'Please try again later.');
        }
    };

    if (recommendedPlace) {
        const [latitude, longitude] = recommendedPlace.coordinates.split(',').map(parseFloat);
        const initialRegion = {
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };

        return (
            <ScrollView style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.sectionTitle}>Your Recommended Place</Text>
                </View>
                <View style={styles.card}>
                    <Image
                        source={recommendedPlace.image}
                        style={styles.cardImage}
                        alt={`Image of ${recommendedPlace.name}`}
                    />
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>{recommendedPlace.name}</Text>
                        <Text style={styles.cardDescription}>
                            {recommendedPlace.description}
                        </Text>
                        <Text style={styles.cardTips}>
                            **Tip:** {recommendedPlace.tips}
                        </Text>
                    </View>
                    <View style={styles.cardButtons}>
                        <TouchableOpacity style={styles.iconButton} onPress={onShare}>
                            <Image
                                source={require('../assets/images/tabler_share-3.png')} // Placeholder for share icon
                                alt="Share"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.launchButton} onPress={() => { navigation.navigate('RecommendedPlaceScreen', { place: recommendedPlace }) }}>
                            <Image
                                source={require('../assets/images/lsicon_open-new-outline.png')} // Placeholder for launch icon
                                alt="Launch"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Interactive Map */}
                <Text style={styles.sectionTitle}>Location on Map</Text>
                <View style={styles.mapContainer}>
                    <MapView
                        // provider={PROVIDER_GOOGLE} // Use Google Maps for Android/iOS. Remove for Apple Maps on iOS.
                        style={styles.map}
                        initialRegion={initialRegion}
                        customMapStyle={mapStyle} // Optional: for dark mode styling
                    >
                        <Marker
                            coordinate={{ latitude, longitude }}
                            title={recommendedPlace.name}
                            description={recommendedPlace.description.substring(0, 50) + '...'} // Shorten description for marker
                        />
                    </MapView>
                </View>

                <TouchableOpacity style={styles.resetButton} onPress={() => {
                    setCurrentQuestionIndex(0);
                    setAnswers(Array(5).fill('')); // Reset all answers
                    setRecommendedPlace(null);
                }}>
                    <Text style={styles.resetButtonText}>Start Again</Text>
                </TouchableOpacity>

                <View style={{ marginBottom: 100 }} />
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Create Your Trip</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>
                    Question {currentQuestionIndex + 1} of {questions.length}:
                </Text>
                <Text style={styles.questionPrompt}>
                    {questions[currentQuestionIndex]}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type your answer here..."
                    placeholderTextColor="#777"
                    onChangeText={text => {
                        const newAns = [...answers];
                        newAns[currentQuestionIndex] = text;
                        setAnswers(newAns);
                    }}
                    value={answers[currentQuestionIndex] || ''}
                    returnKeyType="done"
                    onSubmitEditing={() => handleAnswer(answers[currentQuestionIndex])}
                />
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => handleAnswer(answers[currentQuestionIndex])}
                    disabled={!answers[currentQuestionIndex] || answers[currentQuestionIndex].trim() === ''}
                >
                    <Text style={styles.nextButtonText}>
                        {currentQuestionIndex === questions.length - 1 ? "Get Recommendation" : "Next Question"}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 100 }} />
        </ScrollView>
    );
};

const mapStyle = [ // A simple dark map style for Google Maps
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9e9e9e" }]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#bdbdbd" }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#181818" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#1b1b1b" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#2c2c2c" }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#8a8a8a" }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{ "color": "#373737" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{ "color": "#3c3c3c" }]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{ "color": "#4e4e4e" }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#000000" }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#3d3d3d" }]
    }
];


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
    questionContainer: {
        backgroundColor: '#222',
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
    },
    questionText: {
        color: '#d9b43b',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    questionPrompt: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    nextButton: {
        backgroundColor: '#d9b43b',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#000',
        fontSize: 16,
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
    cardTips: {
        color: '#fff',
        marginTop: 8,
        fontStyle: 'italic',
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
    mapContainer: {
        marginTop: 20,
        borderRadius: 16,
        overflow: 'hidden', // Ensures the map respects the border radius
        height: 250, // Set a fixed height for the map
        width: '100%',
        backgroundColor: '#202020',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    resetButton: {
        backgroundColor: '#555',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TravelQuestionnaireScreen;
