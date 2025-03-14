import { Product } from '../types';

interface SamplePlaylist {
  id: string;
  userId: string;
  name: string;
  description: string;
  products: Product[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  featured?: boolean;
  popular?: boolean;
}

const techProducts: Product[] = [
  {
    id: 'tech1',
    name: 'MacBook Pro 16"',
    description: 'Latest Apple MacBook Pro with M2 chip',
    price: 2499.99,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'],
    category: 'tech'
  },
  {
    id: 'tech2',
    name: 'Sony WH-1000XM4',
    description: 'Wireless noise-canceling headphones',
    price: 349.99,
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800'],
    category: 'tech'
  },
  {
    id: 'tech3',
    name: 'iPad Pro 12.9"',
    description: 'Apple iPad Pro with M2 chip',
    price: 1099.99,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800'],
    category: 'tech'
  }
];

const fitnessProducts: Product[] = [
  {
    id: 'fitness1',
    name: 'Peloton Bike+',
    description: 'Premium smart indoor cycling bike',
    price: 2495.00,
    images: ['https://images.unsplash.com/photo-1591291621164-2c6367723315?w=800'],
    category: 'fitness'
  },
  {
    id: 'fitness2',
    name: 'Lululemon Yoga Mat',
    description: 'Premium non-slip yoga mat',
    price: 88.00,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf9b0f?w=800'],
    category: 'fitness'
  }
];

const fashionProducts: Product[] = [
  {
    id: 'fashion1',
    name: 'Designer Leather Jacket',
    description: 'Premium leather jacket',
    price: 599.99,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'],
    category: 'fashion'
  },
  {
    id: 'fashion2',
    name: 'Classic White Sneakers',
    description: 'Versatile white leather sneakers',
    price: 129.99,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800'],
    category: 'fashion'
  }
];

const homeProducts: Product[] = [
  {
    id: 'home1',
    name: 'Modern Sofa',
    description: 'Contemporary 3-seater sofa',
    price: 1299.99,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'],
    category: 'home'
  },
  {
    id: 'home2',
    name: 'Smart LED Light Strip',
    description: 'Customizable LED lighting',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800'],
    category: 'home'
  }
];

export const samplePlaylists: SamplePlaylist[] = [
  {
    id: 'tech-essentials',
    userId: 'user1',
    name: 'Tech Essentials 2024',
    description: 'Must-have tech gadgets for productivity',
    products: techProducts,
    isPublic: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    featured: true
  },
  {
    id: 'wfh-setup',
    userId: 'user2',
    name: 'Ultimate WFH Setup',
    description: 'Complete work from home tech setup',
    products: [...techProducts.slice(0, 2)],
    isPublic: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    popular: true
  },
  {
    id: 'fitness-starter',
    userId: 'user3',
    name: 'Home Gym Essentials',
    description: 'Start your home fitness journey',
    products: fitnessProducts,
    isPublic: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    featured: true
  },
  {
    id: 'spring-fashion',
    userId: 'user4',
    name: 'Spring Fashion 2024',
    description: 'Trending fashion pieces for spring',
    products: fashionProducts,
    isPublic: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    popular: true
  },
  {
    id: 'modern-living',
    userId: 'user5',
    name: 'Modern Living Room',
    description: 'Contemporary home decor essentials',
    products: homeProducts,
    isPublic: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    featured: true
  }
]; 