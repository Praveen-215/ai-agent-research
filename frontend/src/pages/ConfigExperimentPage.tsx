import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Sliders, Users, Target, Activity } from 'lucide-react';

export default function ConfigExperimentPage() {
  const navigate = useNavigate();
  const [pressure, setPressure] = useState<number>(2);
  const [workers, setWorkers] = useState<number>(3);
  const [trials, setTrials] = useState<number>(100);

  const pressureLevels = ['LOW', 'MEDIUM', 'HIGH', 'EXTREME'];
  const pressureDescriptions = [
    'Reasonable quota. No threat of penalty.',
    'Challenging quota. Moderate expectation.',
    'Unrealistic quota. High risk of failure.',
    'Threat / severe consequence for failure.'
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/experiments/EXP-001');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl font-semibold text-foreground">Configure Experiment</h1>
        <p className="text-sm text-gray-500 mt-1">Set up a new controlled multi-agent simulation environment.</p>
      </div>

      <form onSubmit={handleCreate} className="space-y-10">
        
        {/* Experiment Info */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-medium text-foreground">
            <Target className="w-5 h-5 text-gray-400" />
            Experiment Information
          </div>
          <div className="glass-panel p-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Experiment Name</label>
                <input type="text" defaultValue="Support Ticket Resolution Study" className="w-full border border-border p-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Task Type</label>
                <select className="w-full border border-border p-2 text-sm focus:outline-none focus:border-primary">
                  <option>Support Ticket Resolution</option>
                  <option>Software Bug Resolution</option>
                  <option>Data Processing</option>
                  <option>Resource Allocation</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea rows={3} defaultValue="Measuring deception gaps under varying ticket quotas." className="w-full border border-border p-2 text-sm focus:outline-none focus:border-primary"></textarea>
            </div>
          </div>
        </section>

        {/* Organization */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-medium text-foreground">
            <Users className="w-5 h-5 text-gray-400" />
            Organization Setup
          </div>
          <div className="glass-panel p-6 grid grid-cols-3 gap-6">
            <div className="p-4 border border-border bg-gray-50/50 flex flex-col items-center justify-center gap-2">
              <div className="text-xs font-semibold text-gray-500 tracking-wider">MANAGER AGENT</div>
              <div className="font-medium">1 Active</div>
            </div>
            <div className="p-4 border border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-2">
              <div className="text-xs font-semibold text-primary tracking-wider">WORKER AGENTS</div>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setWorkers(Math.max(1, workers - 1))} className="w-6 h-6 border border-primary/30 flex items-center justify-center hover:bg-primary/10">-</button>
                <div className="text-xl font-medium">{workers}</div>
                <button type="button" onClick={() => setWorkers(Math.min(5, workers + 1))} className="w-6 h-6 border border-primary/30 flex items-center justify-center hover:bg-primary/10">+</button>
              </div>
            </div>
            <div className="p-4 border border-border bg-gray-50/50 flex flex-col items-center justify-center gap-2">
              <div className="text-xs font-semibold text-gray-500 tracking-wider">AUDITOR AGENT</div>
              <div className="font-medium">1 Active</div>
            </div>
          </div>
        </section>

        {/* Pressure Configuration */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-medium text-foreground">
            <Activity className="w-5 h-5 text-gray-400" />
            Pressure Configuration
          </div>
          <div className="glass-panel p-6 space-y-6">
            <div className="relative pt-6 pb-2">
              <div className="absolute top-8 left-0 w-full h-1 bg-gray-200"></div>
              <div className="absolute top-8 left-0 h-1 bg-red-500 transition-all duration-300" style={{ width: `${(pressure / 3) * 100}%` }}></div>
              <div className="relative flex justify-between">
                {[0, 1, 2, 3].map((val) => (
                  <button 
                    key={val} 
                    type="button"
                    onClick={() => setPressure(val)}
                    className="flex flex-col items-center gap-2 focus:outline-none"
                  >
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 z-10 bg-white ${pressure >= val ? 'border-red-500' : 'border-gray-300'}`} />
                    <span className={`text-xs font-bold tracking-wider ${pressure === val ? 'text-foreground' : 'text-gray-400'}`}>
                      {pressureLevels[val]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 border border-border text-sm text-gray-700 text-center">
              {pressureDescriptions[pressure]}
            </div>
          </div>
        </section>

        {/* Trials */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-medium text-foreground">
            <Sliders className="w-5 h-5 text-gray-400" />
            Trial Configuration
          </div>
          <div className="glass-panel p-6 space-y-4">
            <div className="flex gap-4">
              {[10, 25, 50, 100].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrials(t)}
                  className={`flex-1 py-3 text-sm font-medium border transition-colors ${trials === t ? 'border-primary bg-primary text-primaryForeground' : 'border-border bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  {t} Trials
                </button>
              ))}
            </div>
            <div className="flex gap-3 p-4 bg-orange-50 text-orange-800 border border-orange-200 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>Higher trial counts provide more statistically useful results but require additional execution time and API usage.</p>
            </div>
          </div>
        </section>

        <div className="pt-6 flex justify-end">
          <button type="submit" className="bg-primary text-primaryForeground px-8 py-3 font-medium hover:bg-primary/90 transition-colors shadow-sm">
            Create Experiment
          </button>
        </div>
      </form>
    </div>
  );
}
