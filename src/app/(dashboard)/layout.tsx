import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200">
      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        {children}
      </div>
    </div>
  );
}
