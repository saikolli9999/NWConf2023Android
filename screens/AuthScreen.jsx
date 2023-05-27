// import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Linking, StyleSheet, StatusBar, Text, TextInput, TouchableOpacity, View, ScrollView, ToastAndroid, Animated } from 'react-native';
import { Image, Input } from 'react-native-elements';
import { Screen } from 'react-native-screens';
import { ScreenHeight } from '@rneui/base';
import { Formik } from 'formik';
import config from '../config.json'
import { Button, Icon } from '@rneui/themed';

// images
import Foot from './components/Footer';
export default function AuthScreen({ navigation }) {
    var selected = ""
    
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [visible, setVis] = useState(true);
    const [err, seterr] = useState([]);
    const [animation] = useState(new Animated.Value(0));
    const [password, setPassword] = useState('');
    useEffect(() => {
        Animated.timing(animation, {
            toValue: visible ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [visible]);
    const opacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
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
    const initialValues = { email: '', password: '' };
    const onSubmit = async (values) => {
        const requestBody = {
            email: values.email,
            password: values.password
        };
        console.log(selected);
        switch (selected) {
            case 'student':
                try {
                    await axios.post(`https://${config.RenderIP}/api/student/login`, requestBody)
                        .then(response => {
                            console.log(response.data);
                            console.log(response.data.status);
                            if (response.data.status) {
                                const Udetails = JSON.stringify(response.data.data)

                                navigation.navigate('afterlog', { uemail: Udetails, type: selected })

                                // const get = async () => {
                                //     console.log("connecting to backend at  Page");

                                //     const requestBody = {
                                //         email: values.email,
                                //     };
                                //     await axios.post(`https://${config.RenderIP}/api/getDetails`, requestBody)
                                //         .then(response => {
                                //             // Handle the response data
                                //             // setUdetails(JSON.stringify(response.data))
                                //             // navigation.navigate('afterlog', { uemail: `${values.email}` })
                                //             const Udetails = JSON.stringify(response.data)
                                //             navigation.navigate('afterlog', { uemail: Udetails, type: selected })

                                //         })
                                //         .catch(error => {
                                //             // Handle the error
                                //             console.log(error);
                                //         });

                                // }
                                // try {
                                //     get()
                                // }
                                // catch (e) {
                                //     console.log(e);
                                // }
                            }
                            else
                                alert('Auth Failed')
                        })
                        .catch(error => {
                            // Handle the error
                            console.error(error);
                        });
                } catch (error) {

                }
                break;
            case 'author':
                try {
                    await axios.post(`https://${config.RenderIP}/api/login`, requestBody)
                        .then(response => {
                            console.log(response.data);

                            console.log(response.data.status);
                            if (response.data.status) {
                                const get = async () => {
                                    console.log("connecting to backend at  Page");

                                    const requestBody = {
                                        email: values.email,
                                    };
                                    await axios.post(`https://${config.RenderIP}/api/getDetails`, requestBody)
                                        .then(response => {
                                            // Handle the response data
                                            // setUdetails(JSON.stringify(response.data))
                                            // navigation.navigate('afterlog', { uemail: `${values.email}` })
                                            const Udetails = JSON.stringify(response.data)
                                            navigation.navigate('afterlog', { uemail: Udetails, type: selected })

                                        })
                                        .catch(error => {
                                            // Handle the error
                                            console.log(error);
                                        });

                                }
                                try {
                                    get()
                                }
                                catch (e) {
                                    console.log(e);
                                }
                            }
                            else
                                alert('Auth Failed')
                        })
                        .catch(error => {
                            // Handle the error
                            console.error(error);
                        });
                } catch (error) {

                }
                break;

            case 'reviewer':
                try {
                    await axios.post(`https://${config.RenderIP}/api/reviewer/login`, requestBody)
                        .then(response => {
                            console.log(response.data);

                            console.log(response.data.status);
                            if (response.data.status) {
                                const rewData = response.data.data

                                const get = async () => {

                                    const requestBody = {
                                        email: values.email,
                                        headers: {
                                            'token': response.data.token, // Example header
                                            // Add more headers if needed
                                        },
                                    };
                                    await axios.get(`https://${config.RenderIP}/api/reviewer/project`, requestBody)
                                        .then(response => {
                                            // Handle the response data
                                            // setUdetails(JSON.stringify(response.data))
                                            // navigation.navigate('afterlog', { uemail: `${values.email}` })
                                            console.log('====================================');
                                            // console.log(response.data);
                                            console.log('====================================');
                                            const Udetails = JSON.stringify(response.data)
                                            navigation.navigate('afterlog', { uemail: Udetails, type: selected, rewData: rewData })

                                        })
                                        .catch(error => {
                                            // Handle the error
                                            console.log(error);
                                        });
                                }
                                try {
                                    get()
                                }
                                catch (e) {
                                    console.log(e);
                                }
                            }
                            else
                                alert('Auth Failed')
                        })
                        .catch(error => {
                            // Handle the error
                            console.error(error);
                        });
                } catch (error) {

                }

            default:
                break;
        }

        console.log(values);
    };

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Invalid Email';
        }

        if (!values.password) {
            errors.password = 'Invalid Password';
        }

        return errors;
    };
    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.logoContainer}>

                    <View style={{ borderRadius: 25, padding: 10, backgroundColor: 'white' }}>
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={{ uri: 'https://raw.githubusercontent.com/KondaShivaradhan/cloud/main/nwlogo.png' }}
                        >
                        </Image>
                    </View>
                    <Text style={[styles.title, { marginTop: 10 }]}>NORTHWEST CONFERENCE</Text>
                    <Text style={styles.title}>2023</Text>
                    {/* <Button title="check" onPress={()=>setVis(!visible)}></Button> */}
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.banner}>
                        <Text style={styles.title2}></Text>
                    </View>
                    {/* <Animated.View style={[styles.container, { opacity }]}>
                        <Text style={styles.text}>Shiva</Text>
                    </Animated.View> */}
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                            <View>
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

                                {/* {errors.password && <Text style={styles.error}>{errors.password}</Text>} */}
                                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                                    <Button radius={'lg'} type="solid" size='sm' color={'green'} onPress={() => { handleSubmit(); selected = "author" }}  >
                                        Author
                                        <Icon style={{ marginLeft: 0 }} name="person" color="white" />
                                    </Button>
                                    <Button radius={'lg'} type="solid" size='sm' color={'green'} onPress={() => { handleSubmit(); selected = "reviewer" }}  >
                                        Reviewer
                                        <Icon style={{ marginLeft: 0 }} name="edit" color="white" />
                                    </Button>
                                    <Button radius={'lg'} type="solid" size='sm' color={'green'} onPress={() => { handleSubmit(); selected = "student" }}  >
                                        Student
                                        <Icon style={{ marginLeft: 0 }} name="school" color="white" />
                                    </Button>
                                </View>
                                <View style={{ margin: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>
                                        Don't have an account?  <Text style={styles.link} onPress={() => navigation.navigate('signup')}>
                                            Sign-up! </Text>
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