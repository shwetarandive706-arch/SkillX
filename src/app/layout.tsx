import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SkillXProvider } from '@/context/SkillXContext';
import { DemoBanner } from '@/components/shared/DemoBanner';
import { Navbar } from '@/components/shared/Navbar';

export const metadata: Metadata = {
  title: 'SkillX - Verifiable Skill Proof & Matching Engine',
  description: 'Replacing unverified resume claims with transparent, verifiable skill proof scores backed by real code artifacts and practical skill assessments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-indigo-600 selection:text-white flex flex-col">
        <SkillXProvider>
          <DemoBanner />
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
          <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground bg-card/40">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white">SkillX</span>
                <span>• Verifiable Proof Engine for Modern Talent</span>
              </div>
              <span>
                Hackathon MVP • Local Mock Data Engine • Decision support helper, no lie detection claimed.
              </span>
            </div>
          </footer>
        </SkillXProvider>
      </body>
    </html>
  );
}
