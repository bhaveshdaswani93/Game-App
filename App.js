import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'


import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'



const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/font/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/font/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState()
  const [round, setRound] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  const numSelectedHandler = (choosenNumber) => {
    setSelectedNumber(choosenNumber)
  }

  const incRoundHandler = (numberOfRounds) => {
    setRound(numberOfRounds)
  }

  const resetGameHandler = () => {
    setSelectedNumber(null);
    setRound(0)
  }

  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => { setDataLoaded(true) }}
      onError={(err) => { console.log(err) }}
    />
  }


  let renderScreen = <StartGameScreen onSelectNumber={numSelectedHandler} />
  // let renderScreen = <GameOverScreen rounds={1} userNumber={1} onResetGame={resetGameHandler} />
  if (selectedNumber && round <= 0) {
    renderScreen = <GameScreen onGameEnd={incRoundHandler} userChoice={selectedNumber} />
  } else if (round > 0) {
    renderScreen = <GameOverScreen rounds={round} userNumber={selectedNumber} onResetGame={resetGameHandler} />
  }
  return (
   
      <View style={styles.screen}>
        <Header title='Guess A Number' />
        {renderScreen}
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
