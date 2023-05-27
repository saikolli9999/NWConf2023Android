import React from 'react';
import { Linking, StyleSheet, StatusBar, Text, Dimensions, TextInput, TouchableOpacity, View, ScrollView, RefreshControl, ToastAndroid, Animated } from 'react-native';

import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import CardItem from ".././components/CardItem";

// import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import config from '../../config.json'
import data from '../../info.js'
import { Icon } from '@rneui/themed';

const AssignPaper = ({ navigation, myObject, rewData, type, route }) => {
    const [refreshing, setRefreshing] = useState(false);
    iconsize = 14

    var { pointer } = route.params ?? {};
    pointer = pointer ?? -1;
    const uemail = myObject.key1
    const [Udetails, setUdetails] = useState([]);
    console.log("In reviewer paper Main Screen");
    console.log('pointer is - ' + pointer)

    const projectData = JSON.parse(uemail).project

    function Parser(field) {
        console.log(JSON.parse(Udetails)[field]);
        return `${JSON.parse(Udetails)[field]}`
    }
    return (
        <>
            <TopNav navigation={navigation}></TopNav>
            <ScrollView>
                <Text style={[styles.heading, { textAlign: 'center', margin: 10 }]}>{(pointer == -1) ? 'All Assigned Papers' : `Selected Paper ${pointer + 1}`} Information</Text>
                {projectData.map((i, index) => (

                    ((pointer == -1) ? true : (index == pointer)) ?
                        <View key={index} style={styles.subCard}>
                            <Text style={styles.textSetting}>
                                <Text style={[styles.heading]}>PaperID - </Text>
                                {i.paperID}</Text>
                            <Text style={styles.textSetting}>
                                <Text style={styles.heading}>Title - </Text>
                                <Text style={{ fontWeight: 'bold' }}>{i.title}</Text></Text>
                            <View style={styles.yon1}>
                                <Text style={styles.heading}>Status -
                                </Text>
                                {(i.approved) == "Pending" ? <>
                                    <View style={[styles.yon, { backgroundColor: '#ffa200' }]} >
                                        <Icon name={'error'} size={iconsize} color="#ffffff" />

                                        <Text style={{ color: 'white', fontSize: 12 }} >
                                            Pending</Text>
                                    </View>
                                </> : <>
                                    {(i.approved) == "Approved" ? <>
                                        <View style={[styles.yon, { backgroundColor: 'green' }]} >
                                            <Icon name={'check-circle'} size={iconsize} color="#ffffff" />

                                            <Text style={{ color: 'white', fontSize: 12 }} >
                                                Approved</Text>
                                        </View>
                                    </> : <>
                                        <View style={[styles.yon, { backgroundColor: 'red' }]} >
                                            <Text style={{ color: 'white', fontSize: 12 }} >
                                                Rejected</Text>
                                        </View></>}</>}
                            </View>


                            <View style={styles.yon1}>
                                <Text style={styles.heading}>Group Submission  -
                                </Text>
                                {(i.groupSubmission) ? <>
                                    <View style={[styles.yon, { backgroundColor: 'green' }]} >
                                        <Icon name={'done'} size={iconsize} color="#ffffff" />
                                        <Text style={{ color: 'white', fontSize: 10 }} >
                                            yes</Text>
                                    </View>
                                </> : <>
                                    <View style={[styles.yon, { backgroundColor: 'red' }]} >
                                        <Icon name={'highlight-off'} size={iconsize} color="#ffffff" />
                                        <Text style={{ color: 'white', fontSize: 12 }} >
                                            No</Text>
                                    </View></>}
                            </View>
                            <Text style={styles.textSetting}>
                                <Text style={styles.heading}>Sumitted by - </Text>
                                {(i.submisstionType == 'user') ? 'Author' : 'Student'}</Text>
                            {(i.otherKeyword.length > 0) ? <Text style={styles.textSetting}>
                                <Text style={styles.heading}>Key Words - </Text>
                                {i.otherKeyword}</Text> : null}

                            <View style={styles.yon1}>
                                <Text style={styles.heading}>Want to Attend  -
                                </Text>
                                {(i.wantToAttend) ? <>
                                    <View style={[styles.yon, { backgroundColor: 'green' }]} >
                                        <Icon name={'done'} size={iconsize} color="#ffffff" />
                                        <Text style={{ color: 'white', fontSize: 12 }} >
                                            yes</Text>
                                    </View>
                                </> : <>
                                    <View style={[styles.yon, { backgroundColor: 'red' }]} >
                                        <Icon name={'highlight-off'} size={iconsize} color="#ffffff" />
                                        <Text style={{ color: 'white', fontSize: 12 }} >
                                            No</Text>
                                    </View></>}
                            </View>

                        </View>
                        : null

                ))}


            </ScrollView>
            <BottomNav navigation={navigation} type={type}></BottomNav>

        </>
    );
}

const styles = StyleSheet.create({

    heading: {
        color: 'green',
        fontSize: 16,
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
        gap:5,
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
    yon1: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        marginVertical: 5,
    },
    yon: {

        flexDirection: 'row',
        backgroundColor: 'red',
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 5,
        overflow: 'hidden',
        borderRadius: 20,
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});
export default AssignPaper;
