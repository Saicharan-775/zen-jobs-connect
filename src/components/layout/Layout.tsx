import { Outlet } from 'react-router-dom';
import { useTheme } from 'next-themes';
import Navbar from './Navbar';
import { CustomCursor } from '@/components/ui/custom-cursor';

export default function Layout() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
      {theme === 'dark' && <CustomCursor />}
    </div>
  );
}
