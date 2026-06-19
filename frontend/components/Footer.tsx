export default function Footer() {
    return (
        <footer className="w-full border-t border-outline-variant/10 dark:border-outline-variant/5 bg-surface-container-low dark:bg-surface-container mt-auto">
            <div className="flex flex-col items-center justify-center px-12 py-16 w-full mx-auto max-w-screen-2xl">
                <div className="text-2xl font-black text-primary font-headline mb-2 uppercase tracking-tighter">Greencode</div>
                <p className="font-body text-sm text-on-surface-variant/50 dark:text-on-surface-variant/30 mb-6">
                    Building a sustainable future, one footprint at a time.
                </p>
                <div className="w-12 h-px bg-outline-variant/20 dark:bg-outline-variant/10 mb-6"></div>
                <p className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant/40 dark:text-on-surface-variant/25">
                    © 2026 Greencode. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
