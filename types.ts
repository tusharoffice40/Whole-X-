
export enum UserRole {
  BUYER = 'BUYER',
  WHOLESALER = 'WHOLESALER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  moq: number; // Minimum Order Quantity
  stock: number;
  wholesalerId: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  buyerId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
