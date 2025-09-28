import React from 'react';
import { Brain, Droplet, TrendingUp, Clock } from 'lucide-react';

interface InfoPanelProps {
  simulationData: {
    waterWasted: number;
    waterSaved: number;
    behaviorScore: number;
    sessionTime: number;
    isActive: boolean;
  };
}

const InfoPanel: React.FC<InfoPanelProps> = ({ simulationData }) => {
  return (
    <div className="space-y-6">
      {/* Psychology Card */}
      <div className="bg-green-900/30 backdrop-blur-xl rounded-2xl border border-emerald-400/30 p-6 shadow-xl shadow-emerald-500/10">
        <div className="flex items-center space-x-3 mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg animate-pulse" />
            <Brain className="w-7 h-7 text-emerald-400 relative z-10 drop-shadow-lg" />
          </div>
          <h3 className="text-xl font-bold text-emerald-200">Behavioral Science</h3>
        </div>
        <p className="text-emerald-100/80 text-sm mb-5 leading-relaxed">
          HydroPulse leverages real-time feedback and visual cues to create immediate awareness of water usage, triggering behavioral change through psychological nudging.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
            <span className="text-sm text-emerald-200/90 font-medium">Visual feedback triggers awareness</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
            <span className="text-sm text-emerald-200/90 font-medium">Immediate consequences visible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            <span className="text-sm text-emerald-200/90 font-medium">Positive reinforcement system</span>
          </div>
        </div>
      </div>

      {/* Live Stats */}
      <div className="bg-green-900/30 backdrop-blur-xl rounded-2xl border border-emerald-400/30 p-6 shadow-xl shadow-emerald-500/10">
        <h3 className="text-xl font-bold text-emerald-200 mb-5 flex items-center">
          <div className="relative mr-3">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg animate-pulse" />
            <TrendingUp className="w-6 h-6 relative z-10 drop-shadow-lg" />
          </div>
          Live Statistics
        </h3>
        
        <div className="space-y-5">
          <div className="flex justify-between items-center p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
            <span className="text-emerald-300/80 text-sm font-medium">Session Time</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-cyan-400 drop-shadow-lg" />
              <span className="text-white font-mono font-bold text-lg">{simulationData.sessionTime.toFixed(1)}s</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
            <span className="text-emerald-300/80 text-sm font-medium">Water Saved</span>
            <div className="flex items-center space-x-1">
              <Droplet className="w-4 h-4 text-emerald-400 drop-shadow-lg" />
              <span className="text-emerald-400 font-mono font-bold text-lg">{simulationData.waterSaved.toFixed(1)}L</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
            <span className="text-emerald-300/80 text-sm font-medium">Water Wasted</span>
            <div className="flex items-center space-x-1">
              <Droplet className="w-4 h-4 text-red-400 drop-shadow-lg" />
              <span className="text-red-400 font-mono font-bold text-lg">{simulationData.waterWasted.toFixed(1)}L</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className={`bg-green-900/30 backdrop-blur-xl rounded-2xl border p-5 transition-all duration-500 shadow-xl ${
        simulationData.isActive 
          ? 'border-emerald-400/40 shadow-2xl shadow-emerald-500/30 animate-pulse-glow' 
          : 'border-emerald-500/20 shadow-emerald-500/10'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full transition-colors duration-300 shadow-lg ${
            simulationData.isActive ? 'bg-emerald-400 animate-pulse shadow-emerald-400/50' : 'bg-emerald-600/50'
          }`} />
          <span className={`text-sm font-semibold ${
            simulationData.isActive ? 'text-emerald-300' : 'text-emerald-400/70'
          }`}>
            {simulationData.isActive ? 'Simulation Active' : 'Simulation Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;