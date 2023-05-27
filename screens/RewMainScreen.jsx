import Navbar from "./components/Navbar";
import Svg, { Path } from 'react-native-svg';
import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { Linking, StyleSheet, StatusBar, Text, Dimensions, TextInput, TouchableOpacity, View, ScrollView, RefreshControl, ToastAndroid, Animated } from 'react-native';
import { Image, Input } from 'react-native-elements';
import { Button } from '@rneui/themed';
import { Screen, screensEnabled } from 'react-native-screens';
import { ScreenHeight } from '@rneui/base';
import { Formik } from 'formik';
// images
import config from '../config.json'
import Foot from './components/Footer';
import LoginPage from "./Test";
import CardItem from "./components/CardItem";
import data from '../info.js'
import { Icon } from "@rneui/themed";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";

export default function RewMainScreen({ navigation, myObject, rewData, type }) {
    const uemail = myObject.key1
    const [refreshing, setRefreshing] = useState(false);
    const [Udetails, setUdetails] = useState([]);
    console.log("In reviewer Main Screen");
    console.log(type);
    const projectData = JSON.parse(uemail).project
    const fetchData = () => {
        // Simulate an asynchronous data fetch
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);
    function convertUnixTimestampToDate(unixTimestamp) {
        const milliseconds = unixTimestamp * 1000;
        const date = new Date(milliseconds);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateString = `${year}/${month}/${day}`;
        return dateString;
    }
    function Parser(field) {
        console.log(JSON.parse(Udetails)[field]);
        return `${JSON.parse(Udetails)[field]}`
    }
    return (
        <>
            <TopNav navigation={navigation}></TopNav>
            <ScrollView
                // contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.container}>
                    <Text style={styles.heading}>Important Dates</Text>
                    <ScrollView
                        horizontal={true}>
                        {data.map((item, index) => (
                            <CardItem key={index} item={item}></CardItem>
                        ))}

                    </ScrollView>
                    {/* Submission Module */}

                    <Text style={styles.heading}>Assigned Papers</Text>
                    <View>
                        {projectData.map((i, index) => (
                            <TouchableOpacity  key={index} onPress={()=>{
                                navigation.navigate('RewSubmission',{pointer:index})}}> 
                                <View style={styles.subCard}>
                                    {/* <Icon name={i[1]} size={25} color="#089b2d" /> */}
                                    <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}><Text>Paper ID</Text> - {i.paperID}</Text>
                                    <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>Title - {i.title}</Text>
                                    {/* <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>{convertUnixTimestampToDate(i.updatedAt)}</Text> */}
                                    <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>Status - {i.approved}</Text>

                                </View>
                            </TouchableOpacity>

                        ))}
                    </View>

                </View>


            </ScrollView>
            <BottomNav navigation={navigation} type={type}></BottomNav>
        </>

    )
}
const styles = StyleSheet.create({

    heading: {
        color: 'green',
        fontSize: 20,
        paddingLeft: 10,
        fontWeight: 'bold'
    },

    subCard: {
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        overflow: 'hidden',
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 28,
        flexDirection: 'column',
        justifyContent: 'space-around',
        minHeight: 100,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginVertical: 10,
        paddingHorizontal: 10,

    },



    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    title2: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
    },

    link: {
        color: 'blue',
        textAlign: 'center',
    },
    err: {
        height: 40,
        borderBottomWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,

        borderColor: 'red',
        borderBottomWidth: 1,
        padding: 10,
        color: 'red'
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});