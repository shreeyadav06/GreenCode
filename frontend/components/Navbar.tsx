'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard');

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
            <div className="flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto w-full">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-primary font-headline">
                    Greencode
                </Link>

                <div className="hidden md:flex items-center gap-x-8">
                    <Link
                        href="/"
                        className={`font-headline text-sm tracking-wide transition-all ${pathname === '/' ? 'text-primary font-bold border-b-2 border-secondary-fixed pb-1' : 'text-on-surface-variant hover:text-primary'
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className={`font-headline text-sm tracking-wide transition-all ${isDashboard ? 'text-primary font-bold border-b-2 border-secondary-fixed pb-1' : 'text-on-surface-variant hover:text-primary'
                            }`}
                    >
                        Dashboard
                    </Link>
                </div>

                <Link
                    href={isDashboard ? "#log-activity-section" : "/dashboard"}
                    onClick={(e) => {
                        if (isDashboard) {
                            e.preventDefault();
                            document.getElementById('log-activity-section')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-headline text-sm font-bold hover:opacity-80 transition-all scale-95 active:scale-90"
                >
                    {isDashboard ? 'Log Activity' : 'Start Project'}
                </Link>
            </div>
        </nav>
    );
}
