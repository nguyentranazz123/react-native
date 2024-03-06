import React from "react";
import {View, Text, StyleSheet} from "react-native";

export default function Heading({ text, isViewAll= false }) {
    return(
        <View style={styles.container}>
            <Text style={styles.heading}> {text}</Text>
            {isViewAll? <Text>View all</Text>:null}
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        alignContent:   'center',
        justifyContent: 'space-between',

    },
    heading:{
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginBottom:10,
    },
    
});