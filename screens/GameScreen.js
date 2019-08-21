import React, { useState,useRef,useEffect } from 'react'
import { View,StyleSheet,Text,Button,Alert } from  'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card';

const generateRandomNumber = (min,max,excludeNumber) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    let rndNum = Math.floor(Math.random()*(max - min)) + min
    if(rndNum === excludeNumber) {
        return generateRandomNumber(min,max,excludeNumber)
    } else {
        return rndNum;
    }
}

const GameScreen = props => {
    const guessMin = useRef(1)
    const guessMax = useRef(100)
    const [guessNumber,setGuessNumber] = useState(generateRandomNumber(guessMin.current,guessMax.current,props.userChoice))
    const [rounds,setRounds] = useState(0)
    

    useEffect(()=>{
        if(props.userChoice === guessNumber) {
            props.onGameEnd(rounds)
        }
    },[guessNumber])
    
    const guessAnotherNumber = direction => {
        if( ( direction === 'lower' && guessNumber < props.userChoice ) || ( direction === 'greater'  && guessNumber > props.userChoice ) ) {
            Alert.alert('Wrong Input!','Please provide correct input for guess.',[{text:'okay',style:'cancel'}])
            return;
        }
        if(direction === 'lower') {
            guessMax.current = guessNumber
        } else {
            guessMin.current = guessNumber
        }
        setGuessNumber(generateRandomNumber(guessMin.current,guessMax.current,guessNumber))
        setRounds(rounds=>{
            return rounds+1
        })
        
    }

    return (
        <View style={styles.screen}> 
            <Text>Opponent Guess</Text>
            <NumberContainer>{guessNumber}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title='Lower' onPress={guessAnotherNumber.bind(this,'lower')}></Button>
                <Button title='Higher' onPress={guessAnotherNumber.bind(this,'greater')}></Button>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:"center"
    },
    buttonContainer:{
        flexDirection:"row",
        width:300,
        maxWidth:'80%',
        justifyContent:"space-around"
    }
})

export default GameScreen