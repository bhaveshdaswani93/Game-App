import React from 'react'
import { View, StyleSheet, Button, Text, Image } from 'react-native'

import BodyTitle from '../components/BodyTitle'
import BodyText from '../components/BodyText'
import Color from '../constants/colors';
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <BodyTitle>Game is Over.</BodyTitle>
            <View style={styles.imageContainer}>
                {/* <Image style={styles.image} resizeMode='cover' source={require('../assets/images/success.png')} /> */}
                <Image fadeDuration={1000} style={styles.image} resizeMode='cover' source={{ uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg' }} />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your Phone took <Text style={styles.highlight}>{props.rounds}</Text> to complete the game. The guessed number is <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
            </View>
            {/* <BodyText>Guessed Number is: {props.userNumber}</BodyText> */}
            <MainButton onPress={props.onResetGame}> Restart Game </MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        height: 300,
        width: 300,
        marginVertical: 20,
        borderRadius: 150,
        borderColor: 'black',
        borderWidth: 2,
        overflow: 'hidden'
    },
    resultText: {
        textAlign: 'center',
        fontSize:20
    },
    resultContainer: {
        marginHorizontal:20,
        marginVertical:10
    },
    highlight:{
        color:Color.primary
    }
});

export default GameOverScreen;

