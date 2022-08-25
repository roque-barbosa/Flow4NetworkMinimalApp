import React from 'react';
import {View, ActivityIndicator, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';

interface LoadingScreenProps {
  logoUrl?: string;
  bgColor?: string;
  secondaryColor?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  bgColor,
  logoUrl,
  secondaryColor,
}) => {
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
        <ActivityIndicator color={secondaryColor || undefined} size={70} />
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  screenWrapper: {
    height: '100%',
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
  },
});
