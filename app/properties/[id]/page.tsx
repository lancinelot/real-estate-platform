"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Home, Calendar, Square, Phone, Mail, ArrowLeft, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PropertyMap } from "@/components/map"
import { properties } from "@/lib/data"
import { sendContactNotification, sendPropertyInquiryResponse } from "@/lib/email"

// Get property from URL params
const propertyId = 1 // In a real app, this would come from params
const property = properties.find((p) => p.id === propertyId) || properties[0]

export default function PropertyDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Envoyer notification à l'admin
      await sendContactNotification({
        ...contactForm,
        propertyTitle: property.title,
        subject: "visite",
      })

      // Envoyer confirmation au client
      await sendPropertyInquiryResponse({
        ...contactForm,
        propertyTitle: property.title,
      })

      alert("Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.")
      setContactForm({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      alert("Erreur lors de l'envoi du message. Veuillez réessayer.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ImmoExpert</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Accueil
              </Link>
              <Link href="/properties" className="text-gray-700 hover:text-blue-600 font-medium">
                Propriétés
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>
              <Link href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Link href="/properties" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour aux propriétés
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={property.images[currentImageIndex] || "/placeholder.svg"}
                    alt={property.title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="secondary">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2 p-4">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden ${
                        index === currentImageIndex ? "ring-2 ring-blue-600" : ""
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{property.propertyType}</Badge>
                    <Badge variant={property.listingType === "sale" ? "default" : "secondary"}>
                      {property.listingType === "sale" ? "À vendre" : "À louer"}
                    </Badge>
                  </div>
                  <span className="text-3xl font-bold text-blue-600">
                    {property.price.toLocaleString("fr-FR")}€{property.listingType === "rent" ? "/mois" : ""}
                  </span>
                </div>
                <CardTitle className="text-2xl">{property.title}</CardTitle>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-gray-400" />
                    <div>
                      <div className="font-semibold">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600">Chambres</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-gray-400" />
                    <div>
                      <div className="font-semibold">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600">Salles de bain</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2 text-gray-400" />
                    <div>
                      <div className="font-semibold">{property.surface}m²</div>
                      <div className="text-sm text-gray-600">Surface</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    <div>
                      <div className="font-semibold">{property.yearBuilt}</div>
                      <div className="text-sm text-gray-600">Année</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Caractéristiques</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Terrain</div>
                    <div className="font-semibold">{property.landSize}m²</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Classe énergétique</div>
                    <div className="font-semibold">{property.energyClass}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Mise en ligne</div>
                    <div className="font-semibold">{new Date(property.listedAt).toLocaleDateString("fr-FR")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyMap property={property} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Demander une visite</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Nom complet"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Téléphone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  />
                  <Textarea
                    placeholder="Votre message..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows={4}
                  />
                  <Button type="submit" className="w-full">
                    Envoyer la demande
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Agent Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Votre conseiller</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-semibold text-gray-600">JD</span>
                  </div>
                  <div>
                    <div className="font-semibold">Jean Dupont</div>
                    <div className="text-sm text-gray-600">Agent immobilier</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">04 93 XX XX XX</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">jean.dupont@immoexpert.fr</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Contacter l'agent
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
