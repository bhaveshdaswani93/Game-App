import React from 'react'
import { View,StyleSheet,Button,Text } from 'react-native'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Game is Over. It take {props.rounds} guess</Text>
            <Text>Guessed Number is: {props.userNumber}</Text>
            <Button title='Restart Game' onPress={props.onResetGame}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
});

export default GameOverScreen;

