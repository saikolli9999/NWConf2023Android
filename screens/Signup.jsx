// import { StatusBar } from 'expo-status-bar';
import { Button } from '@react-native-material/core';
import Svg, { Path } from 'react-native-svg';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Linking, StyleSheet, StatusBar, Text, TextInput, TouchableOpacity, View, ScrollView, ToastAndroid, Animated, Modal } from 'react-native';
import { Image, Input } from 'react-native-elements';
import { Screen } from 'react-native-screens';
import { ScreenHeight } from '@rneui/base';
import { Formik } from 'formik';
import config from '../config.json'

import * as Yup from 'yup';
// images
import Foot from './components/Footer';
export default function Signup({ navigation }) {
    const [fName, setfName] = useState();
    const [lName, setlname] = useState();
    const [email, setEmail] = useState();
    const [aoi, setaoI] = useState();
    const [password, setPassword] = useState();
    const [confPass, setConfPass] = useState();
    const [visible, setVis] = useState(true);
    const [selected, setSelected] = useState('');

    function handleLogin() {
        console.log('====================================');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isValidEmail = (email) => {
            return emailRegex.test(email);
        };
        if (isValidEmail(email)) {

            console.log("Valid Email");
        }
        else {
            var temp = []
            temp.push('eError')
            seterr(temp)
            ToastAndroid.show('Invalid Deatils', ToastAndroid.LONG);
        }
    }
    // Formik
    const initialValues = { fName: '', lName: '', aoi: '', email: '', password: '', confPass: '' };
    const onSubmit = async (values) => {
        console.log(selected);
        const requestBody = {
            firstName: values.fName,
            lastName: values.lName,
            email: values.email,
            areaOfInterest: values.aoi,
            password: values.password,
            confirmPassword: values.confPass
        };
        const Clert = async (msg) => {
            alert(msg)
        }
        var url = ''
        if (selected == 'student') {
            url = `https://${config.RenderIP}/api/student/signup`
        }
        else
            url = `https://${config.RenderIP}/api/signup`
        await axios.post(url, requestBody)
            .then(response => {
                if (response.data.status) {
                    setIsAlertVisible(true);
                    setTimeout(() => {
                        handleConfirm()
                    }, 1500);
                }
                else {
                    alert(response.data.message)
                }
                return response.data
            })
            .then(soe => {
                if (soe.status) {
                }

            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });


        console.log(values);
    };
    function containsOnlyLetters(str) {
        var pattern = /^[A-Za-z]+$/;
        return pattern.test(str);
    }
    function validatePassword(password) {
        // Regular expression pattern to match the password requirements
        var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return pattern.test(password) && !/\s/.test(password);
    }
    const validationSchema = Yup.object().shape({
        fName: Yup.string().required('Cannot be Empty').test(
            'len',
            'Invalid input',
            (val) => {
                if (val == undefined) {
                    return true;
                }
                return (((val.length >= 1 && val.length <= 20) && (containsOnlyLetters(val))))
            }
        ),
        lName: Yup.string().required('Cannot be Empty').test(
            'len',
            'Invalid input',
            (val) => {
                if (val == undefined) {
                    return true;
                }
                return (((val.length >= 1 && val.length <= 20) && (containsOnlyLetters(val))))
            }
        ),
        aoi: Yup.string().required('Cannot be Empty').test(
            'len',
            'Invalid input',
            (val) => {
                if (val == undefined) {
                    return true;
                }
                return (((val.length >= 1 && val.length <= 20) && (containsOnlyLetters(val))))
            }
        ),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required').test(
            'len',
            'Your Password does not meet Requirements ',
            (val) => {
                if (val == undefined) {
                    return true;
                }
                return (((validatePassword(val))))
            }
        ),
        confPass: Yup.string().required('Password is required').test(
            'len',
            'Your Password does not meet Requirements ',
            (val) => {
                if (val == undefined) {
                    return true;
                }
                return (((validatePassword(val))))
            }
        ),
    });
    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email is required';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        }

        if (!values.fName) {
            errors.fName = 'First name is required'
        }

        if (!values.lName) {
            errors.lName = 'Last name is required'
        }

        if (!values.aoi) {
            errors.aoi = 'Area of interest is required'
        }

        if (!values.confPass) {
            errors.confPass = 'Confirm password is required'
        }

        return errors;
    };
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const showAlert = () => {
        setIsAlertVisible(true);
    };

    const hideAlert = () => {
        setIsAlertVisible(false);
    };

    const handleConfirm = () => {
        // Handle user confirmation

        hideAlert();
        navigation.navigate('Login')

    };
    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.logoContainer}>

                    <View style={{ borderRadius: 25, padding: 10, backgroundColor: 'white' }}>
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={{ uri: 'https://raw.githubusercontent.com/KondaShivaradhan/cloud/main/nwlogo.png' }}
                            // source={require('../assets/nwlogo.png')}
                        >
                        </Image>
                    </View>
                    <Text style={[styles.title, { marginTop: 10 }]}>NORTHWEST CONFORENCE</Text>
                    <Text style={styles.title}>2023</Text>
                    {/* <Button title="check" onPress={()=>setVis(!visible)}></Button> */}
                </View>
                <Modal visible={isAlertVisible} style={{ borderColor: 'green', borderWidth: 2 }} onRequestClose={hideAlert} transparent>
                    <View style={{ backgroundColor: '#2342', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderColor: 'green', elevation: 10, borderWidth: 2, backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                            <Text style={{ fontSize: 14 }}>Saved Successfully</Text>
                            {/* <Button style={{width:40}} title="OK" color='green' onPress={handleConfirm} /> */}
                        </View>
                    </View>
                </Modal>
                <View style={styles.formContainer}>
                    <View style={styles.banner}>
                        <Text style={styles.title2}>Signup</Text>
                    </View>
                    {/* <Animated.View style={[styles.container, { opacity }]}>
                        <Text style={styles.text}>Shiva</Text>
                    </Animated.View> */}
                    <Formik initialValues={initialValues} onSubmit={onSubmit}
                        // validate={validate}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                            <View>
                                <TextInput
                                    style={[touched.fName && errors.fName ? styles.err : styles.input]}
                                    onChangeText={handleChange('fName')}
                                    onBlur={handleBlur('fName')}
                                    value={values.fName}
                                    placeholder="FirstName"
                                    keyboardType="name-phone-pad"
                                    autoCapitalize="none"
                                />
                                {touched.fName && errors.fName ? <Text style={styles.error}>{errors.fName}</Text> : <Text style={styles.error}></Text>}

                                <TextInput
                                    style={[touched.lName && errors.lName ? styles.err : styles.input]}
                                    onChangeText={handleChange('lName')}
                                    onBlur={handleBlur('lName')}
                                    value={values.lName}
                                    placeholder="LastName"
                                    keyboardType="name-phone-pad"
                                    autoCapitalize="none"
                                />
                                {touched.lName && errors.lName ? <Text style={styles.error}>{errors.lName}</Text> : <Text style={styles.error}></Text>}

                                <TextInput
                                    style={[touched.email && errors.email ? styles.err : styles.input]}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : <Text style={styles.error}></Text>}

                                <TextInput
                                    style={[touched.aoi && errors.aoi ? styles.err : styles.input]}
                                    onChangeText={handleChange('aoi')}
                                    onBlur={handleBlur('aoi')}
                                    value={values.aoi}
                                    placeholder="Area of interest"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                />
                                {touched.aoi && errors.aoi ? <Text style={styles.error}>{errors.aoi}</Text> : <Text style={styles.error}></Text>}

                                {/* {errors.email && <Text style={styles.error}>{errors.email}</Text>} */}
                                <TextInput
                                    style={[touched.password && errors.password ? styles.err : styles.input]}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder="Password"
                                    secureTextEntry
                                />
                                {touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : <Text style={styles.error}></Text>}

                                <TextInput
                                    style={[touched.confPass && errors.confPass ? styles.err : styles.input]}
                                    onChangeText={handleChange('confPass')}
                                    onBlur={handleBlur('confPass')}
                                    value={values.confPass}
                                    placeholder="Confirm Password"
                                    secureTextEntry
                                />
                                {touched.confPass && errors.confPass ? <Text style={styles.error}>{errors.confPass}</Text> : <Text style={styles.error}></Text>}

                                {/* {errors.password && <Text style={styles.error}>{errors.password}</Text>} */}
                                <Button style={{ alignSelf: "center", width: 250, marginTop: 10, backgroundColor: 'green' }} onPress={() => { setSelected('author'); handleSubmit() }} title="SignUp as Author" />
                                <Button style={{ alignSelf: "center", width: 250, marginTop: 10, backgroundColor: 'green' }} onPress={() => { setSelected('student'); handleSubmit() }} title="SignUp as Student" />
                                {/* <View>
                                    <Button title="Login" onPress={() => handleLogin()} style={{ alignSelf: "center", marginTop: 10, backgroundColor: 'green' }} />
                                </View> */}
                                <View style={{ margin: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>
                                        Already have an account?  <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                                            Login! </Text>
                                    </Text>
                                </View>
                            </View>
                        )}
                    </Formik>

                </View>

                <StatusBar style="auto" />
                <Foot></Foot>
            </ScrollView>

        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#2b5a2b',
        color: 'white',
        // marginTop: StatusBar.currentHeight-4
    },

    logoContainer: {
        alignItems: 'center',
        padding: 20,
        marginTop: 70,
    },

    logoText: {
        fontSize: 30,
        color: '#fff',
    },
    formContainer: {
        flex: 1,
        padding: 20,
        minHeight: ScreenHeight - StatusBar.currentHeight,
        maxHeight: ScreenHeight,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10,
        shadowColor: '#234123', // set shadow color
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginVertical: 10,
        paddingHorizontal: 10,

    },

    wave: {
        position: 'absolute',
        bottom: 0,
    },

    banner: {
        padding: 16,
        width: '100%',
    },
    wave: {
        width: '100%', textAlign: 'center', flex: 1,
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff'
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