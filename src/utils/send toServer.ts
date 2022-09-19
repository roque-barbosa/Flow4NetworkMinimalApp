export async function sendToServer(body: any, token: string) {
  console.log('ASHASHAHSAHSAHSAHSAH ', body);

  // const form = new FormData();
  // form.append('file', '..assets/sendImage.jpeg');
  // console.log(body);
  const response = await fetch(
    `http://51.81.210.140:8095/flow4NetworkMobile/formatAndSendData/${token}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  console.log(
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    response,
  );
}
