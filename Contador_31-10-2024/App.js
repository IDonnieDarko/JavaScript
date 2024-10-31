import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function App() {
  const [count, setCount] = useState(0);

  // Função para carregar o valor armazenado
  const loadCount = async () => {
    try {
      const savedCount = await AsyncStorage.getItem('count');
      if (savedCount !== null) {
        setCount(JSON.parse(savedCount));
      }
    } catch (error) {
      console.error('Erro ao carregar o contador:', error);
    }
  };

  // Carrega o valor ao iniciar o componente
  useEffect(() => {
    loadCount();
  }, []);

  // Salva o valor atualizado do contador sempre que ele muda
  useEffect(() => {
    const saveCount = async () => {
      try {
        await AsyncStorage.setItem('count', JSON.stringify(count));
      } catch (error) {
        console.error('Erro ao salvar o contador:', error);
      }
    };
    saveCount();
  }, [count]);

  // Funções de incremento, decremento e zerar
  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  const reset = () => setCount(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador: {count}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>Incrementar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>Decrementar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Zerar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28, // Tamanho maior para telas grandes
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column', // Alinha botões verticalmente
    alignItems: 'center',
    width: '80%', // Centraliza os botões no container
  },
  button: {
    width: '100%', // Ocupa 100% da largura do container
    marginVertical: 10, // Espaçamento entre botões
    paddingVertical: 18, // Aumenta altura do botão para uma melhor interação
    backgroundColor: '#007bff',
    borderRadius: 25, // Bordas mais arredondadas para estilo moderno
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, // Tamanho de fonte maior para legibilidade
    textAlign: 'center',
  },
});

export default App;
