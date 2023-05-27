import { Linking, StyleSheet, StatusBar, Text, TextInput, TouchableOpacity, View, ScrollView, ToastAndroid, Animated } from 'react-native';
import { ScreenHeight } from '@rneui/base';

const styles = StyleSheet.create({

    navbar: {
        backgroundColor: 'white',
        borderColor:'green',
        borderBottomWidth:2,
        color: 'white',
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        margin:0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 60,
      },
      logoContainer: {
        zIndex:100,
        flex: 1,
        marginLeft:-45,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        height: 50,
        width: 50,
      },
    
});
export default styles