import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TestScreen} from './Screens/TestScreen';
import {TokenScreen} from './Screens/TokenScreen';

export const Router: React.FC = () => {
  const config = {
    screens: {
      TestScreen: {
        path: 'test/:token',
        parse: {
          token: (token: string) => `${token}`,
        },
      },
      TokenScreen: {
        path: 'TokenScreen',
      },
    },
  };
  return (
    <NavigationContainer
      linking={{
        prefixes: ['mytest://app', 'https://www.mytestapp.com'],
        config,
      }}>
      <RootNavigator />
    </NavigationContainer>
  );
};

function RootNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      id="rootNavigator"
      initialRouteName="TokenScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="TokenScreen" component={TokenScreen} />
    </Stack.Navigator>
  );
}
