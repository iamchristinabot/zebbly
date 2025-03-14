import { Product } from '../types';

// Sample products for playlists
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Minimalist Desk Lamp',
    description: 'Sleek LED desk lamp with adjustable brightness and color temperature',
    price: 79.99,
    images: ['https://m.media-amazon.com/images/I/61cjbLlgluL._AC_SL1500_.jpg'],
    category: 'Home Office'
  },
  {
    id: '2',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation',
    price: 299.99,
    images: ['https://m.media-amazon.com/images/I/71+jgAGSjWL._AC_SL1500_.jpg'],
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Adjustable office chair with lumbar support and breathable mesh',
    price: 249.99,
    images: ['https://m.media-amazon.com/images/I/71+alvQGPGL._AC_SL1500_.jpg'],
    category: 'Furniture'
  },
  {
    id: '4',
    name: 'Smart Coffee Maker',
    description: 'WiFi-enabled coffee maker with scheduling and customizable brewing',
    price: 159.99,
    images: ['https://m.media-amazon.com/images/I/71v7RDRYHTL._AC_SL1500_.jpg'],
    category: 'Kitchen'
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with customizable switches',
    price: 129.99,
    images: ['https://m.media-amazon.com/images/I/71HN4P-pd2L._AC_SL1500_.jpg'],
    category: 'Electronics'
  }
];

// Sample playlists
export const samplePlaylists = [
  {
    id: 'playlist-1',
    userId: '1',
    name: 'Home Office Essentials',
    description: 'Must-have items for a productive and comfortable home office setup',
    products: [sampleProducts[0], sampleProducts[2], sampleProducts[4]],
    isPublic: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    featured: true,
    popular: true
  },
  {
    id: 'playlist-2',
    userId: '2',
    name: 'Tech Enthusiast Collection',
    description: 'Latest gadgets and accessories for tech lovers',
    products: [sampleProducts[1], sampleProducts[4]],
    isPublic: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22'),
    featured: true,
    popular: true
  },
  {
    id: 'playlist-3',
    userId: '1',
    name: 'Productivity Boost',
    description: 'Products that help increase your daily productivity',
    products: [sampleProducts[0], sampleProducts[1], sampleProducts[2], sampleProducts[3]],
    isPublic: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-05'),
    popular: true
  }
]; 