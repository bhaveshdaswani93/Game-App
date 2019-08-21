import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.card,...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:'white',
        elevation:8,
        padding:20,
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.5,
        shadowRadius:6,
        borderRadius:8
    }
})

export default Card;