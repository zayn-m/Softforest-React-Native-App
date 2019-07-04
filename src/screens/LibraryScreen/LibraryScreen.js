import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";

import Icon from "react-native-vector-icons/Ionicons";
import LibraryItem from "../../components/LibraryItem/LibraryItem";
import FeedbackModal from "../../components/FeedbackModal/FeedbackModal";
import { HOST_URL } from "../../settings";

class LibraryScreen extends React.Component {
  state = {
    items: [],
    visible: false,
    slug: null
  };

  componentDidMount() {
    fetch(`${HOST_URL}/order/?user=${this.props.userId}`, {
      headers: {
        Authorization: `Token ${this.props.token}`
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let items = [];
        responseJson.map(el =>
          el.project.map(el =>
            items.push({
              key: el.id,
              name: el.title,
              id: el.file[0].id,
              slug: el.file[0].slug
            })
          )
        );
        this.setState({ items: items });
      })
      .catch(erorr => console.log(erorr));
  }

  closeModal = () => {
    this.setState({ visible: false });
  };

  reviewHandler = slug => {
    this.setState({ slug: slug, visible: true });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.items &&
          this.state.items.map(item => (
            <LibraryItem
              key={item.id}
              title={item.name}
              viewHandler={() => this.viewHandler(item.slug)}
              reviewHandler={() => this.reviewHandler(item.slug)}
            />
          ))}
        <FeedbackModal
          visible={this.state.visible}
          onClose={this.closeModal}
          userId={this.props.userId}
          token={this.props.token}
          slug={this.state.slug}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  }
});

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(LibraryScreen);
