import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Session storage for simulation data
export interface SimulationSession {
  id: string;
  water_wasted: number;
  water_saved: number;
  behavior_score: number;
  session_time: number;
  created_at: string;
}

export const saveSimulationData = async (data: Omit<SimulationSession, 'id' | 'created_at'>) => {
  const { data: session, error } = await supabase
    .from('simulation_sessions')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error saving simulation data:', error);
    return null;
  }

  return session;
};

export const getSimulationStats = async () => {
  const { data, error } = await supabase
    .from('simulation_sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Error fetching simulation stats:', error);
    return [];
  }

  return data || [];
};