import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [imc, setImc] = useState(null);

  const calcularIMC = () => {
    const alturaEmMetros = parseFloat(altura);
    const pesoEmKg = parseFloat(peso);

    if (alturaEmMetros && pesoEmKg) {
      const imcCalculado = pesoEmKg / (alturaEmMetros * alturaEmMetros);
      setImc(imcCalculado.toFixed(2));

      if (imcCalculado < 18.5) setResultado('Abaixo do peso');
      else if (imcCalculado >= 18.5 && imcCalculado < 24.9) setResultado('Peso normal');
      else if (imcCalculado >= 25 && imcCalculado < 29.9) setResultado('Sobrepeso');
      else if (imcCalculado >= 30 && imcCalculado < 39.9) setResultado('Obesidade');
      else setResultado('Obesidade grave');
    } else {
      setResultado('Por favor, insira valores válidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/balanca.jpg')} style={styles.image} />
      <Text style={styles.title}>Calculadora de IMC</Text>

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

      {imc && (
        <View style={styles.result}>
          <Text style={styles.resultText}>IMC: {imc}</Text>
          <Text style={styles.resultText}>{resultado}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
