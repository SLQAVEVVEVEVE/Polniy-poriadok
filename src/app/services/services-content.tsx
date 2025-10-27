'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { servicesData } from '@/lib/services-data';
import { Service } from '@/lib/types';
import { ServiceCard } from '@/components/service-card';

type Category = 'all' | string;

const ITEMS_PER_PAGE = 6;

export function ServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Get categories from services data
  const categories = ['all', ...new Set(servicesData.flatMap(service => service.categories))];
  
  // Filter services based on active category
  const filteredServices = activeCategory === 'all' 
    ? servicesData 
    : servicesData.filter(service => service.categories.includes(activeCategory));

  // Calculate pagination
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle category change
  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    
    // Update URL without causing a page reload
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    params.delete('page');
    
    router.push(`/services?${params.toString()}`, { scroll: false });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Update URL without causing a page reload
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    router.push(`/services?${params.toString()}`, { scroll: false });
  };

  // Initialize state from URL on component mount
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    setActiveCategory(category);
    setCurrentPage(isNaN(page) ? 1 : Math.min(Math.max(1, page), totalPages));
    setIsLoading(false);
  }, [searchParams, totalPages]);

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Наши услуги</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {category === 'all' ? 'Все услуги' : category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {paginatedServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">По выбранным фильтрам услуги не найдены</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                currentPage === page
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
