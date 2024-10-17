import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';

const App: React.FC = () => {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (pesoNum > 0 && alturaNum > 0) {
      const imc = pesoNum / (alturaNum * alturaNum);
      let faixa = '';

      if (imc < 18.5) {
        faixa = 'Abaixo do peso';
      } else if (imc < 24.9) {
        faixa = 'Peso normal';
      } else if (imc < 29.9) {
        faixa = 'Sobrepeso';
      } else if (imc < 39.9) {
        faixa = 'Obesidade';
      } else {
        faixa = 'Obesidade grave';
      }

      setResultado(`IMC: ${imc.toFixed(2)} - ${faixa}`);
    } else {
      setResultado('Por favor, insira valores válidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
      <Image
        source={require('../../assets/images/balanca.png')} // Caminho atualizado
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      <Button title="Calcular IMC" onPress={calcularIMC} />
      {resultado ? <Text style={styles.result}>{resultado}</Text> : null}
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default App;
