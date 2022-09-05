import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useIsEmulator} from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';
// @ts-ignore
import Ping from 'react-native-ping';
// import {baseBackendURL} from '../Constants';

export type NetworkInfoType = NetInfoState & {wifiName?: string};

export async function getNetworkInfo(): Promise<NetworkInfoType> {
  const netInfo = await NetInfo.fetch();
  const ssid = await NetworkInfo.getSSID();

  return {...netInfo, wifiName: ssid || 'unknow'};
}

export async function pingTest(urls: string[]) {
  let pingsResults: any[] = [];
  for (let index = 0; index < urls.length; index++) {
    try {
      let ms = await Ping.start(urls[index], {timeout: 3000});
      pingsResults.push({url: urls[index], result: ms});
    } catch (error) {
      pingsResults.push({url: urls[index], result: 'Indisponível'});
    }
  }

  return pingsResults;
}

export async function httpPing(url: string) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => controller.abort(), 1000);

  const start = Date.now();
  const response = await fetch(url, {signal: controller.signal});
  clearTimeout(timeoutId);
  const msHttp = Date.now() - start;
  if (response.status === 200) {
    return {url: useIsEmulator, result: msHttp};
  } else {
    return {url: useIsEmulator, result: 'Indisponível'};
  }
}

// export async function getMTU() {
//   let msGoogle = await Ping.start('8.8.8.8', {timeout: 3000});

//   let mtu;
//   if (msGoogle > 0) {
//     mtu = (msGoogle * 1544000) / 8;
//     mtu = String(mtu).slice(0, 4);
//     mtu = Number(mtu);

//     if (mtu > 4470) {
//       const normalize = (4470 * 1500) / 4470;
//       mtu = Math.round(normalize);
//     } else {
//       const normalize = (mtu * 1500) / 4470;
//       mtu = Math.round(normalize);
//     }
//   } else {
//     mtu = 'Indisponível';
//   }
//   return mtu;
// }
// async function getImageToMTU() {
//   const url = `${baseBackendURL}/mtu/receiveFile`;

//   return new Promise((resolve, reject) => {
//     fetch(url)
//       .then(response => resolve(response.blob()))
//       .catch(error => reject(error));
//   });
// }

export async function getMTU() {
  // const start = new Date().getTime();
  // await getImageToMTU();
  // const end = new Date().getTime();

  // const delta = end - start;
  const delta = await Ping.start('8.8.8.8', {timeout: 3000});
  console.log('DELTA', delta);

  if (delta > 292) {
    const calc = (delta * 1500) / 292;
    const difference = Math.trunc(calc) - 1500;
    const result = 1500 - difference;

    // console.log('mtu:', result);
    return result;
  } else {
    // console.log('mtu:', 1500);
    return 1500;
  }
}
