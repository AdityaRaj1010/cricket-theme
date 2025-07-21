import { Suspense } from 'react';
import AnimatedLayout from '@/components/AnimatedLayout';
import AllSeriesClient from '@/components/AllSeriesClient';

export default function AllSeriesPage() {
  return (
    <AnimatedLayout>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <main className="flex-grow container mx-auto py-8">
          <Suspense fallback={<p className="text-center">Loading series...</p>}>
            <AllSeriesClient />
          </Suspense>
        </main>

        <footer className="bg-yellow-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 CricketCollectors. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AnimatedLayout>
  );
}
