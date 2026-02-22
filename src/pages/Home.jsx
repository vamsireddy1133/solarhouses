import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import {
    ArrowRight, Zap, Shield, Battery, TrendingUp, Sun, ChevronRight,
    Clock, ShieldCheck, CloudSun, Target, Users, Home as HomeIcon
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
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-32 pb-16 md:pt-20 md:pb-0">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark via-brand-green-dark/80 to-transparent z-10" />
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop"
                        alt="Solar Installation"
                        className="w-full h-full object-cover grayscale opacity-40"
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
                        <motion.div variants={itemVariants} className="flex flex-col sm:row gap-4">
                            <Link to="/portfolio" className="btn-primary group">
                                View Projects <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/about" className="btn-secondary">
                                Our Story
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Floating stats */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 z-20"
                >
                    <div className="glass-card flex flex-col items-center p-10 border-brand-yellow/20">
                        <TrendingUp size={48} className="text-brand-yellow mb-4" />
                        <span className="text-5xl font-black text-white mb-2">95%</span>
                        <span className="text-white/50 text-center text-sm uppercase tracking-tighter">Cost Reduction</span>
                    </div>
                </motion.div>
            </section>

            {/* How It Works */}
            <section className="py-32 bg-brand-green-dark relative overflow-hidden">
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

            {/* Services Summary */}
            <section className="py-32 bg-black">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Empowering Every <br /><span className="text-brand-yellow">Square Foot.</span></h2>
                            <p className="text-white/60">Whether it's a suburban rooftop or a sprawling industrial complex, we bring world-class solar technology to your doorstep.</p>
                        </div>
                        <Link to="/services" className="text-brand-yellow font-bold uppercase tracking-widest flex items-center hover:mr-2 transition-all group mt-8 md:mt-0">
                            Discover All Services <ArrowRight className="ml-2 group-hover:translate-x-1" size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Residential Solar",
                                image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
                                tag: "Homeowners"
                            },
                            {
                                title: "Commercial Setup",
                                image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1975&auto=format&fit=crop",
                                tag: "Enterprises"
                            },
                            {
                                title: "Advanced Battery Storage",
                                image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
                                tag: "Off-Grid"
                            }
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                whileInView={{ opacity: 1, scale: 1 }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group relative h-[450px] overflow-hidden rounded-3xl"
                            >
                                <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                <div className="absolute bottom-10 left-10">
                                    <span className="inline-block px-3 py-1 bg-brand-yellow text-brand-green-dark text-[10px] font-black uppercase tracking-widest rounded mb-4">
                                        {service.tag}
                                    </span>
                                    <h3 className="text-2xl font-black text-white">{service.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-32 bg-brand-green-dark border-y border-white/5">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
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
                                    className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 glass-card p-8 border-brand-yellow/30 bg-brand-green-dark/80">
                                <p className="text-brand-yellow text-4xl font-black mb-1">10k+</p>
                                <p className="text-white/50 text-xs uppercase tracking-widest font-bold">MWh Generated</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Impact Tracker */}
            <section className="py-32 bg-black overflow-hidden relative">
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
            <section className="py-32 bg-black">
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
        </div>
    );
};

export default Home;
