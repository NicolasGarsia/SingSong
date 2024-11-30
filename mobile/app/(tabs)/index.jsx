import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, SafeAreaView, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';


export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Todos os campos devem ser preenchidos");
    }

    const formData = { email: email, senha: password };
    try {
      const res = await fetch("http://localhost:8000/autenticacao/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json()
      switch (res.status) {
        case 200:
          alert("Usuario logado");
          console.log(data)
          localStorage.setItem("id", data.id);
          let testeID = localStorage.getItem('id')
          console.log(testeID);
          router.push("/Home");
          break;
        case 406:
          alert("Preencha todos os campos");
          break;
        case 404:
          alert("Email não encontrado");
          break;
        case 400:
          alert("Senha incorreta");
          break;

        default:
          alert("Erro ao se conectar com servidor");
          break;
      }
    } catch (error) {}
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cabecalho}>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/007/058/885/non_2x/modern-fire-flame-music-notes-for-hot-song-logo-design-vector.jpg' }}
            style={styles.imagem}
          />
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
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Link href="/Home">
          <TouchableOpacity style={styles.botao} onPress={handleLogin}>
            <Text style={styles.textoBotao} >Entrar</Text>
          </TouchableOpacity>
          </Link>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 40,
  },
  textoCabecalho: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF1493',
    textAlign: 'center',
  },
  textoSubCabecalho: {
    fontSize: 16,
    color: '#FF4500',
    marginTop: 10,
    textAlign: 'center',
  },
  formulario: {
    width: '100%',
    maxWidth: 350,
    alignSelf: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: 'grey',
    color: '#fff',
  },
  botao: {
    backgroundColor: '#a80453',
    height: 45,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
  },
  imagem: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
