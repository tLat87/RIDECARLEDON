// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector } from 'react-redux';
// import MapView, { Marker, Polyline } from 'react-native-maps'; // Import MapView and related components
//
// const RoutePlannerScreen = ({ navigation }) => {
//     // **IMPORTANT**: You need to ensure your Redux 'cards' slice `savedPlaces`
//     // includes 'coordinates' (latitude, longitude) for each place for the map to work.
//     // Example updated savedPlaces structure:
//     // {
//     //   id: 'place1',
//     //   name: 'Banff National Park',
//     //   description: 'Stunning mountain scenery...',
//     //   image: require('../assets/images/place1.png'),
//     //   coordinates: { latitude: 51.15, longitude: -115.58 },
//     // },
//     // For this example, I'm assuming your Redux store already has or will have this structure.
//     const savedPlaces = useSelector(state => state.cards.cards);
//
//     const [selectedPlaces, setSelectedPlaces] = useState([]);
//     const [optimizedRouteInfo, setOptimizedRouteInfo] = useState(null);
//     const [selectedFeaturedRoute, setSelectedFeaturedRoute] = useState(null);
//
//     // --- Sample Predefined Featured Routes ---
//     // Updated to use more diverse place IDs, assuming your Redux store has them.
//     const featuredRoutes = [
//         {
//             id: 'fr1',
//             name: 'Canadian Rockies Explorer',
//             description: 'Discover the majestic beauty of the Canadian Rockies. This route takes you through stunning national parks, pristine lakes, and offers breathtaking mountain views. Ideal for nature lovers and photographers.',
//             placeIds: ['place1', 'place2', 'place3'], // Ensure these match actual place IDs with coordinates
//             image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
//             distance: '350',
//             duration: '7.5',
//             // Example polyline for a featured route (in a real app, from API)
//             polyline: [
//                 { latitude: 51.15, longitude: -115.58 }, // Banff
//                 { latitude: 51.42, longitude: -116.18 }, // Lake Louise
//                 { latitude: 52.13, longitude: -117.22 }, // Jasper (simulated path)
//             ]
//         },
//         {
//             id: 'fr2',
//             name: 'Historic Quebec City Charm',
//             description: 'Immerse yourself in the European charm of Quebec City. Explore historic sites, cobbled streets, and vibrant cultural landmarks. Perfect for history buffs and those seeking a romantic getaway.',
//             placeIds: ['place4', 'place5', 'place6'],
//             image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
//             distance: '15',
//             duration: '2.0',
//             polyline: [
//                 { latitude: 46.81, longitude: -71.22 }, // Chateau Frontenac
//                 { latitude: 46.80, longitude: -71.20 }, // Old Port
//                 { latitude: 46.79, longitude: -71.21 }, // Plains of Abraham (simulated path)
//             ]
//         },
//         {
//             id: 'fr3',
//             name: 'Pacific Coast Adventure',
//             description: 'Experience the rugged beauty of Canada\'s Pacific coastline. From vibrant cities to serene islands, this route offers stunning ocean vistas and unique wildlife encounters.',
//             placeIds: ['place7', 'place8', 'place9'],
//             image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
//             distance: '200',
//             duration: '4.0',
//             polyline: [
//                 { latitude: 49.28, longitude: -123.12 }, // Vancouver
//                 { latitude: 48.42, longitude: -123.36 }, // Victoria
//                 { latitude: 49.30, longitude: -125.90 }, // Tofino (simulated path)
//             ]
//         },
//         {
//             id: 'fr4',
//             name: 'Maritimes Lighthouse Trail',
//             description: 'Journey through the picturesque Maritimes, visiting iconic lighthouses, charming fishing villages, and enjoying fresh seafood. A coastal dream come true.',
//             placeIds: ['place1', 'place5', 'place7'], // Reusing IDs for example
//             image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
//             distance: '280',
//             duration: '6.0',
//             polyline: [
//                 { latitude: 44.64, longitude: -63.57 }, // Halifax
//                 { latitude: 44.50, longitude: -64.38 }, // Peggy's Cove
//                 { latitude: 45.95, longitude: -66.65 }, // Fredericton (simulated path)
//             ]
//         },
//         {
//             id: 'fr5',
//             name: 'Urban Canada Highlights',
//             description: 'A whirlwind tour of Canada\'s most bustling cities. Experience vibrant arts scenes, diverse culinary delights, and iconic urban landmarks.',
//             placeIds: ['place2', 'place4', 'place8'],
//             image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
//             distance: '75',
//             duration: '3.0',
//             polyline: [
//                 { latitude: 43.65, longitude: -79.38 }, // Toronto
//                 { latitude: 45.50, longitude: -73.57 }, // Montreal
//                 { latitude: 45.42, longitude: -75.69 }, // Ottawa (simulated path)
//             ]
//         },
//         {
//             id: 'fr6',
//             name: 'Wilderness & Wildlife Discovery',
//             description: 'Delve deep into Canada\'s untouched wilderness. This route offers opportunities for wildlife spotting, serene hikes, and true escape into nature.',
//             placeIds: ['place3', 'place6', 'place9'],
//             image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
//             distance: '400',
//             duration: '9.0',
//             polyline: [
//                 { latitude: 46.00, longitude: -78.33 }, // Algonquin Park
//                 { latitude: 53.91, longitude: -122.75 }, // Prince George (simulated path)
//                 { latitude: 60.71, longitude: -135.05 }, // Whitehorse (simulated path)
//             ]
//         },
//         {
//             id: 'fr7',
//             name: 'Great Lakes Scenic Drive',
//             description: 'Explore the stunning shores of the Great Lakes, featuring charming towns, beautiful beaches, and impressive natural formations.',
//             placeIds: ['place1', 'place4', 'place7'],
//             image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
//             distance: '250',
//             duration: '5.5',
//             polyline: [
//                 { latitude: 43.25, longitude: -79.87 }, // Hamilton
//                 { latitude: 42.31, longitude: -83.03 }, // Windsor
//                 { latitude: 45.85, longitude: -84.34 }, // Sault Ste. Marie (simulated path)
//             ]
//         },
//         {
//             id: 'fr8',
//             name: 'Northern Lights Quest',
//             description: 'Venture north to chase the mesmerizing Aurora Borealis and experience unique northern culture and landscapes.',
//             placeIds: ['place2', 'place5', 'place8'],
//             image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
//             distance: '600',
//             duration: '12.0',
//             polyline: [
//                 { latitude: 62.45, longitude: -114.37 }, // Yellowknife
//                 { latitude: 64.84, longitude: -135.00 }, // Dawson City (simulated path)
//                 { latitude: 70.00, longitude: -120.00 }, // Arctic coast (simulated path)
//             ]
//         },
//         {
//             id: 'fr9',
//             name: 'Wine Country Escape',
//             description: 'Indulge in a relaxing tour of Canada\'s renowned wine regions, sampling exquisite local wines and enjoying scenic vineyards.',
//             placeIds: ['place3', 'place6', 'place9'],
//             image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
//             distance: '100',
//             duration: '2.5',
//             polyline: [
//                 { latitude: 43.15, longitude: -79.08 }, // Niagara-on-the-Lake
//                 { latitude: 49.88, longitude: -119.49 }, // Kelowna
//                 { latitude: 44.00, longitude: -81.00 }, // Prince Edward County (simulated path)
//             ]
//         },
//         {
//             id: 'fr10',
//             name: 'Ski & Snowboard Paradise',
//             description: 'Hit the slopes at Canada\'s world-class ski resorts, offering thrilling runs and cozy après-ski atmospheres.',
//             placeIds: ['place1', 'place8', 'place5'],
//             image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
//             distance: '180',
//             duration: '3.0',
//             polyline: [
//                 { latitude: 50.11, longitude: -122.95 }, // Whistler
//                 { latitude: 51.42, longitude: -116.18 }, // Lake Louise (from Rockies)
//                 { latitude: 47.19, longitude: -71.18 }, // Mont Sainte-Anne (simulated path)
//             ]
//         },
//     ];
//
//     const togglePlaceSelection = (place) => {
//         setSelectedFeaturedRoute(null); // Clear featured route selection
//         setSelectedPlaces(prevSelected =>
//             prevSelected.some(p => p.id === place.id)
//                 ? prevSelected.filter(p => p.id !== place.id)
//                 : [...prevSelected, place]
//         );
//     };
//
//     const handleGenerateRoute = () => {
//         if (selectedPlaces.length < 2 && !selectedFeaturedRoute) {
//             Alert.alert('Selection Required', 'Please select at least two places or choose a featured route to generate a route.');
//             return;
//         }
//
//         let routePlaces = [];
//         let totalDistanceKm, totalDurationHours;
//         let routePolyline = []; // To store polyline coordinates for the map
//
//         if (selectedFeaturedRoute) {
//             routePlaces = savedPlaces.filter(place => selectedFeaturedRoute.placeIds.includes(place.id));
//             routePlaces.sort((a, b) => { // Maintain order as defined in featured route
//                 const indexA = selectedFeaturedRoute.placeIds.indexOf(a.id);
//                 const indexB = selectedFeaturedRoute.placeIds.indexOf(b.id);
//                 return indexA - indexB;
//             });
//             totalDistanceKm = selectedFeaturedRoute.distance;
//             totalDurationHours = selectedFeaturedRoute.duration;
//             routePolyline = selectedFeaturedRoute.polyline; // Use predefined polyline
//         } else {
//             // For custom routes, you'd calculate actual polyline via an API
//             const simulatedOptimizedPlaces = [...selectedPlaces].sort((a, b) => a.name.localeCompare(b.name));
//             routePlaces = simulatedOptimizedPlaces;
//             totalDistanceKm = (Math.random() * 100 + 50).toFixed(1);
//             totalDurationHours = (Math.random() * 5 + 1).toFixed(1);
//
//             // Simulate polyline for custom routes based on selected place coordinates
//             routePolyline = routePlaces.map(place => place.coordinates).filter(Boolean); // Filter out places without coordinates
//             if (routePolyline.length < 2) routePolyline = []; // Need at least two points for a line
//         }
//
//         setOptimizedRouteInfo({
//             name: selectedFeaturedRoute ? selectedFeaturedRoute.name : 'Custom Route',
//             description: selectedFeaturedRoute ? selectedFeaturedRoute.description : 'A route based on your selected places.',
//             places: routePlaces,
//             distance: totalDistanceKm,
//             duration: totalDurationHours,
//             polylineCoordinates: routePolyline,
//         });
//     };
//
//     const handleSelectFeaturedRoute = (route) => {
//         setSelectedFeaturedRoute(route);
//         setSelectedPlaces([]); // Clear manual selections
//         setOptimizedRouteInfo(null); // Clear previous route info
//     };
//
//     // Determine the initial region for the MapView
//     const getMapInitialRegion = () => {
//         let coordsToFit = [];
//         if (optimizedRouteInfo && optimizedRouteInfo.places.length > 0) {
//             coordsToFit = optimizedRouteInfo.places.map(p => p.coordinates).filter(Boolean);
//         } else if (selectedPlaces.length > 0) {
//             coordsToFit = selectedPlaces.map(p => p.coordinates).filter(Boolean);
//         } else if (savedPlaces.length > 0) {
//             // Default to first saved place or a general Canada view if nothing else selected
//             return {
//                 latitude: savedPlaces[0]?.coordinates?.latitude || 56.1304, // Default to Canada center
//                 longitude: savedPlaces[0]?.coordinates?.longitude || -106.3468,
//                 latitudeDelta: 30, // Zoom out for Canada
//                 longitudeDelta: 30,
//             };
//         } else {
//             // Default to a general Canada view
//             return {
//                 latitude: 56.1304,
//                 longitude: -106.3468,
//                 latitudeDelta: 30,
//                 longitudeDelta: 30,
//             };
//         }
//
//         if (coordsToFit.length === 0) {
//             return { latitude: 56.1304, longitude: -106.3468, latitudeDelta: 30, longitudeDelta: 30 };
//         }
//
//         // Calculate a bounding box for the selected coordinates
//         const minLat = Math.min(...coordsToFit.map(c => c.latitude));
//         const maxLat = Math.max(...coordsToFit.map(c => c.latitude));
//         const minLon = Math.min(...coordsToFit.map(c => c.longitude));
//         const maxLon = Math.max(...coordsToFit.map(c => c.longitude));
//
//         const centerLat = (minLat + maxLat) / 2;
//         const centerLon = (minLon + maxLon) / 2;
//
//         const latDelta = (maxLat - minLat) * 1.5; // Add some padding
//         const lonDelta = (maxLon - minLon) * 1.5;
//
//         return {
//             latitude: centerLat,
//             longitude: centerLon,
//             latitudeDelta: latDelta > 0 ? latDelta : 0.5, // Ensure positive delta
//             longitudeDelta: lonDelta > 0 ? lonDelta : 0.5,
//         };
//     };
//
//
//     const renderPlaceItem = ({ item: place }) => {
//         const isSelected = selectedPlaces.some(p => p.id === place.id);
//         return (
//             <TouchableOpacity
//                 style={[styles.placeSelectItem, isSelected && styles.selectedPlaceItem]}
//                 onPress={() => togglePlaceSelection(place)}
//             >
//                 <Image source={place.image} style={styles.placeSelectImage} />
//                 <View style={styles.placeSelectTextContainer}>
//                     <Text style={styles.placeSelectName}>{place.name}</Text>
//                     <Text style={styles.placeSelectDescription}>{place.description.split(',')[0].trim()}</Text>
//                 </View>
//                 {isSelected && (
//                     <View style={styles.checkIconContainer}>
//                         <Image
//                             source={require('../assets/images/4fe12aeb2b6b2f9afb1e0ee49ec743042849f816.png')} // Your checkmark icon
//                             style={styles.checkIcon}
//                         />
//                     </View>
//                 )}
//             </TouchableOpacity>
//         );
//     };
//
//     const renderFeaturedRouteItem = ({ item: route }) => {
//         const isSelected = selectedFeaturedRoute && selectedFeaturedRoute.id === route.id;
//         return (
//             <TouchableOpacity
//                 style={[styles.featuredRouteCard, isSelected && styles.selectedFeaturedRouteCard]}
//                 onPress={() => handleSelectFeaturedRoute(route)}
//             >
//                 <Image source={route.image} style={styles.featuredRouteImage} />
//                 <View style={styles.featuredRouteTextContent}>
//                     <Text style={styles.featuredRouteName}>{route.name}</Text>
//                     <Text style={styles.featuredRouteDescription} numberOfLines={2}>{route.description}</Text>
//                     <Text style={styles.featuredRouteStats}>
//                         <Text style={styles.boldText}>{route.distance} km</Text> | <Text style={styles.boldText}>{route.duration} hrs</Text>
//                     </Text>
//                 </View>
//                 {isSelected && (
//                     <View style={styles.checkIconContainer}>
//                         <Image
//                             source={require('../assets/images/4fe12aeb2b6b2f9afb1e0ee49ec743042849f816.png')} // Your checkmark icon
//                             style={styles.checkIcon}
//                         />
//                     </View>
//                 )}
//             </TouchableOpacity>
//         );
//     };
//
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <View style={styles.container}>
//                 {/* Header */}
//                 <View style={styles.header}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <Image
//                             source={require('../assets/images/clarity_arrow-line.png')}
//                             style={styles.headerIcon}
//                         />
//                     </TouchableOpacity>
//                     <Text style={styles.headerTitle}>Plan Your Ride</Text>
//                 </View>
//
//                 <Text style={styles.sectionTitle}>Discover Featured Adventures:</Text>
//                 <FlatList
//                     data={featuredRoutes}
//                     renderItem={renderFeaturedRouteItem}
//                     keyExtractor={item => item.id}
//                     horizontal={true}
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={styles.featuredRoutesList}
//                 />
//
//                 <Text style={styles.sectionTitle}>Or Select Your Own Places:</Text>
//                 <FlatList
//                     data={savedPlaces}
//                     renderItem={renderPlaceItem}
//                     keyExtractor={item => item.id}
//                     horizontal={false}
//                     showsVerticalScrollIndicator={true}
//                     contentContainerStyle={styles.placeSelectFlatList}
//                 />
//
//                 <TouchableOpacity
//                     style={styles.generateRouteButton}
//                     onPress={handleGenerateRoute}
//                     disabled={selectedPlaces.length < 2 && !selectedFeaturedRoute}
//                 >
//                     <Text style={styles.generateRouteButtonText}>
//                         {selectedFeaturedRoute ? `Explore "${selectedFeaturedRoute.name}"` : 'Generate Custom Route'}
//                     </Text>
//                 </TouchableOpacity>
//
//                 {optimizedRouteInfo && (
//                     <ScrollView style={styles.routeInfoContainer}>
//                         <Text style={styles.routeInfoTitle}>{optimizedRouteInfo.name}</Text>
//                         <Text style={styles.routeDescriptionText}>{optimizedRouteInfo.description}</Text>
//
//                         {/* --- ACTUAL MapView Integration --- */}
//                         <View style={styles.mapContainer}>
//                             <MapView
//                                 style={styles.map}
//                                 initialRegion={getMapInitialRegion()} // Set initial region dynamically
//                                 // You might want to use onRegionChangeComplete for more advanced map interactions
//                             >
//                                 {optimizedRouteInfo.places.map((place, index) => (
//                                     place.coordinates && ( // Only render marker if coordinates exist
//                                         <Marker
//                                             key={place.id}
//                                             coordinate={place.coordinates}
//                                             title={`${index + 1}. ${place.name}`}
//                                             description={place.description.split(',')[0].trim()}
//                                             pinColor="#D9B43B" // Custom pin color
//                                         />
//                                     )
//                                 ))}
//                                 {optimizedRouteInfo.polylineCoordinates && optimizedRouteInfo.polylineCoordinates.length > 1 && (
//                                     <Polyline
//                                         coordinates={optimizedRouteInfo.polylineCoordinates}
//                                         strokeWidth={4}
//                                         strokeColor="#D9B43B"
//                                         lineCap="round"
//                                         lineJoin="round"
//                                     />
//                                 )}
//                             </MapView>
//                         </View>
//                         {/* --- END MapView Integration --- */}
//
//                         <View style={styles.routeSummary}>
//                             <View style={styles.summaryItem}>
//                                 <Image source={require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png')} style={styles.summaryIcon} />
//                                 <Text style={styles.summaryText}>Distance: <Text style={styles.boldText}>{optimizedRouteInfo.distance} km</Text></Text>
//                             </View>
//                             <View style={styles.summaryItem}>
//                                 <Image source={require('../assets/images/hugeicons_maps-location-02.png')} style={styles.summaryIcon} />
//                                 <Text style={styles.summaryText}>Est. Time: <Text style={styles.boldText}>{optimizedRouteInfo.duration} hours</Text></Text>
//                             </View>
//                         </View>
//
//                         <Text style={styles.routeStepsTitle}>Route Stops:</Text>
//                         {optimizedRouteInfo.places.length > 0 ? (
//                             optimizedRouteInfo.places.map((place, index) => (
//                                 <View key={place.id} style={styles.routeStep}>
//                                     <Text style={styles.routeStepNumber}>{index + 1}.</Text>
//                                     <Text style={styles.routeStepName}>{place.name}</Text>
//                                 </View>
//                             ))
//                         ) : (
//                             <Text style={styles.noPlacesInRoute}>No places found for this route. Ensure place IDs and coordinates are correct.</Text>
//                         )}
//                     </ScrollView>
//                 )}
//             </View>
//         </SafeAreaView>
//     );
// };
//
// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#1C1C1C',
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#1C1C1C',
//         paddingHorizontal: 16,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 15,
//     },
//     headerIcon: {
//         width: 24,
//         height: 24,
//         tintColor: '#FFFFFF',
//     },
//     headerTitle: {
//         color: '#FFFFFF',
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginLeft: 15,
//     },
//     sectionTitle: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 20,
//         marginBottom: 15,
//     },
//     featuredRoutesList: {
//         paddingVertical: 10,
//         paddingHorizontal: 5,
//     },
//     featuredRouteCard: {
//         backgroundColor: '#2A2A2A',
//         borderRadius: 15,
//         width: 280,
//         marginRight: 15,
//         overflow: 'hidden',
//         borderWidth: 2,
//         borderColor: 'transparent',
//         position: 'relative',
//     },
//     selectedFeaturedRouteCard: {
//         borderColor: '#D9B43B',
//     },
//     featuredRouteImage: {
//         width: '100%',
//         height: 120,
//         borderTopLeftRadius: 15,
//         borderTopRightRadius: 15,
//         resizeMode: 'cover',
//     },
//     featuredRouteTextContent: {
//         padding: 10,
//     },
//     featuredRouteName: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     featuredRouteDescription: {
//         color: '#D4D4D4',
//         fontSize: 13,
//         lineHeight: 18,
//         marginBottom: 8,
//     },
//     featuredRouteStats: {
//         color: '#D4D4D4',
//         fontSize: 14,
//         fontWeight: 'normal',
//     },
//     placeSelectFlatList: {
//         paddingBottom: 10,
//     },
//     placeSelectItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#2A2A2A',
//         borderRadius: 10,
//         padding: 10,
//         marginBottom: 10,
//         borderWidth: 2,
//         borderColor: 'transparent',
//     },
//     selectedPlaceItem: {
//         borderColor: '#D9B43B',
//     },
//     placeSelectImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 8,
//         marginRight: 10,
//     },
//     placeSelectTextContainer: {
//         flex: 1,
//     },
//     placeSelectName: {
//         color: '#FFFFFF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     placeSelectDescription: {
//         color: '#D4D4D4',
//         fontSize: 13,
//     },
//     checkIconContainer: {
//         marginLeft: 'auto',
//         padding: 5,
//         position: 'absolute',
//         top: 10,
//         right: 10,
//         backgroundColor: 'rgba(28, 28, 28, 0.7)',
//         borderRadius: 15,
//     },
//     checkIcon: {
//         width: 20,
//         height: 20,
//         tintColor: '#D9B43B',
//     },
//     generateRouteButton: {
//         backgroundColor: '#D9B43B',
//         borderRadius: 10,
//         paddingVertical: 15,
//         alignItems: 'center',
//         marginTop: 20,
//         marginBottom: 20,
//     },
//     generateRouteButtonText: {
//         color: '#1C1C1C',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     routeInfoContainer: {
//         backgroundColor: '#2A2A2A',
//         borderRadius: 15,
//         padding: 15,
//         marginBottom: 20,
//     },
//     routeInfoTitle: {
//         color: '#FFFFFF',
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     routeDescriptionText: {
//         color: '#D4D4D4',
//         fontSize: 14,
//         lineHeight: 20,
//         marginBottom: 15,
//     },
//     // --- Map Styles ---
//     mapContainer: {
//         width: '100%',
//         height: 250, // Increased height for better visibility
//         borderRadius: 10,
//         overflow: 'hidden', // Ensures map corners are rounded
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: '#D9B43B',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject, // Map fills its container
//     },
//     // --- End Map Styles ---
//     routeSummary: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginBottom: 15,
//     },
//     summaryItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     summaryIcon: {
//         width: 20,
//         height: 20,
//         tintColor: '#D9B43B',
//         marginRight: 8,
//     },
//     summaryText: {
//         color: '#D4D4D4',
//         fontSize: 15,
//     },
//     routeStepsTitle: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     routeStep: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     routeStepNumber: {
//         color: '#D9B43B',
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginRight: 8,
//     },
//     routeStepName: {
//         color: '#FFFFFF',
//         fontSize: 16,
//     },
//     noPlacesInRoute: {
//         color: '#D4D4D4',
//         fontSize: 14,
//         fontStyle: 'italic',
//         textAlign: 'center',
//         paddingVertical: 10,
//     },
//     boldText: {
//         fontWeight: 'bold',
//     },
// });
//
// export default RoutePlannerScreen;

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import MapView, { Marker, Polyline } from 'react-native-maps';

const RoutePlannerScreen = ({ navigation }) => {
    const savedPlaces = useSelector(state => state.cards.cards);

    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [optimizedRouteInfo, setOptimizedRouteInfo] = useState(null);
    const [selectedFeaturedRoute, setSelectedFeaturedRoute] = useState(null);

    const featuredRoutes = [
        {
            id: 'fr1',
            name: 'Canadian Rockies Explorer',
            description: 'Discover the majestic beauty of the Canadian Rockies. This route takes you through stunning national parks, pristine lakes, and offers breathtaking mountain views. Ideal for nature lovers and photographers.',
            placeIds: ['place1', 'place2', 'place3'], // Ensure these match actual place IDs with coordinates
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '350',
            duration: '7.5',
            // Example polyline for a featured route (in a real app, from API)
            polyline: [
                { latitude: 51.15, longitude: -115.58 }, // Banff
                { latitude: 51.42, longitude: -116.18 }, // Lake Louise
                { latitude: 52.13, longitude: -117.22 }, // Jasper (simulated path)
            ]
        },
        {
            id: 'fr2',
            name: 'Historic Quebec City Charm',
            description: 'Immerse yourself in the European charm of Quebec City. Explore historic sites, cobbled streets, and vibrant cultural landmarks. Perfect for history buffs and those seeking a romantic getaway.',
            placeIds: ['place4', 'place5', 'place6'],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '15',
            duration: '2.0',
            polyline: [
                { latitude: 46.81, longitude: -71.22 }, // Chateau Frontenac
                { latitude: 46.80, longitude: -71.20 }, // Old Port
                { latitude: 46.79, longitude: -71.21 }, // Plains of Abraham (simulated path)
            ]
        },
        {
            id: 'fr3',
            name: 'Pacific Coast Adventure',
            description: 'Experience the rugged beauty of Canada\'s Pacific coastline. From vibrant cities to serene islands, this route offers stunning ocean vistas and unique wildlife encounters.',
            placeIds: ['place7', 'place8', 'place9'],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '200',
            duration: '4.0',
            polyline: [
                { latitude: 49.28, longitude: -123.12 }, // Vancouver
                { latitude: 48.42, longitude: -123.36 }, // Victoria
                { latitude: 49.30, longitude: -125.90 }, // Tofino (simulated path)
            ]
        },
        {
            id: 'fr4',
            name: 'Maritimes Lighthouse Trail',
            description: 'Journey through the picturesque Maritimes, visiting iconic lighthouses, charming fishing villages, and enjoying fresh seafood. A coastal dream come true.',
            placeIds: ['place1', 'place5', 'place7'], // Reusing IDs for example
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '280',
            duration: '6.0',
            polyline: [
                { latitude: 44.64, longitude: -63.57 }, // Halifax
                { latitude: 44.50, longitude: -64.38 }, // Peggy's Cove
                { latitude: 45.95, longitude: -66.65 }, // Fredericton (simulated path)
            ]
        },
        {
            id: 'fr5',
            name: 'Urban Canada Highlights',
            description: 'A whirlwind tour of Canada\'s most bustling cities. Experience vibrant arts scenes, diverse culinary delights, and iconic urban landmarks.',
            placeIds: ['place2', 'place4', 'place8'],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '75',
            duration: '3.0',
            polyline: [
                { latitude: 43.65, longitude: -79.38 }, // Toronto
                { latitude: 45.50, longitude: -73.57 }, // Montreal
                { latitude: 45.42, longitude: -75.69 }, // Ottawa (simulated path)
            ]
        },
        {
            id: 'fr6',
            name: 'Wilderness & Wildlife Discovery',
            description: 'Delve deep into Canada\'s untouched wilderness. This route offers opportunities for wildlife spotting, serene hikes, and true escape into nature.',
            placeIds: ['place3', 'place6', 'place9'],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '400',
            duration: '9.0',
            polyline: [
                { latitude: 46.00, longitude: -78.33 }, // Algonquin Park
                { latitude: 53.91, longitude: -122.75 }, // Prince George (simulated path)
                { latitude: 60.71, longitude: -135.05 }, // Whitehorse (simulated path)
            ]
        },
        {
            id: 'fr7',
            name: 'Great Lakes Scenic Drive',
            description: 'Explore the stunning shores of the Great Lakes, featuring charming towns, beautiful beaches, and impressive natural formations.',
            placeIds: ['place1', 'place4', 'place7'],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '250',
            duration: '5.5',
            polyline: [
                { latitude: 43.25, longitude: -79.87 }, // Hamilton
                { latitude: 42.31, longitude: -83.03 }, // Windsor
                { latitude: 45.85, longitude: -84.34 }, // Sault Ste. Marie (simulated path)
            ]
        },
        {
            id: 'fr8',
            name: 'Northern Lights Quest',
            description: 'Venture north to chase the mesmerizing Aurora Borealis and experience unique northern culture and landscapes.',
            placeIds: ['place2', 'place5', 'place8'],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '600',
            duration: '12.0',
            polyline: [
                { latitude: 62.45, longitude: -114.37 }, // Yellowknife
                { latitude: 64.84, longitude: -135.00 }, // Dawson City (simulated path)
                { latitude: 70.00, longitude: -120.00 }, // Arctic coast (simulated path)
            ]
        },
        {
            id: 'fr9',
            name: 'Wine Country Escape',
            description: 'Indulge in a relaxing tour of Canada\'s renowned wine regions, sampling exquisite local wines and enjoying scenic vineyards.',
            placeIds: ['place3', 'place6', 'place9'],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '100',
            duration: '2.5',
            polyline: [
                { latitude: 43.15, longitude: -79.08 }, // Niagara-on-the-Lake
                { latitude: 49.88, longitude: -119.49 }, // Kelowna
                { latitude: 44.00, longitude: -81.00 }, // Prince Edward County (simulated path)
            ]
        },
        {
            id: 'fr10',
            name: 'Ski & Snowboard Paradise',
            description: 'Hit the slopes at Canada\'s world-class ski resorts, offering thrilling runs and cozy après-ski atmospheres.',
            placeIds: ['place1', 'place8', 'place5'],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '180',
            duration: '3.0',
            polyline: [
                { latitude: 50.11, longitude: -122.95 },
                { latitude: 51.42, longitude: -116.18 }, // Lake Louise (from Rockies)
                { latitude: 47.19, longitude: -71.18 }, // Mont Sainte-Anne (simulated path)
            ]
        },
    ];
    const togglePlaceSelection = (place) => {
        setSelectedFeaturedRoute(null);
        setSelectedPlaces(prevSelected =>
            prevSelected.some(p => p.id === place.id)
                ? prevSelected.filter(p => p.id !== place.id)
                : [...prevSelected, place]
        );
    };

    const handleGenerateRoute = () => {
        if (selectedPlaces.length < 2 && !selectedFeaturedRoute) {
            Alert.alert('Selection Required', 'Please select at least two places or choose a featured route to generate a route.');
            return;
        }

        let routePlaces = [];
        let totalDistanceKm, totalDurationHours;
        let routePolyline = [];

        if (selectedFeaturedRoute) {
            routePlaces = savedPlaces.filter(place => selectedFeaturedRoute.placeIds.includes(place.id));
            routePlaces.sort((a, b) => {
                const indexA = selectedFeaturedRoute.placeIds.indexOf(a.id);
                const indexB = selectedFeaturedRoute.placeIds.indexOf(b.id);
                return indexA - indexB;
            });
            totalDistanceKm = selectedFeaturedRoute.distance;
            totalDurationHours = selectedFeaturedRoute.duration;
            routePolyline = selectedFeaturedRoute.polyline;
        } else {
            const simulatedOptimizedPlaces = [...selectedPlaces].sort((a, b) => a.name.localeCompare(b.name));
            routePlaces = simulatedOptimizedPlaces;
            totalDistanceKm = (Math.random() * 100 + 50).toFixed(1);
            totalDurationHours = (Math.random() * 5 + 1).toFixed(1);
            routePolyline = routePlaces.map(place => place.coordinates).filter(Boolean);
            if (routePolyline.length < 2) routePolyline = [];
        }

        setOptimizedRouteInfo({
            name: selectedFeaturedRoute ? selectedFeaturedRoute.name : 'Custom Route',
            description: selectedFeaturedRoute ? selectedFeaturedRoute.description : 'A route based on your selected places.',
            places: routePlaces,
            distance: totalDistanceKm,
            duration: totalDurationHours,
            polylineCoordinates: routePolyline,
        });
    };

    const handleSelectFeaturedRoute = (route) => {
        setSelectedFeaturedRoute(route);
        setSelectedPlaces([]);
        setOptimizedRouteInfo(null);
    };

    const getMapInitialRegion = () => {
        let coordsToFit = [];
        if (optimizedRouteInfo && optimizedRouteInfo.places.length > 0) {
            coordsToFit = optimizedRouteInfo.places.map(p => p.coordinates).filter(Boolean);
        } else if (selectedPlaces.length > 0) {
            coordsToFit = selectedPlaces.map(p => p.coordinates).filter(Boolean);
        } else if (savedPlaces.length > 0) {
            return {
                latitude: savedPlaces[0]?.coordinates?.latitude || 56.1304,
                longitude: savedPlaces[0]?.coordinates?.longitude || -106.3468,
                latitudeDelta: 30,
                longitudeDelta: 30,
            };
        } else {
            return {
                latitude: 56.1304,
                longitude: -106.3468,
                latitudeDelta: 30,
                longitudeDelta: 30,
            };
        }

        if (coordsToFit.length === 0) {
            return { latitude: 56.1304, longitude: -106.3468, latitudeDelta: 30, longitudeDelta: 30 };
        }

        const minLat = Math.min(...coordsToFit.map(c => c.latitude));
        const maxLat = Math.max(...coordsToFit.map(c => c.latitude));
        const minLon = Math.min(...coordsToFit.map(c => c.longitude));
        const maxLon = Math.max(...coordsToFit.map(c => c.longitude));

        const centerLat = (minLat + maxLat) / 2;
        const centerLon = (minLon + maxLon) / 2;

        const latDelta = (maxLat - minLat) * 1.5;
        const lonDelta = (maxLon - minLon) * 1.5;

        return {
            latitude: centerLat,
            longitude: centerLon,
            latitudeDelta: latDelta > 0 ? latDelta : 0.5,
            longitudeDelta: lonDelta > 0 ? lonDelta : 0.5,
        };
    };

    const renderPlaceItem = ({ item: place }) => {
        const isSelected = selectedPlaces.some(p => p.id === place.id);
        return (
            <TouchableOpacity
                style={[styles.placeSelectItem, isSelected && styles.selectedPlaceItem]}
                onPress={() => togglePlaceSelection(place)}
            >
                <Image source={place.image} style={styles.placeSelectImage} />
                <View style={styles.placeSelectTextContainer}>
                    <Text style={styles.placeSelectName}>{place.name}</Text>
                    <Text style={styles.placeSelectDescription}>{place.description.split(',')[0].trim()}</Text>
                </View>
                {isSelected && (
                    <View style={styles.checkIconContainer}>
                        <Image
                            source={require('../assets/images/4fe12aeb2b6b2f9afb1e0ee49ec743042849f816.png')}
                            style={styles.checkIcon}
                        />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const renderFeaturedRouteItem = ({ item: route }) => {
        const isSelected = selectedFeaturedRoute && selectedFeaturedRoute.id === route.id;
        return (
            <TouchableOpacity
                style={[styles.featuredRouteCard, isSelected && styles.selectedFeaturedRouteCard]}
                onPress={() => handleSelectFeaturedRoute(route)}
            >
                <Image source={route.image} style={styles.featuredRouteImage} />
                <View style={styles.featuredRouteTextContent}>
                    <Text style={styles.featuredRouteName}>{route.name}</Text>
                    <Text style={styles.featuredRouteDescription} numberOfLines={2}>{route.description}</Text>
                    <Text style={styles.featuredRouteStats}>
                        <Text style={styles.boldText}>{route.distance} km</Text> | <Text style={styles.boldText}>{route.duration} hrs</Text>
                    </Text>
                </View>
                {isSelected && (
                    <View style={styles.checkIconContainer}>
                        <Image
                            source={require('../assets/images/4fe12aeb2b6b2f9afb1e0ee49ec743042849f816.png')}
                            style={styles.checkIcon}
                        />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../assets/images/clarity_arrow-line.png')}
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Plan Your Ride</Text>
                </View>

                <Text style={styles.sectionTitle}>Discover Featured Adventures:</Text>
                <FlatList
                    data={featuredRoutes}
                    renderItem={renderFeaturedRouteItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.featuredRoutesList}
                />

                <Text style={styles.sectionTitle}>Or Select Your Own Places:</Text>
                <FlatList
                    data={savedPlaces}
                    renderItem={renderPlaceItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    contentContainerStyle={styles.placeSelectFlatList}
                />

                <TouchableOpacity
                    style={styles.generateRouteButton}
                    onPress={handleGenerateRoute}
                    disabled={selectedPlaces.length < 2 && !selectedFeaturedRoute}
                >
                    <Text style={styles.generateRouteButtonText}>
                        {selectedFeaturedRoute ? `Explore "${selectedFeaturedRoute.name}"` : 'Generate Custom Route'}
                    </Text>
                </TouchableOpacity>

                {optimizedRouteInfo && (
                    <View style={styles.routeInfoContainer}>
                        <Text style={styles.routeInfoTitle}>{optimizedRouteInfo.name}</Text>
                        <Text style={styles.routeDescriptionText}>{optimizedRouteInfo.description}</Text>

                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                initialRegion={getMapInitialRegion()}
                            >
                                {optimizedRouteInfo.places.map((place, index) => (
                                    place.coordinates && (
                                        <Marker
                                            key={place.id}
                                            coordinate={place.coordinates}
                                            title={`${index + 1}. ${place.name}`}
                                            description={place.description.split(',')[0].trim()}
                                            pinColor="#D9B43B"
                                        />
                                    )
                                ))}
                                {optimizedRouteInfo.polylineCoordinates && optimizedRouteInfo.polylineCoordinates.length > 1 && (
                                    <Polyline
                                        coordinates={optimizedRouteInfo.polylineCoordinates}
                                        strokeWidth={4}
                                        strokeColor="#D9B43B"
                                        lineCap="round"
                                        lineJoin="round"
                                    />
                                )}
                            </MapView>
                        </View>

                        <View style={styles.routeSummary}>
                            <View style={styles.summaryItem}>
                                <Image source={require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png')} style={styles.summaryIcon} />
                                <Text style={styles.summaryText}>Distance: <Text style={styles.boldText}>{optimizedRouteInfo.distance} km</Text></Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Image source={require('../assets/images/hugeicons_maps-location-02.png')} style={styles.summaryIcon} />
                                <Text style={styles.summaryText}>Est. Time: <Text style={styles.boldText}>{optimizedRouteInfo.duration} hours</Text></Text>
                            </View>
                        </View>

                        <Text style={styles.routeStepsTitle}>Route Stops:</Text>
                        {optimizedRouteInfo.places.length > 0 ? (
                            optimizedRouteInfo.places.map((place, index) => (
                                <View key={place.id} style={styles.routeStep}>
                                    <Text style={styles.routeStepNumber}>{index + 1}.</Text>
                                    <Text style={styles.routeStepName}>{place.name}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noPlacesInRoute}>No places found for this route. Ensure place IDs and coordinates are correct.</Text>
                        )}
                    </View>
                )}
            </ScrollView>
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
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
    },
    featuredRoutesList: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    featuredRouteCard: {
        backgroundColor: '#2A2A2A',
        borderRadius: 15,
        width: 280,
        marginRight: 15,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent',
        position: 'relative',
    },
    selectedFeaturedRouteCard: {
        borderColor: '#D9B43B',
    },
    featuredRouteImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: 'cover',
    },
    featuredRouteTextContent: {
        padding: 10,
    },
    featuredRouteName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    featuredRouteDescription: {
        color: '#D4D4D4',
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 8,
    },
    featuredRouteStats: {
        color: '#D4D4D4',
        fontSize: 14,
        fontWeight: 'normal',
    },
    placeSelectFlatList: {
        paddingBottom: 10,
    },
    placeSelectItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedPlaceItem: {
        borderColor: '#D9B43B',
    },
    placeSelectImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    placeSelectTextContainer: {
        flex: 1,
    },
    placeSelectName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    placeSelectDescription: {
        color: '#D4D4D4',
        fontSize: 13,
    },
    checkIconContainer: {
        marginLeft: 'auto',
        padding: 5,
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(28, 28, 28, 0.7)',
        borderRadius: 15,
    },
    checkIcon: {
        width: 20,
        height: 20,
        tintColor: '#D9B43B',
    },
    generateRouteButton: {
        backgroundColor: '#D9B43B',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    generateRouteButtonText: {
        color: '#1C1C1C',
        fontSize: 18,
        fontWeight: 'bold',
    },
    routeInfoContainer: {
        backgroundColor: '#2A2A2A',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    routeInfoTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    routeDescriptionText: {
        color: '#D4D4D4',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 15,
    },
    // --- Map Styles ---
    mapContainer: {
        width: '100%',
        height: 250, // Increased height for better visibility
        borderRadius: 10,
        overflow: 'hidden', // Ensures map corners are rounded
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#D9B43B',
    },
    map: {
        ...StyleSheet.absoluteFillObject, // Map fills its container
    },
    // --- End Map Styles ---
    routeSummary: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryIcon: {
        width: 20,
        height: 20,
        tintColor: '#D9B43B',
        marginRight: 8,
    },
    summaryText: {
        color: '#D4D4D4',
        fontSize: 15,
    },
    routeStepsTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    routeStep: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    routeStepNumber: {
        color: '#D9B43B',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    routeStepName: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    noPlacesInRoute: {
        color: '#D4D4D4',
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default RoutePlannerScreen;
