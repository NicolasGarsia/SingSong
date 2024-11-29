import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function TelaPerfil() {
  const router = useRouter()

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [imagemPerfil, setImagemPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const enviarImagem = async (uriImagem) => {
    try {
      const dados = {
        file: uriImagem,
        upload_preset: 'ml_default',
      };

      const res = await fetch('https://api.cloudinary.com/v1_1/dr05rjh8e/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!res.ok) {
        throw new Error(`Erro ${res.status}: ${res.statusText}`);
      }

      const resultado = await res.json();
      setImagemPerfil(resultado.url);
      console.log(resultado);
    } catch (e) {
      console.error('Erro ao enviar imagem:', e);
      Alert.alert('Erro', 'Não foi possível enviar a imagem.');
    }
  };

  const buscarDadosUsuario = async () => {
    try {
      const response = await fetch('http://192.168.0.100:8000/get.users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('Resposta não é JSON');
      }

      const dadosUsuario = await response.json();
      setNome(dadosUsuario.name);
      setEmail(dadosUsuario.email);
      setBio(dadosUsuario.bio);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };

  const selecionarImagem = async () => {
    const resultadoPermissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (resultadoPermissao.granted === false) {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para selecionar uma imagem.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagemPerfil(resultado.assets[0].uri);
      enviarImagem(resultado.assets[0].uri);
    }
  };

  const salvarAlteracoes = () => {
    setEditando(false);
    Alert.alert('Perfil atualizado', 'Suas alterações foram salvas.');
  };

  const alterarSenha = () => {
    if (novaSenha === confirmarSenha) {
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setModalVisivel(false);
    } else {
      Alert.alert('Erro', 'As senhas não coincidem.');
    }
  };

  const sair = () => {
    router.push('/Home')
  };

  useEffect(() => {
    buscarDadosUsuario();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bloco}>
        <View style={styles.margem}>
          <View style={styles.cabecalhoPerfil}>
            <TouchableOpacity onPress={selecionarImagem}>
              <Image
                source={imagemPerfil ? { uri: imagemPerfil } : require('../../../assets/images/avatar.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
            {editando ? (
              <TextInput
                style={styles.inputNome}
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
            ) : (
              <Text style={styles.nome}>{nome}</Text>
            )}
            <Text style={styles.email}>{email}</Text>
          </View>

          <View style={styles.corpoPerfil}>
            <Text style={styles.tituloBio}>Biografia</Text>
            {editando ? (
              <TextInput
                style={styles.inputBio}
                value={bio}
                onChangeText={(text) => setBio(text)}
                multiline
              />
            ) : (
              <Text style={styles.bio}>{bio}</Text>
            )}
          </View>

          <TouchableOpacity onPress={editando ? salvarAlteracoes : () => setEditando(true)} style={styles.botao}>
            <Text style={styles.textoBotao}>{editando ? 'Salvar' : 'Editar Perfil'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisivel(true)} style={styles.botao}>
            <Text style={styles.textoBotao}>Trocar Senha</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerSair}>
        <TouchableOpacity onPress={sair} style={styles.botao}>
          <Text style={styles.textoBotao}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisivel} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>Trocar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              secureTextEntry
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar nova senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity onPress={alterarSenha} style={styles.botao}>
              <Text style={styles.textoBotao}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisivel(false)} style={styles.botao}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    padding: 20,
  },
  bloco: {
    color: '#FF1493',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
    flex: 1,
  },
  cabecalhoPerfil: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FF1493', 
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#FF1493',
    marginBottom: 20,
  },
  corpoPerfil: {
    marginBottom: 20,
  },
  tituloBio: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#FF1493',
    lineHeight: 22,
  },
  inputBio: {
    fontSize: 16,
    color: '#white', 
    borderColor: '#FF1493', 
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#f9f9f9',
    lineHeight: 22,
  },
  inputNome: {
    borderWidth: 1,
    borderColor: '#FF1493',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#FF1493',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom:10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalConteudo: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'Black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF4500',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFC0CB', 
    color: '#white',
  },
  containerSair: {
    flexDirection: 'row',
    justifyContent: 'center', 
    marginTop: 'auto', 
  },
});
