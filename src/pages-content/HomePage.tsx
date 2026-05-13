"use client";

import { motion } from 'motion/react';
import Link from 'next/link';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api, type Service } from '@/lib/api-client';
import { iconFor } from '@/lib/icon-map';

export function HomePage() {
  const [counts, setCounts] = useState({ projects: 0, clients: 0, experience: 0 });
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [projectsRes, employersRes, servicesRes] = await Promise.all([
          api.get<{ items: unknown[] }>('/api/projects'),
          api.get<{ items: unknown[] }>('/api/employers'),
          api.get<{ items: Service[] }>('/api/services'),
        ]);
        const targetProjects = projectsRes.items.length;
        const targetClients = employersRes.items.length * 50 || 100;
        setServices(servicesRes.items.slice(0, 6));
        animateCount(targetProjects, 'projects', 1500);
        animateCount(targetClients, 'clients', 1500);
        animateCount(20, 'experience', 1500);
      } catch {
        // soft-fail: keep zeros and empty services
      }
    })();

    function animateCount(target: number, key: string, duration: number) {
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setCounts((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }, duration / steps);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-[#1a1a1a] to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-secondary"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl text-white mb-6"
          >
            Building Excellence in
            <br />
            <span className="text-primary">Metal Construction</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Premium steel structures and metal fabrication services for industrial and commercial projects
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Get a Quote
            </Link>
            <Link
              href="/projects"
              className="bg-white text-secondary px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              View Projects
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      <PartnersBar />

      <section id="stats-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 bg-gray-50 rounded-lg"
            >
              <div className="text-5xl text-primary mb-4">{counts.projects}+</div>
              <h3 className="text-xl text-secondary">Completed Projects</h3>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 bg-gray-50 rounded-lg"
            >
              <div className="text-5xl text-primary mb-4">{counts.clients}+</div>
              <h3 className="text-xl text-secondary">Satisfied Clients</h3>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 bg-gray-50 rounded-lg"
            >
              <div className="text-5xl text-primary mb-4">{counts.experience}+</div>
              <h3 className="text-xl text-secondary">Years of Excellence</h3>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-secondary mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive metal construction solutions tailored to your needs
            </p>
          </motion.div>

          {services.length === 0 ? (
            <p className="text-center text-gray-400">Services loading…</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = iconFor(service.icon);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl text-secondary mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.short_desc}</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl mb-6">Why Choose MIS Metal?</h2>
              <p className="text-gray-300 mb-6">
                With over 20 years of experience in metal construction, we deliver superior quality and
                unmatched expertise in every project.
              </p>
              <ul className="space-y-4">
                {[
                  'ISO Certified Quality Standards',
                  'Expert Engineering Team',
                  '24/7 Project Support',
                  'On-Time Delivery Guaranteed',
                  'Competitive Pricing',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white">✓</span>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
                alt="Metal construction"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-lg">
                <div className="text-4xl mb-2">20+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-secondary mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted by industry leaders across the region
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Anderson',
                company: 'ABC Manufacturing',
                text: 'MIS Metal delivered our warehouse project on time and within budget. Outstanding quality!',
              },
              {
                name: 'Sarah Mitchell',
                company: 'Industrial Solutions Inc.',
                text: 'Professional team, excellent communication, and superior craftsmanship. Highly recommended!',
              },
              {
                name: 'David Chen',
                company: 'Tech Logistics Ltd.',
                text: 'The steel structure they built for us has been flawless. Great attention to detail!',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-lg"
              >
                <div className="text-primary text-4xl mb-4">"</div>
                <p className="text-gray-700 mb-6">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-secondary">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get in touch with our team today for a free consultation and quote
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Contact Us Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function PartnersBar() {
  const partners = [
    'STEEL INTERNATIONAL',
    'GLOBAL METALS CO.',
    'INDUSTRIAL PARTNERS',
    'CONSTRUCTION ALLIANCE',
    'METAL SUPPLIERS INC.',
    'FORGE & BUILD',
    'STEELWORKS UNITED',
    'PRECISION METALS',
  ];

  return (
    <div className="bg-white py-8 border-y border-gray-200 overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-12 whitespace-nowrap"
            >
              <span className="text-gray-600 font-semibold">{partner}</span>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
