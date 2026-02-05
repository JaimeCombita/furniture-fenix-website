export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  images: string[];
  technicalDetails?: Record<string, string>;
  datasheet?: string;
  stock?: number;
  featured?: boolean;
}

export type ProductCategory = 
  | 'mesas'
  | 'sillas'
  | 'archivadores'
  | 'mobiliario-escolar'
  | 'mobiliario-oficina'
  | 'accesorios';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  icon: string;
  active?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  client?: string;
  date: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company?: string;
}

export interface QuoteRequest extends ContactForm {
  products: {
    productId: string;
    quantity: number;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'guest';
  company?: string;
  phone?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
