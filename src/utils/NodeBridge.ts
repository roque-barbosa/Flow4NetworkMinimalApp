import nodejs from 'nodejs-mobile-react-native';

export const startNodeThread = () => {
  nodejs.start('main.js');
};

export const startSpeedTest = (setState: Function) => {
  nodejs.channel.addListener(
    'message',
    msg => {
      setState(msg);
    },
    this,
  );
  nodejs.channel.post('message', 'Ola');
};
