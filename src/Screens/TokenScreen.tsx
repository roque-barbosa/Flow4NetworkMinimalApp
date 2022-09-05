import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

export const TokenScreen: React.FC = ({navigation}: any) => {
  const [tokenValue, setTokenValue] = useState<string>('');

  return (
    <View style={Styles.screenWrapper}>
      <View style={Styles.contentWrapper}>
        <Text style={Styles.title}>Teste de rede</Text>
        <View style={Styles.inputWrapper}>
          <Text style={Styles.inputLabel}>Token de identificação:</Text>
          <TextInput
            placeholder="Seu token"
            style={Styles.input}
            value={tokenValue}
            onChangeText={setTokenValue}
            placeholderTextColor={'#505050'}
          />
        </View>
        <Pressable
          style={Styles.button}
          onPress={() => {
            navigation.navigate('TestScreen', {
              token: tokenValue,
            });
          }}>
          <Text style={Styles.buttonText}>Iniciar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  screenWrapper: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    display: 'flex',
    height: '40%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    color: 'black',
  },
  inputWrapper: {
    display: 'flex',
    width: '80%',
  },
  input: {
    height: 44,
    // width: '80%',
    borderRadius: 8,
    fontSize: 16,
    marginTop: 3,
    backgroundColor: '#ECFDFF',
  },
  inputLabel: {
    fontSize: 14,
    color: 'black',
  },
  button: {
    display: 'flex',
    height: 44,
    borderRadius: 8,
    backgroundColor: '#5EC1F9',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
