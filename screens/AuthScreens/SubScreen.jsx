import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Touchable } from 'react-native';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';



const SubScreen = ({ navigation, Udata }) => {
    // const downloadFile = async (url) => {
    //     console.warn(FileSystem.documentDirectory);
    //     const fileUri = FileSystem.documentDirectory + 'file.pdf';
    //     const downloadObject = FileSystem.createDownloadResumable(url, fileUri);
    //     const { uri } = await downloadObject.downloadAsync();
    //     console.log('Finished downloading to ', uri);
    // };
    const downloadFromUrl = async (url) => {
        try {
            const filename = "file.pdf";
            const result = await FileSystem.downloadAsync(
                url,
                FileSystem.documentDirectory + filename
            );
            console.log(result);
            var downloadF = Parser('lastName') + "_" + Parser('paperID')
            save(result.uri, `${downloadF + '.pdf'}`, 'Application/pdf');
        } catch (error) {

        }

    };
    const save = async (uri, filename, mimetype) => {
        try {
            if (Platform.OS === "android") {
                const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
                if (permissions.granted) {
                    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                    await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
                        .then(async (uri) => {
                            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                        })
                        .catch(e => console.log(e));
                } else {
                    shareAsync(uri);
                }
            } else {
                shareAsync(uri);
            }
        } catch (error) {

        }

    };
    const [clicked, setclicked] = useState([10, 10]);
    console.log("in Author SUbmision Screen");
    console.log(Udata);
    function Parser(field) {
        console.log(JSON.parse(Udata)[field]);
        return `${JSON.parse(Udata)[field]}`
    }
    const temp = { "lastName": "Maram", "groupEmail": "", "wantToAttend": false, "areaOfInterest": "Electricity data,Data mining,Air pollution index method", "payementStatus": "", "groupSubmission": false, "reviewers": [], "firstName": "Prathyusha", "password": "123456", "approved": "Pending", "confirmPassword": "123456", "reviewerApproval": [], "email": "prathyu.maram@gmail.com", "document": "https://res.cloudinary.com/dd1uzjqg8/image/upload/v1684788225/1684788225107.pdf", "otherKeyword": "Electricity data,Data mining,Air pollution index method", "abstract": "The continuous development of society has destroyed the living environment of human beings to a\nlarge extent. The problem of air pollution is becoming more and more serious, which affects people’s\ndaily life and threatens human health and the natural environment. It is very important to evaluate\nand prevent air pollution. The existing atmospheric environmental pollution assessment system has\nproblems such as low accuracy of prediction results and incomplete analysis of problems, resulting\nin untimely prevention and control of regional atmospheric environmental pollution. This paper\nanalyzes the needs of atmospheric environment data mining, monitoring the prevention and control\nof atmospheric environment pollution, using data mining technology combined with power data to\nevaluate and prevent air pollution. Through the real-time detection and evaluation of the regional\nenvironmental pollution index, it is possible to carry out timely treatment when the atmospheric\nenvironmental pollution does not meet the standard. Through the prediction accuracy test, the\nenvironmental pollution index test, the atmospheric environment quality score test and the prevention\nand control effect test in different regions, it is found that the data mining technology is used for\nprevention and control. The prediction accuracy increased by 4.18%, and the environmental pollution\nindex decreased. It is more conducive to the control of regional atmospheric pollution, the rate of\natmospheric environmental quality score has been increased by 2.38%, and the control effect has been optimized by 3.1%. Data mining technology is more conducive to the assessment and prevention of regional air pollution.", "keyword": [{ "label": "Other", "value": "Other" }], "title": "Application of data mining combined with power data in assessment and prevention of regional atmospheric pollution", "paperID": "003", "updatedAt": 1684788240726 }
    return (
        <>
            <TopNav navigation={navigation} />
            <ScrollView>

                <View style={styles.block} >
                    {(JSON.parse(Udata)['title']).length > 0 ? <>
                        <Text style={styles.textSetting}>
                            <Text style={styles.heading}>PaperID -</Text>
                            {Parser('paperID')}</Text>
                        <Text style={[styles.textSetting]}>
                            <Text style={styles.heading}>Title -</Text>
                            {Parser('title')}</Text>
                        {/* <Text style={styles.textSetting}>
                        <Text style={styles.heading}>Abstract -</Text>
                        {Parser('abstract')}</Text> */}
                        <Text style={styles.textSetting}>
                            <Text style={styles.heading}>Key Words -</Text>
                            {Parser('otherKeyword')}</Text>

                        <View style={styles.yon1}>
                            <Text style={styles.heading}>Group Submission  -
                            </Text>
                            {(JSON.parse(Udata)['groupSubmission']) ? <>
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
                            <Text style={styles.heading}>Document Included ? -
                            </Text>
                            {(JSON.parse(Udata)['document']).length > 5 ? <View style={{}}>
                                <View style={[styles.yon, { backgroundColor: 'green' }]} >
                                    <Icon name={'done'} size={20} color="#ffffff" />
                                    <Text style={{ color: 'white' }} >
                                        yes</Text>
                                </View>

                            </View> : <>
                                <View style={[styles.yon, { backgroundColor: 'red' }]} >
                                    <Icon name={'highlight-off'} size={20} color="#ffffff" />
                                    <Text style={{ color: 'white' }} >
                                        No</Text>
                                </View></>}
                        </View>
                        {(JSON.parse(Udata)['document']).length > 5 ?
                            <View style={{ width: 100, marginLeft: 15, }}>
                                <Button color={'green'} size='sm' radius={'25'} onPress={() => downloadFromUrl(JSON.parse(Udata)['document'])} title={'Download'}></Button>
                            </View> :
                            null}
                        <View style={styles.yon1}>
                            <Text style={styles.heading}>Status -
                            </Text>
                            {(JSON.parse(Udata)['approved']) == "Pending" ? <>
                                <View style={[styles.yon, { backgroundColor: '#ffa200' }]} >
                                    <Text style={{ color: 'white' }} >
                                        Pending</Text>
                                </View>
                            </> : <>
                                {(JSON.parse(Udata)['approved']) == "Approved" ? <>
                                    <View style={[styles.yon, { backgroundColor: 'green' }]} >
                                        <Icon name={'check-circle'} size={20} color="#ffffff" />

                                        <Text style={{ color: 'white' }} >
                                            Approved</Text>
                                    </View>
                                </> : <>
                                    <View style={[styles.yon, { backgroundColor: 'red' }]} >
                                        <Text style={{ color: 'white' }} >
                                            Rejected</Text>
                                    </View></>}</>}
                        </View>
                        {(true) ?
                            <Text style={styles.textSetting}>
                                {(JSON.parse(Udata)['reviewerApproval']).map((element, count) => (

                                    <View key={count} style={styles.rewF}>
                                        <Text style={[{
                                            textAlign: 'center', color: 'green',
                                            fontWeight: 'bold', marginTop: 10,
                                        }]}>{count + 1} Reviewer Feedback</Text>
                                        {
                                            Object.keys(element).map((i, index) => (
                                                <View key={index}>

                                                    {(i == 'email' || i == 'approve') ? <></> : <>
                                                        <TouchableOpacity style={styles.table} onPress={() => { setclicked([count, index]) }} >

                                                            <View style={{ width: Dimensions.get('screen').width / 2.3, borderColor: 'black', borderWidth: 1 }}>
                                                                <Text style={{ textAlign: 'center', paddingVertical: 10 }}>{i}</Text>
                                                            </View>
                                                            <View style={{ width: Dimensions.get('screen').width / 2.3, borderColor: 'black', borderWidth: 1 }}>
                                                                <Text style={{ textAlign: 'center', paddingVertical: 10 }}>
                                                                    {element[i].points}
                                                                </Text>
                                                            </View>

                                                        </TouchableOpacity>
                                                        {(clicked[0] == count && clicked[1] == index) ? <>
                                                            <TouchableOpacity onPress={() => { setclicked(10, 10) }} style={{ width: Dimensions.get('screen').width - 47, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden' }}>
                                                                <Text style={{ textAlign: 'center', color: 'white', paddingHorizontal: 10, padding: 5, backgroundColor: '#502a2aa8', borderBottomEndRadius: 20, }}>
                                                                    comments -   {element[i].comments}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </> : null}

                                                        {/* <Text style={[styles.heading,{margin:5, fontWeight: 'bold' }]}>{i} - {element[i].points}</Text>
                                            <Text>comments - {element[i].comments}</Text> */}
                                                    </>}
                                                </View>
                                            ))
                                        }
                                    </View>
                                ))}
                            </Text>
                            : null}
                    </> :
                        <View style={[styles.subCard, { minHeight: 100 }]}>
                            <Text style={[styles.Tbold, { textAlign: 'center' }]}> No Submissions</Text>
                        </View>
                    }

                </View>
            </ScrollView>
            <BottomNav navigation={navigation} />
        </>
    );
}

const styles = StyleSheet.create({
    textSetting: {
        margin: 15,
    },
    block: {
        overflow: 'hidden',
        textAlign: 'justify',
        margin: 10,
        marginBottom: 150,
        // borderWidth: 2,
        // alignItems: 'center',
        borderColor: 'green',
        gap: 1,
        borderRadius: 28,
    },
    table: {
        flexDirection: 'row',
    },
    rewF: {

    },
    heading: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'justify',

    },
    yon1: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 10,
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
})

export default SubScreen;
