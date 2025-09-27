import amazonAlexaSpeaker from '../../public/images/Amazon Alexa Speakers.png';
import jblBluetoothSpeaker from '../../public/images/JBL Bluetooth Speaker.png';
import airpodPro from '../../public/images/Airpod Pro.png';
import headPhone from '../../public/images/Headphone.png';
import wirelessMic from '../../public/images/Wireless Karaoke Microphone.png';
import portablePowerbank from '../../public/images/Portable Powerbank.png';
import canonOpticCamera from '../../public/images/Canon Optic Camera.png';
import typeCCharger from '../../public/images/Type C Charger.png';
import { CartItem } from '@/utils/types';

export const mockProducts: CartItem[] = [
  {
    id: '1',
    description: 'High-quality smart speaker with voice assistant capabilities for seamless integration and control.',
    title: 'Amazon Alexa Speakers',
    price: 100,
    imgSrc: amazonAlexaSpeaker,
    altText: 'amazon-alexa-speakers',
    quantity: 50,
  },
  {
    id: '2',
    description: 'Portable speaker with powerful sound and Bluetooth connectivity for an enhanced audio experience.',
    title: 'JBL Bluetooth Speaker',
    price: 120,
    imgSrc: jblBluetoothSpeaker,
    altText: 'jbl-bluetooth-speaker',
    quantity: 50,
  },
  {
    id: '3',
    description: 'Premium wireless earbuds with noise cancellation and superior sound quality for immersive listening.',
    title: 'Airpod Pro',
    price: 80,
    imgSrc: airpodPro,
    altText: 'airpod-pro',
    quantity: 50,
  },
  {
    id: '4',
    description: 'High-performance headphones delivering exceptional audio clarity and comfort for extended use.',
    title: 'Headphone',
    price: 1050,
    imgSrc: headPhone,
    altText: 'headphone',
    quantity: 50,
  },
  {
    id: '5',
    description: 'Versatile microphone with wireless connectivity, perfect for karaoke and professional audio recording.',
    title: 'Wireless Karaoke Microphone',
    price: 40,
    imgSrc: wirelessMic,
    altText: 'wireless-karaoke-microphone',
    quantity: 50,
  },
  {
    id: '6',
    description: 'Compact and reliable power source for charging devices on the go with high capacity.',
    title: 'Portable Powerbank',
    price: 70,
    imgSrc: portablePowerbank,
    altText: 'portable-powerbank',
    quantity: 50,
  },
  {
    id: '7',
    description: 'Advanced camera with superior optics for capturing high-quality images and videos.',
    title: 'Canon Optic Camera',
    price: 160,
    imgSrc: canonOpticCamera,
    altText: 'canon-optic-camera',
    quantity: 50,
  },
  {
    id: '8',
    description: 'Fast and efficient charger compatible with USB Type-C devices for quick power-ups.',
    title: 'Type C Charger',
    price: 20,
    imgSrc: typeCCharger,
    altText: 'type-c-charger',
    quantity: 50,
  },
];

export const fetchProducts = async (): Promise<CartItem[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
    console.log('fetchProducts: Returning mock products', mockProducts);
    return mockProducts;
  } catch (error) {
    console.error('fetchProducts: Error fetching products', error);
    throw new Error('Failed to fetch products');
  }
};
