"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Grid, List, Home } from "lucide-react"
import Link from "next/link"
import { AdvancedSearch } from "@/components/advanced-search"
import { Map } from "@/components/map"
import { PropertyCard, PropertyCardSkeleton } from "@/components/property-card"
import { properties as allProperties } from "@/lib/data"
import type { SearchFilters, Property } from "@/lib/types"

export default function PropertiesPage() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchTerm: "",
    propertyType: "all",
    listingType: "all",
    minPrice: "",
    maxPrice: "",
    bedrooms: "all",
    location: "all",
    features: [],
  })
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (filters: SearchFilters) => {
    setIsLoading(true)

    setTimeout(() => {
      const filtered = allProperties.filter((property) => {
        const matchesSearch =
          property.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          property.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          property.description.toLowerCase().includes(filters.searchTerm.toLowerCase())

        const matchesType = filters.propertyType === "all" || property.propertyType === filters.propertyType
        const matchesListingType = filters.listingType === "all" || property.listingType === filters.listingType
        const matchesMinPrice = !filters.minPrice || property.price >= Number.parseInt(filters.minPrice)
        const matchesMaxPrice = !filters.maxPrice || property.price <= Number.parseInt(filters.maxPrice)
        const matchesBedrooms = filters.bedrooms === "all" || property.bedrooms >= Number.parseInt(filters.bedrooms)
        const matchesLocation = filters.location === "all" || property.location.includes(filters.location)
        const matchesFeatures =
          filters.features.length === 0 || filters.features.every((feature) => property.features.includes(feature))

        return (
          matchesSearch &&
          matchesType &&
          matchesListingType &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesBedrooms &&
          matchesLocation &&
          matchesFeatures
        )
      })

      setFilteredProperties(filtered)
      setSearchFilters(filters)
      setIsLoading(false)
    }, 500)
  }

  const handleReset = () => {
    setIsLoading(true)
    setTimeout(() => {
      setFilteredProperties(allProperties)
      setSearchFilters({
        searchTerm: "",
        propertyType: "all",
        listingType: "all",
        minPrice: "",
        maxPrice: "",
        bedrooms: "all",
        location: "all",
        features: [],
      })
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                ImmoExpert
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Accueil
              </Link>
              <Link href="/properties" className="text-blue-600 font-medium">
                Propriétés
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </Link>
              <Link
                href="/admin"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Propriétés</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de biens immobiliers d'exception sur la Côte d'Azur
          </p>
        </div>

        {/* Filters */}
        <AdvancedSearch
          onSearch={handleSearch}
          onReset={handleReset}
          initialFilters={searchFilters}
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-gray-700">
              {isLoading ? "Recherche en cours..." : `${filteredProperties.length} propriété(s) trouvée(s)`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">Affichage :</span>
            <div className="flex border rounded-lg bg-white shadow-sm">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none border-x"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="rounded-l-none"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === "map" ? (
          <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
            <Map
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
            />
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <PropertyCardSkeleton key={index} viewMode={viewMode} />
                ))
              : filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} viewMode={viewMode} />
                ))}
          </div>
        )}

        {!isLoading && filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
              <div className="text-6xl mb-6">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucune propriété trouvée</h3>
              <p className="text-gray-600 mb-6">
                Aucune propriété ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
              </p>
              <Button onClick={handleReset} className="bg-gradient-to-r from-blue-600 to-blue-700">
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
