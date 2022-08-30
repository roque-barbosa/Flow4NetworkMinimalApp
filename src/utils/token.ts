const BASE_URL = 'http://51.81.210.140:8095';

export type TokenInfoType = {
  bgColor: string;
  secondaryColor: string;
  textColor: string;
  logoUrl: string;
  urls: any;
};

export const getInfoFromToken = async (token: string) => {
  let url = `${BASE_URL}/appToken/${token}/data`;

  const infoResponse = await fetch(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  const resposneJson = await infoResponse.json();
  const customization = resposneJson.customization;

  const bgColor = customization.page_background;
  const textColor = customization.font_color;
  const secondaryColor = customization.step_active_background;
  const logoUrl = `${BASE_URL}${customization.logo_source}`;
  const urls: any[] = [];
  await customization.urls.map((el: any) =>
    urls.push(el.url.split('https://')[1]),
  );
  // console.log(urls2);
  // const urls = ['www.flowbix.com', 'www.youtube.com', 'www.google.com'];
  // console.log(urls.length);
  return {
    bgColor,
    secondaryColor,
    textColor,
    logoUrl,
    urls,
  };
};

export async function validateToken(token: string) {
  const url = `${BASE_URL}/appToken/${token}`;

  try {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
