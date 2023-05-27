import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { View, StyleSheet, Image, Switch,Alert } from 'react-native';
import axios from "axios";
import config from '../../config.json'
import { Button, Icon } from '@rneui/themed';

import { Text } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const CustomeDrawer = (props) => {
    const Ud = props.Udetails
    const Rdata = props.rewData
    const type = props.type
    const [isDarkMode, setIsDarkMode] = useState(false);
    const handleToggleSwitch = () => {
        setIsDarkMode(!isDarkMode);
    };
    const items = [['Home', 'home', `${(type == 'reviewer') ? 'RewMainScreen' : 'MainScreen'}`], [`${(type == 'reviewer') ? 'My Assigned papers' : 'My Submissions'}`, 'article', `${(type == 'reviewer') ? 'RewSubmission' : 'AuthSubmission'}`], ['Profile', 'person', 'Profile'], ['Settings', 'settings', 'Profile'], ['About', 'info', 'Profile']]
    const [Udetails, setUdetails] = useState(JSON.stringify(Ud));
    function Captilizer(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          "Do you want to logout?",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
                props.navigation.navigate('Login')
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };
    function Parser(field) {
        // console.log(JSON.parse(Ud)[field]);
        // (type=='reviewer')?Rdata:Ud
        if (type == 'reviewer') {
            return `${(Rdata)[field]}`

        }
        else {
            return `${JSON.parse(Ud)[field]}`

        }
    }
    return (
        <DrawerContentScrollView style={styles.container} {...props}>
            <View style={{ gap: 10, justifyContent: 'center', flexDirection: 'column', marginTop: 10, marginBottom: 5, alignSelf: 'center' }}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={{ uri: "https://cdn4.iconfinder.com/data/icons/green-shopper/1068/user.png" }} style={{ width: 70, height: 70 }} ></Image>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center',gap:5,padding:10 }}>
                    <Text style={{ fontWeight: 'bold',textAlign:'center' }}>{Captilizer(Parser('lastName'))} {Captilizer(Parser('firstName'))}</Text>
                    <Text style={{}}>{Parser('email')}</Text>
                    <View style={styles.role}>
                        <Text style={{textAlign:'center'}}>{(Captilizer(type))}</Text>
                    </View>
                </View>

            </View>
            {items.map((i, index) => (
                <DrawerItem key={index} style={styles.drawerItem}
                    label={() => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name={i[1]} size={25} color="#089b2d" />

                            <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>{i[0]}</Text>
                        </View>
                    )}

                    onPress={() => props.navigation.navigate(i[2], i[3])}
                />
            ))}

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Dark Mode</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={handleToggleSwitch}
                    thumbColor={isDarkMode ? '#FFFFFF' : '#000000'}
                    trackColor={{ false: '#CCCCCC', true: '#999999' }}
                />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>

                <Button radius={'lg'} type="solid" onPress={() => { showConfirmDialog() }} color="error" >
                    Logout
                    <Icon style={{ marginLeft: 5 }} name="logout" color="white" />
                </Button>
            </View>


            {/* <DrawerItemList {...props}/> */}
        </DrawerContentScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10
        // paddingHorizontal: 10,
    },
    darkContainer: {
        backgroundColor: '#000000',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    switchText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    drawerItem: {
        fontSize: 16,
        fontWeight: 'bold',
        // marginBottom: 10,
        color: '#000000',
    },
    role:{
        borderWidth:1,
        borderRadius:20,
        paddingVertical:3,
        
        borderColor:'gold',
        minWidth:70,
        elevation:2,
        backgroundColor:'gold'
    },
    drawerItemL: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'red',
        marginBottom: 10,
        color: 'white',
    },
});

export default CustomeDrawer;
