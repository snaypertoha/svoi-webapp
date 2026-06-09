import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://szygyoshtnpowpvogxbc.supabase.co'
const supabaseAnonKey = 'sb_publishable_yfY1jLeLgjIWkFBKcPcO0g_3GVNP3zj'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)