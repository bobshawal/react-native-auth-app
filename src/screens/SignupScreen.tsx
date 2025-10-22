import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../components/InputField';
import { AuthContext } from '../context/AuthContext';

export default function SignupScreen({ navigation }: { navigation: any }) {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const validateName = () => {
    return name ? '' : 'Name is required';
  }

  const validateEmail = () => {
    return email.includes('@') ? '' : 'Invalid email';
  }

  const validatePassword = () => {
    return password.length >= 6 ? '' : 'Password must be at least 6 characters';
  }

  const handleSignup = async () => {
    setShowErrors(true);
     const nameError = validateName();
    const emailError = validateEmail();
    const passwordError = validatePassword();

    if (nameError || emailError || passwordError) return;
   
    try {
      await signup(name, email, password)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(String(err))
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <InputField 
        label='Name' 
        value={name} 
        onChangeText={(text) => {
          setName(text);
          if (showErrors) validateName();
        }} 
        error={ showErrors ? validateName() : '' }
      />
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    marginTop: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});
