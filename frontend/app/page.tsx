import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-start overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Aerial view of a winding road cutting through a dense, lush green forest"
              src="/images/hero.png"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent dark:from-black/85 dark:via-black/50 dark:to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <div className="relative z-10 px-8 md:px-24 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-white/90 font-body text-xs tracking-widest uppercase">Carbon Footprint Intelligence</span>
            </div>
            <h1 className="text-white font-headline text-5xl md:text-7xl font-extrabold leading-[1.1] editorial-text-shadow tracking-tight">
              Greencode : Personal Carbon Footprint Tracker.
            </h1>
            <p className="mt-8 text-white/80 font-body text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
              Sustainability. Simplified. Greener Better Future.
            </p>
            <div className="mt-12 flex items-center gap-6">
              <Link href="/dashboard" className="group relative bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-5 rounded-xl font-headline text-lg font-bold transition-all duration-300 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-400/40 inline-flex items-center gap-3 hover:-translate-y-0.5">
                Start Your Transformation
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/40 text-xs font-body tracking-widest uppercase">Scroll</span>
            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </div>
        </section>


        {/* Stats Strip */}
        <section className="relative bg-surface-container-low dark:bg-surface-container border-y border-outline-variant/10 dark:border-outline-variant/5">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-24 py-10 md:py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <StatItem value="4+" label="Tracking Categories" />
              <StatItem value="Real-time" label="Carbon Analytics" />
              <StatItem value="AI" label="Powered Insights" />
              <StatItem value="100%" label="Open Source" />
            </div>
          </div>
        </section>


        {/* Impact Section */}
        <section className="py-24 md:py-40 bg-surface dark:bg-background px-8 md:px-24 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-secondary/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-screen-2xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

              {/* Left Column */}
              <div className="flex flex-col h-full justify-center gap-16 py-12">
                <div className="space-y-6">
                  <span className="font-label font-bold uppercase tracking-[0.2em] text-xs text-on-surface-variant/60 dark:text-on-surface-variant/40">[ Family Impact ]</span>
                  <h2 className="font-headline text-4xl md:text-5xl lg:text-5xl font-extrabold text-primary leading-[1.1]">
                    Smart Family Monitoring, Real-time Insights
                  </h2>
                  <p className="text-on-surface-variant/70 dark:text-on-surface-variant/50 font-body text-lg leading-relaxed max-w-md">
                    Track your household&apos;s carbon footprint across energy, travel, food, and lifestyle choices with intelligent monitoring.
                  </p>
                  <div className="mt-10">
                    <Link href="/dashboard" className="group inline-flex items-center gap-3 bg-primary/10 dark:bg-primary/15 text-primary px-8 py-3.5 rounded-xl font-headline font-bold text-sm hover:bg-primary/20 dark:hover:bg-primary/25 transition-all duration-300 border border-primary/20 dark:border-primary/15">
                      Explore Dashboard
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Row 1 */}
                <div className="md:col-span-2 relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg dark:shadow-black/40 ring-1 ring-outline-variant/10 dark:ring-white/5">
                  <img
                    className="w-full h-full object-cover"
                    alt="Sustainable Home"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv4z1jLWxZgU6QSaa1IyrOzeQRsN6F_9OzOcuNxeIf6wJiyiD3AwhTWRIcXD24lmpp92X5x4Bl0jqbCQheEcFk1pzO0jiZcQDhg6kzLylUZOGNp_h6dPx1ge87Fny80LTwAIaVwDhnxjP3_Bldb72Dip6P81E-W487pdfhqCqbMgBM8nusvzMiEAVmJN5a9BFI2ySozJcZVSCdnbsOXgfRvS0GrLefRp6qI1f4WfNCNKW8zTzjXQZPyPPyXyFkAg_vu4Y0GHfFgAo"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Row 2 */}
                <ImpactCard title="ENERGY MONITORING" category="Service" icon="⚡" />
                <ImpactCard title="TRAVEL INTELLIGENCE" category="Service" icon="✈️" />

                {/* Row 3 */}
                <ImpactCard title="FOOD TRACKING" category="Service" icon="🥗" />
                <ImpactCard title="MADE WITH JAVA" category="Tech Stack" icon="☕" />
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center md:text-left">
      <div className="font-headline text-2xl md:text-3xl font-extrabold text-primary">{value}</div>
      <div className="mt-1 font-body text-sm text-on-surface-variant/60 dark:text-on-surface-variant/40 tracking-wide">{label}</div>
    </div>
  );
}

function FeatureItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-6 group">
      <span className="text-secondary-fixed-dim font-headline text-3xl font-bold italic opacity-40 group-hover:opacity-100 transition-opacity">{number}</span>
      <div>
        <h3 className="font-headline text-2xl font-bold text-primary">{title}</h3>
        <p className="mt-2 text-on-surface-variant leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ImpactCard({ title, category, icon }: { title: string; category: string; icon: string }) {
  return (
    <div className="group relative bg-surface-container-low dark:bg-surface-container-high/50 p-6 rounded-2xl flex flex-col justify-between aspect-video md:aspect-auto md:h-48 border border-outline-variant/15 dark:border-outline-variant/10 hover:border-primary/30 dark:hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/30 overflow-hidden">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 group-hover:from-primary/5 group-hover:via-primary/3 group-hover:to-primary/10 transition-all duration-500 rounded-2xl"></div>
      <div className="relative z-10 flex justify-between items-start">
        <span className="font-body text-xs text-on-surface-variant/50 dark:text-on-surface-variant/30 uppercase tracking-wider">{category}</span>
        <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity group-hover:scale-110 transform duration-300">{icon}</span>
      </div>
      <h4 className="relative z-10 font-headline text-lg font-bold text-on-surface dark:text-on-surface leading-tight mt-auto">{title}</h4>
    </div>
  );
}
