import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleRegister = () => {
        if (!nome || !nascimento || !email || !senha) {
            return alert('Todos os campos devem ser preenchidos');
        }

        const formData = { nome: nome, nascimento: nascimento, email: email, senha: senha };

        try {
            const res = fetch("http://localhost:8000/registro", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            switch (res.status) {
                case 201:
                    alert("Usuário criado");
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
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.cabecalho}>
                    <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/007/058/885/non_2x/modern-fire-flame-music-notes-for-hot-song-logo-design-vector.jpg' }} style={styles.imagem} />
                    <Text style={styles.tituloCabecalho}>Sing Song</Text>
                    <Text style={styles.subTituloCabecalho}>Larga de ser burro e cadastre-se logo!</Text>
                </View>

                <View style={styles.formulario}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        placeholderTextColor="#fff"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
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
                        placeholder="dd/mm/aaaa"
                        placeholderTextColor="#fff"
                        value={nascimento}
                        onChangeText={(text) => setNascimento(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#fff"
                        secureTextEntry
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                    />
                    <TouchableOpacity style={styles.botao} onPress={handleRegister}>
                        <Text style={styles.textoBotao}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerCadastro}>
                    <Text style={styles.textoCadastro}>Já tem conta?</Text>
                    <Link href="/">
                        <Text style={styles.linkCadastro}>Entre</Text>
                    </Link>
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
        paddingBottom: 20,
    },
    cabecalho: {
        alignItems: 'center',
        marginBottom: 30,  
    },
    tituloCabecalho: {
        fontSize: 28,  
        fontWeight: 'bold',
        color: '#FF1493',
    },
    subTituloCabecalho: {
        fontSize: 14, 
        color: '#FF4500',
        marginTop: 8,
        marginBottom: 20,  
        textAlign: 'center', 
    },
    formulario: {
        width: '100%',
        maxWidth: 350, 
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 45, 
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,  
        paddingHorizontal: 12,
        marginBottom: 15,  
        fontSize: 14, 
        backgroundColor: 'grey',
        color: '#FF4500',
    },
    botao: {
        backgroundColor: '#a80453',
        height: 45,
        width: '75%',        
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,   
        alignSelf: 'center',  
        marginTop: 20,      
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,  
        fontWeight: 'bold',
    },
    containerCadastro: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15, 
    },
    textoCadastro: {
        fontSize: 14,  
        color: '#FF4500',
        marginRight: 5,
    },
    linkCadastro: {
        color: '#a80000',
        fontSize: 14,  
        fontWeight: 'bold',
        marginLeft: 5,
    },
    imagem: {
        width: 120,  
        height: 120,  
        marginBottom: 15,  
    },
});