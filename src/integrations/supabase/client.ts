import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://srbyylosazocwqfmjuky.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyYnl5bG9zYXpvY3dxZm1qdWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MjI2MzUsImV4cCI6MjA3ODA5ODYzNX0.J0CSSKzeWLGpTmx4wt19H6WTvteZrACVP8xSzPloMBM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import the supabase client like this:
// For React:
// import { supabase } from "@/integrations/supabase/client";
// For React Native:
// import { supabase } from "@/src/integrations/supabase/client";
