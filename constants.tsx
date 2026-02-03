
import React from 'react';
import { Product, Category, User, UserRole } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Clothing', icon: 'fa-shirt' },
  { id: '2', name: 'Accessories', icon: 'fa-hat-wizard' },
  { id: '3', name: 'Footwear', icon: 'fa-shoe-prints' },
  { id: '4', name: 'Electronics', icon: 'fa-laptop' },
  { id: '5', name: 'Home & Living', icon: 'fa-couch' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Classic Cotton T-Shirts (Pack of 50)',
    description: 'High-quality 100% cotton shirts in assorted colors. Breathable and durable for retail branding.',
    price: 450.00,
    image: 'https://picsum.photos/seed/shirts/600/600',
    category: 'Clothing',
    moq: 10,
    stock: 500,
    wholesalerId: 'w1',
    rating: 4.8
  },
  {
    id: 'p2',
    name: 'Wireless Bluetooth Earbuds (Bulk)',
    description: 'Latest TWS earbuds with noise cancellation. Great margin for resellers.',
    price: 1200.00,
    image: 'https://picsum.photos/seed/earbuds/600/600',
    category: 'Electronics',
    moq: 20,
    stock: 200,
    wholesalerId: 'w1',
    rating: 4.5
  },
  {
    id: 'p3',
    name: 'Designer Leather Belts',
    description: 'Premium buffalo leather belts with steel buckles. Various sizes available.',
    price: 250.00,
    image: 'https://picsum.photos/seed/belts/600/600',
    category: 'Accessories',
    moq: 50,
    stock: 1000,
    wholesalerId: 'w2',
    rating: 4.2
  },
  {
    id: 'p4',
    name: 'Ergonomic Office Chairs',
    description: 'Adjustable mesh office chairs for corporate bulk supply. Heavy-duty construction.',
    price: 4500.00,
    image: 'https://picsum.photos/seed/chairs/600/600',
    category: 'Home & Living',
    moq: 5,
    stock: 45,
    wholesalerId: 'w2',
    rating: 4.9
  },
  {
    id: 'p5',
    name: 'Running Sports Shoes',
    description: 'Lightweight performance running shoes for athletic retailers.',
    price: 850.00,
    image: 'https://picsum.photos/seed/shoes/600/600',
    category: 'Footwear',
    moq: 24,
    stock: 120,
    wholesalerId: 'w1',
    rating: 4.6
  },
  {
    id: 'p6',
    name: 'Canvas Tote Bags (Natural)',
    description: 'Eco-friendly blank canvas tote bags, perfect for screen printing.',
    price: 75.00,
    image: 'https://picsum.photos/seed/bags/600/600',
    category: 'Accessories',
    moq: 100,
    stock: 5000,
    wholesalerId: 'w3',
    rating: 4.7
  }
];

export const DEFAULT_USER: User = {
  id: 'u1',
  name: 'John Retailer',
  email: 'john@retail.com',
  role: UserRole.BUYER,
  companyName: 'John\'s Boutique'
};
