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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./Test";
import CardItem from "./components/CardItem";
import data from '../info.js'
import { Icon } from "@rneui/themed";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";

const Tab = createBottomTabNavigator();
export default function MainScreen({ navigation, myObject, type }) {
    const uemail = myObject.key1
    const [refreshing, setRefreshing] = useState(false);
    const [Udetails, setUdetails] = useState([]);
    console.log("In Main Screen");
    console.log(type);
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
    // const get = async () => {
    //     console.log("connecting to backend");

    //     const requestBody = {
    //         email: uemail,
    //     };
    //     await axios.post(`https://${config.RenderIP}/api/getDetails`, requestBody)
    //         .then(response => {
    //             // Handle the response data
    //             console.log(response.data);
    //             setUdetails(JSON.stringify(response.data))

    //         })
    //         .catch(error => {
    //             // Handle the error
    //             console.error(error);
    //         });

    // }
    // try {
    //     // get()

    // } catch (error) {

    // }
    function Parser(field) {
        console.log(JSON.parse(Udetails)[field]);
        return `${JSON.parse(Udetails)[field]}`
    }
    return (
        <>
            <TopNav navigation={navigation}></TopNav>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
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

                    <Text style={styles.heading}>Your Submissions</Text>
                    {/* Submission Module */}
                    {(JSON.parse(uemail)['title']).length > 0 ? <>

                        <View style={styles.subCard}>
                            <Text style={styles.Tbold}>Paper ID - {JSON.parse(uemail)['paperID']}</Text>
                            <View style={styles.yon1}>
                                <Text style={styles.Tbold}>Document Included ? -
                                </Text>
                                {(JSON.parse(uemail)['document']).length > 5 ? <>
                                    <View style={[styles.yon, { backgroundColor: 'green' }]} >
                                        <Icon name={'done'} size={20} color="#ffffff" />
                                        <Text style={{ color: 'white' }} >
                                            yes</Text>
                                    </View>
                                </> : <>
                                    <View style={[styles.yon, { backgroundColor: 'red' }]} >
                                        <Icon name={'highlight-off'} size={20} color="#ffffff" />
                                        <Text style={{ color: 'white' }} >
                                            No</Text>
                                    </View></>}
                            </View>
                            <View style={styles.yon1}>
                                <Text style={styles.Tbold}>Group Submission ? -
                                </Text>
                                {(JSON.parse(uemail)['groupSubmission']) ? <>
                                    <View style={[styles.yon, { backgroundColor: 'green' }]} >
                                        <Icon name={'done'} size={20} color="#ffffff" />
                                        <Text style={{ color: 'white' }} >
                                            yes</Text>
                                    </View>
                                </> : <>
                                    <View style={[styles.yon, { backgroundColor: 'red' }]} >
                                        <Icon name={'highlight-off'} size={20} color="#ffffff" />
                                        <Text style={{ color: 'white' }} >
                                            No</Text>
                                    </View></>}
                            </View>
                            <View style={styles.yon1}>
                                <Text style={styles.Tbold}>Status -
                                </Text>
                                {(JSON.parse(uemail)['approved']) == "Pending" ? <>
                                    <View style={[styles.yon, { backgroundColor: '#ffa200' }]} >
                                        <Icon name={'error'} size={20} color="#ffffff" />

                                        <Text style={{ color: 'white' }} >
                                            Pending</Text>
                                    </View>
                                </> : <>
                                    {(JSON.parse(uemail)['approved']) == "Approved" ? <>
                                        <View style={[styles.yon, { backgroundColor: 'green' }]} >
                                            <Icon name={'check-circle'} size={20} color="#ffffff" />

                                            <Text style={{ color: 'white' }} >
                                                Approved</Text>
                                        </View>
                                    </> : <>
                                        <View style={[styles.yon, { backgroundColor: 'red' }]} >
                                            <Icon name={'cancel'} size={20} color="#ffffff" />

                                            <Text style={{ color: 'white' }} >
                                                Rejected</Text>
                                        </View></>}</>}
                            </View>
                            <Button color={'green'} size="sm" onPress={() => { navigation.navigate('AuthSubmission', { uemail: uemail }) }} title={'More'}></Button>
                        </View>
                    </> :
                        <View style={[styles.subCard, { minHeight: 100 }]}>
                            <Text style={[styles.Tbold, { textAlign: 'center' }]}> No Submissions</Text>
                        </View>
                    }

                </View>
            </ScrollView>
            <BottomNav navigation={navigation} uData={uemail} ></BottomNav>
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
    Tbold: {
        fontWeight: 'bold'
    },
    subCard: {
        padding: 10,
        margin: 15,
        overflow: 'hidden',
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 28,
        flexDirection: 'column',
        justifyContent: 'space-around',
        minHeight: 250,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginVertical: 10,
        paddingHorizontal: 10,

    },


    yon1: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center'
    },
    yon: {

        flexDirection: 'row',
        backgroundColor: 'red',
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginLeft: 5,
        overflow: 'hidden',
        borderRadius: 20,
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center'

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