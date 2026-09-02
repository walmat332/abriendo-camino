'use client'

import { X, MapPin, Calendar, Clock, Video, Users, MessageCircle } from 'lucide-react'

interface Grupo {
  id: number
  nombre: string
  distrito: string
  diaHora: string
  tipo: 'Virtual' | 'Presencial'
  ubicacion: string
  whatsapp: string
}

const grupos: Grupo[] = [
  {
    id: 1,
    nombre: "GC NORTE 01",
    distrito: "San Martín de Porres",
    diaHora: "Martes 7:00 PM",
    tipo: "Presencial",
    ubicacion: "Dirección referencial, SMP",
    whatsapp: "51999999999", // Cambia por el número real del líder
  },
  {
    id: 2,
    nombre: "GC NORTE 02",
    distrito: "San Martín de Porres",
    diaHora: "Miércoles 7:00 PM",
    tipo: "Presencial",
    ubicacion: "Dirección referencial, SMP",
    whatsapp: "51979345646",
  },
  {
    id: 3,
    nombre: "GC ESTE 01",
    distrito: "San Juan de Lurigancho",
    diaHora: "Jueves 7:00 PM",
    tipo: "Presencial",
    ubicacion: "Dirección referencial, SJL",
    whatsapp: "51939945787",
  },
  {
    id: 4,
    nombre: "GC ESTE 02",
    distrito: "San Juan de Lurigancho",
    diaHora: "Viernes 7:00 PM",
    tipo: "Presencial",
    ubicacion: "Dirección referencial, SJL",
    whatsapp: "51979345646",
  },
  {
    id: 5,
    nombre: "GC CENTRO 01",
    distrito: "La Victoria",
    diaHora: "Jueves 8:00 PM",
    tipo: "Presencial",
    ubicacion: "Dirección referencial, La Victoria",
    whatsapp: "51999999999",
  },
  {
    id: 6,
    nombre: "GC VIRTUAL 01",
    distrito: "Virtual (Zoom / Meet)",
    diaHora: "Lunes 8:00 PM",
    tipo: "Virtual",
    ubicacion: "El link se envía por WhatsApp al inscribirte",
    whatsapp: "51999999999",
  },
  {
    id: 7,
    nombre: "GC VIRTUAL 02",
    distrito: "Virtual (Zoom / Meet)",
    diaHora: "Sábado 10:00 AM",
    tipo: "Virtual",
    ubicacion: "El link se envía por WhatsApp al inscribirte",
    whatsapp: "51939945787",
  },
]

interface GruposModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GruposModal({ isOpen, onClose }: GruposModalProps) {
  if (!isOpen) return null

  const handleUnirse = (whatsapp: string, nombreGrupo: string) => {
    const mensaje = `Hola, me gustaría unirme al *${nombreGrupo}*. ¿Me podrían dar más información y la ubicación/link para inscribirme?`
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black flex items-center gap-2">
              <Users className="w-6 h-6" />
              Grupos de Conexión (GC)
            </h2>
            <p className="text-emerald-100 text-sm mt-1">Encuentra tu comunidad y crece junto a otros</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de grupos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {grupos.map((grupo) => (
            <div 
              key={grupo.id} 
              className="border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-emerald-200 transition-all bg-slate-50"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-black text-lg text-slate-900 tracking-wide">{grupo.nombre}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    {grupo.distrito}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                  grupo.tipo === 'Virtual' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {grupo.tipo === 'Virtual' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                  {grupo.tipo}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">{grupo.diaHora}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{grupo.ubicacion}</span>
                </div>
              </div>

              <button
                onClick={() => handleUnirse(grupo.whatsapp, grupo.nombre)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                Unirme por WhatsApp
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center text-sm text-slate-500">
          ¿No puedes en estos horarios? Escríbenos y te ayudamos a encontrar una opción.
        </div>
      </div>
    </div>
  )
}