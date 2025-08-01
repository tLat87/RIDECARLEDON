// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     ScrollView,
//     TouchableOpacity,
//     FlatList,
//     Alert
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector } from 'react-redux';
// import MapView, { Marker, Polyline } from 'react-native-maps';
//
// const RoutePlannerScreen = ({ navigation }) => {
//     const savedPlaces = useSelector(state => state.cards.cards);
//
//     const [selectedPlaces, setSelectedPlaces] = useState([]);
//     const [optimizedRouteInfo, setOptimizedRouteInfo] = useState(null);
//     const [selectedFeaturedRoute, setSelectedFeaturedRoute] = useState(null);
//
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
//                 { latitude: 50.11, longitude: -122.95 },
//                 { latitude: 51.42, longitude: -116.18 }, // Lake Louise (from Rockies)
//                 { latitude: 47.19, longitude: -71.18 }, // Mont Sainte-Anne (simulated path)
//             ]
//         },
//     ];
//
//     useEffect(() => {
//         if (featuredRoutes.length > 0 && !selectedFeaturedRoute) {
//             const defaultRoute = featuredRoutes[0];
//             setSelectedFeaturedRoute(defaultRoute);
//             generateRouteFromFeatured(defaultRoute);
//         }
//     }, []);
//
//     const togglePlaceSelection = (place) => {
//         setSelectedFeaturedRoute(null);
//         setOptimizedRouteInfo(null);
//         setSelectedPlaces(prevSelected =>
//             prevSelected.some(p => p.id === place.id)
//                 ? prevSelected.filter(p => p.id !== place.id)
//                 : [...prevSelected, place]
//         );
//     };
//
//     const generateRouteFromFeatured = (route) => {
//         const routePlaces = savedPlaces.filter(place => route.placeIds.includes(place.id));
//         routePlaces.sort((a, b) => {
//             const indexA = route.placeIds.indexOf(a.id);
//             const indexB = route.placeIds.indexOf(b.id);
//             return indexA - indexB;
//         });
//
//         setOptimizedRouteInfo({
//             name: route.name,
//             description: route.description,
//             places: routePlaces,
//             distance: route.distance,
//             duration: route.duration,
//             polylineCoordinates: route.polyline,
//         });
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
//         let routePolyline = [];
//
//         if (selectedFeaturedRoute) {
//             generateRouteFromFeatured(selectedFeaturedRoute);
//             return;
//         } else {
//             const simulatedOptimizedPlaces = [...selectedPlaces].sort((a, b) => a.name.localeCompare(b.name));
//             routePlaces = simulatedOptimizedPlaces;
//             totalDistanceKm = (Math.random() * 100 + 50).toFixed(1);
//             totalDurationHours = (Math.random() * 5 + 1).toFixed(1);
//             routePolyline = routePlaces.map(place => place.coordinates).filter(Boolean);
//             if (routePolyline.length < 2) routePolyline = [];
//         }
//
//         setOptimizedRouteInfo({
//             name: 'Custom Route',
//             description: 'A route based on your selected places.',
//             places: routePlaces,
//             distance: totalDistanceKm,
//             duration: totalDurationHours,
//             polylineCoordinates: routePolyline,
//         });
//     };
//
//     const handleSelectFeaturedRoute = (route) => {
//         setSelectedFeaturedRoute(route);
//         setSelectedPlaces([]);
//         generateRouteFromFeatured(route);
//     };
//
//     const getMapInitialRegion = () => {
//         let coordsToFit = [];
//
//         if (optimizedRouteInfo && optimizedRouteInfo.places.length > 0) {
//             coordsToFit = optimizedRouteInfo.places.map(p => p.coordinates).filter(Boolean);
//         } else if (selectedPlaces.length > 0) {
//             coordsToFit = selectedPlaces.map(p => p.coordinates).filter(Boolean);
//         } else if (savedPlaces.length > 0) {
//             return {
//                 latitude: savedPlaces[0]?.coordinates?.latitude || 56.1304,
//                 longitude: savedPlaces[0]?.coordinates?.longitude || -106.3468,
//                 latitudeDelta: 30,
//                 longitudeDelta: 30,
//             };
//         } else {
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
//         const minLat = Math.min(...coordsToFit.map(c => c.latitude));
//         const maxLat = Math.max(...coordsToFit.map(c => c.latitude));
//         const minLon = Math.min(...coordsToFit.map(c => c.longitude));
//         const maxLon = Math.max(...coordsToFit.map(c => c.longitude));
//
//         const centerLat = (minLat + maxLat) / 2;
//         const centerLon = (minLon + maxLon) / 2;
//
//         const latDelta = (maxLat - minLat) * 1.5;
//         const lonDelta = (maxLon - minLon) * 1.5;
//
//         return {
//             latitude: centerLat,
//             longitude: centerLon,
//             latitudeDelta: latDelta > 0 ? latDelta : 0.5,
//             longitudeDelta: lonDelta > 0 ? lonDelta : 0.5,
//         };
//     };
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
//                             source={require('../assets/images/4fe12aeb2b6b2f9afb1e0ee49ec743042849f816.png')}
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
//                             source={require('../assets/images/4fe12aeb2b6b2f9afb1e0ee49ec743042849f816.png')}
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
//             <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//                 {/*<View style={styles.header}>*/}
//                 {/*    <TouchableOpacity onPress={() => navigation.goBack()}>*/}
//                 {/*        <Image*/}
//                 {/*            source={require('../assets/images/clarity_arrow-line.png')}*/}
//                 {/*            style={styles.headerIcon}*/}
//                 {/*        />*/}
//                 {/*    </TouchableOpacity>*/}
//                 {/*    <Text style={styles.headerTitle}>Plan Your Ride</Text>*/}
//                 {/*</View>*/}
//
//                 <Text style={styles.sectionTitle}>Discover Featured Adventures:</Text>
//                 <FlatList
//                     data={featuredRoutes}
//                     renderItem={renderFeaturedRouteItem}
//                     keyExtractor={item => item.id}
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={styles.featuredRoutesList}
//                 />
//
//                 <Text style={styles.sectionTitle}>Or Select Your Own Places:</Text>
//                 <FlatList
//                     data={savedPlaces}
//                     renderItem={renderPlaceItem}
//                     keyExtractor={item => item.id}
//                     scrollEnabled={false}
//                     contentContainerStyle={styles.placeSelectFlatList}
//                 />
//
//                 {!selectedFeaturedRoute && (
//                     <TouchableOpacity
//                         style={styles.generateRouteButton}
//                         onPress={handleGenerateRoute}
//                         disabled={selectedPlaces.length < 2}
//                     >
//                         <Text style={styles.generateRouteButtonText}>Generate Custom Route</Text>
//                     </TouchableOpacity>
//                 )}
//
//                 {optimizedRouteInfo && (
//                     <View style={styles.routeInfoContainer}>
//                         <Text style={styles.routeInfoTitle}>{optimizedRouteInfo.name}</Text>
//                         <Text style={styles.routeDescriptionText}>{optimizedRouteInfo.description}</Text>
//
//                         <View style={styles.mapContainer}>
//                             <MapView
//                                 style={styles.map}
//                                 initialRegion={getMapInitialRegion()}
//                             >
//                                 {optimizedRouteInfo.places.map((place, index) => (
//                                     place.coordinates && (
//                                         <Marker
//                                             key={place.id}
//                                             coordinate={place.coordinates}
//                                             title={`${index + 1}. ${place.name}`}
//                                             description={place.description.split(',')[0].trim()}
//                                             pinColor="#D9B43B"
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
//                     </View>
//                 )}
//             </ScrollView>
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
//
// export default RoutePlannerScreen;

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Dimensions // Used for fitting map to markers
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import MapView, { Marker, Polyline } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA_DEFAULT = 30; // Default wide view for global routes
const LONGITUDE_DELTA_DEFAULT = LATITUDE_DELTA_DEFAULT * ASPECT_RATIO;


const RoutePlannerScreen = ({ navigation }) => {
    // In this new approach, savedPlaces from Redux are not directly used for featured routes.
    // They could be used for 'My Saved Places' section if you add it back later.
    const savedPlaces = useSelector(state => state.cards.cards); // Keeping it for potential future use

    const featuredRoutes = [
        {
            id: 'fr1',
            name: 'Canadian Rockies Explorer',
            description: 'Discover the majestic beauty of the Canadian Rockies. This route takes you through stunning national parks, pristine lakes, and offers breathtaking mountain views. Ideal for nature lovers and photographers.',
            // For a real app, these placeIds should map to actual place objects with coords.
            // For this example, we'll directly use coordinates in the polyline for simplicity.
            placeMarkers: [ // Directly define markers for the route
                { id: 'p1_fr1', name: 'Banff National Park', description: 'Majestic peaks', latitude: 51.15, longitude: -115.58 },
                { id: 'p2_fr1', name: 'Lake Louise', description: 'Emerald waters', latitude: 51.42, longitude: -116.18 },
                { id: 'p3_fr1', name: 'Jasper National Park', description: 'Vast wilderness', latitude: 52.13, longitude: -117.22 },
            ],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '350',
            duration: '7.5',
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
            placeMarkers: [
                { id: 'p1_fr2', name: 'Château Frontenac', description: 'Iconic hotel', latitude: 46.81, longitude: -71.22 },
                { id: 'p2_fr2', name: 'Old Port of Quebec', description: 'Riverside charm', latitude: 46.80, longitude: -71.20 },
                { id: 'p3_fr2', name: 'Plains of Abraham', description: 'Historic park', latitude: 46.79, longitude: -71.21 },
            ],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '15',
            duration: '2.0',
            polyline: [
                { latitude: 46.81, longitude: -71.22 },
                { latitude: 46.80, longitude: -71.20 },
                { latitude: 46.79, longitude: -71.21 },
            ]
        },
        {
            id: 'fr3',
            name: 'Pacific Coast Adventure',
            description: 'Experience the rugged beauty of Canada\'s Pacific coastline. From vibrant cities to serene islands, this route offers stunning ocean vistas and unique wildlife encounters.',
            placeMarkers: [
                { id: 'p1_fr3', name: 'Vancouver', description: 'Cosmopolitan city', latitude: 49.28, longitude: -123.12 },
                { id: 'p2_fr3', name: 'Victoria', description: 'Island capital', latitude: 48.42, longitude: -123.36 },
                { id: 'p3_fr3', name: 'Tofino', description: 'Surfing haven', latitude: 49.30, longitude: -125.90 },
            ],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '200',
            duration: '4.0',
            polyline: [
                { latitude: 49.28, longitude: -123.12 },
                { latitude: 48.42, longitude: -123.36 },
                { latitude: 49.30, longitude: -125.90 },
            ]
        },
        {
            id: 'fr4',
            name: 'Maritimes Lighthouse Trail',
            description: 'Journey through the picturesque Maritimes, visiting iconic lighthouses, charming fishing villages, and enjoying fresh seafood. A coastal dream come true.',
            placeMarkers: [
                { id: 'p1_fr4', name: 'Halifax', description: 'Historic port city', latitude: 44.64, longitude: -63.57 },
                { id: 'p2_fr4', name: 'Peggy\'s Cove', description: 'Famous lighthouse', latitude: 44.50, longitude: -64.38 },
                { id: 'p3_fr4', name: 'Fredericton', description: 'Capital of NB', latitude: 45.95, longitude: -66.65 },
            ],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '280',
            duration: '6.0',
            polyline: [
                { latitude: 44.64, longitude: -63.57 },
                { latitude: 44.50, longitude: -64.38 },
                { latitude: 45.95, longitude: -66.65 },
            ]
        },
        {
            id: 'fr5',
            name: 'Urban Canada Highlights',
            description: 'A whirlwind tour of Canada\'s most bustling cities. Experience vibrant arts scenes, diverse culinary delights, and iconic urban landmarks.',
            placeMarkers: [
                { id: 'p1_fr5', name: 'Toronto', description: 'Largest city', latitude: 43.65, longitude: -79.38 },
                { id: 'p2_fr5', name: 'Montreal', description: 'French flair', latitude: 45.50, longitude: -73.57 },
                { id: 'p3_fr5', name: 'Ottawa', description: 'Nation\'s capital', latitude: 45.42, longitude: -75.69 },
            ],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '75',
            duration: '3.0',
            polyline: [
                { latitude: 43.65, longitude: -79.38 },
                { latitude: 45.50, longitude: -73.57 },
                { latitude: 45.42, longitude: -75.69 },
            ]
        },
        {
            id: 'fr6',
            name: 'Wilderness & Wildlife Discovery',
            description: 'Delve deep into Canada\'s untouched wilderness. This route offers opportunities for wildlife spotting, serene hikes, and true escape into nature.',
            placeMarkers: [
                { id: 'p1_fr6', name: 'Algonquin Park', description: 'Ontario wilderness', latitude: 46.00, longitude: -78.33 },
                { id: 'p2_fr6', name: 'Prince George', description: 'BC gateway to north', latitude: 53.91, longitude: -122.75 },
                { id: 'p3_fr6', name: 'Whitehorse', description: 'Yukon capital', latitude: 60.71, longitude: -135.05 },
            ],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '400',
            duration: '9.0',
            polyline: [
                { latitude: 46.00, longitude: -78.33 },
                { latitude: 53.91, longitude: -122.75 },
                { latitude: 60.71, longitude: -135.05 },
            ]
        },
        {
            id: 'fr7',
            name: 'Great Lakes Scenic Drive',
            description: 'Explore the stunning shores of the Great Lakes, featuring charming towns, beautiful beaches, and impressive natural formations.',
            placeMarkers: [
                { id: 'p1_fr7', name: 'Hamilton', description: 'Steel City', latitude: 43.25, longitude: -79.87 },
                { id: 'p2_fr7', name: 'Windsor', description: 'Automotive capital', latitude: 42.31, longitude: -83.03 },
                { id: 'p3_fr7', name: 'Sault Ste. Marie', description: 'Waterfront city', latitude: 45.85, longitude: -84.34 },
            ],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '250',
            duration: '5.5',
            polyline: [
                { latitude: 43.25, longitude: -79.87 },
                { latitude: 42.31, longitude: -83.03 },
                { latitude: 45.85, longitude: -84.34 },
            ]
        },
        {
            id: 'fr8',
            name: 'Northern Lights Quest',
            description: 'Venture north to chase the mesmerizing Aurora Borealis and experience unique northern culture and landscapes.',
            placeMarkers: [
                { id: 'p1_fr8', name: 'Yellowknife', description: 'NWT capital', latitude: 62.45, longitude: -114.37 },
                { id: 'p2_fr8', name: 'Dawson City', description: 'Gold Rush history', latitude: 64.84, longitude: -139.43 }, // Corrected longitude
                { id: 'p3_fr8', name: 'Inuvik', description: 'Arctic gateway', latitude: 68.35, longitude: -134.83 }, // Changed to Inuvik for more realistic path
            ],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '600',
            duration: '12.0',
            polyline: [
                { latitude: 62.45, longitude: -114.37 },
                { latitude: 64.84, longitude: -139.43 },
                { latitude: 68.35, longitude: -134.83 },
            ]
        },
        {
            id: 'fr9',
            name: 'Wine Country Escape',
            description: 'Indulge in a relaxing tour of Canada\'s renowned wine regions, sampling exquisite local wines and enjoying scenic vineyards.',
            placeMarkers: [
                { id: 'p1_fr9', name: 'Niagara-on-the-Lake', description: 'Ontario wine region', latitude: 43.15, longitude: -79.08 },
                { id: 'p2_fr9', name: 'Kelowna', description: 'Okanagan Valley wine', latitude: 49.88, longitude: -119.49 },
                { id: 'p3_fr9', name: 'Prince Edward County', description: 'Ontario\'s newest wine region', latitude: 43.98, longitude: -77.40 }, // Corrected longitude
            ],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '100',
            duration: '2.5',
            polyline: [
                { latitude: 43.15, longitude: -79.08 },
                { latitude: 49.88, longitude: -119.49 },
                { latitude: 43.98, longitude: -77.40 },
            ]
        },
        {
            id: 'fr10',
            name: 'Ski & Snowboard Paradise',
            description: 'Hit the slopes at Canada\'s world-class ski resorts, offering thrilling runs and cozy après-ski atmospheres.',
            placeMarkers: [
                { id: 'p1_fr10', name: 'Whistler Blackcomb', description: 'Premier ski resort', latitude: 50.11, longitude: -122.95 },
                { id: 'p2_fr10', name: 'Lake Louise Ski Resort', description: 'Spectacular Rockies views', latitude: 51.42, longitude: -116.18 },
                { id: 'p3_fr10', name: 'Mont-Tremblant', description: 'Quebec\'s ski gem', latitude: 46.12, longitude: -74.55 }, // Corrected latitude/longitude for Tremblant
            ],
            image: require('../assets/images/31a18bdf3cd8a15b406e6a2243ed53f5b224ab64.png'),
            distance: '180',
            duration: '3.0',
            polyline: [
                { latitude: 50.11, longitude: -122.95 },
                { latitude: 51.42, longitude: -116.18 },
                { latitude: 46.12, longitude: -74.55 },
            ]
        },
    ];

    // Function to calculate initial map region to fit all markers in a route
    const getRouteMapRegion = (route) => {
        const coordsToFit = route.polyline || []; // Use polyline for region if available
        if (coordsToFit.length === 0 && route.placeMarkers && route.placeMarkers.length > 0) {
            coordsToFit = route.placeMarkers.map(p => ({ latitude: p.latitude, longitude: p.longitude }));
        }

        if (coordsToFit.length === 0) {
            return {
                latitude: 56.1304, // Default center of Canada
                longitude: -106.3468,
                latitudeDelta: LATITUDE_DELTA_DEFAULT,
                longitudeDelta: LONGITUDE_DELTA_DEFAULT,
            };
        }

        const minLat = Math.min(...coordsToFit.map(c => c.latitude));
        const maxLat = Math.max(...coordsToFit.map(c => c.latitude));
        const minLon = Math.min(...coordsToFit.map(c => c.longitude));
        const maxLon = Math.max(...coordsToFit.map(c => c.longitude));

        const centerLat = (minLat + maxLat) / 2;
        const centerLon = (minLon + maxLon) / 2;

        const latDelta = (maxLat - minLat) * 1.5; // Add some padding
        const lonDelta = (maxLon - minLon) * 1.5; // Add some padding

        return {
            latitude: centerLat,
            longitude: centerLon,
            latitudeDelta: latDelta > 0 ? latDelta : LATITUDE_DELTA_DEFAULT,
            longitudeDelta: lonDelta > 0 ? lonDelta : LONGITUDE_DELTA_DEFAULT,
        };
    };

    const renderFeaturedRouteCard = ({ item: route }) => {
        // Prepare place objects with full coordinate structure
        const routePlaces = route.placeMarkers || [];

        return (
            <View style={styles.routeInfoContainer}>
                <Text style={styles.routeInfoTitle}>{route.name}</Text>
                <Text style={styles.routeDescriptionText}>{route.description}</Text>

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        // Use a key to ensure map re-renders if route changes (though not interactive here)
                        key={route.id}
                        initialRegion={getRouteMapRegion(route)}
                        // Set mapType based on preference, e.g., 'standard', 'satellite', 'hybrid'
                        mapType="standard"
                    >
                        {routePlaces.map((place, index) => (
                            <Marker
                                key={place.id}
                                coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                                title={`${index + 1}. ${place.name}`}
                                description={place.description}
                                pinColor="#D9B43B"
                            />
                        ))}
                        {route.polyline && route.polyline.length > 1 && (
                            <Polyline
                                coordinates={route.polyline}
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
                        <Text style={styles.summaryText}>Distance: <Text style={styles.boldText}>{route.distance} km</Text></Text>
                    </View>
                    <View style={styles.summaryItem}>
                        <Image source={require('../assets/images/hugeicons_maps-location-02.png')} style={styles.summaryIcon} />
                        <Text style={styles.summaryText}>Est. Time: <Text style={styles.boldText}>{route.duration} hours</Text></Text>
                    </View>
                </View>

                <Text style={styles.routeStepsTitle}>Route Stops:</Text>
                {routePlaces.length > 0 ? (
                    routePlaces.map((place, index) => (
                        <View key={place.id} style={styles.routeStep}>
                            <Text style={styles.routeStepNumber}>{index + 1}.</Text>
                            <Text style={styles.routeStepName}>{place.name}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noPlacesInRoute}>No defined stops for this route.</Text>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.screenTitle}>Discover Curated Routes</Text>

                <FlatList
                    data={featuredRoutes}
                    renderItem={renderFeaturedRouteCard}
                    keyExtractor={item => item.id}
                    scrollEnabled={false} // Disable FlatList's own scrolling since it's in a ScrollView
                    contentContainerStyle={styles.featuredRoutesVerticalList}
                />

                <View style={{ height: 50 }} /> {/* Spacer at the bottom */}
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
    screenTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: '#fff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    sectionTitle: { // Kept for consistency, but now main title
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
    },
    featuredRoutesVerticalList: {
        // No specific styling needed here as items themselves are styled
    },
    routeInfoContainer: {
        backgroundColor: '#2A2A2A',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20, // Spacing between route cards
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
    mapContainer: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#D9B43B',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
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
