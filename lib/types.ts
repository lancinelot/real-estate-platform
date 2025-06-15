export interface Property {
  id: number
  title: string
  description: string
  price: number
  location: string
  coordinates?: {
    lat: number
    lng: number
  }
  bedrooms: number
  bathrooms: number
  propertyType: string
  listingType: "sale" | "rent" // Nouveau champ
  images: string[]
  surface: number
  landSize?: number
  yearBuilt?: number
  energyClass?: string
  features: string[]
  isSold: boolean
  views: number
  listedAt: string
  createdAt: string
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  phone?: string
  propertyId?: number
  propertyTitle?: string
  subject: string
  message: string
  date: string
  status: "new" | "read" | "replied"
}

export interface SearchFilters {
  searchTerm: string
  propertyType: string
  listingType: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  location: string
  features: string[]
}
