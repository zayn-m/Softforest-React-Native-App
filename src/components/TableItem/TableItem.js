import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
const tableItem = (props) =>{
    return (<View style={styles.itemContainer}>
                <View style={styles.summaryItem}>
                    <Text style={props.style}>{props.title}</Text>
                </View>
                <View style={styles.summaryItem2}>
                    <Text style={props.style} >${props.price}</Text>
                </View>
            </View>);
};

const styles = StyleSheet.create({
    itemContainer:{
        flexDirection: "row",
        backgroundColor: "white",
        elevation: 2,
        width: "100%",
        height: 30,
        borderBottomWidth:0.2
    },
    summaryItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    summaryItem2:{
        flex:0.5,
        justifyContent:'center',
        alignItems:'center',
        borderLeftWidth:0.2
    }
});

export default tableItem;