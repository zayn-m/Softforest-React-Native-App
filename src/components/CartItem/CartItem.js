import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
const cartItem = props => {
  return (
    
      <View style={styles.container} >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>

        <View style={styles.textContainer}>
          <Text>{props.title}</Text>
          <View>
              <Text style={styles.priceText}>${props.price}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={props.delete}>
            <Icon name="ios-trash" size={30} color="red" />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 2,
    width: "100%",
    height: 100,
    marginTop: 10
  },
  imageContainer: {
    flex: 0.8,
    resizeMode: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  textContainer: {
    flex: 1,
    margin:8
  },
  iconContainer:{
    flex:0.1,
    marginTop:25,
    marginRight:10
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  

});

export default cartItem;