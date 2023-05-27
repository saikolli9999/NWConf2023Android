import { Button } from '@rneui/base'
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Touchable } from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler'

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View  style={styles.container} key={index}>
      {/* <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
      /> */}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.dates}>
        <Text style={styles.heading}>
          Conference Date
        </Text> - {item.Cdate}</Text>
      <Text style={styles.dates}><Text style={styles.heading}>Submission Deadline</Text> - {item.deadline}</Text>
      <Text style={styles.dates}><Text style={styles.heading}>Result dates</Text> - {item.resultDate}</Text>
      <Button size='sm' style={{borderRadius:20}} color={'green'} onPress={()=>{alert('Visit Website')}} >View More</Button>
      {/* <Text style={styles.body}></Text> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 28,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    margin: 10,
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {

    width: ITEM_WIDTH,
    height: 100,
  },
  heading: {
    color: 'red',
    
  },
  title: {
    color: 'green',
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 15
  },
  dates: {
    color: "#222",
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom:5
  },
  body: {
    color: "#222",
    fontSize: 14,
   padding:5
  }
})

export default CarouselCardItem