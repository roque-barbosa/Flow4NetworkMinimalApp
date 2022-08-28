import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

export const TokenScreen: React.FC = ({navigation}: any) => {
  const [tokenValue, setTokenValue] = useState<string>('');

  return (
    <View style={Styles.screenWrapper}>
      <Text style={Styles.label}>Seu token de acesso:</Text>
      <TextInput
        placeholder="Token"
        style={Styles.input}
        value={tokenValue}
        onChangeText={setTokenValue}
      />
      <Pressable
        disabled={tokenValue === '' ? true : undefined}
        style={Styles.button}
        onPress={() => {
          navigation.navigate('TestScreen', {
            // token: '2079486d-a46f-4361-96e8-125111b8d65a',
            token: tokenValue,
          });
        }}>
        <Text style={Styles.buttonText}>Fazer teste</Text>
      </Pressable>
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
  label: {
    fontSize: 28,
    marginBottom: 30,
    color: 'black',
  },
  input: {
    height: 44,
    width: '80%',
    borderRadius: 8,
    fontSize: 16,
    margin: 16,
    color: 'black',
    backgroundColor: '#c8c6c6',
  },
  button: {
    display: 'flex',
    height: 44,
    borderRadius: 8,
    backgroundColor: '#676566',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  buttonText: {
    fontSize: 20,
  },
});
