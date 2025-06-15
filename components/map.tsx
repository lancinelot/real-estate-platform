'use client'

import { useEffect, useRef } from 'react'
import L, { Map as LeafletMap, Marker } from 'leaflet'
import 'leaflet/dist/leaflet.css'
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
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef<Marker[]>([])

  useEffect(() => {
    if (!mapRef.current) return

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
            <div style="
              background-color: ${isSelected ? '#dc2626' : '#2563eb'};
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
            ">
              ${property.listingType === 'rent' ? '€/m' : '€'}
            </div>
          `,
          className: 'custom-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        })

        const marker = L.marker([property.coordinates.lat, property.coordinates.lng], { icon }).addTo(map)

        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">
              ${property.title}
            </h3>
            <p style="margin: 0 0 4px 0; color: #666; font-size: 12px;">
              ${property.location}
            </p>
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #2563eb;">
              ${property.price.toLocaleString('fr-FR')}€${property.listingType === 'rent' ? '/mois' : ''}
            </p>
            <div style="font-size: 12px; color: #666;">
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
      map.remove()
    }
  }, [properties, center, zoom, selectedProperty, onPropertySelect])

  return <div ref={mapRef} style={{ height, width: '100%' }} className="rounded-lg border border-gray-200" />
}

// Composant pour afficher une seule propriété
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
