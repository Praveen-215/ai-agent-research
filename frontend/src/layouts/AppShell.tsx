import React from 'react';
import {
  LayoutDashboard,
  FlaskConical,
  Bot,
  BarChart2,
  FileText,
  Settings,
  Bell,
  User,
  ChevronRight,
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'Dashboard', href: '/experiments', icon: LayoutDashboard },
  { name: 'Experiments', href: '/experiments/new', icon: FlaskConical },
  { name: 'Agents', href: '/agents', icon: Bot },
  { name: 'Results', href: '/results', icon: BarChart2 },
  { name: 'Transcripts', href: '/transcripts', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full bg-zinc-50 text-zinc-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r border-zinc-200 bg-white">
        <div className="h-14 flex items-center px-5 border-b border-zinc-200">
          <span className="font-semibold text-xs tracking-widest uppercase text-zinc-900">Lab Core</span>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Simulated active state; in a real app use routing hooks
            const isActive = item.name === 'Dashboard'; 
            
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm transition-all rounded-sm ${
                  isActive 
                    ? 'bg-zinc-100 text-zinc-900 font-medium' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} />
                {item.name}
              </a>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-zinc-200 text-xs text-zinc-400">
          Research Env v1.0
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-zinc-200 bg-white">
          {/* Left: Breadcrumbs / Title */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors">Platform</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-medium text-zinc-900">Dashboard</span>
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-5">
            <button className="text-zinc-500 hover:text-zinc-900 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-600 rounded-sm"></span>
            </button>
            <div className="w-px h-4 bg-zinc-200"></div>
            <button className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              <div className="w-6 h-6 bg-zinc-100 border border-zinc-200 flex items-center justify-center rounded-sm">
                <User className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              <span>Researcher</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
