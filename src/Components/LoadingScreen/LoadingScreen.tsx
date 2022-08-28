import React, {useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {getPermission} from '../../utils/Permission';

interface LoadingScreenProps {
  logoUrl?: string;
  bgColor?: string;
  secondaryColor?: string;
  testMessage: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  bgColor,
  logoUrl,
  secondaryColor,
  testMessage,
}) => {
  useEffect(() => {
    getPermission();
  });
  return (
    <SafeAreaView
      style={[Styles.screenWrapper, {backgroundColor: bgColor || 'white'}]}>
      <View style={Styles.loadingWrapper}>
        {logoUrl && (
          <Image
            style={Styles.image}
            source={{
              uri:
                logoUrl ||
                'https://i.pinimg.com/564x/be/2a/b2/be2ab2886bf8e57423e5df0fd8e94130.jpg',
            }}
          />
        )}
        {testMessage && <Text>{testMessage}</Text>}
        <ActivityIndicator color={secondaryColor || 'green'} size={70} />
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  screenWrapper: {
    minHeight: Dimensions.get('window').height,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingWrapper: {
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'contain',
  },
});
