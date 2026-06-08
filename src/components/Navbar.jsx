import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Calendar, HandHeart, Menu, X, Shield, BookOpen, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
  { to: '/', label: '홈', icon: Heart },
  { to: '/calendar', label: '캘린더', icon: Calendar },
  { to: '/donate', label: '모금 신청', icon: HandHeart },
  { to: '/messages', label: '말씀', icon: BookOpen },
  { to: '/guide', label: '이용 안내', icon: HelpCircle },
  ];


  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Heart className="w-5 h-5 text-primary fill-primary/30" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground tracking-tight">CareTogether (함께돌봄)

            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) =>
            <Link key={to} to={to}>
                <Button
                variant={isActive(to) ? 'default' : 'ghost'}
                size="sm"
                className={`gap-2 rounded-full px-4 ${isActive(to) ? '' : 'text-muted-foreground hover:text-foreground'}`}>
                
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              </Link>
            )}
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="gap-2 rounded-full px-4 text-muted-foreground hover:text-foreground ml-2">
                <Shield className="w-4 h-4" />
                관리자
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden border-t border-border/50 bg-card/95 backdrop-blur-xl">
          
            <div className="px-4 py-3 space-y-1">
              {links.map(({ to, label, icon: Icon }) =>
            <Link key={to} to={to} onClick={() => setMobileOpen(false)}>
                  <Button
                variant={isActive(to) ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 ${isActive(to) ? '' : 'text-muted-foreground'}`}>
                
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                </Link>
            )}
              <Link to="/admin" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  관리자
                </Button>
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}