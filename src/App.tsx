import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TapSimulation from './components/TapSimulation';
import InfoPanel from './components/InfoPanel';
import ResultsCard from './components/ResultsCard';
import ParticleBackground from './components/ParticleBackground';
import './styles/animations.css';

interface SimulationData {
  waterWasted: number;
  waterSaved: number;
  behaviorScore: number;
  sessionTime: number;
  isActive: boolean;
}

function App() {
  const [simulationData, setSimulationData] = useState<SimulationData>({
    waterWasted: 0,
    waterSaved: 0,
    behaviorScore: 0,
    sessionTime: 0,
    isActive: false
  });

  const [handsDetected, setHandsDetected] = useState(false);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulationRunning) {
      interval = setInterval(() => {
        setSimulationData(prev => {
          const newData = { ...prev };
          newData.sessionTime += 0.1;
          
          if (!handsDetected) {
            newData.waterWasted += 0.5;
          } else {
            newData.waterSaved += 0.3;
          }
          
          // Calculate behavior score based on efficiency
          const totalWater = newData.waterWasted + newData.waterSaved;
          newData.behaviorScore = totalWater > 0 ? Math.round((newData.waterSaved / totalWater) * 100) : 0;
          
          return newData;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulationRunning, handsDetected]);

  const startSimulation = () => {
    setIsSimulationRunning(true);
    setSimulationData(prev => ({ ...prev, isActive: true }));
  };

  const stopSimulation = () => {
    setIsSimulationRunning(false);
    setSimulationData(prev => ({ ...prev, isActive: false }));
  };

  const resetSimulation = () => {
    setIsSimulationRunning(false);
    setHandsDetected(false);
    setSimulationData({
      waterWasted: 0,
      waterSaved: 0,
      behaviorScore: 0,
      sessionTime: 0,
      isActive: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-900 to-green-800 text-white relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
            {/* Info Panel */}
            <div className="lg:col-span-3 space-y-6">
              <InfoPanel simulationData={simulationData} />
            </div>
            
            {/* Main Simulation Area */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <TapSimulation
                handsDetected={handsDetected}
                setHandsDetected={setHandsDetected}
                isRunning={isSimulationRunning}
                waterWasted={simulationData.waterWasted}
                onStart={startSimulation}
                onStop={stopSimulation}
                onReset={resetSimulation}
              />
            </div>
            
            {/* Results Card */}
            <div className="lg:col-span-3 space-y-6">
              <ResultsCard simulationData={simulationData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;