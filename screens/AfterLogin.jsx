import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import axios from "axios";
import Navbar from './components/Navbar';
import MainScreen from './MainScreen';
import RewMainScreen from './RewMainScreen';
import CustomeDrawer from './components/CustomeDrawer';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
import config from '../config.json'
import SubScreen from './AuthScreens/SubScreen';
import AssignPaper from './RewScreens/AssignPaper';
export default function AfterLogin({ props, route }) {
    const { uemail, type, rewData } = route.params;
    const myObject = { key1: uemail, key2: 'value2' };
    console.log("In AFter Login Screen");
    // console.log(rewData);
    console.log(type);
    var iniScreen = ""
    if (type == 'reviewer') {
        iniScreen = 'RewMainScreen'
    }
    else {
        iniScreen = 'MainScreen'
    }
    return (
        <>
            <Drawer.Navigator drawerContent={(props) => <CustomeDrawer cage={myObject.key1} rewData={rewData} type={type} Udetails={uemail} {...props}></CustomeDrawer>} initialRouteName={iniScreen}>
                <Drawer.Screen name="MainScreen" options={{ title: '', headerShown: false }}>
                    {(props) => <MainScreen {...props} type={type} myObject={myObject} />}
                </Drawer.Screen>
                <Drawer.Screen name="RewMainScreen" options={{ title: '', headerShown: false }}>
                    {(props) => <RewMainScreen {...props} type={type} rewData={rewData} myObject={myObject} />}
                </Drawer.Screen>
                <Drawer.Screen name="Profile" options={{ title: 'Profile', headerShown: false }}  >
                    {(props) => <Profile {...props} rewData={rewData} Udata={uemail} type={type} />}
                </Drawer.Screen>
                <Drawer.Screen name="AuthSubmission" options={{ headerShown: false }} >
                    {(props) => <SubScreen {...props} Udata={uemail} />}
                </Drawer.Screen>
                <Drawer.Screen name="RewSubmission" options={{ headerShown: false }} >
                    {(props) => <AssignPaper {...props} myObject={myObject} rewData={rewData} type={type} />}
                </Drawer.Screen>
            </Drawer.Navigator>

        </>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


