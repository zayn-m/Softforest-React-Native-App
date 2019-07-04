import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox, Divider } from "react-native-elements";
import Button from "../../components/UI/Button/Button";

class SideDrawer extends React.Component {
  state = {
    checkboxes: [
      {
        id: 1,
        title: "Desktop",
        checked: false
      },
      {
        id: 2,
        title: "Mobile",
        checked: false
      },
      {
        id: 3,
        title: "Web",
        checked: false
      },
      {
        id: 4,
        title: "C#",
        checked: false
      },
      ,
      {
        id: 5,
        title: "C++",
        checked: false
      },

      {
        id: 6,
        title: "Java",
        checked: false
      },

      {
        id: 7,
        title: "Paid",
        checked: false
      },

      {
        id: 8,
        title: "Free",
        checked: false
      }
    ]
  };

  toggleCheckbox = id => {
    const changedCheckbox = this.state.checkboxes.find(cb => cb.id === id);

    changedCheckbox.checked = !changedCheckbox.checked;

    const checkboxes = Object.assign(this.state.checkboxes, changedCheckbox);

    this.setState({ checkboxes });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.heading}>Platform</Text>

          {this.state.checkboxes.map((cb, i) => {
            if (i < 3) {
              return (
                <CheckBox
                  textStyle={styles.textCheckbox}
                  containerStyle={styles.checkbox}
                  key={cb.id}
                  title={cb.title}
                  checked={cb.checked}
                  onPress={() => this.toggleCheckbox(cb.id)}
                />
              );
            }
          })}

          <Divider style={styles.divider} />
          <Text style={styles.heading}>Technologies</Text>
          {this.state.checkboxes.map((cb, i) => {
            if (cb.id > 3 && cb.id < 7) {
              return (
                <CheckBox
                  textStyle={styles.textCheckbox}
                  containerStyle={styles.checkbox}
                  key={cb.id}
                  title={cb.title}
                  checked={cb.checked}
                  onPress={() => this.toggleCheckbox(cb.id)}
                />
              );
            }
          })}

          <Divider style={styles.divider} />
          <Text style={styles.heading}>Price</Text>

          {this.state.checkboxes.map((cb, i) => {
            if (i > 6) {
              return (
                <CheckBox
                  textStyle={styles.textCheckbox}
                  containerStyle={styles.checkbox}
                  key={cb.id}
                  title={cb.title}
                  checked={cb.checked}
                  onPress={() => this.toggleCheckbox(cb.id)}
                />
              );
            }
          })}

          <View style={styles.buttons}>
            <TouchableOpacity>
              <Button title="Apply" color="#05C0BA" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: "white",
    flex: 1
  },
  subContainer: {
    marginLeft: 15
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16
  },
  checkbox: {
    margin: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
    marginLeft: -10
  },
  textCheckbox: {
    fontWeight: "normal"
  },
  divider: {
    margin: 10
  },
  buttons: {
    padding: 20
  }
});

export default SideDrawer;
