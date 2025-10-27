'use client';

import { Hero } from '@/components/hero';
import { WhyUs } from '@/components/why-us';
import { ServicesGrid } from '@/components/services-grid';
import { ObjectsGrid } from '@/components/objects-grid';
import { ProjectsGrid } from '@/components/projects-grid';
import { ClientsStrip } from '@/components/clients-strip';
import { CtaForm } from '@/components/cta-form';
import { ContactCard } from '@/components/contact-card';

export function HomeContent() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <Hero />
      <section id="about" className="scroll-mt-20">
        <WhyUs />
      </section>
      <section id="services" className="scroll-mt-20">
        <ServicesGrid />
      </section>
      <section id="objects" className="scroll-mt-20">
        <ObjectsGrid />
      </section>
      <section id="projects" className="scroll-mt-20">
        <ProjectsGrid />
      </section>
      <section id="clients" className="scroll-mt-20">
        <ClientsStrip />
      </section>
      <section id="contacts" className="scroll-mt-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <CtaForm />
            <ContactCard />
          </div>
        </div>
      </section>
    </div>
  );
}
