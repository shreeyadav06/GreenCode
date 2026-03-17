'use client';

import { useEffect, useState } from 'react';

interface Activity {
  type: string;
  date: string;
  description: string;
  distance?: number;
  kwh?: number;
  mealType?: string;
}

interface Member {
  name: string;
  age: number;
  role: string;
  activities: Activity[];
}

interface Family {
  familyId: string;
  familyName: string;
  members: Member[];
}

export default function Dashboard() {
  const [family, setFamily] = useState<Family | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/family')
      .then(res => res.json())
      .then(data => {
        setFamily(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch family data:", err);
        setLoading(false);
      });
  }, []);

  const calculateMemberCO2 = (member: Member) => {
    return member.activities.reduce((sum, act) => {
      if (act.type === 'travel' && act.distance) return sum + (act.distance * 0.17);
      if (act.type === 'food') return sum + (act.mealType === 'vegan' ? 1.5 : 3.0);
      if (act.type === 'energy' && act.kwh) return sum + (act.kwh * 0.45);
      return sum;
    }, 0);
  };

  const familyTotal = family?.members.reduce((sum, m) => sum + calculateMemberCO2(m), 0) || 0;

  if (loading) return <div className="flex h-screen items-center justify-center text-emerald-500 font-bold">Initializing Dashboard...</div>;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">GreenCode</span> Dashboard
          </h1>
          <p className="text-slate-400">Monitoring footprint for <span className="text-white font-semibold">{family?.familyName}</span></p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-emerald-500 font-bold mb-1">Total Family Emissions</p>
          <p className="text-5xl font-extrabold">{familyTotal.toFixed(1)} <span className="text-lg font-normal text-slate-400">kg CO2</span></p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {family?.members.map((member, idx) => (
          <div key={idx} className="premium-card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">{member.name}</h2>
                <p className="text-sm text-slate-400">{member.role} • Age {member.age}</p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                {calculateMemberCO2(member).toFixed(1)} kg
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold text-slate-500 uppercase">Recent Activities</p>
              {member.activities.map((act, aIdx) => (
                <div key={aIdx} className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-xl border border-white/5">
                  <span className="text-2xl">
                    {act.type === 'travel' && '🚗'}
                    {act.type === 'food' && '🥗'}
                    {act.type === 'energy' && '⚡'}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{act.description}</p>
                    <p className="text-xs text-slate-500">{act.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>GreenCode Rebuild v0.5 • Build with Java & Next.js</p>
      </footer>
    </div>
  );
}
