import type { Property, ContactMessage } from "./types"

export const properties: Property[] = [
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    price: 850000,
    location: "Cannes, Alpes-Maritimes",
    coordinates: { lat: 43.5528, lng: 7.0174 },
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Villa",
    listingType: "sale",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    ],
    description:
      "Découvrez cette magnifique villa moderne située dans un quartier résidentiel prisé de Cannes. Cette propriété d'exception offre un cadre de vie idéal avec ses 180m² habitables et sa piscine privée. La villa dispose d'un salon spacieux avec cheminée, d'une cuisine équipée ouverte sur la terrasse, de 4 chambres dont une suite parentale avec dressing et salle de bain privative.",
    surface: 180,
    landSize: 500,
    yearBuilt: 2018,
    energyClass: "B",
    features: ["Piscine chauffée", "Pool house", "Garage 2 voitures", "Climatisation", "Cheminée", "Terrasse"],
    isSold: false,
    views: 245,
    listedAt: "2024-01-15",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Appartement Centre-Ville Lumineux",
    price: 1200,
    location: "Nice, Alpes-Maritimes",
    coordinates: { lat: 43.7102, lng: 7.262 },
    bedrooms: 2,
    bathrooms: 1,
    propertyType: "Appartement",
    listingType: "rent",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    ],
    description:
      "Appartement lumineux en centre-ville de Nice, proche de toutes commodités. Entièrement rénové avec des finitions de qualité, il offre un cadre de vie moderne et confortable.",
    surface: 65,
    yearBuilt: 2015,
    energyClass: "C",
    features: ["Balcon", "Ascenseur", "Parking", "Cuisine équipée"],
    isSold: false,
    views: 189,
    listedAt: "2024-01-10",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    title: "Maison Familiale avec Jardin",
    price: 450000,
    location: "Antibes, Alpes-Maritimes",
    coordinates: { lat: 43.5804, lng: 7.1251 },
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Maison",
    listingType: "sale",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
    ],
    description:
      "Maison familiale avec grand jardin dans un quartier calme d'Antibes. Parfaite pour une famille, elle offre de beaux volumes et un extérieur agréable.",
    surface: 120,
    landSize: 300,
    yearBuilt: 2010,
    energyClass: "D",
    features: ["Jardin", "Garage", "Cheminée", "Terrasse"],
    isSold: false,
    views: 156,
    listedAt: "2024-01-05",
    createdAt: "2024-01-05",
  },
  {
    id: 4,
    title: "Studio Vue Mer Exceptionnel",
    price: 800,
    location: "Monaco",
    coordinates: { lat: 43.7384, lng: 7.4246 },
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "Studio",
    listingType: "rent",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
    ],
    description:
      "Studio avec vue mer exceptionnelle à Monaco. Entièrement meublé et équipé, idéal pour un investissement locatif ou un pied-à-terre.",
    surface: 25,
    yearBuilt: 2020,
    energyClass: "A",
    features: ["Vue mer", "Balcon", "Climatisation", "Meublé"],
    isSold: false,
    views: 298,
    listedAt: "2024-01-20",
    createdAt: "2024-01-20",
  },
  {
    id: 5,
    title: "Penthouse de Luxe avec Terrasse",
    price: 1200000,
    location: "Cannes, Alpes-Maritimes",
    coordinates: { lat: 43.5528, lng: 7.0174 },
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Penthouse",
    listingType: "sale",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=600&fit=crop",
    ],
    description:
      "Penthouse de luxe avec terrasse panoramique offrant une vue imprenable sur la baie de Cannes. Prestations haut de gamme et finitions exceptionnelles.",
    surface: 150,
    yearBuilt: 2019,
    energyClass: "A",
    features: ["Vue mer", "Terrasse panoramique", "Climatisation", "Parking privé", "Concierge"],
    isSold: false,
    views: 412,
    listedAt: "2024-01-18",
    createdAt: "2024-01-18",
  },
  {
    id: 6,
    title: "Terrain Constructible Vue Dégagée",
    price: 280000,
    location: "Grasse, Alpes-Maritimes",
    coordinates: { lat: 43.6584, lng: 6.9225 },
    bedrooms: 0,
    bathrooms: 0,
    propertyType: "Terrain",
    listingType: "sale",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    ],
    description:
      "Terrain constructible avec vue dégagée sur les collines grassoises. Idéal pour construire la maison de vos rêves dans un environnement préservé.",
    surface: 800,
    yearBuilt: undefined,
    energyClass: undefined,
    features: ["Vue dégagée", "Constructible", "Viabilisé", "Calme"],
    isSold: false,
    views: 87,
    listedAt: "2024-01-12",
    createdAt: "2024-01-12",
  },
]

export const messages: ContactMessage[] = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "06 12 34 56 78",
    propertyId: 1,
    propertyTitle: "Villa Moderne avec Piscine",
    subject: "visite",
    message: "Je suis intéressée par une visite de cette villa. Quand serait-il possible de la visiter ?",
    date: "2024-01-20",
    status: "new",
  },
  {
    id: 2,
    name: "Pierre Martin",
    email: "pierre.martin@email.com",
    propertyId: 2,
    propertyTitle: "Appartement Centre-Ville",
    subject: "location",
    message: "Cet appartement est-il toujours disponible à la location ? Quels sont les frais d'agence ?",
    date: "2024-01-19",
    status: "read",
  },
]
