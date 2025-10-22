import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const validateEmail = () => {
    return email.includes('@') ? '' : 'Invalid email'
  }

  const validatePassword = () => {
    return password.length >= 6 ? '' : 'Password must be at least 6 characters'
  }

  const handleLogin = async () => {
    setShowErrors(true);
    const emailError = validateEmail();
    const passwordError = validatePassword();

    if (emailError || passwordError) return;

    try {
      await login(email, password)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(String(err))
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <InputField 
        label='Email' 
        value={email} 
        onChangeText={(text) => {
          setEmail(text);
          if (showErrors) validateEmail();
        }} 
        error={ showErrors ? validateEmail() : '' } 
      />
      <InputField 
        label='Password' 
        value={password} 
        onChangeText={(text) => {
          setPassword(text);
          if (showErrors) validatePassword();
        }} 
        secureTextEntry
        error={ showErrors ? validatePassword() : '' } 
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    color: '#007bff',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});


