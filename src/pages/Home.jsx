import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import {
    ArrowRight, Zap, Shield, Battery, TrendingUp, Sun, ChevronRight,
    Clock, ShieldCheck, CloudSun, Target, Users, Home as HomeIcon,
    Building2, Factory, Construction, Wrench, BarChart3, Maximize2, X as CloseIcon, Send, MapPin, Phone, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Counter = ({ value, suffix = "", decimals = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        return latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });

    useEffect(() => {
        if (inView) {
            const controls = animate(count, value, {
                duration: 2,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [inView, value, count]);

    return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>;
};

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <div className="overflow-hidden" id="home">
            {/* Hero Section */}
            <section className="relative h-auto md:min-h-screen flex items-center pt-32 pb-8 md:pt-20 md:pb-0">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark via-brand-green-dark/80 to-transparent z-10" />
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop"
                        alt="Solar Installation"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>

                <div className="container-custom relative z-20">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="max-w-3xl"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-6xl md:text-8xl font-serif font-black leading-tight mb-8"
                        >
                            The Future of <span className="text-brand-yellow">Energy</span> is Here.
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg sm:text-xl md:text-2xl text-white/70 mb-10 leading-relaxed font-light"
                        >
                            Premium solar solutions designed for the modern Indian home and enterprise. Power your life with elegance and efficiency.
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none">
                            <a href="#portfolio" className="btn-primary group w-full sm:w-auto">
                                View Projects <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#about" className="btn-secondary w-full sm:w-auto">
                                Our Story
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Floating stats */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 z-20"
                >
                    <div className="glass-card flex flex-col items-center p-10 border-brand-yellow/20">
                        <TrendingUp size={48} className="text-brand-yellow mb-4" />
                        <span className="text-5xl font-black text-white mb-2">
                            <Counter value={95} suffix="%" />
                        </span>
                        <span className="text-white/50 text-center text-sm uppercase tracking-tighter">Cost Reduction</span>
                    </div>
                </motion.div>
            </section>

            {/* How It Works */}
            <section className="py-16 md:py-32 bg-brand-green-dark relative overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Transition to Solar in <span className="text-brand-yellow">4 Simple Steps</span></h2>
                        <p className="text-white/60">We handle everything from precision engineering to seamless grid integration.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Zap, title: "Consultation", desc: "Expert assessment of your site and energy needs." },
                            { icon: Shield, title: "Design", desc: "Custom engineered solar layout for maximum output." },
                            { icon: Sun, title: "Installation", desc: "Premium grade implementation by certified pros." },
                            { icon: Battery, title: "Activation", desc: "Instant connection and live performance tracking." }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 30 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="glass-card text-center relative group"
                            >
                                <div className="w-16 h-16 bg-brand-yellow/10 rounded-2xl flex items-center justify-center text-brand-yellow mx-auto mb-6 group-hover:bg-brand-yellow group-hover:text-brand-green-dark transition-all duration-500">
                                    <step.icon size={30} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                                {i < 3 && <ChevronRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-white/10" size={32} />}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Detailed Section */}
            <section id="services" className="py-16 md:py-32 bg-black relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mb-24">
                        <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Our Expertise</span>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Solar Solutions for <br /><span className="text-brand-yellow">Every Scale.</span></h2>
                        <p className="text-white/60 text-xl leading-relaxed">
                            We provide a full spectrum of solar energy services, ensuring that your transition to sustainable power is smooth, efficient, and highly profitable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { title: "Residential Solar", desc: "Turn your home into a powerhouse. We design aesthetic rooftops that slash electricity bills up to 90%.", icon: HomeIcon, features: ["Custom Grid-Tie Systems", "Hybrid Battery Storage", "App-Based Monitoring"] },
                            { title: "Commercial Setup", desc: "Reduce operational costs for your business. Large-scale installations scaled for offices and malls.", icon: Building2, features: ["ROI Focused Planning", "Zero Down-Payment Plans", "Tax Benefit Support"] },
                            { title: "Industrial Grade", desc: "Heavy-duty PV systems for factories and warehouses with high energy consumption demands.", icon: Factory, features: ["Utility-Scale Design", "Structural Reinforcement", "24/7 Remote Diagnostics"] },
                            { title: "Solar EPC", desc: "End-to-end Engineering, Procurement, and Construction services for turnkey projects.", icon: Construction, features: ["Site Surveys", "Government Approvals", "Material Procurement"] },
                            { title: "Preventive Maintenance", desc: "Keep your system at peak performance with regular cleaning, checks, and part replacements.", icon: Wrench, features: ["Thermal Imaging", "Panel Cleaning", "System Health Audits"] },
                            { title: "Energy Consultation", desc: "Strategic planning and feasibility studies for large estates and townships.", icon: BarChart3, features: ["Financial Modeling", "Capacity Optimization", "Carbon Credit Mapping"] }
                        ].map((service, i) => (
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

            {/* About Section (Mission + Team) */}
            <section id="about" className="py-16 md:py-32">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
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
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-yellow rounded-3xl -z-10" />
                        </motion.div>
                    </div>

                    {/* Team Grid */}
                    <div className="text-center mb-20 pt-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">The Minds Behind the <span className="text-brand-yellow">Power.</span></h2>
                        <p className="text-white/60 max-w-2xl mx-auto">Meet the certified engineers and visionaries dedicated to your energy transition.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { name: "Sriram", role: "CEO", image: "/team/sriram.jpg" },
                            { name: "N Vani", role: "Managing Director", mobile: "9154348182", image: "/team/vani.jpg" },
                            { name: "Madhusudhan", role: "Marketing Manager", image: "/team/madhusudhan.jpg" },
                            { name: "Anil Kumar", role: "Technical Team Head", mobile: "93904 87001", image: "/team/anil.jpg" },
                            { name: "Prahveenh", role: "Marketing Team Head", image: "/team/prahveenh.jpg" },
                            { name: "Kavitha", role: "Work Force Manager", image: "/team/kavitha.jpg" },
                            { name: "Shiva", role: "Business Development Manager", mobile: "9030747547", image: "/team/shiva.jpg" },
                        ].map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-brand-yellow text-sm uppercase tracking-widest font-bold mb-2">{member.role}</p>
                                {member.mobile && (
                                    <div className="flex items-center text-white/50 text-xs">
                                        <div className="w-6 h-6 bg-white/5 rounded-full flex items-center justify-center mr-2 text-brand-yellow">
                                            <Phone size={12} />
                                        </div>
                                        {member.mobile}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 md:py-32 bg-brand-green-dark border-y border-white/5">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Why Choose Us</span>
                            <h2 className="text-5xl font-black mb-8 leading-tight">Engineering <span className="text-brand-yellow">Reliability</span> into every ray.</h2>
                            <p className="text-white/60 text-lg mb-10">
                                We provide end-to-end support for Indian EPC contractors and homeowners, ensuring seamless procurement and financial flexibility.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: "Smart Financing Options", desc: "Trusted by financing partners across India & Southeast Asia.", icon: TrendingUp },
                                    { title: "Reliable & Timely Supply", desc: "Reduce project delays with our assured delivery dates and Tier-1 logistics.", icon: Clock },
                                    { title: "Energy Efficiency Solutions", desc: "Optimize project performance with high-quality, certified materials.", icon: Zap },
                                    { title: "Lifetime Pan-India Support", desc: "Our service engineers are available in every major city for immediate assistance.", icon: ShieldCheck }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-brand-yellow shrink-0">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                                            <p className="text-white/40 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-3xl overflow-hidden glass-card p-2">
                                <img
                                    src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1975&auto=format&fit=crop"
                                    alt="Solar Analysis"
                                    className="w-full h-full object-cover rounded-2xl transition-all duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 glass-card p-8 border-brand-yellow/30 bg-brand-green-dark/80">
                                <div className="text-brand-yellow text-4xl font-black mb-1">
                                    <Counter value={10} suffix="k+" />
                                </div>
                                <p className="text-white/50 text-xs uppercase tracking-widest font-bold">MWh Generated</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-16 md:py-32 bg-brand-green-dark/20">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Portfolio</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-center">Installations that <br />Speak for <span className="text-brand-yellow">Efficiency.</span></h2>
                        <p className="text-white/60">Explore our diverse range of successful solar transitions across India.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "The Green Mansion", location: "Gurugram, HR", category: "Residential", image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1968&auto=format&fit=crop", capacity: "15kW" },
                            { title: "Tech Plaza Industrial", location: "Pune, MH", category: "Commercial", image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1975&auto=format&fit=crop", capacity: "250kW" },
                            { title: "Skyline Apartments", location: "Bengaluru, KA", category: "Housing Society", image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2058&auto=format&fit=crop", capacity: "50kW" },
                            { title: "Eco Warehouse", location: "Ahmedabad, GJ", category: "Industrial", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop", capacity: "1.2MW" },
                            { title: "Royal Residency", location: "Jaipur, RJ", category: "Residential", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop", capacity: "8kW" },
                            { title: "Global Logistics Hub", location: "Chennai, TN", category: "Industrial", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop", capacity: "800kW" }
                        ].map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-transparent to-transparent opacity-80" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-brand-yellow text-[10px] font-black uppercase tracking-widest mb-2 block">{project.category}</span>
                                                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                                                <div className="flex items-center text-white/50 text-xs">
                                                    <MapPin size={12} className="mr-1 text-brand-yellow" />
                                                    {project.location}
                                                </div>
                                            </div>
                                            <div className="bg-brand-yellow text-brand-green-dark px-3 py-1 rounded-lg text-sm font-black">
                                                {project.capacity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Tracker */}
            <section className="py-16 md:py-32 bg-brand-green-dark overflow-hidden relative">
                <div className="container-custom relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-20">Our Collective <span className="text-brand-yellow">Impact.</span></h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { label: "Carbon Saved", value: 250, suffix: "k Tons", icon: CloudSun },
                            { label: "Trees Planted", value: 1.2, suffix: "M", decimals: 1, icon: Target },
                            { label: "Houses Powered", value: 5000, suffix: "+", icon: HomeIcon },
                            { label: "Happy Clients", value: 850, suffix: "+", icon: Users }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <stat.icon size={40} className="text-brand-yellow mx-auto mb-6 opacity-50" />
                                <p className="text-4xl md:text-5xl font-black text-white mb-2">
                                    <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                                </p>
                                <p className="text-white/40 text-sm uppercase tracking-widest font-bold">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Animated Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent -translate-y-1/2" />
            </section>

            {/* FAQ */}
            <section className="py-16 md:py-32 bg-black">
                <div className="container-custom max-w-4xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Common Questions.</h2>
                        <p className="text-white/60">Everything you need to know about your energy independence.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "How much can I actually save with solar?", a: "Most residential users see a reduction of 80-95% in their monthly electricity bills. Commercial entities typically achieve ROI within 3-4 years." },
                            { q: "What happens during cloudy days or at night?", a: "Our hybrid systems store excess energy in high-capacity batteries (BESS) or feed back into the grid (Net Metering) so you have power 24/7." },
                            { q: "Is there any maintenance involved?", a: "We recommend a basic cleaning once every 15-30 days. Our Premium Maintenance plan includes quarterly health checks and remote diagnostics." },
                            { q: "Do you help with government subsidies?", a: "Yes, our team handles all the paperwork for PM Surya Ghar and state-specific subsidy schemes across India." }
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="glass-card hover:border-brand-yellow/30"
                            >
                                <details className="group cursor-pointer">
                                    <summary className="list-none flex justify-between items-center text-xl font-bold p-2">
                                        {faq.q}
                                        <ChevronRight className="text-brand-yellow group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <p className="mt-6 text-white/50 leading-relaxed border-t border-white/10 pt-6">
                                        {faq.a}
                                    </p>
                                </details>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section id="contact" className="py-16 md:py-32 bg-brand-green-dark">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Connect With Us</span>
                            <h2 className="text-5xl font-black mb-10 leading-tight">Ready to Switch to <span className="text-brand-yellow">Unlimited</span> Power?</h2>
                            <div className="space-y-8">
                                {[
                                    { icon: Phone, label: "Call Us", val: "+91 91821 32523" },
                                    { icon: Mail, label: "Email Support", val: "consult@solarhouse.in" },
                                    { icon: MapPin, label: "Office Address", val: "Plot No -56, Rd No 5, Cherlapally, Hyderabad" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start space-x-6">
                                        <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow shrink-0">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">{item.label}</p>
                                            <p className="text-xl font-bold">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-10 border-brand-yellow/20">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-yellow outline-none" />
                                    <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-yellow outline-none" />
                                </div>
                                <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-yellow outline-none" />
                                <textarea rows="4" placeholder="How can we help?" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-yellow outline-none"></textarea>
                                <button className="btn-primary w-full py-5 text-lg group">
                                    Send Inquiry <Send className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
