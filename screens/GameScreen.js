import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, Alert, FlatList, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card';
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'


const generateRandomNumber = (min, max, excludeNumber) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    let rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === excludeNumber) {
        return generateRandomNumber(min, max, excludeNumber)
    } else {
        return rndNum;
    }
}

const renderListItem = (guessListNum, guessItem) => {
    return (
        <View style={styles.listItem} key={Math.random().toString()}>
            <BodyText>#{guessListNum - guessItem.index}</BodyText>
            <BodyText>{guessItem.item}</BodyText>

        </View>
    )
}

const GameScreen = props => {
    const guessMin = useRef(1)
    const guessMax = useRef(100)
    const initialGuess = generateRandomNumber(guessMin.current, guessMax.current, props.userChoice);
    const [guessNumber, setGuessNumber] = useState(initialGuess)
    // const [rounds, setRounds] = useState(0)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const [availableWidth, setAvailableWidth] = useState(Dimensions.get('window').width);
    const [availableHeight, setAvailableHeight] = useState(Dimensions.get('window').height);
    console.log(pastGuesses);
    console.log('max', guessMax.current);
    console.log('min', guessMin.current);

    let numberContainerStyle = styles.numberContainerBig;
    if (Dimensions.get('window').height < 600) {
        numberContainerStyle = styles.numberContainerSmall
    }


    useEffect(() => {
        if (props.userChoice === guessNumber) {
            props.onGameEnd(pastGuesses.length)
        }
    }, [guessNumber])

    useEffect(() => {
        const layoutChangeHandler = () => {
            setAvailableWidth(Dimensions.get('window').width)
            setAvailableHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change', layoutChangeHandler)
        return () => {
            Dimensions.removeEventListener('change', layoutChangeHandler)
        }
    })

    const guessAnotherNumber = direction => {
        if ((direction === 'lower' && guessNumber < props.userChoice) || (direction === 'greater' && guessNumber > props.userChoice)) {
            Alert.alert('Wrong Input!', 'Please provide correct input for guess.', [{ text: 'okay', style: 'cancel' }])
            return;
        }
        if (direction === 'lower') {
            guessMax.current = guessNumber
        } else {
            guessMin.current = guessNumber + 1
        }
        console.log('new max', guessMax.current);
        console.log('new min', guessMin.current);
        const newNumber = generateRandomNumber(guessMin.current, guessMax.current, guessNumber)
        setGuessNumber(newNumber)
        // setRounds(rounds => {
        //     return rounds + 1
        // })
        setPastGuesses(curPastGuesses => {
            return [newNumber, ...curPastGuesses];
        })

    }

    let gameView = (
        <React.Fragment>
            <NumberContainer style={numberContainerStyle}>{guessNumber}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={guessAnotherNumber.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={guessAnotherNumber.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
        </React.Fragment>
    );

    if (availableHeight < 500) {
        gameView =  (
                <View style={styles.layoutLandscape}>
                    <MainButton onPress={guessAnotherNumber.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer style={numberContainerStyle}>{guessNumber}</NumberContainer>
                    <MainButton onPress={guessAnotherNumber.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>

                </View>
        );
    }


    return (
        <View style={styles.screen}>
            <Text>Opponent Guess</Text>
            {gameView}
            <View style={styles.listContainer}>
              
                <FlatList contentContainerStyle={styles.list} keyExtractor={item => item.toString()} data={pastGuesses} renderItem={(itemList) => renderListItem(pastGuesses.length, itemList)} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        width: 300,
        maxWidth: '80%',
        justifyContent: "space-around"
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 20,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        // width: '60%'
        // backgroundColor:'white'
    },
    list: {
        // alignItems: "center",
        justifyContent: "flex-end",
        flexGrow: 1
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        flex: 1
    },
    numberContainerBig: {
        marginVertical: 40
    },
    numberContainerSmall: {
        marginVertical: 5
    },
    layoutLandscape:{
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-around',
        alignItems:'center'
    }

})

export default GameScreen