// export async function getFileFromServer() {
//   console.log('TO AQUI');
//   const start = Date.now();
//   const response = await fetch(
//     'https://flowbix.minhainternet.net/app/sendImage',
//   );
//   const end = Date.now();
//   const imageBlob = await response.blob();
//   const timeMs = end - start;
//   const timeSeconds = timeMs / 1000;
//   const fileReaderInstance = new FileReader();
//   const test = await fileReaderInstance.readAsDataURL(imageBlob);
//   sendFileToServer(test);
//   // if (response.status === 200) {
//   //   return 10 / timeSeconds;
//   // }
//   // console.log(10 / timeSeconds);
//   // return 10 / timeSeconds;
// }

export async function sendFileToServer() {
  const form = new FormData();
  form.append('file', '..assets/sendImage.jpeg');

  const start = Date.now();
  await fetch('https://flowbix.minhainternet.net/app/receiveImage', {
    method: 'POST',
    body: form,
  }).catch(err => console.log(err));
  const timeMs = Date.now() - start;
  const timeSeconds = timeMs / 1000;
  console.log('time seconds', timeSeconds);
  const sizeMegaBytes = 10.2;
  // const sizeMegaBits = sizeMegaBytes * 8;
  // console.log('Size megabits: ', sizeMegaBits);

  // console.log('HEWLLLLO');
  return (sizeMegaBytes / timeSeconds) * 2;
}
