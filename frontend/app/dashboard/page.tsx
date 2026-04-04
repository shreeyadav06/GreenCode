'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
    totalEmissions: number; // OOP calculated value from Java
}

interface Family {
    familyId: string;
    familyName: string;
    members: Member[];
    totalEmissions: number; // OOP calculated value from Java
}

export default function DashboardPage() {
    const [family, setFamily] = useState<Family | null>(null);
    const [insights, setInsights] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState('travel');
    const [activeSidebarTab, setActiveSidebarTab] = useState('Overview');

    const fetchData = async () => {
        try {
            const famRes = await fetch('http://localhost:8080/api/family');
            const famData = await famRes.json();
            setFamily(famData);

            const insRes = await fetch('http://localhost:8080/api/insights');
            const insData = await insRes.json();
            setInsights(insData);
        } catch (err) {
            console.error("Failed to fetch data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const familyTotal = family?.totalEmissions || 0;

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
                await fetchData();
                setMemberForm({ name: '', age: 0, role: 'Parent' });
            }
        } catch (err) {
            console.error(err);
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
                type: activeTab,
                date: new Date().toISOString().split('T')[0],
                description: form.description || `New ${activeTab} activity`
            };

            if (activeTab === 'travel') {
                activityPayload.distance = form.distance;
                activityPayload.mode = form.mode;
            }
            if (activeTab === 'energy') {
                activityPayload.applianceType = form.applianceType;
                activityPayload.hours = form.hours;
                activityPayload.quantity = form.quantity;
            }
            if (activeTab === 'food') activityPayload.mealType = form.mealType;

            const res = await fetch('http://localhost:8080/api/family', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    memberName: form.memberName,
                    activity: activityPayload
                })
            });

            if (res.ok) {
                await fetchData();
                setForm({ ...form, description: '', distance: 0, kwh: 0 });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex h-screen flex-col items-center justify-center bg-background">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-headline font-bold text-primary uppercase tracking-[0.2em] text-xs">Initializing GreenCode Dashboard</p>
        </div>
    );

    return (
        <div className="bg-background min-h-screen pt-24">
            <Navbar />

            <div className="flex max-w-[1440px] mx-auto min-h-screen">
                {/* Sidebar */}
                <aside className="w-72 fixed h-[calc(100vh-6rem)] hidden lg:flex flex-col gap-8 py-8 px-6 border-r border-outline-variant/10">
                    <div className="mb-4">
                        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                            <p className="font-headline uppercase tracking-widest text-[10px] text-primary/70 mb-1">Family Unit</p>
                            <h3 className="text-xl font-bold text-primary tracking-tight">{family?.familyName}</h3>
                            <p className="text-[10px] font-bold text-secondary mt-1 uppercase">Active Monitoring</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-2 cursor-pointer">
                        <SidebarLink icon="dashboard" label="Overview" active={activeSidebarTab === 'Overview'} onClick={() => setActiveSidebarTab('Overview')} />
                        <SidebarLink icon="group" label="Family Members" active={activeSidebarTab === 'Members'} onClick={() => setActiveSidebarTab('Members')} />
                        <SidebarLink icon="analytics" label="Insights" active={activeSidebarTab === 'Insights'} onClick={() => setActiveSidebarTab('Insights')} />
                    </nav>

                    {/* Add Member Form */}
                    <div className="mt-auto bg-surface-container p-6 rounded-2xl">
                        <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Add Member</h4>
                        <form onSubmit={handleAddMember} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full bg-background border-outline-variant/20 rounded-xl p-3 text-xs focus:ring-1 focus:ring-primary outline-none"
                                value={memberForm.name}
                                onChange={e => setMemberForm({ ...memberForm, name: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="number"
                                    placeholder="Age"
                                    className="w-full bg-background border-outline-variant/20 rounded-xl p-3 text-xs focus:ring-1 focus:ring-primary outline-none"
                                    value={memberForm.age || ''}
                                    onChange={e => setMemberForm({ ...memberForm, age: parseInt(e.target.value) || 0 })}
                                />
                                <select
                                    className="w-full bg-background border-outline-variant/20 rounded-xl p-3 text-xs focus:ring-1 focus:ring-primary outline-none"
                                    value={memberForm.role}
                                    onChange={e => setMemberForm({ ...memberForm, role: e.target.value })}
                                >
                                    <option value="Parent">Parent</option>
                                    <option value="Child">Child</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={addingMember}
                                className="w-full bg-primary text-on-primary py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all"
                            >
                                {addingMember ? 'Adding...' : 'Add Member'}
                            </button>
                        </form>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 lg:ml-72 p-8 md:p-12">

                    {activeSidebarTab === 'Overview' && (
                        <>
                            {/* Header Metrics */}
                            <section className="mb-16">
                                <div className="flex flex-col xl:flex-row items-center gap-12">
                                    <div className="relative w-64 h-64 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                            <circle className="text-surface-container-highest" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="8"></circle>
                                            <circle className="text-primary transition-all duration-1000" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * Math.min(1, familyTotal / 5000))} strokeLinecap="round" strokeWidth="8"></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                            <span className="font-label uppercase tracking-widest text-[10px] text-outline mb-1">Family Footprint</span>
                                            <h2 className="text-4xl font-headline font-extrabold tracking-tighter text-primary">{familyTotal.toFixed(1)}</h2>
                                            <span className="text-[10px] font-bold text-outline-variant uppercase">kg CO2e</span>
                                        </div>
                                        <div className="absolute -right-4 top-4 bg-secondary-container px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
                                            <span className="text-[10px] font-bold text-on-secondary-container uppercase">Live OOP Data</span>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-primary leading-tight mb-4">
                                            Healthy Planet, Healthy Family
                                        </h1>
                                        <p className="text-outline text-lg max-w-xl">
                                            Your family carbon impact is currently <span className="text-primary font-bold">{(familyTotal / (family?.members.length || 1)).toFixed(1)}kg</span> per person. Tracking every mile and watt helps our community reach Net Zero faster.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                                {/* Activity Logger */}
                                <div id="log-activity-section" className="xl:col-span-8 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl font-headline font-bold text-primary">Log Activity</h2>
                                        <div className="flex gap-1 bg-surface-container p-1 rounded-xl">
                                            <TabButton active={activeTab === 'travel'} onClick={() => setActiveTab('travel')}>Travel</TabButton>
                                            <TabButton active={activeTab === 'food'} onClick={() => setActiveTab('food')}>Food</TabButton>
                                            <TabButton active={activeTab === 'energy'} onClick={() => setActiveTab('energy')}>Energy</TabButton>
                                        </div>
                                    </div>

                                    <form onSubmit={handleLogActivity} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Select Member</label>
                                                    <select
                                                        required
                                                        className="w-full bg-surface-container-low border-none rounded-xl p-4 font-headline font-bold text-primary focus:ring-1 focus:ring-primary outline-none"
                                                        value={form.memberName}
                                                        onChange={e => setForm({ ...form, memberName: e.target.value })}
                                                    >
                                                        <option value="">Who performed this?</option>
                                                        {family?.members.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                                                    </select>
                                                </div>

                                                {activeTab === 'travel' && (
                                                    <>
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Transport Mode</label>
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <ModeButton active={form.mode === 'car'} onClick={() => setForm({ ...form, mode: 'car' })} icon="directions_car" label="Car" />
                                                                <ModeButton active={form.mode === 'bus'} onClick={() => setForm({ ...form, mode: 'bus' })} icon="directions_bus" label="Bus" />
                                                                <ModeButton active={form.mode === 'flight'} onClick={() => setForm({ ...form, mode: 'flight' })} icon="flight" label="Air" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Distance (KM)</label>
                                                            <input
                                                                required
                                                                type="number"
                                                                className="w-full bg-surface-container-low border-none rounded-xl p-4 font-headline text-2xl font-extrabold text-primary focus:ring-1 focus:ring-primary outline-none"
                                                                placeholder="0.0"
                                                                value={form.distance || ''}
                                                                onChange={e => setForm({ ...form, distance: parseFloat(e.target.value) || 0 })}
                                                            />
                                                        </div>
                                                    </>
                                                )}

                                                {activeTab === 'food' && (
                                                    <div>
                                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Diet Type</label>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <ModeButton active={form.mealType === 'vegan'} onClick={() => setForm({ ...form, mealType: 'vegan' })} icon="eco" label="Vegan" />
                                                            <ModeButton active={form.mealType === 'vegetarian'} onClick={() => setForm({ ...form, mealType: 'vegetarian' })} icon="egg" label="Veg" />
                                                            <ModeButton active={form.mealType === 'omnivore'} onClick={() => setForm({ ...form, mealType: 'omnivore' })} icon="restaurant" label="Omni" />
                                                        </div>
                                                    </div>
                                                )}

                                                {activeTab === 'energy' && (
                                                    <>
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Appliance</label>
                                                            <select
                                                                className="w-full bg-surface-container-low border-none rounded-xl p-4 font-headline font-bold text-primary focus:ring-1 focus:ring-primary outline-none"
                                                                value={form.applianceType}
                                                                onChange={e => setForm({ ...form, applianceType: e.target.value })}
                                                            >
                                                                <option value="fan">Fan</option>
                                                                <option value="ac">Air Conditioner</option>
                                                                <option value="fridge">Fridge</option>
                                                                <option value="lights">Lighting</option>
                                                                <option value="tv">Television</option>
                                                                <option value="washing_machine">Washing Machine</option>
                                                                <option value="heater">Electric Heater</option>
                                                                <option value="pc">Computer / PC</option>
                                                                <option value="microwave">Microwave Ovens</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-3">
                                                                Hours Used / Quantity
                                                            </label>
                                                            <input
                                                                required
                                                                type="number"
                                                                className="w-full bg-surface-container-low border-none rounded-xl p-4 font-headline text-2xl font-extrabold text-primary focus:ring-1 focus:ring-primary outline-none"
                                                                placeholder="1"
                                                                value={form.hours || ''}
                                                                onChange={e => {
                                                                    const val = parseFloat(e.target.value) || 0;
                                                                    setForm({ ...form, hours: val, quantity: val });
                                                                }}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            <div className="relative rounded-2xl overflow-hidden min-h-[220px]">
                                                <img alt="Sustainable nature" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqMvpfPm5hp8Kj7nNgNcdLZs95WlKult3cgXfkbNxgzRNzD5OgBftivcV2nXqScNob6SN-egUOU4TSXK29wAeMbns0Ldvl2LuW_Qmo8c7hfEtPMkgaR42kfQ94LLJdNQkIWzDGurD388ndv2xxwKuL8_FI1sNuTwsKpnBkUfszU5--Xh1wiTFqc7MmZX30yag5_GZUNytryhfgf4NprDw8msnX6yWkc1QBMo1_YUdCzjF5Xnjp7NyBo82tqRoAjZddoXNMT_MYeMM" />
                                                <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm flex flex-col justify-end p-6">
                                                    <p className="text-white text-sm font-medium leading-relaxed italic">"Transitioning to low-carbon choices today secures a greener tomorrow."</p>
                                                    <p className="text-secondary-fixed text-[10px] font-bold uppercase mt-2 tracking-widest">Sustainability Prompt</p>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-primary text-on-primary py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:opacity-95 disabled:opacity-50 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                                        >
                                            {submitting ? 'Recording...' : 'Log Daily Activity'}
                                        </button>
                                    </form>
                                </div>

                                {/* Member List (Quick Glance) */}
                                <div className="xl:col-span-4 flex flex-col gap-8">
                                    <div className="bg-surface-container p-8 rounded-2xl border border-outline-variant/10 shadow-sm h-full">
                                        <h3 className="text-xl font-headline font-bold text-primary mb-8">Family Impact</h3>
                                        <div className="space-y-4">
                                            {family?.members.map(member => (
                                                <div key={member.name} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/5 shadow-sm group hover:border-primary/20 transition-all">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <p className="text-sm font-bold text-primary">{member.name}</p>
                                                            <p className="text-[10px] font-bold text-outline uppercase">{member.role}</p>
                                                        </div>
                                                        <span className="text-xs font-headline font-black text-secondary">{member.totalEmissions?.toFixed(1) || 0} kg</span>
                                                    </div>
                                                    <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                                                        <div
                                                            className="bg-primary h-full rounded-full transition-all duration-1000"
                                                            style={{ width: `${Math.min(100, ((member.totalEmissions || 0) / Math.max(1, familyTotal)) * 100)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeSidebarTab === 'Members' && (
                        <section className="animate-in fade-in duration-500">
                            <h1 className="text-4xl font-headline font-extrabold tracking-tighter text-primary mb-2">Family Members</h1>
                            <p className="text-outline text-sm mb-12">Detailed analysis of individual footprints.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {family?.members.map(member => (
                                    <div key={member.name} className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10">
                                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-2xl mb-4">
                                            {member.name.charAt(0)}
                                        </div>
                                        <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                                        <p className="text-xs font-bold text-outline uppercase mb-6">{member.role} • {member.age} yrs</p>

                                        <div className="bg-surface-container p-4 rounded-xl">
                                            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Total Carbon Impact</p>
                                            <p className="text-2xl font-headline font-extrabold text-secondary">{member.totalEmissions?.toFixed(1)} <span className="text-xs text-outline font-normal">kg CO2</span></p>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="text-xs font-bold text-primary mb-3">Recent Logs ({member.activities.length})</h4>
                                            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                                {member.activities.map((act, i) => (
                                                    <div key={i} className="flex justify-between items-center text-xs p-2 bg-background rounded-lg border border-outline-variant/10">
                                                        <span className="font-bold capitalize text-primary">{act.type}</span>
                                                        <span className="text-outline">{act.date}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeSidebarTab === 'Insights' && insights && (
                        <section className="animate-in fade-in duration-500">
                            <h1 className="text-4xl font-headline font-extrabold tracking-tighter text-primary mb-2">Insights</h1>
                            <p className="text-outline text-sm mb-12">Aggregated data models served directly from the Java backend streams.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {/* Top Emitter */}
                                <div className="bg-secondary-container/20 p-8 rounded-2xl border border-secondary/20">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-symbols-outlined text-secondary">trending_up</span>
                                        <h3 className="font-bold text-primary">Highest Contributor</h3>
                                    </div>
                                    {insights.topEmitter ? (
                                        <>
                                            <h2 className="text-4xl font-headline font-extrabold text-primary mb-1">{insights.topEmitter.name}</h2>
                                            <p className="text-secondary font-bold">{insights.topEmitter.emissions.toFixed(1)} kg CO2</p>
                                        </>
                                    ) : <p className="text-outline">No data yet.</p>}
                                </div>

                                {/* Average */}
                                <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-symbols-outlined text-primary">groups</span>
                                        <h3 className="font-bold text-primary">Family Average</h3>
                                    </div>
                                    <h2 className="text-4xl font-headline font-extrabold text-primary mb-1">
                                        {(insights.totalEmissions / Math.max(1, family?.members.length || 1)).toFixed(1)}
                                    </h2>
                                    <p className="text-outline font-bold">kg CO2 per person</p>
                                </div>
                            </div>

                            {/* Category Breakdown */}
                            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10">
                                <h3 className="font-headline font-bold text-primary mb-6">Emissions by Category</h3>
                                <div className="space-y-6">
                                    {Object.entries(insights.categories).map(([category, value]: any) => (
                                        <div key={category}>
                                            <div className="flex justify-between text-sm font-bold mb-2">
                                                <span className="capitalize text-primary">{category}</span>
                                                <span className="text-secondary">{value.toFixed(1)} kg</span>
                                            </div>
                                            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-primary h-full rounded-full"
                                                    style={{ width: `${Math.min(100, (value / Math.max(1, insights.totalEmissions)) * 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                </main>
            </div>

            <Footer />
        </div>
    );
}

function SidebarLink({ icon, label, active, onClick }: { icon: string; label: string; active?: boolean; onClick?: () => void }) {
    return (
        <div onClick={onClick} className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${active ? 'bg-primary text-on-primary font-bold shadow-md' : 'text-outline hover:bg-surface-container-high'}`}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className="font-headline uppercase tracking-widest text-[10px]">{label}</span>
        </div>
    );
}

function TabButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${active ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-outline hover:text-primary'}`}
        >
            {children}
        </button>
    );
}

function ModeButton({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${active ? 'bg-primary text-on-primary border-primary border-transparent' : 'bg-surface-container-low border-outline-variant/10 text-outline hover:bg-surface-container-high'}`}
        >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-[10px] font-bold uppercase">{label}</span>
        </button>
    );
}
