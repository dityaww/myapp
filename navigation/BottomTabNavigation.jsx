import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Menu, Profile, UploadContent } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

import MenuNavigation from "./MenuNavigation";
import SearchNavigation from "./SearchNavigation";
import ProfileNavigation from "./ProfileNavigation";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "static",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 30,
    height: 80,
    borderTopWidth: 1,
    // backgroundColor: "#047857",
  },
};

const isLogin = () => {
  return true;
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
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
                  focused ? COLORS.bottomTabActive : COLORS.bottomTabPasive
                }
              />
            );
          },
          headerShown: false,
          headerTitle: "Feeds",
        }}
      />

      {/* <Tab.Screen
        name="Menu"
        component={MenuNavigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={24}
                color={
                  focused ? COLORS.bottomTabActive : COLORS.bottomTabPasive
                }
              />
            );
          },
          // headerShown: true,
        }}
      /> */}

      {/* <Tab.Screen
        name="UploadContent"
        component={UploadContent}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "add-circle" : "add-circle-outline"}
                size={30}
                color={
                  focused ? COLORS.bottomTabActive : COLORS.bottomTabPasive
                }
              />
            );
          },
          headerShown: true,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={30}
                color={
                  focused ? COLORS.bottomTabActive : COLORS.bottomTabPasive
                }
              />
            );
          },
        }}
      /> */}

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
                  focused ? COLORS.bottomTabActive : COLORS.bottomTabPasive
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
