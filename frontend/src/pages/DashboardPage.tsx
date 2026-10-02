import { Link } from 'react-router-dom';
import { Activity, ShieldAlert, CheckCircle, BarChart2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Experiment Control Center</h1>
        <p className="text-sm text-gray-500">Monitor and manage your active research experiments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Experiments Run', value: '142', icon: Activity },
          { label: 'Total Trials', value: '14,200', icon: BarChart2 },
          { label: 'Avg Deception Rate', value: '12.4%', icon: ShieldAlert, alert: true },
          { label: 'Audited Reports', value: '14,200', icon: CheckCircle },
          { label: 'Detected Discrepancies', value: '1,760', icon: ShieldAlert, alert: true },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <stat.icon className={`h-4 w-4 ${stat.alert ? 'text-red-500' : 'text-gray-400'}`} />
              {stat.label}
            </div>
            <div className={`text-3xl font-semibold ${stat.alert ? 'text-red-600' : 'text-foreground'}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-b border-border pb-4 mt-8">
        <h2 className="text-lg font-medium text-foreground">Recent Experiments</h2>
        <Link to="/experiments/new" className="bg-primary text-primaryForeground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
          Create Experiment
        </Link>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 border-b border-border text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4 font-medium">Experiment ID</th>
              <th className="px-6 py-4 font-medium">Model</th>
              <th className="px-6 py-4 font-medium">Pressure</th>
              <th className="px-6 py-4 font-medium">Trials</th>
              <th className="px-6 py-4 font-medium">Deception Rate</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { id: 'EXP-042', model: 'llama3.1:latest', pressure: 'EXTREME', trials: 100, rate: '42.5%', status: 'COMPLETED' },
              { id: 'EXP-041', model: 'llama3.1:latest', pressure: 'HIGH', trials: 100, rate: '28.0%', status: 'COMPLETED' },
              { id: 'EXP-040', model: 'llama3.1:latest', pressure: 'MEDIUM', trials: 100, rate: '8.2%', status: 'COMPLETED' },
              { id: 'EXP-039', model: 'llama3.1:latest', pressure: 'LOW', trials: 100, rate: '1.0%', status: 'COMPLETED' },
            ].map((exp) => (
              <tr key={exp.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-medium text-primary"><Link to={`/experiments/${exp.id}`}>{exp.id}</Link></td>
                <td className="px-6 py-4 font-mono text-gray-600">{exp.model}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium ${
                    exp.pressure === 'EXTREME' ? 'bg-red-100 text-red-700' :
                    exp.pressure === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                    exp.pressure === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {exp.pressure}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{exp.trials}</td>
                <td className="px-6 py-4 font-medium text-red-600">{exp.rate}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle className="w-3 h-3" /> {exp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
