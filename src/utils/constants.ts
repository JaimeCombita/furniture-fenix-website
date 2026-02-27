import type { CategoryInfo } from '../types';

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

export const CATEGORIES: CategoryInfo[] = [
    {
      id: 'carpas',
      name: 'Carpas',
      description: 'Carpas para ferias, eventos y usos múltiples',
      icon: 'tent',
      active: true
    },
    {
      id: 'linea-exterior',
      name: 'Línea Exterior',
      description: 'Productos para exteriores y espacios abiertos',
      icon: 'tree',
      active: true
    },
  {
    id: 'sillas',
    name: 'Sillas',
    description: 'Ergonómicas y duraderas',
    icon: 'chair',
    active: true
  },
  {
    id: 'mesas',
    name: 'Escritorios y Salas de Juntas',
    description: 'Para oficina, conferencias y trabajo',
    icon: 'table',
    active: true
  },
  {
    id: 'lockers',
    name: 'Lockers',
    description: 'Almacenamiento seguro y resistente',
    icon: 'lock',
    active: true
  },
  {
    id: 'archivadores',
    name: 'Archivadores',
    description: 'Almacenamiento eficiente',
    icon: 'archive',
    active: true
  },
  {
    id: 'mobiliario-escolar',
    name: 'Mobiliario Escolar',
    description: 'Para instituciones educativas',
    icon: 'graduation-cap',
    active: false
  },
  {
    id: 'mobiliario-oficina',
    name: 'Mobiliario Oficina',
    description: 'Espacios de trabajo modernos',
    icon: 'desktop',
    active: false
  },
  {
    id: 'accesorios',
    name: 'Accesorios Institucionales',
    description: 'Complementos institucionales',
    icon: 'puzzle-piece',
    active: false
  }
];

export const NAV_LINKS = [
  { path: '/', label: 'Inicio', icon: 'home' },
  { path: '/sobre-empresa', label: 'Sobre la Empresa', icon: 'building' },
  { 
    path: '/catalogo', 
    label: 'Catálogo', 
    icon: 'th',
    children: CATEGORIES.map(cat => ({
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
