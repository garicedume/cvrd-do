'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface B2BProfile {
  company_name: string;
  address: string;
  country: string;
  phone: string;
  logo_url: string;
  downloads_count: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isB2B: boolean;
  loading: boolean;
  profile: B2BProfile | null;
  loginB2B: (email: string, pass: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  updateProfile: (newProfile: Partial<B2BProfile>) => Promise<{ error: string | null }>;
  updatePassword: (currentPass: string, newPass: string) => Promise<{ error: string | null }>;
  incrementDownloadCount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isB2B: false,
  loading: true,
  profile: null,
  loginB2B: async () => ({ error: null }),
  logout: async () => {},
  updateProfile: async () => ({ error: null }),
  updatePassword: async () => ({ error: null }),
  incrementDownloadCount: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isB2B, setIsB2B] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<B2BProfile | null>(null);

  const checkB2BStatus = (currentUser: User | null) => {
    if (!currentUser) return false;
    const metadata = currentUser.user_metadata;
    return Boolean(
      metadata?.is_b2b === true || 
      metadata?.role === 'b2b_agency' || 
      metadata?.role === 'enterprise'
    );
  };

  const fetchProfile = useCallback(async (userId: string, userEmail?: string) => {
    try {
      const { data } = await supabase
        .from('b2b_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setProfile(data);
      } else {
        const defaultProfile = {
          company_name: userEmail?.split('@')[0] || 'Mi Centro B2B',
          address: 'Calle Principal #1',
          country: 'República Dominicana',
          phone: '',
          logo_url: '',
          downloads_count: 0
        };
        await supabase.from('b2b_profiles').insert([{ id: userId, ...defaultProfile }]);
        setProfile(defaultProfile);
      }
    } catch (err) {
      console.error('Error cargando perfil B2B:', err);
    }
  }, []);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        const currentUser = data.session?.user ?? null;
        setUser(currentUser);
        const b2bActive = checkB2BStatus(currentUser);
        setIsB2B(b2bActive);

        if (currentUser && b2bActive) {
          await fetchProfile(currentUser.id, currentUser.email);
        }
      } catch (err) {
        console.error('Error al obtener sesión:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);
      const b2bActive = checkB2BStatus(currentUser);
      setIsB2B(b2bActive);

      if (currentUser && b2bActive) {
        await fetchProfile(currentUser.id, currentUser.email);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const loginB2B = async (email: string, pass: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass,
      });

      if (error) return { error: error.message };

      if (data?.user) {
        setUser(data.user);
        const b2bActive = checkB2BStatus(data.user);
        setIsB2B(b2bActive);
        if (b2bActive) {
          await fetchProfile(data.user.id, data.user.email);
        }
      }

      return { error: null };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error de conexión con el servidor.';
      return { error: errorMessage };
    }
  };

  const updateProfile = async (newProfile: Partial<B2BProfile>) => {
    if (!user) return { error: 'No hay usuario activo' };
    try {
      const { error } = await supabase
        .from('b2b_profiles')
        .update(newProfile)
        .eq('id', user.id);

      if (error) return { error: error.message };
      setProfile(prev => prev ? { ...prev, ...newProfile } : null);
      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Error al actualizar perfil' };
    }
  };

  const updatePassword = async (currentPass: string, newPass: string) => {
    if (!user || !user.email) return { error: 'No hay usuario activo' };
    try {
      // 1. Verificamos la contraseña actual haciendo un inicio de sesión de prueba
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPass,
      });

      if (signInError) {
        return { error: 'La contraseña actual es incorrecta. Verifícala e inténtalo de nuevo.' };
      }

      // 2. Si es correcta, actualizamos a la nueva contraseña
      const { error: updateError } = await supabase.auth.updateUser({ password: newPass });
      if (updateError) return { error: updateError.message };

      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Error al cambiar contraseña' };
    }
  };

  const incrementDownloadCount = async () => {
    if (!user || !profile) return;
    const newCount = (profile.downloads_count || 0) + 1;
    setProfile(prev => prev ? { ...prev, downloads_count: newCount } : null);
    await supabase
      .from('b2b_profiles')
      .update({ downloads_count: newCount })
      .eq('id', user.id);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsB2B(false);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isB2B, loading, profile, loginB2B, logout, updateProfile, updatePassword, incrementDownloadCount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);