import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

function formatNumber(value: number) {
  // show up to 2 decimals, remove trailing zeros
  const s = value.toFixed(2);
  return s.replace(/\.00$|0$/, (m) => (m === '.00' ? '' : ''));
}

export default function AppConvert() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [error, setError] = useState('');

  const parseInput = (text: string) => {
    const normalized = text.replace(',', '.');
    if (normalized.trim() === '') return null;
    const n = Number(normalized);
    return Number.isFinite(n) ? n : NaN;
  };

  const onChangeCelsius = (text: string) => {
    setCelsius(text);
    setError('');
    const n = parseInput(text);
    if (n === null) {
      setFahrenheit('');
      return;
    }
    if (Number.isNaN(n)) {
      setError('Número inválido');
      return;
    }
    const f = n * 1.8 + 32;
    setFahrenheit(formatNumber(f));
  };

  const onChangeFahrenheit = (text: string) => {
    setFahrenheit(text);
    setError('');
    const n = parseInput(text);
    if (n === null) {
      setCelsius('');
      return;
    }
    if (Number.isNaN(n)) {
      setError('Número inválido');
      return;
    }
    const c = (n - 32) / 1.8;
    setCelsius(formatNumber(c));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <Text style={styles.title}>Conversor de Temperatura</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Celsius</Text>
        <TextInput
          style={styles.input}
          value={celsius}
          onChangeText={onChangeCelsius}
          placeholder="°C"
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Fahrenheit</Text>
        <TextInput
          style={styles.input}
          value={fahrenheit}
          onChangeText={onChangeFahrenheit}
          placeholder="°F"
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.note}>Fórmulas: Fahrenheit = Celsius × 1.8 + 32</Text>
      <Text style={styles.note}>Celsius = (Fahrenheit - 32) / 1.8</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  row: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'android' ? 6 : 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
  note: {
    marginTop: 12,
    textAlign: 'center',
    color: '#444',
  },
});
