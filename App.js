
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TextInput,
  Image, StyleSheet,
  Alert,
  TouchableOpacity,
  Text, Button, View, ImageBackground
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MapView from 'react-native-maps';
import Swiper from 'react-native-swiper';
import { Audio } from 'expo-av';
import { CheckBox } from 'react-native-elements';

const Stack = createStackNavigator();

function LoginScreen({navigation}) {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  // Funçao que simla autenticação
  const handleLogin = () => { 
    const validText = 'admin'; // Usuário válido 
    const validNumber = '55138269aB#'; // Senha válida

    if (text === validText && number === validNumber) {
      navigation.navigate('Banco de Dados')
      // Aqui você pode redirecionar para a tela principal do app
    } else {
      Alert.alert('Usuário ou senha incorretos!');
    }
  };

  return (
    <SafeAreaView style={{ paddingVertical: 190, padding: 13, backgroundColor: '#a09fb1'  }}>
      <Image
        source={require('./Imagens/unt.jpg')}
        style={{ width: 140, height: 120 }}
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="login"
        alignItems="right"
        paddingVertical= "13"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="senha"
        keyboardType="text"
        secureTextEntry = {true} 
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'white', // Cor do fundo do botão
          paddingVertical: 13, // Altura do botão
          paddingHorizontal: 23, // Largura do botão
          borderRadius: 50, // Bordas arredondadas
          elevation: 5, // Sombra para efeito 3D no Android
        }}

        onPress={handleLogin}>
        <Text style={{ color: 'black', fontSize: 10, fontWeight: 'bold' }}>
          Press Here
        </Text>
      </TouchableOpacity>
      <Text style={{
          paddingVertical: 150, // Altura do botão
          paddingHorizontal: 60, // Largura do botãO
        }} 
      > CNPJ: 42.675.888/0001-02 </Text>
    </SafeAreaView>
  );
}

// Tela principal

function HomeScreen({navigation}) {
 const [checkBoxes, setCheckBoxes] = useState([false, false, false, false]);
const[sound, setSound] = useState();

// Função para tocar áudio
async function jingle() {
  const { sound } = await Audio.Sound.createAsync(
    require('./Som/1.mp4')
  );
  setSound(sound);
  await sound.playAsync();
}

useEffect(()=> {
  return sound
  ? () => {
    sound.unloadAsync();
  }
  : undefined;
}, [sound]);

//função para Banco de Dados 
 const handleCheckInToggle = (index) => {
    const updatedCheckBoxes = [...checkBoxes];
    updatedCheckBoxes[index] = !updatedCheckBoxes[index];
    setCheckBoxes(updatedCheckBoxes);
  };


  return (

      <Swiper showsButtons={true}  >
      {[require('./Imagens/3.JPG'), require('./Imagens/7.jpg'), require('./Imagens/6.jpg'), require('./Imagens/44.jpg')].map((image, index) => (
        <View key={index}>
          <Image source={image} style={styles.image} />
          <CheckBox
            title="Check-in"
            checked={checkBoxes[index]}
            onPress={() => handleCheckInToggle(index)}
          />
          {index === 3 && (
            <>
              <Button onPress={() => navigation.navigate('Mapa')} title="Ir para o mapa" />
              <Button title="Jingle" onPress={jingle} color="#841584" />
            </>
          )}
        </View>
      ))}
    </Swiper>
  );
}


function NotificationsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button style={{paddingVertical: 'vertical'}}
        onPress={() => navigation.goBack()} title="Voltar para o Banco de Dados" />
       
      <MapView style={styles.map}/>

       <Button
          title="Bloco de Anotações"
          onPress={() => navigation.navigate('Bloco de Anotações')}
          color="#007AFF"
        />

    </View>
    
  );
}

function BlocoDeAnotacoes({navigation}) { 
   const [note, setNote] = useState('');
   const [savedNote, setSavedNote] = useState('');

   const saveNote = () => {
     setSavedNote(note);
     setNote('');
   };
 return (
    <View style={styles.container}>
      <Text style={styles.title}>Bloco de Anotações</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="Escreva sua anotação aqui..."
        value={note}
        onChangeText={(text) => setNote(text)}
        multiline
      />
      <Button title="Salvar Anotação" onPress={saveNote} />
      {savedNote ? <Text style={styles.note}>Anotação Salva: {savedNote}</Text> : null}
      <Button onPress={() => navigation.goBack()} title="Voltar" />
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Arthur FA fotografia ">
        <Stack.Screen name="Arthur FA fotografia 📸" component={LoginScreen} /> 
        <Stack.Screen name="Banco de Dados" component={HomeScreen} />
        <Stack.Screen name= "Mapa"component={NotificationsScreen}/>  
        <Stack.Screen name= "Bloco de Anotações" component={BlocoDeAnotacoes}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({

  input: {
    backgroundColor: 'white',
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 23,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 13,
    paddingHorizontal: 23,
    borderRadius: 50,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cnpj: {
    paddingVertical: 150,
    paddingHorizontal: 60,
  },
  image: {
    width: 370,
    height: 370,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '80%',
    height: '80%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noteInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  note: {
    marginTop: 16,
    fontSize: 18,
  },
});



