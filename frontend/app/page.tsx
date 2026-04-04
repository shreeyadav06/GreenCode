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
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent"></div>
          </div>

          <div className="relative z-10 px-8 md:px-24 max-w-4xl">
            <h1 className="text-white font-headline text-5xl md:text-7xl font-extrabold leading-[1.1] editorial-text-shadow tracking-tight">
              Greencode : Personal Carbon Footprint Tracker.
            </h1>
            <p className="mt-8 text-white/90 font-body text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
              Sustainability. Simplified. Greener Better Future.
            </p>
            <div className="mt-12">
              <Link href="/dashboard" className="bg-secondary-fixed text-on-secondary-fixed px-10 py-5 rounded-md font-headline text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 inline-block">
                Start Your Transformation
              </Link>
            </div>
          </div>
        </section>


        {/* Impact Section */}
        <section className="py-24 md:py-40 bg-surface px-8 md:px-24">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

              {/* Left Column */}
              <div className="flex flex-col h-full justify-center gap-16 py-12">
                <div className="space-y-6">
                  <span className="font-label font-bold uppercase tracking-[0.2em] text-xs">[ Family Impact ]</span>
                  <h2 className="font-headline text-4xl md:text-5xl lg:text-5xl font-extrabold text-primary leading-[1.1]">
                    Smart Family Monitoring, Real-time Insights
                  </h2>
                  <div className="mt-10">
                    <Link href="/dashboard" className="bg-[#eef7cc] text-primary px-8 py-3.5 rounded-sm font-headline font-bold text-sm hover:opacity-90 transition-all inline-block shadow-sm">
                      Explore Dashboard
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Row 1 */}
                <div className="md:col-span-2 relative aspect-[21/9] rounded-2xl overflow-hidden shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    alt="Sustainable Home"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv4z1jLWxZgU6QSaa1IyrOzeQRsN6F_9OzOcuNxeIf6wJiyiD3AwhTWRIcXD24lmpp92X5x4Bl0jqbCQheEcFk1pzO0jiZcQDhg6kzLylUZOGNp_h6dPx1ge87Fny80LTwAIaVwDhnxjP3_Bldb72Dip6P81E-W487pdfhqCqbMgBM8nusvzMiEAVmJN5a9BFI2ySozJcZVSCdnbsOXgfRvS0GrLefRp6qI1f4WfNCNKW8zTzjXQZPyPPyXyFkAg_vu4Y0GHfFgAo"
                  />
                </div>

                {/* Row 2 */}
                <ImpactCard title="ENERGY MONITORING" category="Service" />
                <ImpactCard title="TRAVEL INTELLIGENCE" category="Service" />

                {/* Row 3 */}
                <ImpactCard title="FOOD TRACKING" category="Service" />
                <ImpactCard title="MADE WITH JAVA" category="Tech Stack" />
              </div>

            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="bg-primary py-32 px-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10 w-full h-full pointer-events-none">
            <img className="w-full h-full object-cover" alt="Architectural textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrSMaScDBV3gyhWgsdsMqlMeHwDxI8ox3Ip2QmO8Gqt3wDN8AO8dMp2F38HiM_nSa7pHLCIMi9y443X0gCl22cJdbuYpAArC95UQ_n6Sr1_uy1gWpj3TWfQSGX6vVyvBssk2M08Zmn6De-MbI7N_gT6j0uMYznhCExcgWigHbM9ufR2iXecUKEmGPsbHVPyPr1bEVH-WGGqM5ivcZTnZ10G7DMDrNqo9RJgy2TjbPM_Pz3gyrjjLe41vhSN6LQ0yjVctIUxEEWQCg" />
          </div>
          <div className="max-w-screen-xl mx-auto text-center relative z-10">
            <p className="font-label text-secondary-fixed uppercase tracking-[0.3em] text-xs mb-12">Global Network</p>
            <h3 className="font-headline text-3xl md:text-4xl font-bold text-white mb-20 max-w-2xl mx-auto leading-tight">
              Helping 100+ leading companies get better results through organic efficiency.
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-16 opacity-60">
              <PartnerLogo name="VOLTICO" />
              <PartnerLogo name="GREENPATH" />
              <PartnerLogo name="ECOSTREAM" />
              <PartnerLogo name="TERRANODE" />
              <PartnerLogo name="OXYGENIUM" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
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

function ImpactCard({ title, category }: { title: string; category: string }) {
  return (
    <div className="bg-[#eef7cc] p-6 rounded-2xl flex flex-col justify-between aspect-video md:aspect-auto md:h-48 shadow-sm">
      <span className="font-body text-xs text-primary/70">{category}</span>
      <h4 className="font-headline text-lg font-bold text-primary leading-tight mt-auto">{title}</h4>
    </div>
  );
}

function PartnerLogo({ name }: { name: string }) {
  return (
    <div className="text-white font-headline font-black text-2xl tracking-tighter hover:opacity-100 transition-opacity cursor-default">
      {name}
    </div>
  );
}
