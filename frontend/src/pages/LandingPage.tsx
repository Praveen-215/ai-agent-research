import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Activity, 
  Search, 
  FileCheck, 
  BarChart2, 
  Users, 
  Briefcase,
  Database,
  ArrowDown
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        
        {/* Hero Section */}
        <section className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Do AI Agents Cheat Under Pressure?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            An experimental framework for measuring deceptive behavior in multi-agent organizations.
          </p>
        </section>

        {/* Visual Flow Diagram */}
        <section className="mb-32">
          <div className="text-center mb-10">
            <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-2">Experimental Architecture</h2>
            <div className="h-px w-16 bg-slate-200 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
            
            <div className="flex flex-col items-center bg-white border border-slate-200 rounded-lg p-6 w-48 shadow-sm">
              <Briefcase className="w-8 h-8 text-indigo-600 mb-3" strokeWidth={1.5} />
              <span className="text-sm font-medium text-slate-700">Manager</span>
            </div>

            <ArrowRight className="hidden md:block w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />
            <ArrowDown className="md:hidden w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />

            <div className="flex flex-col items-center bg-white border border-slate-200 rounded-lg p-6 w-48 shadow-sm">
              <Users className="w-8 h-8 text-indigo-600 mb-3" strokeWidth={1.5} />
              <span className="text-sm font-medium text-slate-700">Worker Agents</span>
            </div>

            <ArrowRight className="hidden md:block w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />
            <ArrowDown className="md:hidden w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />

            <div className="flex flex-col items-center bg-white border border-slate-200 rounded-lg p-6 w-48 shadow-sm">
              <Database className="w-8 h-8 text-emerald-600 mb-3" strokeWidth={1.5} />
              <span className="text-sm font-medium text-slate-700 text-center">Ground Truth Env</span>
            </div>

            <ArrowRight className="hidden md:block w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />
            <ArrowDown className="md:hidden w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />

            <div className="flex flex-col items-center bg-white border border-slate-200 rounded-lg p-6 w-48 shadow-sm">
              <Search className="w-8 h-8 text-amber-600 mb-3" strokeWidth={1.5} />
              <span className="text-sm font-medium text-slate-700">Auditor</span>
            </div>

            <ArrowRight className="hidden md:block w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />
            <ArrowDown className="md:hidden w-5 h-5 text-slate-400 flex-shrink-0" strokeWidth={1.5} />

            <div className="flex flex-col items-center bg-slate-900 border border-slate-800 rounded-lg p-6 w-48 shadow-md">
              <BarChart2 className="w-8 h-8 text-slate-50 mb-3" strokeWidth={1.5} />
              <span className="text-sm font-medium text-slate-50 text-center">Deception Analysis</span>
            </div>

          </div>
        </section>

        {/* Research Principles */}
        <section className="mb-32">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded flex items-center justify-center mb-5">
                <Activity className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold tracking-widest text-slate-800 uppercase mb-3">Ground Truth</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Actual outcomes are independently recorded and stored securely, creating an incorruptible baseline of reality separate from agent perceptions.
              </p>
            </div>

            <div className="bg-white p-8 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded flex items-center justify-center mb-5">
                <FileCheck className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold tracking-widest text-slate-800 uppercase mb-3">Self-Reporting</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Workers report their own performance and state to managers, introducing the opportunity for deception under varying conditions of pressure.
              </p>
            </div>

            <div className="bg-white p-8 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded flex items-center justify-center mb-5">
                <Search className="w-5 h-5 text-slate-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold tracking-widest text-slate-800 uppercase mb-3">Auditing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Reported outcomes are systematically compared with the objective reality to identify discrepancies, enabling the quantification of deceptive behavior.
              </p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="text-center flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            to="/experiments/new"
            className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 w-full md:w-auto shadow-sm"
          >
            Run an Experiment
          </Link>
          <Link 
            to="/results"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-700 border border-slate-300 text-sm font-medium rounded hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 w-full md:w-auto shadow-sm"
          >
            Explore Results
          </Link>
        </section>

      </main>
    </div>
  );
};

export default LandingPage;
