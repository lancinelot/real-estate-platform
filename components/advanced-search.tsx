"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, X, Home, Euro } from "lucide-react";
import type { SearchFilters } from "@/lib/types";

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onReset: () => void;
  initialFilters?: SearchFilters;
}

const availableFeatures = [
  "Piscine",
  "Garage",
  "Jardin",
  "Terrasse",
  "Balcon",
  "Cave",
  "Climatisation",
  "Cheminée",
  "Ascenseur",
  "Parking",
  "Vue mer",
];

const locations = [
  "Cannes",
  "Nice",
  "Monaco",
  "Antibes",
  "Grasse",
  "Menton",
  "Saint-Tropez",
  "Juan-les-Pins",
  "Valbonne",
  "Mougins",
];

export function AdvancedSearch({
  onSearch,
  onReset,
  initialFilters,
}: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>(
    initialFilters || {
      searchTerm: "",
      propertyType: "all",
      listingType: "all",
      minPrice: "",
      maxPrice: "",
      bedrooms: "all",
      location: "all",
      features: [],
    }
  );

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFeatureToggle = (feature: string) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      searchTerm: "",
      propertyType: "all",
      listingType: "all",
      minPrice: "",
      maxPrice: "",
      bedrooms: "all",
      location: "all",
      features: [],
    };
    setFilters(resetFilters);
    onReset();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.propertyType !== "all") count++;
    if (filters.listingType !== "all") count++;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.bedrooms !== "all") count++;
    if (filters.location !== "all") count++;
    if (filters.features.length > 0) count++;
    return count;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Recherche avancée
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres{" "}
            {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recherche principale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })
              }
              className="pl-10"
            />
          </div>

          <Select
            value={filters.listingType}
            onValueChange={(value) =>
              setFilters({ ...filters, listingType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Type d'annonce" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Vente et Location</SelectItem>
              <SelectItem value="sale">
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />À vendre
                </div>
              </SelectItem>
              <SelectItem value="rent">
                <div className="flex items-center">
                  <Euro className="h-4 w-4 mr-2" />À louer
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.propertyType}
            onValueChange={(value) =>
              setFilters({ ...filters, propertyType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="Appartement">Appartement</SelectItem>
              <SelectItem value="Maison">Maison</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
              <SelectItem value="Studio">Studio</SelectItem>
              <SelectItem value="Penthouse">Penthouse</SelectItem>
              <SelectItem value="Terrain">Terrain</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSearch} className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Rechercher
          </Button>
        </div>

        {/* Filtres avancés */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t">
            {/* Prix et localisation */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Prix minimum</Label>
                <Input
                  type="number"
                  placeholder="Prix min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Prix maximum</Label>
                <Input
                  type="number"
                  placeholder="Prix max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Chambres minimum</Label>
                <Select
                  value={filters.bedrooms}
                  onValueChange={(value) =>
                    setFilters({ ...filters, bedrooms: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chambres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Localisation</Label>
                <Select
                  value={filters.location}
                  onValueChange={(value) =>
                    setFilters({ ...filters, location: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les villes</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {location}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Équipements */}
            <div>
              <Label className="text-base font-medium">
                Équipements souhaités
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-3">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={filters.features.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <Label htmlFor={feature} className="text-sm cursor-pointer">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Filtres actifs */}
            {getActiveFiltersCount() > 0 && (
              <div>
                <Label className="text-base font-medium">Filtres actifs</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {filters.searchTerm && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Recherche: {filters.searchTerm}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          setFilters({ ...filters, searchTerm: "" })
                        }
                      />
                    </Badge>
                  )}
                  {filters.listingType !== "all" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {filters.listingType === "sale" ? "À vendre" : "À louer"}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          setFilters({ ...filters, listingType: "all" })
                        }
                      />
                    </Badge>
                  )}
                  {filters.propertyType !== "all" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {filters.propertyType}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          setFilters({ ...filters, propertyType: "all" })
                        }
                      />
                    </Badge>
                  )}
                  {filters.location !== "all" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {filters.location}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          setFilters({ ...filters, location: "all" })
                        }
                      />
                    </Badge>
                  )}
                  {filters.features.map((feature) => (
                    <Badge
                      key={feature}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {feature}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleFeatureToggle(feature)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleReset}>
                Réinitialiser tous les filtres
              </Button>
              <Button onClick={handleSearch}>
                Appliquer les filtres ({getActiveFiltersCount()})
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
