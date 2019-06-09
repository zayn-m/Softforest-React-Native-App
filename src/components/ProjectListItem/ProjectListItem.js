import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";

const projectListItem = props => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.ratingContainer}>
            <StarRating
              disabled={false}
              maxStars={1}
              rating={5}
              iconSet={"Ionicons"}
              fullStar={"ios-star"}
              fullStarColor={"#f4bf00"}
              starSize={18}
            />
            <Text>
              <Text style={styles.rating}> {props.ratings}</Text>
            </Text>
          </View>
          <View>
            <Text>{props.title}</Text>
          </View>
          <View style={styles.priceContainer}>
            {props.onSale ? (
              <View>
                <Text style={styles.discountText}>
                  ${props.discountRate}{" "}
                  <Text style={styles.strike}> ${props.price}</Text>
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.priceText}>${props.price}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 5
  },
  rating: {
    color: "#f4bf00"
  },
  textContainer: {
    flex: 1,
    margin: 8
  },
  priceContainer: {
    flex: 1,
    marginTop: 10
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  discountText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  strike: {
    fontSize: 14,
    color: "#aaa",
    textDecorationLine: "line-through"
  }
});

export default projectListItem;
