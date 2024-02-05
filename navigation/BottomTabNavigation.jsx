import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, About, Profile, UploadContent } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import { BlurView } from '@react-native-community/blur';

import NotifikasiNavigation from "./NotifikasiNavigation";
import ProfileNavigation from "./ProfileNavigation";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "static",
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    left: 0,
    elevation: 30,
    height: 80,
    backgroundColor: "#f5f5f5",
  },
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator 
      screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={
                    focused ? '#0F766E' : COLORS.bottomTabPasive
                  }
                />
              );
            },
            headerShown: false,
            headerTitle: "Feeds",
          }}
        />

        <Tab.Screen
          name="NotifikasiStack"
          component={NotifikasiNavigation}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name={focused ? "notifications" : "notifications-outline"}
                  size={24}
                  color={
                    focused ? '#0F766E' : COLORS.bottomTabPasive
                  }
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name={focused ? "information-circle" : "information-circle-outline"}
                  size={30}
                  color={
                    focused ? '#0F766E' : COLORS.bottomTabPasive
                  }
                />
              );
            },
            headerShown: true,
            headerTitle: 'Pusat Bantuan'
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileNavigation}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={24}
                  color={
                    focused ? '#0F766E' : COLORS.bottomTabPasive
                  }
                />
              );
            },
            // headerShown: true,
            headerTitleAlign: "left",
          }}
        />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
