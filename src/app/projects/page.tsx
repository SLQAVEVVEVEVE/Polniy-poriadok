import { Suspense } from 'react';
import { ProjectsContent } from './projects-content';

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}