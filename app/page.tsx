import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, MapPin, Home, Star, Phone, Mail, Shield, Award, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { PropertyCard } from "@/components/property-card"
import { properties } from "@/lib/data"

const featuredProperties = properties.slice(0, 3)

const services = [
  {
    icon: Search,
    title: "Recherche Personnalisée",
    description: "Nous trouvons le bien qui correspond parfaitement à vos critères et votre budget",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Shield,
    title: "Accompagnement Sécurisé",
    description: "Un suivi juridique et administratif complet pour une transaction en toute sérénité",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Award,
    title: "Expertise Reconnue",
    description: "Plus de 15 ans d'expérience sur le marché immobilier de la Côte d'Azur",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

const testimonials = [
  {
    name: "Sophie Laurent",
    role: "Propriétaire",
    content:
      "Service exceptionnel ! L'équipe m'a accompagnée tout au long de la vente de ma villa. Professionnalisme et réactivité au rendez-vous.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Marc Dubois",
    role: "Acheteur",
    content:
      "Grâce à ImmoExpert, j'ai trouvé l'appartement parfait à Nice. Leur connaissance du marché local est impressionnante.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf48d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Claire Martin",
    role: "Investisseur",
    content: "Une équipe de confiance pour mes investissements immobiliers. Conseils avisés et suivi personnalisé.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                ImmoExpert
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Accueil
              </Link>
              <Link href="/properties" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Propriétés
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </Link>
              <Link
                href="/admin"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-2" />
              Sélection Premium
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Propriétés en Vedette</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre sélection de biens d'exception, soigneusement choisis pour leur qualité, leur emplacement
              privilégié et leur potentiel d'investissement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} featured />
            ))}
          </div>

          <div className="text-center">
            <Link href="/properties">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Voir toutes les propriétés
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Nos Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Un accompagnement personnalisé à chaque étape de votre projet immobilier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
              >
                <div
                  className={`${service.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <service.icon className={`h-10 w-10 ${service.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Users className="h-4 w-4 mr-2" />
              Témoignages Clients
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ce que disent nos clients</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La satisfaction de nos clients est notre priorité absolue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Prêt à Trouver Votre Nouveau Chez-Vous ?</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Contactez nos experts dès aujourd'hui pour une consultation gratuite et personnalisée
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="h-5 w-5 mr-2" />
                Nous Contacter
              </Button>
            </Link>
            <Link href="/properties">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg font-semibold text-white border-white hover:bg-white hover:text-blue-600 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Search className="h-5 w-5 mr-2" />
                Parcourir les Biens
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">ImmoExpert</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Votre partenaire de confiance pour tous vos projets immobiliers sur la Côte d'Azur
              </p>
              <div className="flex space-x-4">
                {/* Social media icons */}
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">ig</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Navigation</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="text-gray-400 hover:text-white transition-colors">
                    Propriétés
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3">
                <li>
                  <span className="text-gray-400">Vente</span>
                </li>
                <li>
                  <span className="text-gray-400">Location</span>
                </li>
                <li>
                  <span className="text-gray-400">Estimation</span>
                </li>
                <li>
                  <span className="text-gray-400">Gestion locative</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-blue-400" />
                  <span className="text-gray-400">+91 6384695523</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-blue-400" />
                  <span className="text-gray-400">contact@immoexpert.fr</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                  <span className="text-gray-400">Abidjan, Ivory Coast</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© 2024 ImmoExpert. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
