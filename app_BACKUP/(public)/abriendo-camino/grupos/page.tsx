'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowLeft, MapPin, Clock, Users, Monitor, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function GruposPage() {
  const router = useRouter()
  const [distritoSeleccionado, setDistritoSeleccionado] = useState<string | null>(null)

  const grupos = [
    {
      id: 1,
      nombre: 'GC NORTE 01',
      distrito: 'Norte',
      dia: 'Martes',
      hora: '7:00 PM',
      tipo: 'Presencial',
      direccion: 'Altura 26 Av. Perú SMP',
      lider: 'Walter',
      telefono: '+51 979 345 646'
    },
    {
      id: 2,
      nombre: 'GC NORTE 01',
      distrito: 'Sur',
      dia: 'Jueves',
      hora: '8:00 PM',
      tipo: 'Presencial',
      direccion: 'Altura Av. Perú SMP',
      lider: 'Dora',
      telefono: '+51 939 945 787'
    },
    {
      id: 3,
      nombre: 'Conexión Virtual Matutina',
      distrito: 'Virtual',
      dia: 'Miércoles',
      hora: '7:00 AM',
      tipo: 'Virtual',
      link: 'https://zoom.us/j/123456789',
      lider: 'Walter',
      telefono: '+51 939 945 787'
    },
    {
      id: 4,
      nombre: 'GC ESTE 01',
      distrito: 'Oriente',
      dia: 'Viernes',
      hora: '7:30 PM',
      tipo: 'Presencial',
      direccion: 'SJL',
      lider: 'Alex',
      telefono: '+51 963453 438'
    },
    {
      id: 5,
      nombre: 'Conexión Virtual Nocturna',
      distrito: 'Virtual',
      dia: 'Sábado',
      hora: '10:00 AM',
      tipo: 'Virtual',
      link: 'https://zoom.us/j/987654321',
      lider: 'Walter',
      telefono: '+51 939 945 787'
    },
    {
      id: 6,
      nombre: 'GC ESTE 02',
      distrito: 'Poniente',
      dia: 'Domingo',
      hora: '5:00 PM',
      tipo: 'Presencial',
      direccion: 'SJL Altura Estacion Santa Rosa',
      lider: 'Salomé',
      telefono: '+51 939 945 787'
    }
  ]

  const distritos = ['Todos', 'Norte', 'Sur', 'Oriente', 'Poniente', 'Virtual']

  const gruposFiltrados = distritoSeleccionado === 'Todos' || distritoSeleccionado === null
    ? grupos
    : grupos.filter(g => g.distrito === distritoSeleccionado)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/abriendo-camino')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              NO CAMINES SOLO
            </h1>
            <p className="text-lg text-slate-600">
              Únete a uno de nuestros grupos de conexión
            </p>
          </div>
        </div>

        {/* Filtros por distrito */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-bold text-slate-900">Filtra por ubicación</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {distritos.map((distrito) => (
                <Button
                  key={distrito}
                  variant={distritoSeleccionado === distrito ? 'default' : 'outline'}
                  onClick={() => setDistritoSeleccionado(distrito === 'Todos' ? null : distrito)}
                  className={distritoSeleccionado === distrito ? 'bg-purple-600 hover:bg-purple-700' : ''}
                >
                  {distrito}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de grupos */}
        <div className="space-y-4">
          {gruposFiltrados.map((grupo) => (
            <Card key={grupo.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{grupo.nombre}</h3>
                      {grupo.tipo === 'Virtual' ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                          <Monitor className="inline w-3 h-3 mr-1" />
                          Virtual
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                          <MapPin className="inline w-3 h-3 mr-1" />
                          Presencial
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span>{grupo.dia} a las {grupo.hora}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>Líder: {grupo.lider}</span>
                      </div>
                      {grupo.tipo === 'Presencial' ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <span>{grupo.direccion}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-purple-600" />
                          <a href={grupo.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Unirse por Zoom →
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-purple-600" />
                        <span>{grupo.telefono}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {grupo.tipo === 'Virtual' ? (
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => window.open(grupo.link, '_blank')}
                      >
                        <Monitor className="mr-2 h-4 w-4" />
                        Unirse al grupo
                      </Button>
                    ) : (
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => window.open(`https://wa.me/${grupo.telefono.replace(/\D/g, '')}`, '_blank')}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Contactar líder
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {gruposFiltrados.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-slate-600">No hay grupos disponibles en este distrito.</p>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 mb-4">
            ¿No encuentras un grupo que se ajuste a tu horario?
          </p>
          <Button 
            variant="outline"
            onClick={() => window.open('https://wa.me/525551234567', '_blank')}
          >
            <Phone className="mr-2 h-4 w-4" />
            Contáctanos para más información
          </Button>
        </div>
      </div>
    </div>
  )
}