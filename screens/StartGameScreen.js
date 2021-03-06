import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, 
    TouchableWithoutFeedback, Keyboard, Alert,
     Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';


import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'



const StartGameScreen = props => {
    // ScreenOrientation.getOrientationAsync().then(orientation=>console.log('Oreientation:',orientation))
    const [inputNumber, setInputNumber] = useState('')
    const [selectedNumber, setSelectedNumber] = useState()
    const [confirmed, setConfirmed] = useState(false)
    const [buttonWidth,setButtonWidth] = useState(Dimensions.get('window').width / 4)
    console.log('Button Widht',buttonWidth)
    const changeButtonWidthHandler = () =>{
        setButtonWidth(Dimensions.get('window').width / 4)
    }

    useEffect(()=>{
            Dimensions.addEventListener('change',changeButtonWidthHandler)
        return () => {
            Dimensions.removeEventListener('change',changeButtonWidthHandler)    
        }
    })

    


    const inputNumberHandler = (value) => {
        setInputNumber(value.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setInputNumber('')
        setConfirmed(false)
        Keyboard.dismiss()

    }

    const confirmInputHandler = () => {
        const numberSelected = parseInt(inputNumber)
        if (isNaN(numberSelected) || numberSelected <= 0 || numberSelected > 99) {
            Alert.alert('Invalid Number', 'Please select number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setConfirmed(true)
        setInputNumber('')
        setSelectedNumber(numberSelected)
        Keyboard.dismiss()
    }
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>Entered Number is</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton color={Colors.primary} onPress={() => props.onSelectNumber(selectedNumber)} > START GAME </MainButton>
                {/* <Button  title='START GAME'  color={Colors.primary}  onPress={() => props.onSelectNumber(selectedNumber)}  /> */}
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={50}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game</Text>
                        <Card style={styles.inputContainer} >
                            <BodyText>Select a Number</BodyText>
                            <Input
                                style={styles.input}
                                value={inputNumber}
                                maxLength={2}
                                keyboardType='number-pad'
                                onChangeText={inputNumberHandler}
                                autoCompleteType={'off'}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width:buttonWidth}}>
                                        <Button style={{width:buttonWidth}} title='Res' color={Colors.accent} onPress={resetInputHandler} />
                                </View>
                                <View style={{width:buttonWidth}}>
                                    <Button style={{width:buttonWidth}} title='Confirm' color={Colors.primary} onPress={confirmInputHandler} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    title: {
        fontSize: 20,
        paddingBottom: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        minWidth: 300,
        width: '80%',
        maxWidth: '95%',
        alignItems: 'center',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15
    },
    button: {
        // width: buttonWidth
    },
    input: {
        // width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans'
    }
});

export default StartGameScreen
