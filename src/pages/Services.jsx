import { motion } from 'framer-motion';
import { Home, Building2, Factory, Construction, Wrench, BarChart3, CloudSun, Zap } from 'lucide-react';

const Services = () => {
    const serviceList = [
        {
            title: "Residential Solar",
            desc: "Turn your home into a powerhouse. We design aesthetic rooftops that slash electricity bills up to 90%.",
            icon: Home,
            features: ["Custom Grid-Tie Systems", "Hybrid Battery Storage", "App-Based Monitoring"]
        },
        {
            title: "Commercial Setup",
            desc: "Reduce operational costs for your business. Large-scale installations scaled for offices and malls.",
            icon: Building2,
            features: ["ROI Focused Planning", "Zero Down-Payment Plans", "Tax Benefit Support"]
        },
        {
            title: "Industrial Grade",
            desc: "Heavy-duty PV systems for factories and warehouses with high energy consumption demands.",
            icon: Factory,
            features: ["Utility-Scale Design", "Structural Reinforcement", "24/7 Remote Diagnostics"]
        },
        {
            title: "Solar EPC",
            desc: "End-to-end Engineering, Procurement, and Construction services for turnkey projects.",
            icon: Construction,
            features: ["Site Surveys", "Government Approvals", "Material Procurement"]
        },
        {
            title: "Preventive Maintenance",
            desc: "Keep your system at peak performance with regular cleaning, checks, and part replacements.",
            icon: Wrench,
            features: ["Thermal Imaging", "Panel Cleaning", "System Health Audits"]
        },
        {
            title: "Energy Consultation",
            desc: "Strategic planning and feasibility studies for large estates and townships.",
            icon: BarChart3,
            features: ["Financial Modeling", "Capacity Optimization", "Carbon Credit Mapping"]
        }
    ];

    return (
        <div className="pt-32">
            <section className="py-20 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-yellow/10 to-transparent pointer-events-none" />

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mb-24">
                        <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Our Expertise</span>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Solar Solutions for <br /><span className="text-brand-yellow">Every Scale.</span></h2>
                        <p className="text-white/60 text-xl leading-relaxed">
                            We provide a full spectrum of solar energy services, ensuring that your transition to sustainable power is smooth, efficient, and highly profitable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {serviceList.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="glass-card group hover:border-brand-yellow/50 flex flex-col h-full"
                            >
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-yellow mb-8 group-hover:bg-brand-yellow group-hover:text-brand-green-dark transition-all duration-500">
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-white/50 mb-8 flex-grow">{service.desc}</p>

                                <ul className="space-y-3 border-t border-white/10 pt-8">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-white/70">
                                            <Zap size={14} className="text-brand-yellow mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 container-custom">
                <div className="bg-brand-yellow rounded-3xl p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative z-10 text-brand-green-dark max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Need a custom solution?</h2>
                        <p className="text-brand-green-dark/80 text-lg mb-0 font-medium">
                            Talk to our technical engineers for a bespoke energy architecture designed specifically for your needs.
                        </p>
                    </div>
                    <div className="relative z-10 mt-10 md:mt-0">
                        <button className="bg-brand-green-dark text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                            Book Consultation
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
