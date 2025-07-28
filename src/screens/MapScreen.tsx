import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 10; // Zoom level for the map
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Data for the locations to be displayed on the map
const locations = [
    {
        id: '1',
        name: 'Banff National Park',
        latitude: 51.1784,
        longitude: -115.5708,
        description: 'Established in 1885, Banff National Park is a jewel of the Canadian Rockies, combining majestic peaks covered with ice caps and crystal-clear glacial lakes. Here you can make routes of varying difficulty: from short hiking trails along the shores of lakes to multi-day hikes through alpine passes. In summer, the park roars with waterfalls and is filled with a variety of flora and fauna, including moose, musk oxen and brown bears. In winter, Banff turns into a real ski resort with world-class slopes and modern lifts. Must-see attractions include the Banff Upper Hot Springs, where you can relax after a long hike, and the Sulphur Mountain Gondola, which offers incredible panoramic views of the Bow River Valley. The park was designated a UNESCO World Heritage Site in 1984, a testament to its unique ecosystem and natural value.',
        image: require('../assets/images/RIDEwithCARLEDON/image0.png'),
    },
    {
        id: '2',
        name: 'Moraine Lake',
        latitude: 51.3216,
        longitude: -116.1857,
        description: 'Located in the Valley of the Ten Peaks in Banff National Park, Moraine Lake is a stunning turquoise lake that shimmers against the backdrop of sheer mountain walls. The glacial hue of the water is due to the suspension of finely dispersed mountain silt sediments raised by the melting glacier. A short but scenic trail runs along the lake to a lookout point that offers the best view of the peaks reflected in the water. This is a favorite spot for photographers and lovers of silence - here you can always feel the freshness of the Alpine wind and the tranquility of the mountain valley. Moraine attracts thousands of visitors every year with its beauty, and in the summer you can watch deer coming to drink water and colorful butterflies reaching the shore.',
        image: require('../assets/images/RIDEwithCARLEDON/image8.png'),
    },
    {
        id: '3',
        name: 'Lake Louise',
        latitude: 51.4167,
        longitude: -116.2125,
        description: 'Lake Louise, known for its rich turquoise color, is located in the valley of Banff National Park at the foot of Mount Victoria. This glacial lake is surrounded by dense coniferous forests and steep cliffs, creating the effect of a small lake amphitheater. Along the shore there is a path that leads to the legendary rock formation "Scenery Rock", from where an incredible panorama of the water and the Victoria Glacier in the background opens. In the summer, you can take a canoe on the lake and ride among the rocky islands, feel the peace and grandeur of nature. In the winter, the reservoir turns into an ice carpet, which attracts skaters and photographers with all its silvery shine. On the shore is the legendary Chateau Lake Louise - a luxurious hotel in the style of a Scottish chateau, which complements the atmosphere of elegance and natural beauty.',
        image: require('../assets/images/RIDEwithCARLEDON/image11.png'),
    },
    {
        id: '4',
        name: 'Niagara Falls',
        latitude: 43.0962,
        longitude: -79.0377,
        description: 'Niagara Falls, one of the most powerful in the world, is located on the border of Canada and the USA. The Canadian side, known as Horseshoe Falls, stands out for its semicircular shape and a mass of water curtain more than 670 meters wide. A powerful jet of water creates a loud roar below and a cloud of small spray that rises several dozen meters. Numerous observation decks and walking paths are available for visitors, including the “Journey Behind the Falls” pedestrian tunnel, which allows you to get behind the curtain of water. In the evening, the waterfall is illuminated with bright projections, creating an impressive light show. The surrounding infrastructure includes restaurants with panoramic views and themed attractions, but most importantly - the majesty of nature, which cannot be forgotten after the first visit.',
        image: require('../assets/images/RIDEwithCARLEDON/image12.png'),
    },
    {
        id: '5',
        name: 'CN Tower, Toronto',
        latitude: 43.6426,
        longitude: -79.3871,
        description: 'The CN Tower in Toronto is one of the most famous architectural landmarks in North America, and for decades was the tallest tower in the world. Its height reaches 553 meters, and it is a symbol of a dynamic metropolis on the shores of Lake Ontario. Visitors can climb to the observation deck at a height of 346 meters, from where a panorama of the city, water surface and nearby islands opens. For extreme sports, there is an “EdgeWalk” - a walk outside along the circular support of the tower without railings. In the evening, the tower is illuminated with multi-colored LED lights, creating dynamic visual effects. In addition to the observation decks, the building houses a “360” restaurant, which slowly rotates, allowing guests to enjoy food and incredible views at the same time.',
        image: require('../assets/images/RIDEwithCARLEDON/image14.png'),
    },
    {
        id: '6',
        name: 'Capilano Suspension Bridge, Vancouver',
        latitude: 49.3423,
        longitude: -123.1140,
        description: 'Opened in 1889, the Capilano Suspension Bridge spans the picturesque Capilano River Gorge at an altitude of about 70 meters. The bridge is 137 meters long and attracts thousands of visitors every day, who feel a slight thrill under their feet with every step. In addition to the large bridge, the park has trails in the treetops ("Treetops Adventure") and glass platforms Cliffwalk, connecting the rocks and allowing you to look down into the deep canyon. In the warm season, walks alternate with stories from guides about local flora and fauna, about ancient legends of the region\'s first peoples and modern environmental projects. The atmospheric views, the mix of conifers and stone, and the feeling of being elevated above the ground make this site unique among city attractions.',
        image: require('../assets/images/RIDEwithCARLEDON/image15.png'),    },
    {
        id: '7',
        name: 'Old Quebec (Vieux-Québec)',
        latitude: 46.8139,
        longitude: -71.2080,
        description: 'Old Quebec is the historic center of Quebec City, surrounded by fortification walls from the 17th to 19th centuries, making it the only city in North America with such preserved fortifications. Here, cobblestone streets and bright French-style houses alternate with elegant bistros and shops selling traditional souvenirs. The Château Frontenac palace-hotel with its green spires is the calling card of this area, and its terrace overlooks the St. Lawrence River. Street musicians, art exhibitions and the annual winter carnival create a unique atmosphere of a living open-air museum. The entire Old Town is a UNESCO World Heritage Site for its architectural beauty and extraordinary historical significance.',
        image: require('../assets/images/RIDEwithCARLEDON/image16.png'),    },
    {
        id: '8',
        name: 'Jasper National Park',
        latitude: 52.8734,
        longitude: -118.0808,
        description: 'Jasper National Park, the largest in the Canadian Rockies, spans over ten thousand square kilometers and is home to towering peaks, glaciers, and deep canyons. Among the most famous sites are the Columbia Icefield and the famous Icefields Parkway, a road connecting Jasper and Banff and considered one of the most beautiful in the world. The park is home to grizzly bears, musk oxen, and golden eagles, and frequent wildlife encounters make every walk a real safari. In summer, tourists can kayak on Maligne Lake, raft on the Athabasca River, and stargaze in one of Canada’s most remote settlements. In winter, the area turns into a white carpet for cross-country skiing and snow tubing, and the town of Jasper maintains an atmosphere of warmth and hospitality even in severe frosts.',
        image: require('../assets/images/RIDEwithCARLEDON/image17.png'),    },
    {
        id: '9',
        name: 'Gros Morne National Park',
        latitude: 49.8326,
        longitude: -57.7439,
        description: 'Gros Morne National Park on the island of Newfoundland and Labrador is an amazing open-air geological museum, where ancient marine sediments and mantle rocks protrude above the surface of the earth. The Waune Mountains there are carefully studied by geologists, as they demonstrate a model of coastal folding and processes that occurred hundreds of millions of years ago. The park is declared a UNESCO World Heritage Site for its unique combination of mountain landscapes and biological diversity. The routes pass through blooming swamp tundras, dark pine and fir forests, and along steep ocean shores. Here you can kayak among the fjords, see whales from the cliffs, or walk along ancient fishing trails where former farmhouses still stand.',
        image: require('../assets/images/RIDEwithCARLEDON/image18.png'),    },
    {
        id: '10',
        name: 'Tofino (Pacific Rim Park)',
        latitude: 49.1520,
        longitude: -125.9097,
        description: 'Located on the west coast of Vancouver Island, Tofino is the gateway to Pacific Rim National Park, one of Canada’s most scenic and wild regions. The coast is stormy and gloomy, often shrouded in sea mist, and the waves of the Pacific Ocean attract surfers from all over the world. At the same time, this environment is an ideal place to watch whales and fur seals, who like to bask on the rocky ledges near the coast. The park is home to ancient forests of long-lived cyclopean trees, which are accessed by narrow wooden decking paths that do not damage the roots. Visitors can try out indigenous cultural programs and learn about traditional crafts and legends of these places. Sunset in Tofino is a riot of color as the horizon is lit up with pink and gold.',
        image: require('../assets/images/RIDEwithCARLEDON/image19.png'),    },
    {
        id: '11',
        name: 'Peggy’s Cove',
        latitude: 44.4930,
        longitude: -63.9155,
        description: 'Peggy’s Cove is a picturesque fishing village on the island of Nova Scotia, famous for its lighthouse of the same name, which was erected in 1868. The glossy black granite boulders surrounding the lighthouse create a natural amphitheater for storms, as waves rise several meters high and crash against the rocks. It is here that you can feel the full force of the Atlantic Ocean up close, standing on the edge of the boulder ridge. Seagulls and white gulls circle overhead, and the wind brings the smell of salt water and seaweed. The place is popular with photographers and artists for its dramatic beach landscapes and changing atmosphere. Despite the influx of tourists, the authenticity of the village is preserved: small souvenir shops are open, fishing boats are moored near the shore, and locals tell legends about ghost ships that appear in the fog.',
        image: require('../assets/images/RIDEwithCARLEDON/image20.png'),    },
    {
        id: '12',
        name: 'Prince Edward Island (Green Gables)',
        latitude: 46.3212,
        longitude: -62.7074,
        description: 'On the east coast of Canada is Prince Edward Island, famous for Lucy Maud Montgomery\'s novel "Anne of Green Gables". The Green Gables house, preserved as a museum, returns visitors to the atmosphere of the late 19th century: a red roof, a white porch and a well-kept garden of roses and mallows. Around are gentle green fields, where during summer walks you can see windmills, small villages and beaches with pink sand. The island is famous for its red gley soil, rich in iron, and fertile orchards that feed local farms and artisanal cheese factories. It hosts annual literary and music festivals dedicated to Montgomery’s work, and bike trails wind through picturesque oak groves and lavender fields.',
        image: require('../assets/images/RIDEwithCARLEDON/image21.png'),    },
    {
        id: '13',
        name: 'Waterton Lakes National Park',
        latitude: 49.0831,
        longitude: -113.9150,
        description: 'Waterton Lakes National Park is located on the border with the US Glacier National Park and forms a unique international biosphere reserve. Alpine meadows alternate with pine forests, and clear lakes reflect the mighty Columbia and Catabonki mountains, creating the impression of a mirror world. Hiking trails lead to the famous Red Rock Canyon observation deck, where shades of red shale contrast with the green of coniferous forests. In the warm season, the lakes are used for paddleboarding and kayaking, and in the spring you can watch the migration of deer and brown bears. The park also attracts photography enthusiasts - the morning mist over the lakes creates surreal scenes that are not to be confused with anything.',
        image: require('../assets/images/RIDEwithCARLEDON/image22.png'),    },
    {
        id: '14',
        name: 'Hopewell Rocks (Bay of Fundy)',
        latitude: 45.6069,
        longitude: -64.7133,
        description: 'Towering above the waters of the Bay of Fundy, the Hopewell Rocks are impressive sea pillars of sandstone, formed by constant tides, the difference between which can reach up to 16 meters - some of the highest in the world. At low tide, visitors will walk along the bottom of the bay among the "landing caps" - the outlines of the rocks, resembling openwork columns. When the tide returns, the place becomes a theatrical stage of noise and splash, and the majestic pillars seem to be defenders of the bay. Guided tours will tell about the geological processes and traditions of the First Nations, and special observation platforms allow you to observe the phenomenon from a safe distance. Inspired photographers come here at dawn and in winter to capture perfect shots with the changing light and blue sea.',
        image: require('../assets/images/RIDEwithCARLEDON/imagedf3.png'),    },
];

const MapScreen = ({navigation}) => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Initial region centered on Canada to show all markers
    const initialRegion = {
        latitude: 54.0,
        longitude: -100.0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    };

    const handleMarkerPress = (place) => {
        setSelectedPlace(place);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedPlace(null);
    };

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header */}
          {/*<View style={styles.header}>*/}
          {/*  <TouchableOpacity onPress={() => navigation.goBack()}>*/}
          {/*    /!* Иконка стрелки назад *!/*/}
          {/*    <Image*/}
          {/*      source={require('../assets/images/clarity_arrow-line.png')} // Замените на актуальный путь*/}
          {/*      style={styles.sideIcon}*/}
          {/*    />*/}
          {/*  </TouchableOpacity>*/}
          {/*  <Text style={styles.headerTitle}>Map</Text>*/}
          {/*</View>*/}

          {/* Map View */}
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            // provider={PROVIDER_GOOGLE}
            customMapStyle={[
              {
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#212121',
                  },
                ],
              },
              {
                elementType: 'labels.icon',
                stylers: [
                  {
                    visibility: 'off',
                  },
                ],
              },
              {
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#757575',
                  },
                ],
              },
              {
                elementType: 'labels.text.stroke',
                stylers: [
                  {
                    color: '#212121',
                  },
                ],
              },
              {
                featureType: 'administrative',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#757575',
                  },
                ],
              },
              {
                featureType: 'administrative.country',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#9e9e9e',
                  },
                ],
              },
              {
                featureType: 'administrative.land_parcel',
                stylers: [
                  {
                    visibility: 'off',
                  },
                ],
              },
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#bdbdbd',
                  },
                ],
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#757575',
                  },
                ],
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#181818',
                  },
                ],
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#616161',
                  },
                ],
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.stroke',
                stylers: [
                  {
                    color: '#1b1b1b',
                  },
                ],
              },
              {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [
                  {
                    color: '#2c2c2c',
                  },
                ],
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#8a8a8a',
                  },
                ],
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#373737',
                  },
                ],
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [
                  {
                    color: '#3c3c3c',
                  },
                ],
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [
                  {
                    color: '#2c2c2c',
                  },
                ],
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#616161',
                  },
                ],
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#616161',
                  },
                ],
              },
              {
                featureType: 'transit',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#757575',
                  },
                ],
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#000000',
                  },
                ],
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#3d3d3d',
                  },
                ],
              },
            ]} // Dark map style
          >
            {locations.map(place => (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                onPress={() => handleMarkerPress(place)}
              >
                <Image
                  source={require('../assets/images/4fe12aeb2b6b2f9afb1e0ee49ec743042849f816.png')} // Замените на актуальный путь к вашей золотой иконке метки
                  style={styles.markerIcon}
                  resizeMode="contain"
                />
              </Marker>
            ))}
          </MapView>
        </View>

        {/* Modal for Place Details */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedPlace && (
                <ScrollView
                  contentContainerStyle={styles.modalScrollViewContent}
                >
                  {/* Header in Modal */}
                  <View style={styles.modalHeader}>
                    <TouchableOpacity
                      onPress={closeModal}
                      style={styles.modalCloseButton}
                    >
                      <Text style={styles.modalCloseButtonText}>X Close</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Main Image in Modal */}
                  <Image
                    source={selectedPlace.image }
                    style={styles.modalMainImage}
                    onError={e =>
                      console.log('Image loading error:', e.nativeEvent.error)
                    }
                  />

                  {/* Side Icons (optional, can be removed if not needed in modal) */}
                  <View style={styles.modalSideIconsContainer}>
                    {/*<TouchableOpacity style={styles.modalSideIconButton}>*/}
                    {/*    <Image*/}
                    {/*        source={require('./assets/icons/bookmark_white.png')}*/}
                    {/*        style={styles.modalSideIcon}*/}
                    {/*    />*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={styles.modalSideIconButton}>*/}
                    {/*    <Image*/}
                    {/*        source={require('./assets/icons/share_white.png')}*/}
                    {/*        style={styles.modalSideIcon}*/}
                    {/*    />*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={[styles.modalSideIconButton, styles.modalCircularButton]}>*/}
                    {/*    <Image*/}
                    {/*        source={require('./assets/icons/directions.png')}*/}
                    {/*        style={styles.modalSideIconGold}*/}
                    {/*    />*/}
                    {/*    <Text style={styles.modalCircularButtonText}>D</Text>*/}
                    {/*</TouchableOpacity>*/}
                  </View>

                  {/* Place Name in Modal */}
                  <Text style={styles.modalPlaceName}>
                    {selectedPlace.name}
                  </Text>

                  {/* Coordinates Box in Modal */}
                  <View style={styles.modalCoordinatesBox}>
                    <Image
                      source={require('../assets/images/hugeicons_maps-location-02.png')}
                      style={styles.modalCoordinatesIcon}
                    />
                    <Text style={styles.modalCoordinatesText}>
                      Coordinates: {selectedPlace.latitude},{' '}
                      {selectedPlace.longitude}
                    </Text>
                  </View>

                  {/* Description in Modal */}
                  <Text style={styles.modalDescription}>
                    <Text style={styles.boldText}>{selectedPlace.name}</Text>,{' '}
                    {selectedPlace.description}
                  </Text>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 16,
        backgroundColor: '#1C1C1C', // Темный фон для хедера
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
    map: {
        flex: 1,
        width: width,
        height: height,
    },
    markerIcon: {
        width: 30, // Размер иконки метки
        height: 30,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end', // Модальное окно появляется снизу
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Затемненный фон
    },
    modalContent: {
        backgroundColor: '#1C1C1C', // Темный фон модального окна
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: height * 0.8, // Максимальная высота модального окна
        width: '100%',
    },
    modalScrollViewContent: {
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Кнопка закрытия справа
        marginBottom: 10,
    },
    modalCloseButton: {
        backgroundColor: '#3A3A3A',
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignSelf: 'flex-end',
    },
    modalCloseButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalMainImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    modalSideIconsContainer: {
        position: 'absolute',
        top: 80, // Отступ сверху от модального окна
        right: 20, // Отступ справа от модального окна
        zIndex: 1,
    },
    modalSideIconButton: {
        backgroundColor: '#3A3A3A',
        borderRadius: 10,
        padding: 8,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalSideIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF',
    },
    modalCircularButton: {
        backgroundColor: '#D9B43B',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalSideIconGold: {
        width: 24,
        height: 24,
        tintColor: '#000000',
        position: 'absolute',
    },
    modalCircularButtonText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    modalPlaceName: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalCoordinatesBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3A3A3A',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    modalCoordinatesIcon: {
        width: 18,
        height: 18,
        tintColor: '#FFFFFF',
        marginRight: 8,
    },
    modalCoordinatesText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    modalDescription: {
        color: '#D4D4D4',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default MapScreen;
