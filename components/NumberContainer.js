import React from 'react';
import { StyleSheet, View,Text } from 'react-native';

import Colors from '../constants/colors'

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderColor:Colors.accent,
        borderWidth:2,
        padding:10,
        marginVertical:20,
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center"

    },
    number:{
        fontSize:22,
        color:Colors.accent
    }
    
})

export default NumberContainer;