'use client'

import { useEffect, useRef, useState } from 'react'
import type { Property } from '@/lib/types'

interface MapProps {
  properties?: Property[]
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
  selectedProperty?: Property | null
  onPropertySelect?: (property: Property) => void
}

export function Map({
  properties = [],
  center = { lat: 43.6532, lng: 7.1378 },
  zoom = 10,
  height = '400px',
  selectedProperty,
  onPropertySelect,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [isClient, setIsClient] = useState(false)
  const [L, setL] = useState<any>(null)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Dynamic import of Leaflet only on client side
  useEffect(() => {
    if (!isClient) return

    const loadLeaflet = async () => {
      try {
        const leaflet = await import('leaflet')
        
        // Load CSS dynamically
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
          link.crossOrigin = ''
          document.head.appendChild(link)
        }

        // Add custom styles for markers and popups
        if (!document.querySelector('#map-custom-styles')) {
          const style = document.createElement('style')
          style.id = 'map-custom-styles'
          style.textContent = `
            .custom-marker-icon {
              background-color: #2563eb;
              color: white;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 12px;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            .custom-marker-icon.selected {
              background-color: #dc2626;
            }
            .map-popup {
              min-width: 200px;
            }
            .map-popup-title {
              margin: 0 0 8px 0;
              font-size: 14px;
              font-weight: bold;
            }
            .map-popup-location {
              margin: 0 0 4px 0;
              color: #666;
              font-size: 12px;
            }
            .map-popup-price {
              margin: 0 0 8px 0;
              font-weight: bold;
              color: #2563eb;
            }
            .map-popup-details {
              font-size: 12px;
              color: #666;
            }
            .map-loading-container {
              width: 100%;
              border-radius: 0.5rem;
              border: 1px solid #e5e7eb;
              background-color: #f3f4f6;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .map-container {
              width: 100%;
              border-radius: 0.5rem;
              border: 1px solid #e5e7eb;
            }
          `
          document.head.appendChild(style)
        }
        
        // Fix for default markers in Leaflet with webpack
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })
        
        setL(leaflet)
      } catch (error) {
        console.error('Failed to load Leaflet:', error)
      }
    }

    loadLeaflet()
  }, [isClient])

  useEffect(() => {
    if (!mapRef.current || !L || !isClient) return

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
    }

    const map = L.map(mapRef.current).setView([center.lat, center.lng], zoom)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    mapInstanceRef.current = map

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    properties.forEach((property) => {
      if (property.coordinates) {
        const isSelected = selectedProperty?.id === property.id

        const icon = L.divIcon({
          html: `
            <div class="custom-marker-icon ${isSelected ? 'selected' : ''}">
              ${property.listingType === 'rent' ? '€/m' : '€'}
            </div>
          `,
          className: 'custom-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        })

        const marker = L.marker([property.coordinates.lat, property.coordinates.lng], { icon }).addTo(map)

        const popupContent = `
          <div class="map-popup">
            <h3 class="map-popup-title">
              ${property.title}
            </h3>
            <p class="map-popup-location">
              ${property.location}
            </p>
            <p class="map-popup-price">
              ${property.price.toLocaleString('fr-FR')}€${property.listingType === 'rent' ? '/mois' : ''}
            </p>
            <div class="map-popup-details">
              ${property.bedrooms} ch. • ${property.bathrooms} sdb. • ${property.surface}m²
            </div>
          </div>
        `

        marker.bindPopup(popupContent)

        marker.on('click', () => {
          onPropertySelect?.(property)
        })

        markersRef.current.push(marker)
      }
    })

    if (properties.length > 1) {
      const validMarkers = markersRef.current.filter((m) => m.getLatLng())
      if (validMarkers.length > 0) {
        const group = L.featureGroup(validMarkers)
        map.fitBounds(group.getBounds().pad(0.1))
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }
    }
  }, [properties, center, zoom, selectedProperty, onPropertySelect, L, isClient])

  // Show loading state while Leaflet is loading
  if (!isClient || !L) {
    return (
      <div 
        className="map-loading-container"
        style={{ height }}
      >
        <div className="text-center">
          <div className="text-gray-400 mb-2">🗺️</div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className="map-container" style={{ height }} />
}

// Component to display a single property
export function PropertyMap({ property }: { property: Property }) {
  if (!property.coordinates) {
    return (
      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-2">📍</div>
          <p className="text-gray-600">Localisation</p>
          <p className="text-sm text-gray-500">{property.location}</p>
        </div>
      </div>
    )
  }

  return <Map properties={[property]} center={property.coordinates} zoom={15} height="300px" />
}