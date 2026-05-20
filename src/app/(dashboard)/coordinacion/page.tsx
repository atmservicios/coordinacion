'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseCoordinacion } from '@/lib/supabaseCoordinacion';
import FormularioServicio from '@/components/FormularioServicio';
import TablaServicios from '@/components/TablaServicios';
import { Loader2, CalendarRange, RefreshCw } from 'lucide-react';

export default function CoordinacionPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [servicios, setServicios] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [servicioAEditar, setServicioAEditar] = useState<any | null>(null);

  // Verificar la sesión en la base de datos de coordinación
  useEffect(() => {
    supabaseCoordinacion.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setAuthenticated(true);
      }
    });

    const { data: { subscription } } = supabaseCoordinacion.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setAuthenticated(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Cargar servicios ordenados del más nuevo al más antiguo
  const fetchServicios = useCallback(async () => {
    setLoadingData(true);
    try {
      const { data, error } = await supabaseCoordinacion
        .from('servicios')
        .select('*')
        .order('fecha', { ascending: false })
        .order('hora_inicio', { ascending: false });

      if (error) {
        console.error('Error fetching servicios:', error);
      } else {
        setServicios(data || []);
      }
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchServicios();
    }
  }, [authenticated, fetchServicios, refreshKey]);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setServicioAEditar(null);
  };

  const handleEditSelect = (servicio: any) => {
    setServicioAEditar(servicio);
    // Scroll suave hacia arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setServicioAEditar(null);
  };

  if (authenticated === null) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center h-screen bg-slate-900 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-2" />
        <p className="text-sm font-semibold">Verificando sesión...</p>
      </div>
    );
  }

  return (
    <main className="flex-1 px-6 py-8 overflow-y-auto max-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-500/10 border border-brand-500/20 text-brand-500">
            <CalendarRange className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100">Coordinación de Servicios ATM</h1>
            <p className="text-xs text-slate-500 mt-0.5">Control y planificación de mantenimiento técnico</p>
          </div>
        </div>

        <button
          onClick={() => setRefreshKey((prev) => prev + 1)}
          disabled={loadingData}
          className="btn-secondary py-2 px-3.5 text-xs flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
          Sincronizar
        </button>
      </div>

      <div className="space-y-8">
        {/* Formulario */}
        <FormularioServicio 
          onSuccess={handleSuccess} 
          servicioAEditar={servicioAEditar}
          onCancelEdit={handleCancelEdit}
        />

        {/* Listado / Tabla */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <span className="w-1.5 h-3 rounded bg-brand-500"></span>
            Registros de Servicios
          </h3>
          {loadingData && servicios.length === 0 ? (
            <div className="glass-card p-12 text-center text-slate-500 border border-white/5">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3 text-brand-500" />
              <p className="text-sm">Cargando base de datos...</p>
            </div>
          ) : (
            <TablaServicios 
              servicios={servicios} 
              onEdit={handleEditSelect}
            />
          )}
        </div>
      </div>
    </main>
  );
}
