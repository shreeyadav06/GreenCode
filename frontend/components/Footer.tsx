import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full border-t border-outline-variant/15 bg-surface-container-low mt-auto">
            <div className="flex flex-col items-center justify-center px-12 py-12 w-full mx-auto max-w-screen-2xl">
                <div className="text-2xl font-black text-primary font-headline mb-4 uppercase tracking-tighter">Greencode</div>
                <p className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant/60">
                    © 2024 Greencode. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
