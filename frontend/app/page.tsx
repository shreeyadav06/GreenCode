'use client';

import { useEffect, useState } from 'react';

interface Activity {
  type: string;
  date: string;
  description: string;
  distance?: number;
  kwh?: number;
  mealType?: string;
  mode?: string;
  applianceType?: string;
  hours?: number;
  quantity?: number;
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
      if (act.type === 'travel' && act.distance) {
        const factor = act.mode === 'flight' ? 0.25 : act.mode === 'bus' ? 0.10 : act.mode === 'train' ? 0.04 : 0.17;
        return sum + (act.distance * factor);
      }
      if (act.type === 'food') {
         const factor = act.mealType === 'vegan' ? 1.5 : act.mealType === 'vegetarian' ? 2.0 : 3.3;
         return sum + factor; 
      }
      if (act.type === 'energy') {
         if (act.applianceType) {
           let wattage = 0; let time = 0;
           if (act.applianceType === 'fan') { wattage = 0.075; time = act.hours || 0; }
           else if (act.applianceType === 'ac') { wattage = 1.5; time = act.hours || 0; }
           else if (act.applianceType === 'fridge') { wattage = 0.150; time = 24.0 * Math.max(1, act.quantity || 1); }
           else if (act.applianceType === 'lights') { wattage = 0.060; time = 6.0 * Math.max(1, act.quantity || 1); }
           return sum + (wattage * time * 0.45);
         }
         return sum + ((act.kwh || 0) * 0.45);
      }
      return sum;
    }, 0);
  };

  const familyTotal = family?.members.reduce((sum, m) => sum + calculateMemberCO2(m), 0) || 0;

  const [form, setForm] = useState({
    memberName: '',
    type: 'travel',
    description: '',
    distance: 0,
    kwh: 0,
    mealType: 'omnivore',
    mode: 'car',
    applianceType: 'fan',
    hours: 0,
    quantity: 1
  });

  const [memberForm, setMemberForm] = useState({
    name: '',
    age: 0,
    role: 'Parent'
  });

  const [submitting, setSubmitting] = useState(false);
  const [addingMember, setAddingMember] = useState(false);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name) return alert("Please enter a name");
    
    setAddingMember(true);
    try {
      const res = await fetch('http://localhost:8080/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberForm)
      });

      if (res.ok) {
        const freshRes = await fetch('http://localhost:8080/api/family');
        const freshData = await freshRes.json();
        setFamily(freshData);
        setMemberForm({ name: '', age: 0, role: 'Parent' });
      } else {
        alert("Failed to add member");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setAddingMember(false);
    }
  };

  const handleLogActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.memberName) return alert("Please select a family member");
    
    setSubmitting(true);
    try {
      const activityPayload: any = {
        type: form.type,
        date: new Date().toISOString().split('T')[0],
        description: form.description || `New ${form.type} activity`
      };

      if (form.type === 'travel') {
        activityPayload.distance = form.distance;
        activityPayload.mode = form.mode;
      }
      if (form.type === 'energy') {
        activityPayload.applianceType = form.applianceType;
        activityPayload.hours = form.hours;
        activityPayload.quantity = form.quantity;
      }
      if (form.type === 'food') activityPayload.mealType = form.mealType;

      const res = await fetch('http://localhost:8080/api/family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberName: form.memberName,
          activity: activityPayload
        })
      });

      if (res.ok) {
        // Refresh data
        const freshRes = await fetch('http://localhost:8080/api/family');
        const freshData = await freshRes.json();
        setFamily(freshData);
        setForm({ ...form, description: '', distance: 0, kwh: 0 });
      } else {
        alert("Failed to log activity");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-emerald-500 font-bold">Initializing Dashboard...</div>;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">GreenCode</span> Dashboard
          </h1>
          <p className="text-slate-400">Monitoring footprint for <span className="text-white font-semibold">{family?.familyName}</span></p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-emerald-500 font-bold mb-1">Total Family Emissions</p>
          <p className="text-5xl font-extrabold tracking-tighter">{familyTotal.toFixed(1)} <span className="text-lg font-normal text-slate-400 ml-1">kg CO2</span></p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Forms Section */}
        <section className="lg:col-span-1 space-y-6">
          {/* Add Member Form */}
          <div className="premium-card">
            <h2 className="text-lg font-bold mb-4">Add Member</h2>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-2">Name</label>
                <input 
                  type="text"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
                  value={memberForm.name}
                  onChange={e => setMemberForm({...memberForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-2">Age</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
                    value={memberForm.age}
                    onChange={e => setMemberForm({...memberForm, age: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-2">Role</label>
                  <select 
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
                    value={memberForm.role}
                    onChange={e => setMemberForm({...memberForm, role: e.target.value})}
                  >
                    <option value="Parent">Parent</option>
                    <option value="Child">Child</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit"
                disabled={addingMember}
                className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 text-slate-200 font-bold py-3 rounded-xl transition-all text-sm mt-2 border border-white/5 box-border"
              >
                {addingMember ? 'ADDING...' : 'ADD MEMBER'}
              </button>
            </form>
          </div>

          {/* Logging Form */}
          <div className="premium-card sticky top-8">
            <h2 className="text-xl font-bold mb-6 text-emerald-500">
              Log Activity
            </h2>
            <form onSubmit={handleLogActivity} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Member</label>
                <select 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition-colors"
                  value={form.memberName}
                  onChange={e => setForm({...form, memberName: e.target.value})}
                  required
                >
                  <option value="">Select Member</option>
                  {family?.members.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Category</label>
                <select 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition-colors"
                  value={form.type}
                  onChange={e => setForm({...form, type: e.target.value})}
                >
                  <option value="travel">Travel</option>
                  <option value="food">Food</option>
                  <option value="energy">Energy</option>
                </select>
              </div>

              {form.type === 'travel' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">Mode of Transport</label>
                    <select 
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition-colors"
                      value={form.mode || 'car'}
                      onChange={e => setForm({...form, mode: e.target.value})}
                    >
                      <option value="car">Car</option>
                      <option value="bus">Bus</option>
                      <option value="flight">Flight</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">Distance (km)</label>
                    <input 
                      type="number"
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition-colors"
                      value={form.distance}
                      onChange={e => setForm({...form, distance: parseFloat(e.target.value) || 0})}
                      required
                    />
                  </div>
                </>
              )}

              {form.type === 'energy' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">Appliance</label>
                    <select 
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition-colors"
                      value={form.applianceType}
                      onChange={e => setForm({...form, applianceType: e.target.value})}
                    >
                      <option value="fan">Fan</option>
                      <option value="ac">AC</option>
                      <option value="fridge">Fridge (24h)</option>
                      <option value="lights">Lights (Evening-Night)</option>
                    </select>
                  </div>
                  {(form.applianceType === 'fan' || form.applianceType === 'ac') && (
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-2">Usage (Hours)</label>
                      <input 
                        type="number"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition-colors"
                        value={form.hours}
                        onChange={e => setForm({...form, hours: parseFloat(e.target.value) || 0})}
                        required
                      />
                    </div>
                  )}
                  {(form.applianceType === 'fridge' || form.applianceType === 'lights') && (
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-2">Quantity</label>
                      <input 
                        type="number"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition-colors"
                        value={form.quantity}
                        onChange={e => setForm({...form, quantity: parseInt(e.target.value) || 1})}
                        required
                        min="1"
                      />
                    </div>
                  )}
                </>
              )}

              {form.type === 'food' && (
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Diet Type</label>
                  <select 
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition-colors"
                    value={form.mealType}
                    onChange={e => setForm({...form, mealType: e.target.value})}
                  >
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="omnivore">Omnivore</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Description</label>
                <input 
                  type="text"
                  placeholder="Optional note..."
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition-colors"
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 mt-4"
              >
                {submitting ? 'LOGGING...' : 'LOG ACTIVITY'}
              </button>
            </form>
          </div>
        </section>

        {/* Member Cards Section */}
        <section className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {family?.members.map((member, idx) => (
              <div key={idx} className="premium-card border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">{member.name}</h2>
                    <p className="text-sm text-slate-400 font-medium">{member.role} • Age {member.age}</p>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                    {calculateMemberCO2(member).toFixed(1)} kg
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Recent Activity Log</p>
                  {member.activities.length === 0 ? (
                    <p className="text-xs text-slate-600 italic py-2">No activities logged yet.</p>
                  ) : (
                    member.activities.slice(-3).reverse().map((act, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-4 bg-slate-900/40 p-3 rounded-xl border border-white/5 hover:bg-slate-900/60 transition-colors group">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg transition-transform group-hover:scale-105">
                          {act.type === 'travel' && 'Travel'}
                          {act.type === 'food' && 'Food'}
                          {act.type === 'energy' && 'Energy'}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-200">{act.description}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">{act.date}</p>
                        </div>
                        <div className="text-[10px] font-bold text-slate-400">
                          {act.type === 'travel' && `${act.distance}km (${act.mode || 'car'})`}
                          {act.type === 'energy' && (act.applianceType ? `${act.applianceType} ${act.applianceType === 'fridge' || act.applianceType === 'lights' ? `x${act.quantity}` : `${act.hours}h`}` : `${act.kwh}kWh`)}
                          {act.type === 'food' && act.mealType}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-16 pt-8 border-t border-white/5 text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
        <p>GreenCode Rebuild v0.6 • Secure Family Data Logic</p>
      </footer>
    </div>
  );
}
