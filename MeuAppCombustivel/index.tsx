iimport React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';

const App: React.FC = () => {
  const [precoAlcool, setPrecoAlcool] = useState<string>('');
  const [precoGasolina, setPrecoGasolina] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');
  const [limiteAlcool, setLimiteAlcool] = useState<string | null>(null);

  const calcularCombustivel = () => {
    const alcool = parseFloat(precoAlcool);
    const gasolina = parseFloat(precoGasolina);

    if (gasolina > 0) {
      const limite = (gasolina * 0.7).toFixed(2); // Calcula até qual valor do álcool compensa
      setLimiteAlcool(limite);
    }

    if (alcool > 0 && gasolina > 0) {
      const relacao = alcool / gasolina;
      if (relacao < 0.7) {
        setResultado('Abasteça com Álcool');
      } else {
        setResultado('Abasteça com Gasolina');
      }
    } else {
      setResultado('Por favor, insira valores válidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comparação de Combustíveis</Text>
      <Image
        source={require('../../assets/images/combus.png')} // Caminho ajustado
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço do Álcool"
        keyboardType="numeric"
        value={precoAlcool}
        onChangeText={setPrecoAlcool}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço da Gasolina"
        keyboardType="numeric"
        value={precoGasolina}
        onChangeText={setPrecoGasolina}
      />
      <Button title="Calcular" onPress={calcularCombustivel} />
      {resultado ? <Text style={styles.result}>{resultado}</Text> : null}
      {limiteAlcool ? (
        <Text style={styles.limite}>
          Para essa gasolina, vale a pena usar álcool até R$ {limiteAlcool} por litro.
        </Text>
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
  limite: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default App;
