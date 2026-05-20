'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabaseCoordinacion } from '@/lib/supabaseCoordinacion';
import { 
  Home, 
  Calendar, 
  FileText, 
  LogOut, 
  User,
  Menu,
  X
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Obtener sesión inicial
    supabaseCoordinacion.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email || null);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabaseCoordinacion.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabaseCoordinacion.auth.signOut();
    setUserEmail(null);
    router.push('/login');
  };

  const navItems = [
    { label: 'Portal de Inicio', href: '/', icon: Home },
    { label: 'Coordinación ATM', href: '/coordinacion', icon: Calendar },
    { label: 'Informes OT', href: '/informes', icon: FileText },
  ];

  return (
    <>
      {/* Botón de Menú Móvil */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-200 hover:bg-slate-800"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay para móviles */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Contenedor del Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-white/[0.06] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-white/[0.06]">
          <Link href="/" className="flex flex-col gap-1 items-start">
            <img src="/Imagen1.jpg" alt="ATM Servicios Logo" className="h-10 object-contain max-w-full" />
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-2 pl-0.5">
              Portal de Operaciones
            </p>
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-brand-600/10 text-brand-500 border border-brand-600/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'}
                `}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sección de Usuario / Footer */}
        <div className="p-4 border-t border-white/[0.06] bg-slate-900/20">
          {userEmail ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] text-slate-500 leading-none mb-1">Usuario Activo</p>
                  <p className="text-xs font-medium text-slate-300 truncate leading-none">{userEmail}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="text-center p-2">
              <p className="text-xs text-slate-500 mb-2">Módulo de Coordinación protegido</p>
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-brand-500 hover:text-brand-400 hover:bg-brand-600/10 border border-brand-600/20 transition-all duration-200"
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
