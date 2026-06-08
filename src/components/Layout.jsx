import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
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