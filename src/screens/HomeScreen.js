import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
                <Text style={styles.sectionTitle}>Recomended Place</Text>
                <TouchableOpacity style={styles.openAll} onPress={()=>{navigation.navigate('RecomendedPlaceScreen')}}>
                    <Text style={styles.openAllText}>Open all</Text>
                </TouchableOpacity>
            </View>

           {/*</View>*/}


            <View style={styles.card}>
                <Image
                    source={require('../assets/images/RIDEwithCARLEDON/image14.png')}
                    style={styles.cardImage}
                />
                <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>Banff National Park</Text>
                    <Text style={styles.cardDescription}>
                        Banff National Park, founded in 1885, is the jewel of the Canadian Rockies, combining majestic peaks covered in ice caps...
                    </Text>
                </View>
                <View style={styles.cardButtons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image
                            source={require('../assets/images/iconoir_bookmark.png')}

                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image
                            source={require('../assets/images/tabler_share-3.png')}

                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.launchButton}>
                        <Image
                            source={require('../assets/images/lsicon_open-new-outline.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Map */}
            <Text style={styles.sectionTitle}>Map</Text>

            <View style={{padding: 20, backgroundColor: '#202020', borderRadius: 16,}}>
                <Image
                    source={require('../assets/images/3c8862bf2e3bc75a5d1e56b839301d9b97477654.png')}
                    style={styles.mapImage}
                    resizeMode="cover"
                />
            </View>
        <View style={{marginBottom: 100}}/>
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

export default HomeScreen;
