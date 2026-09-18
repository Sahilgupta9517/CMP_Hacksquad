import { createClient } from '@supabase/supabase-js';

// Helper to retrieve initial Supabase credentials from import.meta.env or localStorage
const getStoredCredentials = () => {
  const url = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('JANDRISHTI_SUPABASE_URL') || '';
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('JANDRISHTI_SUPABASE_KEY') || '';
  return { url, key };
};

const initialCreds = getStoredCredentials();

export let supabase = null;
export let isLiveSupabaseConnected = false;

if (initialCreds.url && initialCreds.key) {
  try {
    supabase = createClient(initialCreds.url, initialCreds.key);
    isLiveSupabaseConnected = true;
    console.log('⚡ JanDrishti AI: Connected to live Supabase backend');
  } catch (err) {
    console.warn('⚡ JanDrishti AI: Failed to initialize Supabase client, falling back to mock mode', err);
    supabase = null;
    isLiveSupabaseConnected = false;
  }
} else {
  console.log('ℹ️ JanDrishti AI: Running in offline/mock backend mode. You can connect live Supabase anytime in settings.');
}

export const updateSupabaseCredentials = (url, key) => {
  if (url && key) {
    try {
      const client = createClient(url, key);
      localStorage.setItem('JANDRISHTI_SUPABASE_URL', url);
      localStorage.setItem('JANDRISHTI_SUPABASE_KEY', key);
      supabase = client;
      isLiveSupabaseConnected = true;
      return { success: true, message: 'Successfully connected to live Supabase!' };
    } catch (err) {
      return { success: false, message: err.message || 'Invalid Supabase configuration' };
    }
  } else {
    localStorage.removeItem('JANDRISHTI_SUPABASE_URL');
    localStorage.removeItem('JANDRISHTI_SUPABASE_KEY');
    supabase = null;
    isLiveSupabaseConnected = false;
    return { success: true, message: 'Switched to offline mock mode.' };
  }
};
