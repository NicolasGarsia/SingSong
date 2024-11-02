import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Image } from 'react-native';
import { Link } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    console.log(`Email: ${email}, Password: ${password}`);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={[styles.background, isDarkMode && styles.darkBackground]}>
        <Image source={{uri: 'https://static.vecteezy.com/system/resources/previews/007/058/885/non_2x/modern-fire-flame-music-notes-for-hot-song-logo-design-vector.jpg'}} style={styles.image} />
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Login</Text>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Email"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Senha"
          placeholderTextColor={isDarkMode ? '#888' : '#999'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={[styles.forgotPassword, isDarkMode && styles.darkAccent]} onPress={handleForgotPassword}>
          Esqueceu a Senha?
        </Text>
        <Text style={[styles.registerText, isDarkMode && styles.darkText]}>
          Não Tem conta?
          <Link href="Register" style={[styles.registerLink, isDarkMode && styles.darkAccent]}>
            Register aqui
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#add8e6',
  },
  darkBackground: {
    backgroundColor: '#A9A9A9',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
  },
  darkText: {
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#F5DEB3',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 250,
    color: '#000',
    borderRadius: 40,
  },
  darkInput: {
    borderColor: '#444',
    color: '#fff',
    backgroundColor: '#333',
  },
  loginButton: {
    backgroundColor: '#F5DEB3',
    padding: 15,
    width: 100,
    borderRadius: 25,
    marginBottom: 5,
  },
  loginButtonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  forgotPassword: {
    fontSize: 16,
    color: '#00bf73',
    marginBottom: 10,
  },
  darkAccent: {
    color: '#00008B',
  },
  registerText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  registerLink: {
    fontSize: 16,
    color: 'black',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
});

export default Login;