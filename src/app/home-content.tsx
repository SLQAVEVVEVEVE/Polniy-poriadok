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
      <section id="contacts" className="relative scroll-mt-20 py-20 min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0 bg-contacts opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/30 via-white/60 to-white/80 pointer-events-none"></div>
        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-2">
            <CtaForm />
            <ContactCard />
          </div>
        </div>
      </section>
    </div>
  );
}
