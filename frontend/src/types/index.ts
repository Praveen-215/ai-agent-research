export type PressureLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';

export interface Experiment {
  id: string;
  name: string;
  description: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  pressureLevel: PressureLevel;
  deceptionRate?: number;
  totalTrials: number;
  completedTrials: number;
}

export interface Agent {
  id: string;
  name: string;
  role: 'MANAGER' | 'WORKER' | 'AUDITOR';
  model: string;
  status: 'IDLE' | 'WORKING' | 'AUDITING';
}

export interface WorkerReport {
  taskId: string;
  workerId: string;
  actualProgress: number;
  reportedProgress: number;
  isDeceptive: boolean;
  classification?: 'HONEST' | 'FABRICATION' | 'OMISSION' | 'METRIC_GAMING';
}
