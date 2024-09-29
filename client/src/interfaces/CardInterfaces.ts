export interface CreateICard{
  [x:string]:any;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string
    country: string
    city: string
    street: string
    houseNumber: number
    zip: number
  };
  bizNumber: number;
}



export interface ICard {
  _id: string
  title: string
  subtitle: string
  description: string
  phone: string
  email: string
  web: string
  image: IImage
  address: IAddress
  bizNumber: number
  likes: string[]
  user_id: string
  createdAt: string
  __v: number
}

// -----------------------------------------------------------------------

interface IImage {
  url: string
  alt: string
  _id: string
}

interface IAddress {
  state: string
  country: string
  city: string
  street: string
  houseNumber: number
  zip: number
  _id: string
}