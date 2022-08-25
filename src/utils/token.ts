export type TokenInfoType = {
  bgColor: string;
  secondaryColor: string;
  textColor: string;
  logoUrl: string;
};

export const getInfoFromToken = (_token: string) => {
  const bgColor = '#ffffff';
  const textColor = '#333333';
  const secondaryColor = '#90ee90';
  const logoUrl =
    'https://img1.gratispng.com/20180921/lji/kisspng-clip-art-bozo-the-clown-portable-network-graphics-fewer-clowns-fewer-frowns-the-insanity-of-ad-5ba51664023149.691892571537545828009.jpg';
  return {
    bgColor,
    secondaryColor,
    textColor,
    logoUrl,
  };
};
