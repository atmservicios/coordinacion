'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabaseCoordinacion } from '@/lib/supabaseCoordinacion';
import { ShieldAlert, Key, Mail, ArrowLeft, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si ya está logueado, redirigir a coordinación
    supabaseCoordinacion.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/coordinacion');
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabaseCoordinacion.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message === 'Invalid login credentials' 
          ? 'Correo o contraseña incorrectos.' 
          : error.message
        );
      } else if (data.session) {
        router.push('/coordinacion');
      }
    } catch (err: unknown) {
      setError('Ocurrió un error inesperado al iniciar sesión.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-6 py-12 dot-grid relative">
      {/* Botón de volver al portal */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al Portal
      </Link>

      <div className="w-full max-w-md relative z-10">
        {/* Branding header */}
        <div className="text-center mb-8">
          <img src="/Imagen1.jpg" alt="ATM Servicios Logo" className="h-14 object-contain mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-100">Panel de Coordinación</h1>
          <p className="text-sm text-slate-500 mt-1">Inicia sesión para ingresar al sistema de servicios</p>
        </div>

        {/* Card de Login */}
        <div className="glass-card p-8 border border-white/5">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium animate-shake">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Input Correo */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-600 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="nombre@atmservicios.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10 h-11"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-600 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 h-11"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Botón de Entrada */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary h-11 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verificando credenciales...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
