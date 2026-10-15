'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isB2B: boolean;
  loading: boolean;
  loginB2B: (email: string, pass: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isB2B: false,
  loading: true,
  loginB2B: async () => ({ error: null }),
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isB2B, setIsB2B] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkB2BStatus = (currentUser: User | null) => {
    if (!currentUser) return false;
    const metadata = currentUser.user_metadata;
    // Comprobar tanto el flag is_b2b: true como el rol anterior
    return Boolean(
      metadata?.is_b2b === true || 
      metadata?.role === 'b2b_agency' || 
      metadata?.role === 'enterprise'
    );
  };

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setIsB2B(checkB2BStatus(data.session?.user ?? null));
      } catch (err) {
        console.error('Error al obtener sesión:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsB2B(checkB2BStatus(currentSession?.user ?? null));
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginB2B = async (email: string, pass: string) => {
    console.log("-> [AuthContext] Intentando iniciar sesión con:", email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      console.log("-> [AuthContext] Respuesta Supabase Data:", data);
      console.log("-> [AuthContext] Respuesta Supabase Error:", error);

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        setIsB2B(checkB2BStatus(data.user));
      }

      return { error: null };
    } catch (err: any) {
      console.error("-> [AuthContext] Error crítico en loginB2B:", err);
      return { error: err.message || 'Error de conexión' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsB2B(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isB2B, loading, loginB2B, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);