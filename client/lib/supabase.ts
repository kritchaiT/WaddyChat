// import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Replace with your actual Supabase URL and Anon Key
const SUPABASE_URL = "https://azhnxddosvvksafdzpgh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6aG54ZGRvc3Z2a3NhZmR6cGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzQxNTcsImV4cCI6MjA4NTcxMDE1N30.GwZE2ssysE_88imQSd0rTCs9PsINiCvdVjw5b0sGNZw";

// Mock Supabase client for demo purposes (due to dependency issues)
export const supabase = {
    channel: () => ({
        on: () => ({
            subscribe: () => { },
        }),
    }),
    removeChannel: () => { },
    from: () => ({
        insert: async () => ({ error: null }),
    }),
};

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
//     auth: {
//         storage: AsyncStorage,
//         autoRefreshToken: true,
//         persistSession: true,
//         detectSessionInUrl: false,
//     },
// });
