"use client";

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Award, Target, Eye, Users } from 'lucide-react';
import { api, type Employer } from '@/lib/api-client';

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function AboutPage() {
  const [team, setTeam] = useState<Employer[]>([]);
  const [stats, setStats] = useState({ projects: 0, clients: 0, team: 0, years: 20 });

  useEffect(() => {
    (async () => {
      try {
        const [emp, proj] = await Promise.all([
          api.get<{ items: Employer[] }>('/api/employers'),
          api.get<{ items: unknown[] }>('/api/projects'),
        ]);
        setTeam(emp.items.slice(0, 6));
        setStats({
          projects: proj.items.length,
          clients: emp.items.length * 50 || 100,
          team: emp.items.length,
          years: 20,
        });
      } catch {
        // soft-fail
      }
    })();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative bg-gradient-to-br from-secondary via-[#1a1a1a] to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }}></div>
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
              About <span className="text-primary">MIS Metal</span> Construction
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Leading the industry in metal construction and steel structures since 2005
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl text-secondary mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2005, MIS Metal Construction has grown from a small fabrication shop to one
                of the region's most trusted names in industrial metal construction. Our commitment to
                quality, safety, and innovation has been the cornerstone of our success.
              </p>
              <p className="text-gray-700 mb-4">
                With a team of highly skilled engineers, welders, and project managers, we've completed
                over 500 projects across various industries including manufacturing, logistics, energy,
                and commercial construction.
              </p>
              <p className="text-gray-700">
                Today, we continue to push the boundaries of what's possible in metal construction,
                utilizing cutting-edge technology and sustainable practices to deliver exceptional
                results for our clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800"
                alt="Construction team"
                className="rounded-lg shadow-xl"
              />
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
            <h2 className="text-4xl text-secondary mb-4">Our Mission & Vision</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl text-secondary mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To deliver superior metal construction solutions that exceed client expectations through
                innovative design, expert craftsmanship, and unwavering commitment to safety and quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <Eye className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl text-secondary mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To be the premier choice for metal construction projects worldwide, recognized for our
                technical excellence, sustainable practices, and exceptional customer service.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Quality', desc: 'Excellence in every weld, every beam, every project' },
              { title: 'Safety', desc: 'Uncompromising commitment to worker and site safety' },
              { title: 'Innovation', desc: 'Embracing new technologies and methodologies' },
              { title: 'Integrity', desc: 'Honest, transparent relationships with all stakeholders' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.desc}</p>
              </motion.div>
            ))}
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
            <h2 className="text-4xl text-secondary mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to excellence
            </p>
          </motion.div>

          {team.length === 0 ? (
            <p className="text-center text-gray-400">Team loading…</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.slice(0, 3).map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-gray-50 p-8 rounded-lg text-center"
                >
                  {member.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo_url}
                      alt={member.full_name}
                      className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                      {initials(member.full_name)}
                    </div>
                  )}
                  <h3 className="text-xl text-secondary mb-2">{member.full_name}</h3>
                  <p className="text-gray-600">{member.role || ''}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: `${stats.projects}+`, label: 'Projects Completed' },
              { number: `${stats.clients}+`, label: 'Happy Clients' },
              { number: `${stats.team}+`, label: 'Team Members' },
              { number: `${stats.years}+`, label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl mb-2">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
