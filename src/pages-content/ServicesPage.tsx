"use client";

import { motion } from 'motion/react';
import { Building2, Wrench, Factory, Zap, ShieldCheck, Hammer, Cog, Truck } from 'lucide-react';

export function ServicesPage() {
  const services = [
    {
      icon: Building2,
      title: 'Metal Structures',
      description: 'Custom steel frameworks for any application including warehouses, commercial buildings, and industrial facilities.',
      features: ['Structural steel design', 'Load-bearing frameworks', 'Column and beam systems', 'Truss fabrication'],
    },
    {
      icon: Factory,
      title: 'Steel Fabrication',
      description: 'Precision manufacturing of steel components using state-of-the-art equipment and techniques.',
      features: ['CNC cutting', 'Press brake forming', 'Rolling and bending', 'Surface treatment'],
    },
    {
      icon: Factory,
      title: 'Industrial Buildings',
      description: 'Complete industrial facility construction from foundation to finishing.',
      features: ['Warehouse construction', 'Factory buildings', 'Storage facilities', 'Distribution centers'],
    },
    {
      icon: Wrench,
      title: 'Welding Services',
      description: 'Expert welding and metal joining by certified professionals.',
      features: ['MIG/TIG welding', 'Arc welding', 'Spot welding', 'Quality inspection'],
    },
    {
      icon: Zap,
      title: 'Installation & Maintenance',
      description: 'Professional setup and ongoing support for all metal structures.',
      features: ['On-site installation', 'Equipment setup', 'Regular inspections', 'Preventive maintenance'],
    },
    {
      icon: ShieldCheck,
      title: 'Custom Metal Projects',
      description: 'Bespoke metalwork solutions tailored to your specific requirements.',
      features: ['Custom design', 'Prototype development', 'Special applications', 'Unique fabrications'],
    },
    {
      icon: Hammer,
      title: 'Roofing Structures',
      description: 'Durable metal roofing systems for commercial and industrial buildings.',
      features: ['Metal roof installation', 'Skylight systems', 'Drainage solutions', 'Insulation integration'],
    },
    {
      icon: Cog,
      title: 'Staircases & Platforms',
      description: 'Industrial staircases, catwalks, and elevated platforms.',
      features: ['Safety railings', 'Grated platforms', 'Access stairs', 'Mezzanine systems'],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="relative bg-gradient-to-br from-secondary via-[#1a1a1a] to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
              Our <span className="text-primary">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Comprehensive metal construction solutions for every need
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <motion.div
                  className="bg-primary p-6 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700"></div>
                </motion.div>
                <div className="p-6">
                  <h3 className="text-2xl text-secondary mb-3">{service.title}</h3>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-6">Why Choose Our Services?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Certified Professionals',
                description: 'All our technicians are certified and trained to the highest industry standards.',
              },
              {
                title: 'Quality Materials',
                description: 'We use only premium-grade steel and materials from trusted suppliers.',
              },
              {
                title: 'Timely Delivery',
                description: 'We pride ourselves on meeting deadlines without compromising quality.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-lg"
              >
                <h3 className="text-xl mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
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
            <h2 className="text-4xl md:text-5xl mb-6">Need a Custom Solution?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team is ready to discuss your specific requirements and provide a tailored solution
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
