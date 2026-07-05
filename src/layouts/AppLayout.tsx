import { Outlet } from 'react-router-dom';
import { Sidebar, BottomNav, TopBar } from '../components/layout';
import { useProgressSync } from '../hooks/useProgressSync';

export function AppLayout() {
  useProgressSync();

  return (
    <div className="flex min-h-screen tech-bg">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  );
}
