'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { projectsData } from '@/lib/projects-data';
import { Project, ProjectCategory } from '@/lib/types';

// Extend the Project type to include optional image and description
type ProjectWithImage = Project & {
  image?: string;
  description?: string;
};

type Category = 'all' | ProjectCategory;
const ITEMS_PER_PAGE = 6;

export function ProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const categories: Category[] = [
    'all',
    'Наружные сети',
    'Подстанции',
    'Кабельные линии',
    'Коммерческие',
    'Жилая'
  ];

  // Initialize state from URL query params
  useEffect(() => {
    const category = searchParams.get('category') as Category | null;
    const page = searchParams.get('page');
    
    if (category && categories.includes(category)) {
      setActiveCategory(category);
    }
    
    if (page && !isNaN(Number(page)) && Number(page) > 0) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== 'all') {
      params.set('category', activeCategory);
    }
    if (currentPage > 1) {
      params.set('page', currentPage.toString());
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  }, [activeCategory, currentPage, router]);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const filteredProjects: ProjectWithImage[] = activeCategory === 'all' 
    ? projectsData as ProjectWithImage[]
    : (projectsData as ProjectWithImage[]).filter((project) => project.category === activeCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Наши проекты</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ознакомьтесь с нашими последними работами
        </p>
      </div>

      {/* Category filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="aspect-video overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="capitalize">{project.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {project.blurb}
              </p>
              <Button variant="link" className="mt-4 p-0">
                Подробнее
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            «
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            ‹
          </Button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Show pages around current page
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            ›
          </Button>
          <Button
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            »
          </Button>
        </div>
      )}
    </div>
  );
}
