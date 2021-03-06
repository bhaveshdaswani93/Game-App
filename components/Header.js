import React from 'react';
import { StyleSheet, Text, View,Platform } from 'react-native';

import Colors from '../constants/colors'
import DefaultStyle from '../constants/default-styles'

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={{...DefaultStyle.title,...styles.headerTitle}}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        alignItems:'center',
        justifyContent:'center',
        height:90,
        backgroundColor:Platform.OS === 'android'?Colors.primary:'white',
        paddingTop:36
        // width:'100%'  
    },
    headerTitle:{
        fontSize:18,
        color:Platform.OS === 'android'?'white':'black'
    }
    
})

export default Header;