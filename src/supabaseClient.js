import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fjiniunevcbbzljbnabw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaW5pdW5ldmNiYnpsamJuYWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NjEyOTUsImV4cCI6MjA2OTMzNzI5NX0.jRf3W5SZhOb72VY0bYlmY4e6yw-ZVjubI7vz-lj_ZHQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);