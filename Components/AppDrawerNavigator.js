import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./AppTabNavigator";
import CustomSideBarMenu from './CustomSideBarMenu';
import  SettingScreen from '../Screens/SettingScreen'
import MyDonationScreen from '../Screens/MyDonationScreen'

export const AppDrawerNavigator = createDrawerNavigator({
   Home : {
        screen:AppTabNavigator
    },
    MyDonations : {
        screen: MyDonationScreen
    },
    Settings :{
        screen : SettingScreen
    },
},
    {
        contentComponent : CustomSideBarMenu
    },
    {
        initialRouteName: 'Home'
    }
)
