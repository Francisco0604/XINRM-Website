import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default Leaflet icon markers in React
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapData {
  coordinates: [number, number]
  name: string
  details: string
  stats?: { label: string; value: string }[]
}

interface FieldMapProps {
  data: MapData
}

const FieldMap: React.FC<FieldMapProps> = ({ data }) => {
  return (
    <div className="w-full h-full rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl relative z-0">
      <MapContainer 
        center={data.coordinates} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
        className="grayscale hover:grayscale-0 transition-all duration-1000"
      >
        {/* NRM Friendly Tile Layer (Topographic/Terrain style) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        <Marker position={data.coordinates}>
          <Popup className="custom-popup">
            <div className="p-2">
              <h4 className="font-bold text-primary mb-2">{data.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{data.details}</p>
              {data.stats && (
                <div className="grid grid-cols-2 gap-2 border-t pt-3">
                  {data.stats.map((s, i) => (
                    <div key={i}>
                      <span className="block text-[10px] uppercase font-bold text-gray-400">{s.label}</span>
                      <span className="text-accent font-black text-xs">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default FieldMap
