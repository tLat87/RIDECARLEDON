import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Define the data for the places
const placesData = [
    {
        id: 'banff',
        name: 'Banff National Park',
        coordinates: '51.1784, -115.5708',
        description: 'Established in 1885, Banff National Park is a jewel of the Canadian Rockies, combining majestic peaks covered with ice caps and crystal-clear glacial lakes. Here you can make routes of varying difficulty: from short hiking trails along the shores of lakes to multi-day hikes through alpine passes. In summer, the park roars with waterfalls and is filled with a variety of flora and fauna, including moose, musk oxen and brown bears. In winter, Banff turns into a real ski resort with world-class slopes and modern lifts. Must-see attractions include the Banff Upper Hot Springs, where you can relax after a long hike, and the Sulphur Mountain Gondola, which offers incredible panoramic views of the Bow River Valley. The park was designated a UNESCO World Heritage Site in 1984, a testament to its unique ecosystem and natural value.',
        image: require('../assets/images/RIDEwithCARLEDON/image11.png'), // Placeholder image
    },
    {
        id: 'moraine',
        name: 'Moraine Lake',
        coordinates: '51.3216, -116.1857',
        description: 'Located in the Valley of the Ten Peaks in Banff National Park, Moraine Lake is a stunning turquoise lake that shimmers against the backdrop of sheer mountain walls. The glacial hue of the water is due to the suspension of finely dispersed mountain silt sediments raised by the melting glacier. A short but scenic trail runs along the lake to a lookout point that offers the best view of the peaks reflected in the water. This is a favorite spot for photographers and lovers of silence - here you can always feel the freshness of the Alpine wind and the tranquility of the mountain valley. Moraine attracts thousands of visitors every year with its beauty, and in the summer you can watch deer coming to drink water and colorful butterflies reaching the shore.',
        image: require('../assets/images/RIDEwithCARLEDON/image14.png'),
    },
    {
        id: 'niagara',
        name: 'Niagara Falls',
        coordinates: '43.0962, -79.0377',
        description: 'Niagara Falls, one of the most powerful in the world, is located on the border of Canada and the USA. The Canadian side, known as Horseshoe Falls, stands out for its semicircular shape and a mass of water curtain more than 670 meters wide. A powerful jet of water creates a loud roar below and a cloud of small spray that rises several dozen meters. Numerous observation decks and walking paths are available for visitors, including the “Journey Behind the Falls” pedestrian tunnel, which allows you to get behind the curtain of water. In the evening, the waterfall is illuminated with bright projections, creating an impressive light show. The surrounding infrastructure includes restaurants with panoramic views and themed attractions, but most importantly - the majesty of nature, which cannot be forgotten after the first visit.',
        image: require('../assets/images/RIDEwithCARLEDON/image22.png'), // Placeholder image
    },
    {
        id: 'cntower',
        name: 'CN Tower, Toronto',
        coordinates: '43.6426, -79.3871',
        description: 'The CN Tower in Toronto is one of the most famous architectural landmarks in North America, and for decades was the tallest tower in the world. Its height reaches 553 meters, and it is a symbol of a dynamic metropolis on the shores of Lake Ontario. Visitors can climb to the observation deck at a height of 346 meters, from where a panorama of the city, water surface and nearby islands opens. For extreme sports, there is an “EdgeWalk” - a walk outside along the circular support of the tower without railings. In the evening, the tower is illuminated with multi-colored LED lights, creating dynamic visual effects. In addition to the observation decks, the building houses a “360” restaurant, which slowly rotates, allowing guests to enjoy food and incredible views at the same time.',
        image: require('../assets/images/RIDEwithCARLEDON/image21.png'), // Placeholder image
    },
    {
        id: 'capilano',
        name: 'Capilano Suspension Bridge, Vancouver',
        coordinates: '49.3423, -123.1140',
        description: 'Opened in 1889, the Capilano Suspension Bridge spans the picturesque Capilano River Gorge at an altitude of about 70 meters. The bridge is 137 meters long and attracts thousands of visitors every day, who feel a slight thrill under their feet with every step. In addition to the large bridge, the park has trails in the treetops ("Treetops Adventure") and glass platforms Cliffwalk, connecting the rocks and allowing you to look down into the deep canyon. In the warm season, walks alternate with stories from guides about local flora and fauna, about ancient legends of the region\'s first peoples and modern environmental projects. The atmospheric views, the mix of conifers and stone, and the feeling of being elevated above the ground make this site unique among city attractions.',
        image: require('../assets/images/RIDEwithCARLEDON/image20.png'), // Placeholder image
    },
    {
        id: 'oldquebec',
        name: 'Old Quebec (Vieux-Québec)',
        coordinates: '46.8139, -71.2080',
        description: 'Old Quebec is the historic center of Quebec City, surrounded by fortification walls from the 17th to 19th centuries, making it the only city in North America with such preserved fortifications. Here, cobblestone streets and bright French-style houses alternate with elegant bistros and shops selling traditional souvenirs. The Château Frontenac palace-hotel with its green spires is the calling card of this area, and its terrace overlooks the St. Lawrence River. Street musicians, art exhibitions and the annual winter carnival create a unique atmosphere of a living open-air museum. The entire Old Town is a UNESCO World Heritage Site for its architectural beauty and extraordinary historical significance.',
        image: require('../assets/images/RIDEwithCARLEDON/image19.png'), // Placeholder image
    },
    {
        id: 'jasper',
        name: 'Jasper National Park',
        coordinates: '52.8734, -118.0808',
        description: 'Jasper National Park, the largest in the Canadian Rockies, spans over ten thousand square kilometers and is home to towering peaks, glaciers, and deep canyons. Among the most famous sites are the Columbia Icefield and the famous Icefields Parkway, a road connecting Jasper and Banff and considered one of the most beautiful in the world. The park is home to grizzly bears, musk oxen, and golden eagles, and frequent wildlife encounters make every walk a real safari. In summer, tourists can kayak on Maligne Lake, raft on the Athabasca River, and stargaze in one of Canada’s most remote settlements. In winter, the area turns into a white carpet for cross-country skiing and snow tubing, and the town of Jasper maintains an atmosphere of warmth and hospitality even in severe frosts.',
        image: require('../assets/images/RIDEwithCARLEDON/image18.png'), // Placeholder image
    },
    {
        id: 'grosmorne',
        name: 'Gros Morne National Park',
        coordinates: '49.8326, -57.7439',
        description: 'Gros Morne National Park on the island of Newfoundland and Labrador is an amazing open-air geological museum, where ancient marine sediments and mantle rocks protrude above the surface of the earth. The Waune Mountains there are carefully studied by geologists, as they demonstrate a model of coastal folding and processes that occurred hundreds of millions of years ago. The park is declared a UNESCO World Heritage Site for its unique combination of mountain landscapes and biological diversity. The routes pass through blooming swamp tundras, dark pine and fir forests, and along steep ocean shores. Here you can kayak among the fjords, see whales from the cliffs, or walk along ancient fishing trails where former farmhouses still stand.',
        image: require('../assets/images/RIDEwithCARLEDON/imagedf3.png'), // Placeholder image
    },
    {
        id: 'tofino',
        name: 'Tofino (Pacific Rim Park)',
        coordinates: '49.1520, -125.9097',
        description: 'Located on the west coast of Vancouver Island, Tofino is the gateway to Pacific Rim National Park, one of Canada’s most scenic and wild regions. The coast is stormy and gloomy, often shrouded in sea mist, and the waves of the Pacific Ocean attract surfers from all over the world. At the same time, this environment is an ideal place to watch whales and fur seals, who like to bask on the rocky ledges near the coast. The park is home to ancient forests of long-lived cyclopean trees, which are accessed by narrow wooden decking paths that do not damage the roots. Visitors can try out indigenous cultural programs and learn about traditional crafts and legends of these places. Sunset in Tofino is a riot of color as the horizon is lit up with pink and gold.',
        image: require('../assets/images/RIDEwithCARLEDON/image17.png'), // Placeholder image
    },
    {
        id: 'peggyscove',
        name: 'Peggy’s Cove',
        coordinates: '44.4930, -63.9155',
        description: 'Peggy’s Cove is a picturesque fishing village on the island of Nova Scotia, famous for its lighthouse of the same name, which was erected in 1868. The glossy black granite boulders surrounding the lighthouse create a natural amphitheater for storms, as waves rise several meters high and crash against the rocks. It is here that you can feel the full force of the Atlantic Ocean up close, standing on the edge of the boulder ridge. Seagulls and white gulls circle overhead, and the wind brings the smell of salt water and seaweed. The place is popular with photographers and artists for its dramatic beach landscapes and changing atmosphere. Despite the influx of tourists, the authenticity of the village is preserved: small souvenir shops are open, fishing boats are moored near the shore, and locals tell legends about ghost ships that appear in the fog.',
        image: require('../assets/images/RIDEwithCARLEDON/image16.png'), // Placeholder image
    },
    {
        id: 'princeedward',
        name: 'Prince Edward Island (Green Gables)',
        coordinates: '46.3212, -62.7074',
        description: 'On the east coast of Canada is Prince Edward Island, famous for Lucy Maud Montgomery\'s novel "Anne of Green Gables". The Green Gables house, preserved as a museum, returns visitors to the atmosphere of the late 19th century: a red roof, a white porch and a well-kept garden of roses and mallows. Around are gentle green fields, where during summer walks you can see windmills, small villages and beaches with pink sand. The island is famous for its red gley soil, rich in iron, and fertile orchards that feed local farms and artisanal cheese factories. It hosts annual literary and music festivals dedicated to Montgomery’s work, and bike trails wind through picturesque oak groves and lavender fields.',
        image: require('../assets/images/RIDEwithCARLEDON/image15.png'), // Placeholder image
    },
    {
        id: 'waterton',
        name: 'Waterton Lakes National Park',
        coordinates: '49.0831, -113.9150',
        description: 'Waterton Lakes National Park is located on the border with the US Glacier National Park and forms a unique international biosphere reserve. Alpine meadows alternate with pine forests, and clear lakes reflect the mighty Columbia and Catabonki mountains, creating the impression of a mirror world. Hiking trails lead to the famous Red Rock Canyon observation deck, where shades of red shale contrast with the green of coniferous forests. In the warm season, the lakes are used for paddleboarding and kayaking, and in the spring you can watch the migration of deer and brown bears. The park also attracts photography enthusiasts - the morning mist over the lakes creates surreal scenes that are not to be confused with anything.',
        image: require('../assets/images/RIDEwithCARLEDON/image12.png'), // Placeholder image
    },
    {
        id: 'hopewell',
        name: 'Hopewell Rocks (Hopewell Rocks, Bay of Fundy)',
        coordinates: '45.6069, -64.7133',
        description: 'Towering above the waters of the Bay of Fundy, the Hopewell Rocks are impressive sea pillars of sandstone, formed by constant tides, the difference between which can reach up to 16 meters - some of the highest in the world. At low tide, visitors will walk along the bottom of the bay among the "landing caps" - the outlines of the rocks, resembling openwork columns. When the tide returns, the place becomes a theatrical stage of noise and splash, and the majestic pillars seem to be defenders of the bay. Guided tours will tell about the geological processes and traditions of the First Nations, and special observation platforms allow you to observe the phenomenon from a safe distance. Inspired photographers come here at dawn and in winter to capture perfect shots with the changing light and blue sea.',
        image: require('../assets/images/RIDEwithCARLEDON/image0.png'), // Placeholder image
    },
];
//RecommendedPlaceScreen
const RecomendedPlaceScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.sectionTitle}>All Places</Text>
            </View>

            {/* Dynamically render cards based on placesData */}
            {placesData.map((place) => (
                <View key={place.id} style={styles.card}>
                    <Image
                        source={place.image} // Use the image from the place data
                        style={styles.cardImage}
                    />
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>{place.name}</Text>
                        <Text style={styles.cardDescription}>
                            {place.description.length > 150
                                ? place.description.substring(0, 150) + '...'
                                : place.description}
                        </Text>
                    </View>
                    <View style={styles.cardButtons}>
                        {/*<TouchableOpacity style={styles.iconButton}>*/}
                        {/*    <Image*/}
                        {/*        source={require('../assets/images/iconoir_bookmark.png')}*/}
                        {/*    />*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={styles.iconButton}>*/}
                        {/*    <Image*/}
                        {/*        source={require('../assets/images/tabler_share-3.png')}*/}
                        {/*    />*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity
                            style={styles.launchButton}
                            onPress={() => {
                                // You might want to navigate to a detail screen for the specific place
                                navigation.navigate("RecommendedPlaceScreen", { place: place });
                            }}
                        >
                            <Image
                                source={require('../assets/images/lsicon_open-new-outline.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            {/* Map */}
            <View style={{ marginBottom: 100 }} />
        </ScrollView>
    );
};

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
    openAll: {

    },
    openAllText: {
        color: '#d9b43b',
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
    launchText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    mapImage: {
        width: '100%',
        height: 200,
        borderRadius: 16,
    },
});

export default RecomendedPlaceScreen;
