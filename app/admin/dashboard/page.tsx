"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Plus, Edit, Trash2, Eye, MessageSquare, TrendingUp, LogOut, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const properties = [
  {
    id: 1,
    title: "Villa Moderne avec Piscine",
    price: 850000,
    location: "Cannes",
    propertyType: "Villa",
    image: "/placeholder.svg?height=100&width=150",
    status: "active",
    views: 245,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Appartement Centre-Ville",
    price: 320000,
    location: "Nice",
    propertyType: "Appartement",
    image: "/placeholder.svg?height=100&width=150",
    status: "active",
    views: 189,
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    title: "Maison Familiale",
    price: 450000,
    location: "Antibes",
    propertyType: "Maison",
    image: "/placeholder.svg?height=100&width=150",
    status: "sold",
    views: 156,
    createdAt: "2024-01-05",
  },
]

const messages = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    property: "Villa Moderne avec Piscine",
    message: "Je suis intéressée par une visite de cette villa...",
    date: "2024-01-20",
    status: "new",
  },
  {
    id: 2,
    name: "Pierre Martin",
    email: "pierre.martin@email.com",
    property: "Appartement Centre-Ville",
    message: "Pouvez-vous me donner plus d'informations sur...",
    date: "2024-01-19",
    status: "read",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    // Logique de déconnexion
    window.location.href = "/admin"
  }

  const handleDeleteProperty = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette propriété ?")) {
      // Logique de suppression
      console.log("Suppression de la propriété", id)
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
              <span className="text-2xl font-bold text-gray-900">ImmoExpert Admin</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "overview" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Vue d'ensemble
                  </Button>
                  <Button
                    variant={activeTab === "properties" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("properties")}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Propriétés
                  </Button>
                  <Button
                    variant={activeTab === "messages" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Home className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Propriétés actives</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {properties.filter((p) => p.status === "active").length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <TrendingUp className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Propriétés vendues</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {properties.filter((p) => p.status === "sold").length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Eye className="h-8 w-8 text-purple-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Vues totales</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {properties.reduce((sum, p) => sum + p.views, 0)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <MessageSquare className="h-8 w-8 text-orange-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Nouveaux messages</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {messages.filter((m) => m.status === "new").length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Nouvelle demande de visite pour "Villa Moderne avec Piscine"</span>
                        <span className="text-xs text-gray-500 ml-auto">Il y a 2h</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Propriété "Maison Familiale" marquée comme vendue</span>
                        <span className="text-xs text-gray-500 ml-auto">Il y a 1j</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Nouvelle propriété ajoutée: "Penthouse de Luxe"</span>
                        <span className="text-xs text-gray-500 ml-auto">Il y a 3j</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "properties" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-gray-900">Gestion des propriétés</h1>
                  <Link href="/admin/properties/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une propriété
                    </Button>
                  </Link>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Propriété
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Prix
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Statut
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Vues
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {properties.map((property) => (
                            <tr key={property.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Image
                                    src={property.image || "/placeholder.svg"}
                                    alt={property.title}
                                    width={60}
                                    height={40}
                                    className="rounded-lg object-cover"
                                  />
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                    <div className="text-sm text-gray-500">{property.location}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {property.price.toLocaleString("fr-FR")}€
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant={property.status === "active" ? "default" : "secondary"}>
                                  {property.status === "active" ? "Actif" : "Vendu"}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{property.views}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <Link href={`/properties/${property.id}`}>
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                  <Link href={`/admin/properties/${property.id}/edit`}>
                                    <Button size="sm" variant="outline">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </Link>
                                  <Button size="sm" variant="outline" onClick={() => handleDeleteProperty(property.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Messages de contact</h1>

                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold">{message.name}</h3>
                              <Badge variant={message.status === "new" ? "default" : "secondary"}>
                                {message.status === "new" ? "Nouveau" : "Lu"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{message.email}</p>
                            <p className="text-sm text-blue-600 mb-3">Concernant: {message.property}</p>
                            <p className="text-gray-700">{message.message}</p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(message.date).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm">Répondre</Button>
                          <Button size="sm" variant="outline">
                            Marquer comme lu
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
