"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Target, Users, ArrowRight, Leaf, Flame, Award, Microscope, X } from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  const caseStudies = [
    {
      id: 0,
      title: "Direct Sourcing in Chikmagalur",
      icon: <MapPin size={20} />,
      content: "In 2024, we bypassed traditional brokers to partner directly with three independent estates in Chikmagalur. By paying 30% above the fair-trade baseline, we helped fund new irrigation systems while securing exclusive rights to their peaberry harvests.",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 1,
      title: "The 140-Curve Roast Experiment",
      icon: <Target size={20} />,
      content: "Precision is our mandate. Before launching our flagship Espresso blend, our roasting team logged over 140 distinct temperature curves. We track the Rate of Rise (RoR) down to the decimal, ensuring absolute consistency in every batch.",
      image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Zero-Waste Cafe Initiative",
      icon: <Users size={20} />,
      content: "We partnered with local urban farms to redirect 100% of our spent coffee grounds and chaff. Last year alone, we repurposed 4,000 kg of organic waste into nutrient-rich compost for local agriculture.",
      image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Gritty Origin Story Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Obsessive Craft. <br/>
              <span className="text-[#d97706]">Measurable Impact.</span>
            </h1>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                Brewcraft didn't start in a boardroom. It started in a retrofitted garage in Mysuru, born out of frustration with inconsistent, over-roasted commercial coffee.
              </p>
              <p>
                We treat coffee as a data-driven science. By bridging the gap between agronomy at the farm level and thermodynamics in the roaster, we eliminate the guesswork. The result is a cup that honors the exact terroir of the soil it was grown in.
              </p>
            </div>
            <div className="pt-4 flex gap-8 border-t border-white/10">
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">12</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Partner Farms</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">0%</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Compromise</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 w-full"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop" 
                alt="Precision Brewing" 
                fill 
                className="object-cover" 
              />
            </div>
          </motion.div>
        </div>

        {/* Interactive Case Studies Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Real-World Impact</h2>
            <p className="text-gray-400">Beyond the cup: How we operate on the ground.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Tab Navigation */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              {caseStudies.map((study, index) => (
                <button
                  key={study.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                    activeTab === index 
                      ? "bg-[#d97706] text-white shadow-lg shadow-[#d97706]/20" 
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className={`${activeTab === index ? "text-white" : "text-[#d97706]"}`}>
                    {study.icon}
                  </div>
                  <span className="font-semibold">{study.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            <div className="w-full md:w-2/3 relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col gap-6"
                >
                  <div className="relative h-64 w-full rounded-xl overflow-hidden border border-white/10">
                    <Image 
                      src={caseStudies[activeTab].image} 
                      alt={caseStudies[activeTab].title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {caseStudies[activeTab].content}
                  </p>
                  <button 
  onClick={() => setSelectedReport(activeTab)}
  className="flex items-center gap-2 text-[#d97706] hover:text-[#b45309] transition font-medium w-fit mt-auto"
>
  Read full report <ArrowRight size={16} />
</button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
            
        {/* The Brewcraft Lifecycle - Redesigned Interactive Grid */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">The Extraction Lifecycle</h2>
            <p className="text-gray-400">Our four-step methodology for absolute quality control.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Sourcing", desc: "Rigorous moisture grading and defect sorting at the farm level.", icon: <Leaf className="text-[#d97706] mb-6" size={32} /> },
              { step: "02", title: "Roasting", desc: "Small-batch drum roasting using convection tracking for even development.", icon: <Flame className="text-[#d97706] mb-6" size={32} /> },
              { step: "03", title: "Cupping", desc: "Every batch is blindly scored for acidity, body, and tasting notes.", icon: <Award className="text-[#d97706] mb-6" size={32} /> },
              { step: "04", title: "Dial-In", desc: "Extracting the perfect yield based on exact water chemistry and grind size.", icon: <Microscope className="text-[#d97706] mb-6" size={32} /> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-8 bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-colors"
              >
                {/* Large Watermark Number */}
                <div className="absolute -top-4 -right-4 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <span className="text-8xl font-black text-white">{item.step}</span>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  {item.icon}
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Animated Bottom Border */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#d97706] group-hover:w-full transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Team Roster - Typographic Redesign */}
        <div className="mt-32 border-t border-white/10 pt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">The Architects</h2>
            <p className="text-gray-400">Coffee is only as good as the minds that engineer it.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Mohammed Aman Thahani", role: "Founder & Head Roaster", focus: "Founder" },
              
            ].map((member, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d97706] to-transparent opacity-50"></div>
                
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-[#d97706] font-medium mb-8">{member.role}</p>
                
                <div className="pt-6 border-t border-white/10">
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Primary Focus</span>
                  <p className="text-gray-300 font-medium">{member.focus}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Full Report Modal Overlay */}
        <AnimatePresence>
          {selectedReport !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto shadow-2xl shadow-black"
              >
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                
                <div className="mb-6 pr-8">
                   <span className="text-[#d97706] text-xs font-bold tracking-widest uppercase mb-2 block">Comprehensive Report</span>
                   <h2 className="text-2xl font-bold text-white">{caseStudies[selectedReport].title}</h2>
                </div>
                
                <div className="relative h-64 w-full rounded-xl overflow-hidden mb-6 border border-white/5">
                   <Image 
                     src={caseStudies[selectedReport].image} 
                     alt={caseStudies[selectedReport].title} 
                     fill 
                     className="object-cover" 
                   />
                </div>
                
                <div className="text-gray-300 space-y-4 leading-relaxed">
                  <p className="text-white font-medium">{caseStudies[selectedReport].content}</p>
                  <p>This initiative represents our ongoing commitment to sustainability and precision. By strictly monitoring these metrics at the source, we have successfully optimized our workflow while maintaining the integrity of our roasting profiles.</p>
                  <p>Detailed analytics, financial distributions, and environmental impact metrics are compiled quarterly to ensure we meet our strict zero-compromise mandate.</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}