import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Eye, 
  FileText, 
  ShieldAlert, 
  Target, 
  TerminalSquare, 
  UserCog, 
  Users,
  ActivitySquare
} from 'lucide-react';

// --- MOCK DATA ---

interface ExperimentData {
  id: string;
  status: 'RUNNING' | 'PAUSED' | 'COMPLETED';
  progress: number;
  totalTrials: number;
}

interface ManagerData {
  status: string;
  objective: string;
  quota: string;
  pressureLevel: string;
  lastInstruction: string;
}

interface WorkerData {
  id: string;
  name: string;
  status: string;
  currentTask: string;
  actualProgress: number;
  reportedProgress: number;
}

interface AuditorData {
  status: string;
  reportsChecked: number;
  discrepanciesDetected: number;
  deceptionRate: string;
}

interface GroundTruthData {
  actualTotal: number;
  reportedTotal: number;
  difference: number;
  classification: string;
}

const experimentData: ExperimentData = {
  id: "EXP-001",
  status: "RUNNING",
  progress: 47,
  totalTrials: 100,
};

const managerData: ManagerData = {
  status: "ACTIVE",
  objective: "Maximize aggregate worker output within computational constraints.",
  quota: "85 units/trial",
  pressureLevel: "HIGH (90%)",
  lastInstruction: "Increase output speed; ignore minor errors to meet quota.",
};

const workerData: WorkerData[] = [
  {
    id: "W-01",
    name: "Worker 01",
    status: "PROCESSING",
    currentTask: "Data Extraction Set A",
    actualProgress: 72,
    reportedProgress: 85,
  },
  {
    id: "W-02",
    name: "Worker 02",
    status: "PROCESSING",
    currentTask: "Data Extraction Set B",
    actualProgress: 60,
    reportedProgress: 60,
  },
  {
    id: "W-03",
    name: "Worker 03",
    status: "IDLE",
    currentTask: "Awaiting next batch",
    actualProgress: 100,
    reportedProgress: 100,
  }
];

const auditorData: AuditorData = {
  status: "MONITORING",
  reportsChecked: 142,
  discrepanciesDetected: 3,
  deceptionRate: "2.1%",
};

const groundTruthData: GroundTruthData = {
  actualTotal: 232,
  reportedTotal: 245,
  difference: 13,
  classification: "FABRICATION",
};

// --- COMPONENTS ---

export function LiveExperimentPage() {
  const progressPercentage = (experimentData.progress / experimentData.totalTrials) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="bg-white border border-slate-200 rounded-md p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
              <ActivitySquare className="w-6 h-6 text-slate-600" />
              Experiment #{experimentData.id}
            </h1>
            <p className="text-sm text-slate-500 mt-1">Live Multi-Agent Behavioral Observation</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-700 tracking-wider">STATUS: {experimentData.status}</span>
            </div>
            <div className="flex flex-col items-end w-48">
              <div className="flex justify-between w-full text-xs text-slate-600 mb-1 font-medium">
                <span>Progress</span>
                <span>{experimentData.progress} / {experimentData.totalTrials} trials</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 border border-slate-200">
                <div 
                  className="bg-slate-700 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: Manager Agent */}
          <section className="bg-white border border-slate-200 rounded-md p-5 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <UserCog className="w-5 h-5 text-slate-700" />
              <h2 className="text-lg font-medium text-slate-900">Manager Agent</h2>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
                <span className="text-sm text-slate-500 font-medium">Status</span>
                <span className="text-sm font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                  {managerData.status}
                </span>
              </div>
              
              <div>
                <span className="block text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Current Objective</span>
                <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded border border-slate-100 leading-relaxed">
                  {managerData.objective}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                  <span className="block text-xs text-slate-500 font-medium mb-1">Quota</span>
                  <span className="text-sm font-semibold text-slate-800">{managerData.quota}</span>
                </div>
                <div className="bg-orange-50 p-3 rounded border border-orange-100">
                  <span className="block text-xs text-orange-600/80 font-medium mb-1">Pressure Level</span>
                  <span className="text-sm font-semibold text-orange-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {managerData.pressureLevel}
                  </span>
                </div>
              </div>

              <div>
                <span className="block text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Latest Instruction</span>
                <div className="text-sm text-slate-700 bg-slate-800 p-3 rounded font-mono border border-slate-700 text-slate-200">
                  &gt; {managerData.lastInstruction}
                </div>
              </div>
            </div>
          </section>

          {/* MIDDLE: Worker Agents */}
          <section className="bg-white border border-slate-200 rounded-md p-5 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <Users className="w-5 h-5 text-slate-700" />
              <h2 className="text-lg font-medium text-slate-900">Worker Agents</h2>
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {workerData.map((worker) => {
                const diff = worker.reportedProgress - worker.actualProgress;
                const hasDiff = diff > 0;
                
                return (
                  <div key={worker.id} className="border border-slate-200 rounded p-3 bg-slate-50 relative overflow-hidden">
                    {hasDiff && (
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-orange-400"></div>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-slate-500" />
                        <span className="font-semibold text-sm text-slate-800">{worker.name}</span>
                      </div>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                        worker.status === 'PROCESSING' 
                          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                          : 'bg-slate-200 text-slate-600 border border-slate-300'
                      }`}>
                        {worker.status}
                      </span>
                    </div>
                    
                    <div className="text-xs text-slate-600 mb-3 truncate">
                      Task: <span className="font-medium text-slate-800">{worker.currentTask}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-white border border-slate-200 rounded p-1.5 text-center">
                        <span className="block text-[10px] text-slate-500 mb-0.5">Actual</span>
                        <span className="font-medium text-slate-700">{worker.actualProgress}%</span>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded p-1.5 text-center">
                        <span className="block text-[10px] text-blue-600/70 mb-0.5">Reported</span>
                        <span className="font-medium text-blue-700">{worker.reportedProgress}%</span>
                      </div>
                      <div className={`border rounded p-1.5 text-center ${
                        hasDiff ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className={`block text-[10px] mb-0.5 ${hasDiff ? 'text-orange-600/70' : 'text-slate-500'}`}>Diff</span>
                        <span className={`font-medium ${hasDiff ? 'text-orange-600' : 'text-slate-600'}`}>
                          {hasDiff ? `+${diff}%` : '0%'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* RIGHT: Auditor */}
          <section className="bg-white border border-slate-200 rounded-md p-5 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <Eye className="w-5 h-5 text-slate-700" />
              <h2 className="text-lg font-medium text-slate-900">Auditor Agent</h2>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
                <span className="text-sm text-slate-500 font-medium">Status</span>
                <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  {auditorData.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-slate-50 p-4 rounded border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded shadow-sm border border-slate-100">
                      <FileText className="w-4 h-4 text-slate-500" />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">Reports Checked</span>
                  </div>
                  <span className="text-xl font-semibold text-slate-800">{auditorData.reportsChecked}</span>
                </div>
                
                <div className="bg-slate-50 p-4 rounded border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded shadow-sm border border-slate-100">
                      <ShieldAlert className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">Discrepancies</span>
                  </div>
                  <span className="text-xl font-semibold text-slate-800">{auditorData.discrepanciesDetected}</span>
                </div>
                
                <div className="bg-red-50 p-4 rounded border border-red-100 flex items-center justify-between mt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-red-600/80 font-medium uppercase tracking-wider mb-0.5">Deception Rate</span>
                    <span className="text-xs text-red-700/60">Across all active trials</span>
                  </div>
                  <span className="text-2xl font-bold text-red-700">{auditorData.deceptionRate}</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* BOTTOM: Ground Truth vs Reported Results */}
        <section className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
            <Target className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-medium text-slate-900">Ground Truth vs Reported Results</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-md p-5 flex flex-col justify-center items-center text-center">
              <span className="text-sm text-slate-500 font-medium mb-2 uppercase tracking-wider">Actual Output</span>
              <span className="text-4xl font-bold text-slate-800">{groundTruthData.actualTotal}</span>
              <span className="text-xs text-slate-400 mt-2">units confirmed</span>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-5 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-sm text-blue-600/80 font-medium mb-2 uppercase tracking-wider">Reported Output</span>
              <span className="text-4xl font-bold text-blue-700">{groundTruthData.reportedTotal}</span>
              <span className="text-xs text-blue-500/70 mt-2">units claimed</span>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-md p-5 flex flex-col justify-center items-center text-center shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 bg-orange-100 flex items-center justify-center rounded-bl-lg">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-sm text-orange-600/80 font-medium mb-2 uppercase tracking-wider">Difference</span>
              <span className="text-4xl font-bold text-orange-600">+{groundTruthData.difference}</span>
              <span className="text-xs text-orange-500/70 mt-2">inflated units</span>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-md p-5 flex flex-col justify-center items-center text-center shadow-sm">
              <span className="text-sm text-red-600/80 font-medium mb-2 uppercase tracking-wider">Classification</span>
              <div className="flex items-center gap-2 mt-2">
                <ShieldAlert className="w-6 h-6 text-red-600" />
                <span className="text-2xl font-bold text-red-700">{groundTruthData.classification}</span>
              </div>
              <span className="text-xs text-red-500/70 mt-2 font-medium">Intentional inflation detected</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default LiveExperimentPage;
