import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";

const recommendationItem = props => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.ratingContainer}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={+props.ratings}
              emptyStar={"md-star-outline"}
              iconSet={"Ionicons"}
              fullStar={"md-star"}
              halfStar={"md-star-half"}
              fullStarColor={"#f4bf00"}
              starSize={18}
            />
            <Text>
              <Text style={styles.rating}> {props.ratings}</Text>
            </Text>
          </View>
          <Text>{props.title}</Text>
          <Text style={styles.username}>{props.username}</Text>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 80,
    marginTop: 15
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
    flexDirection: "row"
  },
  rating: {
    color: "#f4bf00"
  },
  textContainer: {
    flex: 1
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
  },
  username: {
    textTransform: "capitalize",
    color: "#aaa"
  }
});

export default recommendationItem;
