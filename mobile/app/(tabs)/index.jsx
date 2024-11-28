import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, SafeAreaView, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      return alert('Todos os campos devem ser preenchidos');
    }

    const formData = { email: email, password: password };

    try {
      const res = fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      switch (res.status) {
        case 2010:
          alert("ok");
          console.log(res.token)
          break;
        case 406:
          alert("Preencha todos os campos");
          break;
        case 418:
          alert("Email já cadastrado");
          break;
        default:
          alert("Erro ao se conectar com servidor");
          break;
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cabecalho}>
          <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/007/058/885/non_2x/modern-fire-flame-music-notes-for-hot-song-logo-design-vector.jpg' }} style={styles.imagem} />
          <Text style={styles.textoCabecalho}>Sing Song</Text>
          <Text style={styles.textoSubCabecalho}>Venha ouvir sua música favorita!</Text>
        </View>

        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          
          <TouchableOpacity style={styles.botao} onPress={handleLogin}>
            <Text style={styles.textoBotao}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.containerCadastro}>
            <Text style={styles.textoCadastro}>Tu não tem conta ainda?</Text>
            <Link href="/Cadastro">
              <Text style={styles.linkCadastro}>Cadastre-se</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 40,
  },
  textoCabecalho: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF1493',
  },
  textoSubCabecalho: {
    fontSize: 16,
    color: '#FF4500',
    marginTop: 10,
  },
  formulario: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: 'grey',
    color: '#FF4500',
  },
  botao: {
    backgroundColor: '#a80453',
    height: 50,
    width: '80%',          
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,   
    alignSelf: 'center',  
    marginTop: 20,      
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerCadastro: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textoCadastro: {
    fontSize: 16,
    color: '#FF4500',
    marginRight: 5,
  },
  linkCadastro: {
    color: '#FF1493',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  imagem: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
