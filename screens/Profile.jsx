import { StyleSheet, Text, View } from "react-native";
import MainScreen from './MainScreen';
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import { Image } from "@rneui/themed";
export default function Profile({ navigation, type, Udata,rewData }) {
    const Ud = Udata
    console.log('in Profile Page');
    console.log(Udata);
    const Rdata = rewData

    function Captilizer(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
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
        <>
            <TopNav navigation={navigation}></TopNav>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: "https://cdn4.iconfinder.com/data/icons/green-shopper/1068/user.png" }} style={{ width: 70, height: 70 }} ></Image>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 5, padding: 10 }}>
                <View style={styles.role}>
                    <Text style={{ textAlign: 'center' }}>{(Captilizer(type))}</Text>
                </View>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{Captilizer(Parser('firstName'))}</Text>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{Captilizer(Parser('lastName'))} </Text>

                <Text style={{}}>{Parser('email')}</Text>


                <Text>
                    {Parser('areaOfInterest')}

                </Text>
            </View>
            <BottomNav navigation={navigation} type={type}></BottomNav>
        </>
    )
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
    role: {
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 3,

        borderColor: 'gold',
        minWidth: 70,
        elevation: 2,
        backgroundColor: 'gold'
    },
    drawerItemL: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'red',
        marginBottom: 10,
        color: 'white',
    },
});