import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ysrcifvvhogeqegmwokp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcmNpZnZ2aG9nZXFlZ213b2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNTM0ODcsImV4cCI6MjA0MDYyOTQ4N30.MvmgKr7ksUFbK3oOSAAhw_gNyiBVK900VBkQeKdrQJY';
const supabase = createClient(supabaseUrl, supabaseKey);

export const login = defineEventHandler(async (event) => {
    const { username, password } = await readBody(event);
  
    const session = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (session.error) {
      return { status: 500, body: { message: 'Error authenticating user' } };
    }

    return { status: 200, body: { user: session } };
});