export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  discount?: number;
  isNewArrival?: boolean;
  arrivalDate?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image?: string;
  description?: string;
  subcategories?: Category[];
}

export const categories: Category[] = [
  { id: 'all', name: 'All Categories', count: 48 },
  { 
    id: 'sofa', 
    name: 'Sofas & Couches', 
    count: 12,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    description: 'Comfortable seating solutions for your living space',
    subcategories: [
      { id: 'sofa-modern', name: 'Modern Sofas', count: 5, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
      { id: 'sofa-sectional', name: 'Sectional Sofas', count: 4, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
      { id: 'sofa-loveseat', name: 'Loveseats', count: 3, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop' }
    ]
  },
  { 
    id: 'chair', 
    name: 'Chairs', 
    count: 8,
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&h=600&fit=crop',
    description: 'Stylish and comfortable seating options',
    subcategories: [
      { id: 'chair-office', name: 'Office Chairs', count: 3, image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=300&fit=crop' },
      { id: 'chair-dining', name: 'Dining Chairs', count: 3, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop' },
      { id: 'chair-accent', name: 'Accent Chairs', count: 2, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' }
    ]
  },
  { 
    id: 'table', 
    name: 'Tables', 
    count: 10,
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=600&fit=crop',
    description: 'Functional and beautiful table solutions',
    subcategories: [
      { id: 'table-dining', name: 'Dining Tables', count: 4, image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop' },
      { id: 'table-coffee', name: 'Coffee Tables', count: 3, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
      { id: 'table-desk', name: 'Desks', count: 3, image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=300&fit=crop' }
    ]
  },
  { 
    id: 'bed', 
    name: 'Beds & Mattresses', 
    count: 6,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
    description: 'Comfortable sleeping solutions',
    subcategories: [
      { id: 'bed-platform', name: 'Platform Beds', count: 3, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop' },
      { id: 'bed-mattress', name: 'Mattresses', count: 3, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' }
    ]
  },
  { 
    id: 'storage', 
    name: 'Storage & Organization', 
    count: 8,
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=600&fit=crop',
    description: 'Smart storage solutions for your home',
    subcategories: [
      { id: 'storage-bookshelf', name: 'Bookshelves', count: 4, image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop' },
      { id: 'storage-ottoman', name: 'Storage Ottomans', count: 2, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop' },
      { id: 'storage-cabinet', name: 'Cabinets', count: 2, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' }
    ]
  },
  { 
    id: 'decor', 
    name: 'Home Decor', 
    count: 4,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    description: 'Beautiful decorative pieces for your home',
    subcategories: [
      { id: 'decor-lighting', name: 'Lighting', count: 2, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
      { id: 'decor-art', name: 'Wall Art', count: 2, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop' }
    ]
  }
];

// Hero slider images
export const heroSlides = [
  {
    id: 1,
    title: "Modern Living Room Collection",
    subtitle: "Transform your space with premium furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=600&fit=crop",
    cta: "Shop Living Room",
    category: "sofa"
  },
  {
    id: 2,
    title: "Professional Office Solutions",
    subtitle: "Ergonomic chairs and desks for productivity",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=1200&h=600&fit=crop",
    cta: "Shop Office",
    category: "chair"
  },
  {
    id: 3,
    title: "Dining Room Elegance",
    subtitle: "Beautiful tables and seating for entertaining",
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=1200&h=600&fit=crop",
    cta: "Shop Dining",
    category: "table"
  },
  {
    id: 4,
    title: "Bedroom Sanctuary",
    subtitle: "Comfortable beds and premium mattresses",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=600&fit=crop",
    cta: "Shop Bedroom",
    category: "bed"
  }
];

export const products: Product[] = [
  // Sofas & Couches
  {
    id: '1',
    name: 'Modern 3-Seater Sofa',
    price: 899,
    originalPrice: 1199,
    category: 'sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop'
    ],
    description: 'Comfortable modern 3-seater sofa with premium fabric upholstery and sturdy wooden frame.',
    rating: 4.5,
    reviews: 124,
    inStock: true,
    featured: true,
    discount: 25
  },
  {
    id: '2',
    name: 'L-Shaped Corner Sofa',
    price: 1299,
    originalPrice: 1599,
    category: 'sofa',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop'
    ],
    description: 'Spacious L-shaped corner sofa perfect for large living rooms.',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    featured: true,
    discount: 19
  },
  {
    id: '3',
    name: 'Minimalist 2-Seater Loveseat',
    price: 599,
    category: 'sofa',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop'
    ],
    description: 'Compact and stylish 2-seater loveseat ideal for small spaces.',
    rating: 4.3,
    reviews: 67,
    inStock: true,
    featured: false
  },

  // Chairs
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 299,
    originalPrice: 399,
    category: 'chair',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&h=400&fit=crop'
    ],
    description: 'Professional ergonomic office chair with lumbar support and adjustable height.',
    rating: 4.6,
    reviews: 203,
    inStock: true,
    featured: true,
    discount: 25
  },
  {
    id: '5',
    name: 'Mid-Century Dining Chair Set',
    price: 399,
    category: 'chair',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=400&fit=crop'
    ],
    description: 'Set of 4 mid-century modern dining chairs with wooden legs and upholstered seats.',
    rating: 4.4,
    reviews: 156,
    inStock: true,
    featured: false
  },
  {
    id: '6',
    name: 'Accent Armchair',
    price: 449,
    originalPrice: 599,
    category: 'chair',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop'
    ],
    description: 'Stylish accent armchair perfect for reading corners or bedroom seating.',
    rating: 4.2,
    reviews: 98,
    inStock: true,
    featured: false,
    discount: 25
  },

  // Tables
  {
    id: '7',
    name: 'Glass Coffee Table',
    price: 349,
    originalPrice: 449,
    category: 'table',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop'
    ],
    description: 'Modern glass coffee table with chrome legs, perfect for contemporary living rooms.',
    rating: 4.1,
    reviews: 87,
    inStock: true,
    featured: true,
    discount: 22
  },
  {
    id: '8',
    name: 'Wooden Dining Table',
    price: 799,
    category: 'table',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop'
    ],
    description: 'Solid wood dining table that seats 6 people comfortably.',
    rating: 4.8,
    reviews: 145,
    inStock: true,
    featured: true
  },
  {
    id: '9',
    name: 'Standing Desk',
    price: 599,
    originalPrice: 799,
    category: 'table',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&h=400&fit=crop'
    ],
    description: 'Height-adjustable standing desk with electric motor and memory settings.',
    rating: 4.6,
    reviews: 178,
    inStock: true,
    featured: false,
    discount: 25
  },

  // Beds & Mattresses
  {
    id: '10',
    name: 'King Size Platform Bed',
    price: 899,
    originalPrice: 1199,
    category: 'bed',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=400&fit=crop'
    ],
    description: 'Modern king size platform bed with built-in nightstands and LED lighting.',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    featured: true,
    discount: 25
  },
  {
    id: '11',
    name: 'Memory Foam Mattress',
    price: 699,
    originalPrice: 999,
    category: 'bed',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop'
    ],
    description: 'Premium memory foam mattress with cooling gel technology.',
    rating: 4.5,
    reviews: 456,
    inStock: true,
    featured: true,
    discount: 30
  },

  // Storage & Organization
  {
    id: '12',
    name: 'Modular Bookshelf',
    price: 299,
    category: 'storage',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop'
    ],
    description: 'Versatile modular bookshelf system that can be configured in multiple ways.',
    rating: 4.3,
    reviews: 123,
    inStock: true,
    featured: false
  },
  {
    id: '13',
    name: 'Storage Ottoman',
    price: 149,
    originalPrice: 199,
    category: 'storage',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop'
    ],
    description: 'Multi-functional storage ottoman that doubles as seating.',
    rating: 4.1,
    reviews: 89,
    inStock: true,
    featured: false,
    discount: 25
  },

  // Home Decor
  {
    id: '14',
    name: 'Floor Lamp Set',
    price: 199,
    originalPrice: 299,
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop'
    ],
    description: 'Modern floor lamp set with adjustable brightness and contemporary design.',
    rating: 4.4,
    reviews: 167,
    inStock: true,
    featured: false,
    discount: 33
  },
  {
    id: '15',
    name: 'Wall Art Collection',
    price: 89,
    originalPrice: 129,
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=400&fit=crop'
    ],
    description: 'Set of 3 modern abstract wall art pieces to enhance your living space.',
    rating: 4.2,
    reviews: 234,
    inStock: true,
    featured: false,
    discount: 31
  },

  // NEW ARRIVALS
  {
    id: '16',
    name: 'Contemporary Velvet Sofa',
    price: 1199,
    originalPrice: 1499,
    category: 'sofa',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop'
    ],
    description: 'Luxurious velvet sofa with deep cushions and gold accent legs.',
    rating: 4.8,
    reviews: 45,
    inStock: true,
    featured: true,
    discount: 20,
    isNewArrival: true,
    arrivalDate: '2024-01-15'
  },
  {
    id: '17',
    name: 'Smart Adjustable Desk',
    price: 899,
    category: 'table',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&h=400&fit=crop'
    ],
    description: 'Height-adjustable smart desk with built-in wireless charging and USB ports.',
    rating: 4.6,
    reviews: 23,
    inStock: true,
    featured: false,
    isNewArrival: true,
    arrivalDate: '2024-01-12'
  },
  {
    id: '18',
    name: 'Scandinavian Dining Set',
    price: 1299,
    originalPrice: 1599,
    category: 'table',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop'
    ],
    description: 'Complete dining set with table and 6 chairs in Scandinavian design.',
    rating: 4.7,
    reviews: 32,
    inStock: true,
    featured: true,
    discount: 19,
    isNewArrival: true,
    arrivalDate: '2024-01-10'
  },
  {
    id: '19',
    name: 'Luxury Memory Foam Recliner',
    price: 799,
    originalPrice: 999,
    category: 'chair',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop'
    ],
    description: 'Premium reclining chair with memory foam padding and massage function.',
    rating: 4.9,
    reviews: 18,
    inStock: true,
    featured: false,
    discount: 20,
    isNewArrival: true,
    arrivalDate: '2024-01-08'
  },
  {
    id: '20',
    name: 'Industrial Style Bookshelf',
    price: 459,
    category: 'storage',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=500&h=400&fit=crop'
    ],
    description: 'Industrial-style bookshelf with metal frame and reclaimed wood shelves.',
    rating: 4.4,
    reviews: 27,
    inStock: true,
    featured: false,
    isNewArrival: true,
    arrivalDate: '2024-01-05'
  },
  {
    id: '21',
    name: 'Smart LED Floor Lamp',
    price: 299,
    originalPrice: 399,
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop'
    ],
    description: 'Smart LED floor lamp with app control, multiple colors, and scheduling features.',
    rating: 4.5,
    reviews: 41,
    inStock: true,
    featured: true,
    discount: 25,
    isNewArrival: true,
    arrivalDate: '2024-01-03'
  },
  {
    id: '22',
    name: 'Hybrid King Mattress',
    price: 999,
    originalPrice: 1299,
    category: 'bed',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop'
    ],
    description: 'Hybrid mattress combining memory foam and pocket springs for optimal comfort.',
    rating: 4.8,
    reviews: 56,
    inStock: true,
    featured: true,
    discount: 23,
    isNewArrival: true,
    arrivalDate: '2024-01-01'
  },
  {
    id: '23',
    name: 'Minimalist Storage Bench',
    price: 189,
    category: 'storage',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=400&fit=crop'
    ],
    description: 'Minimalist storage bench with hidden compartment, perfect for entryways.',
    rating: 4.3,
    reviews: 34,
    inStock: true,
    featured: false,
    isNewArrival: true,
    arrivalDate: '2023-12-28'
  }
];

export const featuredProducts = products.filter(product => product.featured);
export const discountedProducts = products.filter(product => product.discount);
export const newArrivalProducts = products
  .filter(product => product.isNewArrival)
  .sort((a, b) => {
    const dateA = new Date(a.arrivalDate || '').getTime();
    const dateB = new Date(b.arrivalDate || '').getTime();
    return dateB - dateA; // Sort by newest first
  });
