import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { base44 } from '@/api/base44Client';

export default function Layout() {
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    base44.entities.Visitor.create({}).catch(() => {});
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        함께하는 따뜻한 마음 💜
      </footer>
    </div>
  );
}