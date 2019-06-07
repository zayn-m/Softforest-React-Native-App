import React from "react";
import moment from "moment";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";

const comment = props => {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.ratingContainer}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={+props.rating}
              emptyStar={"md-star-outline"}
              iconSet={"Ionicons"}
              fullStar={"md-star"}
              halfStar={"md-star-half"}
              fullStarColor={"#f4bf00"}
              starSize={18}
            />
          </View>
          <Text>{props.content}</Text>
          <Text style={{ color: "#aaa" }}>
            {moment(props.timestamp).format("MM-DD-YYYY")}
          </Text>
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
  ratingContainer: {
    flexDirection: "row"
  },
  rating: {
    color: "#f4bf00"
  },
  textContainer: {
    flex: 1,
    margin: 12
  }
});

export default comment;
