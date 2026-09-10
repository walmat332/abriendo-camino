'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { Users, MessageCircle, LogOut, Lock, Loader2, ArrowLeft } from 'lucide-react'

// 🔒 CONTRASEÑA DEL ADMIN (Cámbiala por la que tú quieras)
const ADMIN_PASSWORD = 'admin2024'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Verificar si ya está autenticado en esta sesión
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchUsers()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'true')
      fetchUsers()
    } else {
      setError('Contraseña incorrecta')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_auth')
    setPassword('')
    setUsers([])
  }

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      // Ajusta 'registros' si tu tabla se llama diferente (ej: 'usuarios', 'progreso')
      const { data, error } = await supabase
        .from('registros')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (err: any) {
      console.error('Error al cargar usuarios:', err)
      setError('Error al cargar los datos. Verifica que la tabla "registros" exista en Supabase.')
    } finally {
      setLoading(false)
    }
  }

  const sendWhatsApp = (nombre: string, telefono: string, dia: number) => {
    // Limpiar el teléfono de caracteres no numéricos
    const cleanPhone = telefono.replace(/\D/g, '')
    const message = encodeURIComponent(
      `Hola ${nombre} 👋, vimos que llegaste al Día ${dia} del reto *Abriendo Camino*. \n\n` +
      `¡No te rindas! Cada paso cuenta y estamos aquí para animarte a continuar. \n\n` +
      `¿Necesitas ayuda o tienes alguna pregunta? ¡Estamos contigo! 🙏✨`
    )
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank')
  }

  // --- VISTA DE LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Acceso Admin</CardTitle>
            <p className="text-sm text-slate-600">Ingresa la contraseña para ver el panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center text-lg"
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Ingresar
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => router.push('/abriendo-camino')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // --- VISTA DEL DASHBOARD ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-8 h-8 text-purple-600" />
              Panel de Admin
            </h1>
            <p className="text-slate-600 mt-1">
              Total de registrados: <span className="font-bold text-purple-600">{users.length}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchUsers} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Actualizar
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Salir
            </Button>
          </div>
        </div>

        {/* Tabla de Usuarios */}
        <Card>
          <CardContent className="p-0">
            {loading && users.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                Cargando usuarios...
              </div>
            ) : error ? (
              <div className="p-12 text-center text-red-500">
                <p>{error}</p>
                <p className="text-sm text-slate-500 mt-2">
                  Tip: Asegúrate de que la tabla en Supabase se llame <code>registros</code> y tenga las columnas: <code>nombre</code>, <code>telefono</code>, <code>dia</code> (o <code>dia_completado</code>).
                </p>
              </div>
            ) : users.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                No hay usuarios registrados aún.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="p-4 font-semibold text-slate-700">Nombre</th>
                      <th className="p-4 font-semibold text-slate-700">Teléfono</th>
                      <th className="p-4 font-semibold text-slate-700">Progreso</th>
                      <th className="p-4 font-semibold text-slate-700">Fecha Registro</th>
                      <th className="p-4 font-semibold text-slate-700 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map((user, index) => {
                      const dia = user.dia_completado || user.dia || 0
                      const semana = Math.ceil(dia / 7) || 1
                      return (
                        <tr key={user.id || index} className="hover:bg-slate-50 transition">
                          <td className="p-4 font-medium text-slate-900">{user.nombre || 'Sin nombre'}</td>
                          <td className="p-4 text-slate-600 font-mono text-sm">{user.telefono || 'Sin teléfono'}</td>
                          <td className="p-4">
                            {dia > 0 ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                Semana {semana} - Día {dia}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-sm">No ha iniciado</span>
                            )}
                          </td>
                          <td className="p-4 text-slate-500 text-sm">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString('es-ES') : 'N/A'}
                          </td>
                          <td className="p-4 text-right">
                            {user.telefono && dia > 0 && dia < 28 && (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => sendWhatsApp(user.nombre, user.telefono, dia)}
                              >
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Animar
                              </Button>
                            )}
                            {dia >= 28 && (
                              <span className="text-green-600 text-sm font-medium flex items-center justify-end gap-1">
                                ✅ Completado
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}