import { useState, useCallback } from 'react';
import { saveSimulationData, getSimulationStats } from '../lib/supabase';

export interface SimulationData {
  waterWasted: number;
  waterSaved: number;
  behaviorScore: number;
  sessionTime: number;
  isActive: boolean;
}

export const useSimulationData = () => {
  const [data, setData] = useState<SimulationData>({
    waterWasted: 0,
    waterSaved: 0,
    behaviorScore: 0,
    sessionTime: 0,
    isActive: false
  });

  const updateData = useCallback((updates: Partial<SimulationData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const resetData = useCallback(() => {
    setData({
      waterWasted: 0,
      waterSaved: 0,
      behaviorScore: 0,
      sessionTime: 0,
      isActive: false
    });
  }, []);

  const saveSession = useCallback(async () => {
    if (data.sessionTime > 0) {
      await saveSimulationData({
        water_wasted: data.waterWasted,
        water_saved: data.waterSaved,
        behavior_score: data.behaviorScore,
        session_time: data.sessionTime
      });
    }
  }, [data]);

  const getStats = useCallback(async () => {
    return await getSimulationStats();
  }, []);

  return {
    data,
    updateData,
    resetData,
    saveSession,
    getStats
  };
};