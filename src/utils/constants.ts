import { getCategories } from '../data';

export const COMPANY_INFO = {
  name: 'Fénix',
  fullName: 'Fénix Mobiliario Institucional',
  tagline: 'Mobiliario Institucional',
  nit: '1.033.695.760-2',
  email: 'mobiliariofenix.07@gmail.com',
  phone: '+57 322 965 8190',
  whatsapp: '+57 322 965 8190',
  address: 'Bogotá, Colombia',
  schedule: 'Lun-Vie: 8:00 AM - 6:00 PM',
  social: {
    facebook: 'https://facebook.com/fenix',
    instagram: 'https://instagram.com/fenix',
    linkedin: 'https://linkedin.com/company/fenix',
    whatsapp: 'https://wa.me/573229658190'
  }
} as const;

const categories = getCategories();

export const NAV_LINKS = [
  { path: '/', label: 'Inicio', icon: 'home' },
  { path: '/sobre-empresa', label: 'Sobre la Empresa', icon: 'building' },
  { 
    path: '/catalogo', 
    label: 'Catálogo', 
    icon: 'th',
    children: categories.map(cat => ({
      path: `/catalogo#${cat.id}`,
      label: cat.name,
      active: cat.active
    }))
  },
  { path: '/servicios', label: 'Servicios', icon: 'tools' },
  { path: '/proyectos', label: 'Proyectos', icon: 'briefcase' },
  { path: '/contacto', label: 'Contáctenos', icon: 'envelope' }
] as const;

export const SERVICES = [
  {
    id: 'personalizacion',
    title: 'Personalización de Mobiliario',
    description: 'Adaptamos el mobiliario a los colores y logos de tu institución',
    icon: 'paint-brush',
    features: [
      'Colores corporativos',
      'Logos institucionales',
      'Acabados personalizados',
      'Diseños exclusivos'
    ]
  },
  {
    id: 'fabricacion',
    title: 'Fabricación a Medida',
    description: 'Diseños exclusivos según tus especificaciones',
    icon: 'ruler-combined',
    features: [
      'Medidas personalizadas',
      'Materiales de calidad',
      'Diseño único',
      'Producción nacional'
    ]
  },
  {
    id: 'marcacion',
    title: 'Marcación Institucional',
    description: 'Identidad corporativa en cada pieza',
    icon: 'stamp',
    features: [
      'Grabado láser',
      'Serigrafía',
      'Placas metálicas',
      'Acabados premium'
    ]
  },
  {
    id: 'asesoria',
    title: 'Asesoría para Licitaciones',
    description: 'Te acompañamos en el proceso de compra pública',
    icon: 'handshake',
    features: [
      'Documentación técnica',
      'Cumplimiento normativo',
      'Cotizaciones detalladas',
      'Soporte posventa'
    ]
  }
] as const;

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const API_ENDPOINTS = {
  products: '/products',
  categories: '/categories',
  services: '/services',
  contact: '/contact',
  quote: '/quote',
  users: '/users'
} as const;
