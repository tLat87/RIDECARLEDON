import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store";
import TabNavigator from "./src/navigation/TabNavigator.tsx";
import RecommendedPlaceScreen from "./src/screens/RecommendedPlaceScreen.tsx";
import RecomendedPlaceScreen from "./src/screens/RecomendedPlaceScreen.tsx";
import WelcomeScreen from "./src/screens/WelcomeScreen.tsx";
import MapWithPlaceScreen from "./src/screens/MapWithPlaceScreen.tsx";
import MainScreen from "./src/screens/MainScreen.tsx";

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MainTab" component={TabNavigator} options={{ headerShown: false }} />
                        <Stack.Screen name="RecommendedPlaceScreen" component={RecommendedPlaceScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="RecomendedPlaceScreen" component={RecomendedPlaceScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MapWithPlaceScreen" component={MapWithPlaceScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MainScreenqw" component={MainScreen} options={{ headerShown: false }} />

                    </Stack.Navigator>
                </NavigationContainer>
          </PersistGate>
         </Provider>
    );
}
