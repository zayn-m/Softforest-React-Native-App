import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";

const projectListItem = props => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={props.image} />
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
              <Text style={styles.rating}> 4.8</Text> (12)
            </Text>
          </View>
          <View>
            <Text>Cafe Management System</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$5000</Text>
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
    flex: 1
  },
  price: {
    marginTop: 10,
    fontSize: 16,
    color: "#05C0BA",
    textAlign: "right"
  }
});

export default projectListItem;
