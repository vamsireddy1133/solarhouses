import { motion } from 'framer-motion';
import { Target, Users, Award, ShieldCheck } from 'lucide-react';

const About = () => {
    const team = [
        {
            name: "Sriram",
            role: "CEO",
            image: "/team/sriram.jpg",
        },
        {
            name: "N Vani",
            role: "Managing Director",
            mobile: "9154348182",
            image: "/team/vani.jpg",
        },
        {
            name: "Madhusudhan",
            role: "Marketing Manager",
            image: "/team/madhusudhan.jpg",
        },
        {
            name: "Anil Kumar",
            role: "Technical Team Head",
            mobile: "93904 87001",
            image: "/team/anil.jpg",
        },
        {
            name: "Prahveenh",
            role: "Marketing Team Head",
            image: "/team/prahveenh.jpg",
        },
        {
            name: "Kavitha",
            role: "Work Force Manager",
            image: "/team/kavitha.jpg",
        },
        {
            name: "Shiva",
            role: "Business Development Manager",
            mobile: "9030747547",
            image: "/team/shiva.jpg",
        },
    ];

    return (
        <div className="pt-32">
            {/* Narrative Section */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-12">
                                <span className="text-brand-yellow font-bold uppercase tracking-[0.4em] text-[10px] inline-block mb-8 border-l-2 border-brand-yellow pl-4">Since 2020</span>
                                <h2 className="text-5xl sm:text-7xl md:text-9xl font-serif font-black leading-[0.85] text-white uppercase mb-8">
                                    Decarbonizing <br />
                                    <span className="text-brand-yellow">India.</span>
                                </h2>
                                <p className="text-white/40 text-xl font-light tracking-tight border-l border-white/10 pl-6">
                                    One rooftop at a time.
                                </p>
                            </div>
                            <p className="text-white/60 text-lg leading-relaxed mb-8">
                                Founded in 2020, Solar House was born from a simple yet ambitious vision: to make premium sustainable energy accessible to every Indian household and enterprise.
                            </p>
                            <p className="text-white/60 text-lg leading-relaxed">
                                We don't just install panels; we engineer long-term energy independence. Our commitment to using Tier-1 technology and precision craftsmanship has made us a trusted partner for over 500+ successful installations across the country.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden border-2 border-brand-yellow/20">
                                <img
                                    src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2058&auto=format&fit=crop"
                                    alt="Solar Team at work"
                                    className="w-full h-full object-cover transition-all duration-700"
                                />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-yellow rounded-3xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-brand-green-dark/30">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Target, title: "Precision", text: "Custom layouts optimized for your unique shadowing patterns." },
                            { icon: Users, title: "Integrity", text: "Transparent pricing and honest performance projections." },
                            { icon: Award, title: "Quality", text: "Exclusive use of high-efficiency Tier-1 solar modules." },
                            { icon: ShieldCheck, title: "Support", text: "Pan-India lifetime service and aftersales assistance." }
                        ].map((v, i) => (
                            <div key={i} className="glass-card text-center">
                                <v.icon size={40} className="text-brand-yellow mx-auto mb-6" />
                                <h4 className="text-xl font-bold mb-4">{v.title}</h4>
                                <p className="text-white/50 text-sm leading-relaxed">{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32">
                <div className="container-custom">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">The Minds Behind the <span className="text-brand-yellow">Power.</span></h2>
                        <p className="text-white/60 max-w-2xl mx-auto">Meet the certified engineers and visionaries dedicated to your energy transition.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                    />
                                    {/* Removed dark overlay */}
                                </div>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-brand-yellow text-sm uppercase tracking-widest font-bold mb-2">{member.role}</p>
                                {member.mobile && (
                                    <div className="flex items-center text-white/50 text-xs">
                                        <div className="w-6 h-6 bg-white/5 rounded-full flex items-center justify-center mr-2 text-brand-yellow">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.11-2.11a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                        </div>
                                        {member.mobile}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
