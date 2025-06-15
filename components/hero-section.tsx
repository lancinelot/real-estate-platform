"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Home, TrendingUp, Users, Award } from "lucide-react"
import { useRouter } from "next/navigation"

const stats = [
  {
    icon: Home,
    label: "Propriétés vendues",
    value: "500+",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Users,
    label: "Clients satisfaits",
    value: "1200+",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Award,
    label: "Années d'expérience",
    value: "15+",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: TrendingUp,
    label: "Agents experts",
    value: "25+",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

export function HeroSection() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    location: "",
    listingType: "",
    propertyType: "",
    maxPrice: "",
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchData.location) params.set("location", searchData.location)
    if (searchData.listingType) params.set("listingType", searchData.listingType)
    if (searchData.propertyType) params.set("propertyType", searchData.propertyType)
    if (searchData.maxPrice) params.set("maxPrice", searchData.maxPrice)

    router.push(`/properties?${params.toString()}`)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background avec gradient animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px] animate-pulse" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Titre principal avec animation */}
            <div className="space-y-6 mb-12">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Trouvez la Propriété
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  de Vos Rêves
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Découvrez notre sélection exclusive de biens immobiliers sur la Côte d'Azur, accompagnés par nos experts
                depuis plus de 15 ans
              </p>
            </div>

            {/* Barre de recherche améliorée */}
            <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Où cherchez-vous ?"
                      className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white transition-colors"
                      value={searchData.location}
                      onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    />
                  </div>

                  <Select
                    value={searchData.listingType}
                    onValueChange={(value) => setSearchData({ ...searchData, listingType: value })}
                  >
                    <SelectTrigger className="h-12 border-0 bg-gray-50 focus:bg-white">
                      <SelectValue placeholder="Vente ou Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">À vendre</SelectItem>
                      <SelectItem value="rent">À louer</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative">
                    <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Select
                      value={searchData.propertyType}
                      onValueChange={(value) => setSearchData({ ...searchData, propertyType: value })}
                    >
                      <SelectTrigger className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white">
                        <SelectValue placeholder="Type de bien" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Appartement">Appartement</SelectItem>
                        <SelectItem value="Maison">Maison</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Studio">Studio</SelectItem>
                        <SelectItem value="Penthouse">Penthouse</SelectItem>
                        <SelectItem value="Terrain">Terrain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Input
                    placeholder="Budget max"
                    type="number"
                    className="h-12 border-0 bg-gray-50 focus:bg-white transition-colors"
                    value={searchData.maxPrice}
                    onChange={(e) => setSearchData({ ...searchData, maxPrice: e.target.value })}
                  />

                  <Button
                    onClick={handleSearch}
                    className="h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Rechercher
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags de recherche rapide */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["Villa avec piscine", "Appartement Nice", "Maison Cannes", "Studio Monaco"].map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section améliorée */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div
                  className={`${stat.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
