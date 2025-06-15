"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Bed, Bath, Square, Heart, Share2, Eye, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/lib/types"

interface PropertyCardProps {
  property: Property
  viewMode?: "grid" | "list"
  featured?: boolean
}

export function PropertyCard({ property, viewMode = "grid", featured = false }: PropertyCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: `/properties/${property.id}`,
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/properties/${property.id}`)
      alert("Lien copié dans le presse-papier !")
    }
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Card
      className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md ${
        viewMode === "list" ? "flex" : ""
      } ${featured ? "ring-2 ring-blue-500/20" : ""}`}
    >
      <div className={`relative ${viewMode === "list" ? "w-1/3" : ""}`}>
        {imageLoading && (
          <Skeleton className={`${viewMode === "list" ? "w-full h-full" : "w-full h-48"} absolute inset-0`} />
        )}
        <Image
          src={property.images[0] || "/placeholder.svg"}
          alt={property.title}
          width={400}
          height={300}
          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
            viewMode === "list" ? "w-full h-full" : "w-full h-48"
          }`}
          onLoad={() => setImageLoading(false)}
        />

        {/* Overlay avec actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {featured && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
              ⭐ Vedette
            </Badge>
          )}
          <Badge
            variant={property.listingType === "sale" ? "default" : "secondary"}
            className="shadow-lg backdrop-blur-sm"
          >
            {property.listingType === "sale" ? "À vendre" : "À louer"}
          </Badge>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 backdrop-blur-sm bg-white/90 hover:bg-white"
            onClick={handleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 backdrop-blur-sm bg-white/90 hover:bg-white"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Prix en overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
            <span className="text-lg font-bold text-blue-600">
              {property.price.toLocaleString("fr-FR")}€
              {property.listingType === "rent" && <span className="text-sm text-gray-600">/mois</span>}
            </span>
          </div>
        </div>
      </div>

      <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
        <div className="space-y-3">
          {/* Type de bien */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {property.propertyType}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <Eye className="h-3 w-3 mr-1" />
              {property.views} vues
            </div>
          </div>

          {/* Titre */}
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>

          {/* Localisation */}
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1 text-blue-500" />
            <span className="text-sm">{property.location}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{property.description}</p>

          {/* Caractéristiques */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {property.bedrooms > 0 && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1 text-gray-400" />
                <span>{property.bedrooms} ch.</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1 text-gray-400" />
                <span>{property.bathrooms} sdb.</span>
              </div>
            )}
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1 text-gray-400" />
              <span>{property.surface}m²</span>
            </div>
          </div>

          {/* Date de mise en ligne */}
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            Publié le {new Date(property.listedAt).toLocaleDateString("fr-FR")}
          </div>

          {/* Bouton d'action */}
          <Link href={`/properties/${property.id}`} className="block">
            <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
              Voir les détails
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export function PropertyCardSkeleton({ viewMode = "grid" }: { viewMode?: "grid" | "list" }) {
  return (
    <Card className={`overflow-hidden ${viewMode === "list" ? "flex" : ""}`}>
      <div className={viewMode === "list" ? "w-1/3" : ""}>
        <Skeleton className={`${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`} />
      </div>
      <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
