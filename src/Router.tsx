import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TestScreen} from './Screens/TestScreen';
import {TokenScreen} from './Screens/TokenScreen';

export const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

function RootNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="TestScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="TokenScreen" component={TokenScreen} />
    </Stack.Navigator>
  );
}
