"use client";

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, ZoomIn, Calendar, MapPin } from 'lucide-react';

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const categories = ['All', 'Warehouses', 'Steel Buildings', 'Industrial Projects', 'Roofing Structures', 'Staircases', 'Custom Metal Work'];

  const projects = [
    {
      id: 1,
      title: 'Industrial Warehouse Complex',
      category: 'Warehouses',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      location: 'Chicago, IL',
      date: 'March 2026',
      description: 'A 50,000 sq ft steel-frame warehouse with advanced climate control systems.',
    },
    {
      id: 2,
      title: 'Steel Frame Office Building',
      category: 'Steel Buildings',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
      location: 'New York, NY',
      date: 'February 2026',
      description: 'Modern 12-story office tower with exposed steel architecture.',
    },
    {
      id: 3,
      title: 'Manufacturing Facility',
      category: 'Industrial Projects',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
      location: 'Detroit, MI',
      date: 'January 2026',
      description: 'Complete industrial manufacturing plant with heavy-duty steel framework.',
    },
    {
      id: 4,
      title: 'Metal Roof Installation',
      category: 'Roofing Structures',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
      location: 'Boston, MA',
      date: 'December 2025',
      description: 'Premium standing seam metal roofing for commercial complex.',
    },
    {
      id: 5,
      title: 'Industrial Staircase System',
      category: 'Staircases',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      location: 'Philadelphia, PA',
      date: 'November 2025',
      description: 'Multi-level industrial staircase with safety platforms and railings.',
    },
    {
      id: 6,
      title: 'Custom Metal Canopy',
      category: 'Custom Metal Work',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
      location: 'Miami, FL',
      date: 'October 2025',
      description: 'Artistic architectural metal canopy with custom fabrication.',
    },
    {
      id: 7,
      title: 'Distribution Center',
      category: 'Warehouses',
      image: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?w=800',
      location: 'Dallas, TX',
      date: 'September 2025',
      description: 'Large-scale logistics warehouse with automated systems.',
    },
    {
      id: 8,
      title: 'Commercial Steel Structure',
      category: 'Steel Buildings',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      location: 'Seattle, WA',
      date: 'August 2025',
      description: 'Contemporary commercial building with exposed steel beams.',
    },
    {
      id: 9,
      title: 'Factory Expansion',
      category: 'Industrial Projects',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800',
      location: 'Cleveland, OH',
      date: 'July 2025',
      description: 'Production facility expansion with reinforced steel framework.',
    },
    {
      id: 10,
      title: 'Standing Seam Metal Roof',
      category: 'Roofing Structures',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      location: 'Portland, OR',
      date: 'June 2025',
      description: 'Energy-efficient metal roofing system for corporate campus.',
    },
    {
      id: 11,
      title: 'Safety Staircase & Platform',
      category: 'Staircases',
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
      location: 'Atlanta, GA',
      date: 'May 2025',
      description: 'Industrial-grade access staircase with OSHA-compliant safety features.',
    },
    {
      id: 12,
      title: 'Architectural Metal Features',
      category: 'Custom Metal Work',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
      location: 'Austin, TX',
      date: 'April 2025',
      description: 'Bespoke metal artwork and structural elements for modern building.',
    },
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative bg-gradient-to-br from-secondary via-[#1a1a1a] to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl mb-6"
            >
              Our <span className="text-primary">Projects</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Showcasing excellence in metal construction across diverse industries
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white sticky top-20 z-40 border-b border-gray-200 shadow-sm backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="columns-1 gap-x-6 space-y-6 sm:columns-2 xl:columns-3">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group break-inside-avoid-column mb-6"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center"
                        >
                          <ZoomIn className="text-white" size={28} />
                        </motion.div>
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-6 text-white w-full">
                          <div className="text-sm text-primary mb-2">{project.category}</div>
                          <h3 className="text-xl mb-2">{project.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-300">
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{project.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-primary mb-2">{project.category}</div>
                      <h3 className="text-xl text-secondary mb-3">{project.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{project.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-xl max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-96 object-cover" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
                >
                  <X className="text-secondary" size={24} />
                </button>
              </div>
              <div className="p-8">
                <div className="text-sm text-primary mb-2">{selectedProject.category}</div>
                <h2 className="text-3xl text-secondary mb-4">{selectedProject.title}</h2>
                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-primary" />
                    <span>{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <span>{selectedProject.date}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">Ready to Discuss Your Project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with our expert metal construction services
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 transition-all"
            >
              Start Your Project
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
