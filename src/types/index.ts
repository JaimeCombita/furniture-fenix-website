export interface Subcategory {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: ProductCategory;
  subcategory?: string | null;
  images: string[];
  features?: string[];
  featured?: boolean;
  quantity?: number;
}

export type ProductCategory = 
  | 'mesas'
  | 'sillas'
  | 'lockers'
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
  subcategories?: Subcategory[];
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
