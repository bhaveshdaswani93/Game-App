import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';


import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'

const StartGameScreen = props => {
    const [inputNumber, setInputNumber] = useState('')
    const [selectedNumber, setSelectedNumber] = useState()
    const [confirmed, setConfirmed] = useState(false)

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
                <Button title="START GAME" color={Colors.primary} onPress={()=>props.onSelectNumber(selectedNumber)} />
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game</Text>
                <Card style={styles.inputContainer} >
                    <Text>Select a Number</Text>
                    <Input
                        style={styles.input}
                        value={inputNumber}
                        maxLength={2}
                        keyboardType='number-pad'
                        onChangeText={inputNumberHandler}
                        autoCompleteType={'off'}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button style={styles.input} title='Reset' color={Colors.accent} onPress={resetInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button style={styles.input} title='Confirm' color={Colors.primary} onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
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
        fontFamily:'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15
    },
    button: {
        width: 80
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop:20,
        alignItems:'center'
    }
});

export default StartGameScreen
