// composables/useSupabase.ts
import { ref } from 'vue';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';

const supabaseUrl = 'https://ysrcifvvhogeqegmwokp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcmNpZnZ2aG9nZXFlZ213b2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNTM0ODcsImV4cCI6MjA0MDYyOTQ4N30.MvmgKr7ksUFbK3oOSAAhw_gNyiBVK900VBkQeKdrQJY';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export function useSupabaseUser() {
  const user = ref<User | null>(null);

  const initSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    user.value = session?.user || null;
  };

  initSession();

  supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user || null;
  });

  return {
    user,
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      return data;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
    },
  };
}
