import React from "react";
import {
  View,
  TextInput,
  Text,
  Modal,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import StarRating from "react-native-star-rating";
import { HOST_URL } from "../../settings";
import Hr from "../UI/Hr/Hr";

class FeedbackModal extends React.Component {
  state = {
    starCount: 0.0,
    text: ""
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  submit = () => {
    const type = "project";
    const user = +this.props.userId;
    const slug = this.props.slug;
    const data = {
      content: this.state.text,
      rating: this.state.starCount
    };

    axios
      .post(`${HOST_URL}/comments/create/`, data, {
        params: {
          type,
          slug,
          user
        },
        headers: {
          Authorization: `Token ${this.props.token}`
        }
      })
      .then(response => {
        console.log(response);
        if (response.status === 201) {
          alert("Thanks for your feedback");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Modal visible={this.props.visible} animationType="slide">
        <View style={styles.container}>
          <View style={styles.ratingContainer}>
            <StarRating
              starStyle={styles.rating}
              disabled={false}
              maxStars={5}
              rating={this.state.starCount}
              emptyStar={"md-star-outline"}
              iconSet={"Ionicons"}
              fullStar={"md-star"}
              halfStar={"md-star-half"}
              fullStarColor={"#f4bf00"}
              starSize={34}
              selectedStar={rating => this.onStarRatingPress(rating)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={4}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder="Write your feedback..."
            />
          </View>
          <View style={styles.postButton}>
            <Button title="Post" color="#05C0BA" onPress={this.submit} />
          </View>
          <TouchableOpacity onPress={this.props.onClose}>
            <View style={styles.closeButtonContainer}>
              <Text style={styles.closeButton}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20
  },
  rating: {
    padding: 10,
    width: "100%"
  },
  input: {
    elevation: 1,
    backgroundColor: "#f5f5f5f5",
    marginBottom: 20
  },
  postButton: {
    marginTop: 10,
    marginBottom: 10
  },
  closeButtonContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  closeButton: {
    color: "#05C0BA",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
});

export default FeedbackModal;
