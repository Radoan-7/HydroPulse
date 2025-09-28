import React from 'react';
import { Award, Target, Zap } from 'lucide-react';

interface ResultsCardProps {
  simulationData: {
    waterWasted: number;
    waterSaved: number;
    behaviorScore: number;
    sessionTime: number;
    isActive: boolean;
  };
}

const ResultsCard: React.FC<ResultsCardProps> = ({ simulationData }) => {
  const totalWater = simulationData.waterWasted + simulationData.waterSaved;
  const efficiencyPercentage = totalWater > 0 ? Math.round((simulationData.waterSaved / totalWater) * 100) : 0;
  const wasteReduction = totalWater > 0 ? Math.max(0, 100 - Math.round((simulationData.waterWasted / totalWater) * 100)) : 0;

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-emerald-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 70) return 'bg-emerald-500/25 border-emerald-500/40';
    if (score >= 40) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Impact Summary */}
      <div className="bg-green-900/30 backdrop-blur-xl rounded-2xl border border-emerald-400/30 p-6 shadow-xl shadow-emerald-500/10">
        <div className="flex items-center space-x-3 mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg animate-pulse" />
            <Award className="w-7 h-7 text-emerald-400 relative z-10 drop-shadow-lg" />
          </div>
          <h3 className="text-xl font-bold text-emerald-200">Impact Summary</h3>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 transition-all duration-500 shadow-2xl ${getScoreBackground(efficiencyPercentage)}`}>
              <span className={`text-3xl font-bold drop-shadow-lg ${getScoreColor(efficiencyPercentage)}`}>
                {efficiencyPercentage}%
              </span>
            </div>
            <p className="text-emerald-300/80 text-sm mt-3 font-medium">Water Efficiency</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
              <span className="text-emerald-300/80 text-sm font-medium">Waste Reduction</span>
              <span className={`font-bold text-lg drop-shadow-lg ${getScoreColor(wasteReduction)}`}>
                {wasteReduction}%
              </span>
            </div>
            
            <div className="w-full bg-emerald-950/50 rounded-full h-3 shadow-inner border border-emerald-900/50">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 shadow-lg ${
                  wasteReduction >= 70 ? 'bg-gradient-to-r from-emerald-400 to-green-400 shadow-emerald-400/50' : 
                  wasteReduction >= 40 ? 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-yellow-400/50' : 'bg-gradient-to-r from-red-400 to-red-500 shadow-red-400/50'
                } animate-pulse-subtle`}
                style={{ width: `${wasteReduction}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Behavioral Analysis */}
      <div className="bg-green-900/30 backdrop-blur-xl rounded-2xl border border-emerald-400/30 p-6 shadow-xl shadow-emerald-500/10">
        <div className="flex items-center space-x-3 mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg animate-pulse" />
            <Target className="w-7 h-7 text-emerald-400 relative z-10 drop-shadow-lg" />
          </div>
          <h3 className="text-xl font-bold text-emerald-200">Behavioral Analysis</h3>
        </div>
        
        <div className="space-y-5">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Zap className="w-6 h-6 text-yellow-400 drop-shadow-lg animate-pulse" />
            </div>
            <div>
              <p className="text-emerald-100 font-semibold text-lg">HydroPulse Effect</p>
              <p className="text-emerald-200/80 text-sm">Real-time feedback drives behavioral change</p>
            </div>
          </div>
          
          <div className="bg-emerald-950/40 rounded-xl p-4 space-y-3 border border-emerald-500/20 shadow-inner">
            <div className="flex justify-between items-center">
              <span className="text-emerald-300/80 text-sm font-medium">Awareness Level</span>
              <span className="text-emerald-400 font-bold">High</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-emerald-300/80 text-sm font-medium">Response Time</span>
              <span className="text-cyan-400 font-bold">Immediate</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-emerald-300/80 text-sm font-medium">Habit Formation</span>
              <span className="text-green-400 font-bold">Progressive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Example Impact */}
      <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 backdrop-blur-xl rounded-2xl border border-emerald-400/30 p-6 shadow-xl shadow-emerald-500/20">
        <h3 className="text-xl font-bold text-emerald-200 mb-5">Projected Impact</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
            <span className="text-emerald-200 font-medium">Daily Savings</span>
            <span className="text-emerald-400 font-bold text-lg drop-shadow-lg">37L</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
            <span className="text-emerald-200 font-medium">Monthly Savings</span>
            <span className="text-emerald-400 font-bold text-lg drop-shadow-lg">1,110L</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
            <span className="text-emerald-200 font-medium">Behavioral Shift</span>
            <span className="text-cyan-400 font-bold text-lg drop-shadow-lg">Positive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;