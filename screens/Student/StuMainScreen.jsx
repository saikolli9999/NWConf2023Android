import React from 'react';
import {View, StyleSheet} from 'react-native';

const StuMainScreen = ({navigation,myObject,type}) => {
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
                                        <Text style={{ color: 'white' }} >
                                            Pending</Text>
                                    </View>
                                </> : <>
                                    {(JSON.parse(uemail)['approved']) == "Approved" ? <>
                                        <View style={[styles.yon, { backgroundColor: 'green' }]} >
                                            <Text style={{ color: 'white' }} >
                                                Approved</Text>
                                        </View>
                                    </> : <>
                                        <View style={[styles.yon, { backgroundColor: 'red' }]} >
                                            <Text style={{ color: 'white' }} >
                                                Rejected</Text>
                                        </View></>}</>}
                            </View>
                            <Button color={'green'} size="sm" onPress={() =>{navigation.navigate('AuthSubmission',{uemail:uemail})}} title={'More'}></Button>
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
    );
}

const styles = StyleSheet.create({

})

export default StuMainScreen;
