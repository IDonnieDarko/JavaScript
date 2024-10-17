
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button } from 'react-native';

const App: React.FC = () => {
  const [escolhaUsuario, setEscolhaUsuario] = useState<string>('');
  const [escolhaApp, setEscolhaApp] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');

  const opcoes = ['Pedra', 'Papel', 'Tesoura'];

  const jogar = (usuarioEscolha: string) => {
    const appEscolha = opcoes[Math.floor(Math.random() * opcoes.length)];
    setEscolhaUsuario(usuarioEscolha);
    setEscolhaApp(appEscolha);
    
    // Determinando o vencedor
    if (usuarioEscolha === appEscolha) {
      setResultado('Empate!');
    } else if (
      (usuarioEscolha === 'Pedra' && appEscolha === 'Tesoura') ||
      (usuarioEscolha === 'Papel' && appEscolha === 'Pedra') ||
      (usuarioEscolha === 'Tesoura' && appEscolha === 'Papel')
    ) {
      setResultado('Você ganhou!');
    } else {
      setResultado('Você perdeu!');
    }
  };

  const jogarNovamente = () => {
    setEscolhaUsuario('');
    setEscolhaApp('');
    setResultado('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedra, Papel e Tesoura</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => jogar('Pedra')}>
          <Image source={require('../../assets/images/pedra.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => jogar('Papel')}>
          <Image source={require('../../assets/images/papel.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => jogar('Tesoura')}>
          <Image source={require('../../assets/images/tesoura.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
      {resultado ? (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Você escolheu: {escolhaUsuario}</Text>
          <Text style={styles.result}>O app escolheu: {escolhaApp}</Text>
          <Text style={styles.result}>{resultado}</Text>
          <Button title="Jogar Novamente" onPress={jogarNovamente} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
