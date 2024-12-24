import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "../screens/HomeScreen";
import { EventDetailsScreen } from "../screens/EventDetailsScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#4F46E5",
                },
                headerTintColor: "#ffffff",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "HarmonyEvents"
                }}
            />
            <StackNavigator.Screen
                name="EventDetails"
                component={EventDetailsScreen}
                options={{
                    title: "Event Details"
                }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);