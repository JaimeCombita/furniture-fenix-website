import type { CategoryInfo } from '../types';

export const COMPANY_INFO = {
  name: 'Fénix',
  fullName: 'Fénix Mobiliario Institucional',
  tagline: 'Mobiliario Institucional',
  nit: '900.123.456-8',
  email: 'contacto@fenix.com.co',
  phone: '+57 (1) 234 5678',
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
    id: 'sillas',
    name: 'Sillas',
    description: 'Ergonómicas y duraderas',
    icon: 'chair',
    active: true
  },
  {
    id: 'mesas',
    name: 'Mesas',
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
    active: false
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

export const PROJECTS = [
  {
    id: 'proyecto-1',
    title: 'Dotación Colegio San Francisco',
    description: 'Suministro e instalación de mobiliario escolar para 40 aulas de clase, biblioteca y laboratorios. Proyecto que benefició a más de 1,200 estudiantes.',
    images: [],
    client: 'Secretaría de Educación - Bogotá',
    date: '2025-09',
    category: 'Educación',
    items: ['180 pupitres bipersonales', '40 escritorios para profesores', 'Mobiliario de biblioteca', 'Mesas de laboratorio']
  },
  {
    id: 'proyecto-2',
    title: 'Modernización Alcaldía Municipal',
    description: 'Renovación completa del mobiliario de oficinas administrativas, incluyendo escritorios ejecutivos, sillas ergonómicas y sistemas de archivo.',
    images: [],
    client: 'Alcaldía de Soacha',
    date: '2025-07',
    category: 'Gobierno',
    items: ['85 estaciones de trabajo', '120 sillas ejecutivas', '45 archivadores', 'Sala de juntas para 20 personas']
  },
  {
    id: 'proyecto-3',
    title: 'Centro de Salud Villa Nueva',
    description: 'Amoblamiento integral del centro de salud con mobiliario clínico y administrativo que cumple con todas las normativas sanitarias.',
    images: [],
    client: 'Hospital Local Villa Nueva',
    date: '2025-05',
    category: 'Salud',
    items: ['30 consultorios médicos', 'Sala de espera para 100 personas', 'Mobiliario administrativo', 'Área de enfermería']
  },
  {
    id: 'proyecto-4',
    title: 'Universidad Técnica Regional',
    description: 'Dotación de 20 aulas universitarias con sillas universitarias, escritorios y sistemas audiovisuales integrados.',
    images: [],
    client: 'Universidad Técnica del Pacífico',
    date: '2025-03',
    category: 'Educación',
    items: ['600 sillas universitarias', '20 escritorios para docentes', 'Sistemas de cableado', 'Tarimas y podios']
  },
  {
    id: 'proyecto-5',
    title: 'Corporación Financiera del Norte',
    description: 'Proyecto de amoblamiento de oficinas corporativas en 3 pisos, con diseño moderno y espacios colaborativos.',
    images: [],
    client: 'Corporación Financiera del Norte',
    date: '2024-12',
    category: 'Empresas',
    items: ['150 estaciones de trabajo', 'Salas de reuniones', 'Zonas colaborativas', 'Recepción corporativa']
  },
  {
    id: 'proyecto-6',
    title: 'Juzgado Civil del Circuito',
    description: 'Mobiliario especializado para salas de audiencia y oficinas judiciales, cumpliendo con especificaciones técnicas del Consejo Superior.',
    images: [],
    client: 'Consejo Superior de la Judicatura',
    date: '2024-10',
    category: 'Judicial',
    items: ['8 salas de audiencia', '30 oficinas de despacho', 'Archivo judicial', 'Sala de conciliación']
  },
  {
    id: 'proyecto-7',
    title: 'Instituto Tecnológico Andino',
    description: 'Equipamiento de talleres, laboratorios y aulas especializadas para formación técnica y tecnológica.',
    images: [],
    client: 'Instituto Tecnológico Andino',
    date: '2024-08',
    category: 'Educación',
    items: ['15 talleres especializados', '10 laboratorios de cómputo', 'Biblioteca técnica', 'Auditorio para 200 personas']
  },
  {
    id: 'proyecto-8',
    title: 'Hospital General San Rafael',
    description: 'Amoblamiento de áreas administrativas y de atención al público del hospital, optimizando flujos de trabajo.',
    images: [],
    client: 'Hospital General San Rafael',
    date: '2024-06',
    category: 'Salud',
    items: ['Admisiones y facturación', '50 consultorios externos', 'Áreas administrativas', 'Sala de espera principal']
  }
] as const;

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  products: '/products',
  categories: '/categories',
  projects: '/projects',
  services: '/services',
  contact: '/contact',
  quote: '/quote',
  users: '/users'
} as const;
