import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import params from './src/params'
import MineField from './src/components/MineField';
import { createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines } from './src/functions';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createSate()
  }

  minesAmout = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createSate = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmout()),
      won: false,
      lost: false,
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeuuuuuuuu', 'Que burro')
    }

    if (won) {
      Alert.alert('Parabens', 'GANHOUUUUUUUUUUUUUUU')
    }

    this.setState({ board, lost, won})

  }

 
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Iniciando o Mines!!</Text>
      <Text style={styles.sectionDescription}>Tamanho da grade:
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>
      <View style={styles.board}>
        <MineField board={this.state.board} 
        onOpenField={this.onOpenField}/>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
