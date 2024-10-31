import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const loadFormData = async () => {
    try {
      const savedName = await AsyncStorage.getItem('name');
      const savedEmail = await AsyncStorage.getItem('email');
      if (savedName !== null) setName(savedName);
      if (savedEmail !== null) setEmail(savedEmail);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
      console.error('Erro ao carregar dados:', error);
    }
  };

  const showFormData = async () => {
    try {
      const savedName = await AsyncStorage.getItem('name');
      const savedEmail = await AsyncStorage.getItem('email');
      Alert.alert(
        'Dados Salvos',
        `Nome: ${savedName || 'Não disponível'}\nEmail: ${savedEmail || 'Não disponível'}`
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível exibir os dados.');
      console.error('Erro ao exibir dados:', error);
    }
  };

  useEffect(() => {
    loadFormData();
  }, []);

  const saveFormData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
      console.error('Erro ao salvar dados:', error);
    }
  };

  const clearFormData = async () => {
    try {
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('email');
      setName('');
      setEmail('');
      Alert.alert('Sucesso', 'Dados apagados com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível apagar os dados.');
      console.error('Erro ao apagar dados:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário de Persistência</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TouchableOpacity style={styles.button} onPress={saveFormData}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearFormData}>
        <Text style={styles.buttonText}>Limpar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.showButton]} onPress={showFormData}>
        <Text style={styles.buttonText}>Exibir Dados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  clearButton: {
    backgroundColor: '#ff4d4d',
  },
  showButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
