import { motion, useMotionValue, useSpring, useTransform, useInView, animate, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import {
    ArrowRight, Zap, Shield, Battery, TrendingUp, Sun, ChevronRight,
    Clock, ShieldCheck, CloudSun, Target, Users, Home as HomeIcon,
    Building2, Factory, Construction, Wrench, BarChart3, Maximize2, X as CloseIcon, Send, MapPin, Phone, Mail, Droplet, Leaf, Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Counter = ({ value, suffix = "", decimals = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10px" });
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
                delayChildren: 0.3
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
            },
        },
    };

    const floatingVariants = {
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const { scrollYProgress } = useScroll();
    const scrollYSpring = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // Split text animation for hero title
    const titleText = "The Future of Energy is Here.";
    const titleWords = titleText.split(" ");

    // Magnetic Button Hook replacement logic
    const MouseTracker = (ref) => {
        const x = useMotionValue(0);
        const y = useMotionValue(0);
        const springX = useSpring(x, { stiffness: 150, damping: 15 });
        const springY = useSpring(y, { stiffness: 150, damping: 15 });

        const handleMouseMove = (e) => {
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set((e.clientX - centerX) * 0.3);
            y.set((e.clientY - centerY) * 0.3);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        return { x: springX, y: springY, handleMouseMove, handleMouseLeave };
    };

    const btnRef1 = useRef(null);
    const magnetic1 = MouseTracker(btnRef1);
    const btnRef2 = useRef(null);
    const magnetic2 = MouseTracker(btnRef2);

    return (
        <div className="overflow-hidden" id="home">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-brand-yellow z-[60] origin-left"
                style={{ scaleX: scrollYSpring }}
            />
            {/* Hero Section */}
            <section className="relative h-auto md:min-h-screen flex items-center pt-32 pb-8 md:pt-20 md:pb-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark via-brand-green-dark/80 to-transparent z-10" />
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop"
                        alt="Solar Installation"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Animated decorative shapes */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    <motion.div
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, -100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-green-light/10 rounded-full blur-[120px]"
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
                            variants={containerVariants}
                            className="text-4xl sm:text-6xl md:text-8xl font-serif font-black leading-tight mb-8"
                        >
                            {titleWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={itemVariants}
                                    className="inline-block mr-4 font-serif"
                                >
                                    {word === "Energy" ? <span className="text-brand-yellow">{word}</span> : word}
                                </motion.span>
                            ))}
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg sm:text-xl md:text-2xl text-white/70 mb-10 leading-relaxed font-light"
                        >
                            Premium solar solutions designed for the modern Indian home and enterprise. Power your life with elegance and efficiency.
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none">
                            <motion.div
                                ref={btnRef1}
                                style={{ x: magnetic1.x, y: magnetic1.y }}
                                onMouseMove={magnetic1.handleMouseMove}
                                onMouseLeave={magnetic1.handleMouseLeave}
                            >
                                <a href="#portfolio" className="btn-primary group w-full sm:w-auto flex items-center justify-center">
                                    View Projects <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                            <motion.div
                                ref={btnRef2}
                                style={{ x: magnetic2.x, y: magnetic2.y }}
                                onMouseMove={magnetic2.handleMouseMove}
                                onMouseLeave={magnetic2.handleMouseLeave}
                            >
                                <a href="#about" className="btn-secondary w-full sm:w-auto flex items-center justify-center">
                                    Our Story
                                </a>
                            </motion.div>
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
                                <motion.div
                                    whileHover={{
                                        y: -15,
                                        scale: 1.02,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                                    }}
                                    className="w-16 h-16 bg-brand-yellow/10 rounded-2xl flex items-center justify-center text-brand-yellow mx-auto mb-6 transition-colors duration-500 group-hover:bg-brand-yellow group-hover:text-brand-green-dark"
                                >
                                    <step.icon size={30} />
                                </motion.div>
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                                {i < 3 && (
                                    <motion.div
                                        animate={{ x: [0, 10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-white/10"
                                    >
                                        <ChevronRight size={32} />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Solar Kits Section */}
            <section className="py-16 md:py-32 bg-brand-green-dark relative overflow-hidden border-t border-white/5">
                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Precision Components</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                Engineered Solar <span className="text-brand-yellow">Kits</span> <br />
                                For Faster Installation.
                            </h2>
                        </div>
                        <p className="text-white/40 text-sm max-w-sm mb-2">High-performance bundles optimized for project economics and seamless site integration.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {[
                            {
                                id: 1,
                                title: "Kit 1: Without Wires",
                                desc: "Standard component bundle for custom wiring projects.",
                                image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=1974&auto=format&fit=crop",
                                features: ["Tier-1 Mono Perc Panels", "Smart String Inverter", "AC/DC Distribution Box", "Earthing Rods & Gel"]
                            },
                            {
                                id: 2,
                                title: "Kit 2: With Wires",
                                desc: "Full end-to-end kit including precut solar wiring.",
                                image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
                                features: ["Everything in Kit 1", "DC Solar Cables (4sq mm)", "MC4 Pre-crimped Connectors", "Earth Wire Bundles"]
                            }
                        ].map((kit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="glass-card bg-[#0a110d] border-white/5 p-6 md:p-10 rounded-[2.5rem] hover:border-brand-yellow/30 transition-all duration-700 overflow-hidden relative shadow-2xl"
                                >
                                    <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-10 relative bg-white/5">
                                        <motion.img
                                            whileHover={{ scale: 1.15 }}
                                            transition={{ duration: 0.8 }}
                                            src={kit.image}
                                            alt={kit.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a110d] via-transparent to-transparent opacity-60" />

                                        {/* Floating Badge */}
                                        <motion.div
                                            whileHover={{ rotate: 90, scale: 1.1 }}
                                            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:bg-brand-yellow group-hover:text-brand-green-dark group-hover:border-brand-yellow transition-all duration-500 cursor-pointer backdrop-blur-md"
                                        >
                                            <Plus size={20} />
                                        </motion.div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-2xl font-black text-white mb-2">{kit.title}</h3>
                                                <p className="text-white/40 text-sm">{kit.desc}</p>
                                            </div>
                                        </div>

                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5"
                                        >
                                            {kit.features.map((feature, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    variants={itemVariants}
                                                    className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-white/30"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow/40" />
                                                    {feature}
                                                </motion.div>
                                            ))}
                                        </motion.div>

                                        <div className="pt-8">
                                            <button className="flex items-center gap-4 text-brand-green-light font-black uppercase tracking-[0.2em] text-sm group/btn">
                                                Enquire Now
                                                <motion.div
                                                    animate={{ x: [0, 10, 0] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                >
                                                    <ChevronRight size={18} />
                                                </motion.div>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Market Growth Chart Section */}
            <section className="py-16 md:py-32 bg-brand-green-dark relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Market Outlook</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-6">A Decisive <span className="text-brand-yellow">Growth Era.</span></h2>
                        <p className="text-white/60">The global solar economy is accelerating, with a projected 13.5% CAGR through 2035. Join the leaders in energy independence.</p>
                    </div>

                    <div className="glass-card p-6 md:p-16 border-white/5 relative bg-white/5 backdrop-blur-3xl rounded-[2rem]">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Global Solar PV Installation Market</h3>
                                <p className="text-white/40 text-sm">Revenue Growth 2024 - 2035 (Value in USD Millions)</p>
                            </div>
                            <div className="bg-brand-yellow text-brand-green-dark px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl shadow-brand-yellow/10">
                                <span className="text-3xl font-black">13.5%</span>
                                <div className="text-[10px] uppercase font-bold leading-tight tracking-wider border-l border-brand-green-dark/20 pl-4">
                                    CAGR<br />2024-2035
                                </div>
                            </div>
                        </div>

                        <div className="flex items-end justify-between h-[300px] md:h-[450px] gap-1 md:gap-4 group/chart">
                            {[
                                { year: "2024", val: 279.4 },
                                { year: "2025", val: 317.1 },
                                { year: "2026", val: 359.9 },
                                { year: "2027", val: 408.5 },
                                { year: "2028", val: 463.6 },
                                { year: "2029", val: 526.2 },
                                { year: "2030", val: 597.3 },
                                { year: "2031", val: 677.9 },
                                { year: "2032", val: 769.4 },
                                { year: "2033", val: 873.3 },
                                { year: "2034", val: 961.2 },
                                { year: "2035", val: 1063.4 },
                            ].map((data, i) => {
                                const height = (data.val / 1063.4) * 100;
                                return (
                                    <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group/bar">
                                        <div className="relative w-full flex flex-col items-center justify-end h-full">
                                            {/* Value Tooltip */}
                                            <div className="absolute -top-12 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 bg-brand-yellow text-brand-green-dark text-[10px] font-bold px-2 py-1 rounded-md pointer-events-none z-20 whitespace-nowrap shadow-xl">
                                                {data.val} Mn
                                            </div>

                                            {/* Bar Vertical Line */}
                                            <div className="absolute w-[1px] h-full bg-white/5 left-1/2 -translate-x-1/2 -z-10" />

                                            {/* The Bar */}
                                            <motion.div
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${height}%` }}
                                                transition={{ delay: i * 0.05 + 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                                viewport={{ once: true }}
                                                className="w-full bg-gradient-to-t from-brand-yellow/10 to-brand-yellow/40 group-hover/bar:from-brand-yellow/30 group-hover/bar:to-brand-yellow transition-all duration-500 rounded-t-sm relative border-t-2 border-brand-yellow"
                                            >
                                                <div className="absolute inset-0 bg-brand-yellow/20 blur-md opacity-0 group-hover/bar:opacity-50 transition-opacity" />
                                            </motion.div>
                                        </div>
                                        <span className="text-[8px] md:text-xs text-white/30 group-hover/bar:text-brand-yellow font-bold mt-4 transition-colors">
                                            {data.year}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-yellow/5 blur-[120px] rounded-full" />
            </section>

            {/* Solar Tracker Market Section */}
            <section className="py-16 md:py-32 bg-brand-green-dark relative overflow-hidden border-t border-white/5">
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Tracker Chart Area */}
                        <div className="glass-card p-8 md:p-12 border-white/5 bg-white/5 backdrop-blur-3xl rounded-[2rem]">
                            <div className="mb-12">
                                <h3 className="text-2xl font-bold mb-2">Solar Tracker Market: Size & Share</h3>
                                <div className="flex items-center gap-4 text-brand-yellow mt-4">
                                    <span className="text-4xl font-black italic">17.3%</span>
                                    <div className="text-[10px] uppercase font-bold tracking-widest leading-tight border-l border-brand-yellow/20 pl-4">
                                        CAGR<br />2024 - 2029
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-end justify-between h-[300px] gap-8 max-w-sm mx-auto relative px-4">
                                {[
                                    { year: "2023", val: 8.70, regions: [3.5, 2.5, 1.2, 1.0, 0.5] },
                                    { year: "2024", val: 10.32, regions: [4.0, 3.2, 1.5, 1.1, 0.52] },
                                    { year: "2029", val: 22.87, regions: [8.5, 8.2, 3.0, 2.5, 0.67] },
                                ].map((data, i) => {
                                    const heightPerc = (data.val / 22.87) * 100;
                                    const colors = ["bg-[#3B82F6]", "bg-[#EF4444]", "bg-[#84CC16]", "bg-[#06B6D4]", "bg-[#9CA3AF]"];

                                    return (
                                        <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
                                            <div className="relative w-full h-full flex flex-col justify-end">
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-brand-yellow font-black text-sm">{data.val}</div>
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${heightPerc}%` }}
                                                    transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                                                    viewport={{ once: true }}
                                                    className="w-full rounded-t-lg overflow-hidden flex flex-col-reverse shadow-2xl"
                                                >
                                                    {data.regions.map((regionVal, idx) => (
                                                        <div
                                                            key={idx}
                                                            style={{ height: `${(regionVal / data.val) * 100}%` }}
                                                            className={`${colors[idx]} w-full border-t border-white/10`}
                                                        />
                                                    ))}
                                                </motion.div>
                                            </div>
                                            <span className="mt-4 font-bold text-white/50 text-xs">{data.year}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Legends */}
                            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4 text-[10px] uppercase tracking-wider text-white/40 font-bold border-t border-white/5 pt-8">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#3B82F6] rounded-sm" /> North America</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#EF4444] rounded-sm" /> Asia Pacific</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#84CC16] rounded-sm" /> Latin America</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#06B6D4] rounded-sm" /> Europe</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#9CA3AF] rounded-sm" /> MEA</div>
                            </div>
                        </div>

                        {/* Snapshot Table Area */}
                        <div className="glass-card p-8 md:p-12 border-brand-yellow/10 bg-brand-yellow/5 h-full">
                            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
                                <div className="p-3 bg-brand-yellow rounded-xl text-brand-green-dark shadow-lg shadow-brand-yellow/20">
                                    <BarChart3 size={24} />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-[0.2em] text-brand-yellow">Market Snapshot</h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: "Market Size in 2023 (Value)", val: "USD 8.70 BN" },
                                    { label: "Market Forecast in 2029 (Value)", val: "USD 22.87 BN" },
                                    { label: "CAGR", val: "17.3%" },
                                    { label: "Years Considered", val: "2022-2029" },
                                    { label: "Base Year", val: "2023" },
                                    { label: "Forecast Period", val: "2024-2029" },
                                    { label: "Units Considered", val: "Value (USD BN)" },
                                    { label: "Fastest-Growing Region", val: "Asia Pacific" },
                                ].map((row, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 hover:bg-white/5 transition-colors px-2 group">
                                        <span className="text-xs md:text-sm text-white/50 group-hover:text-white transition-colors">{row.label}</span>
                                        <span className="text-xs md:text-sm font-bold text-white uppercase tracking-tight">{row.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-yellow/[0.02] blur-[150px] rounded-full -z-10" />
            </section>

            {/* Solar Tracker Market by Axis Type Section */}
            <section className="py-16 md:py-32 bg-brand-green-dark relative overflow-hidden border-t border-white/5">
                <div className="container-custom relative z-10">
                    <div className="glass-card p-0 md:p-0 overflow-hidden border-white/5 bg-white/5 backdrop-blur-3xl rounded-[2rem]">
                        <div className="bg-[#1e293b] p-6 flex justify-between items-center">
                            <h3 className="text-sm md:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-3">
                                <TrendingUp className="text-brand-yellow" size={24} />
                                Solar Tracker Market, By Axis Type, 2024–2029 (USD BN)
                            </h3>
                            <div className="flex gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                            </div>
                        </div>

                        <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            {/* Area Chart Area */}
                            <div className="lg:col-span-7 flex flex-col">
                                <div className="relative h-[300px] w-full">
                                    <svg viewBox="0 0 500 250" className="w-full h-full drop-shadow-2xl overflow-visible">
                                        <defs>
                                            <linearGradient id="grad-single" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                                                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                                            </linearGradient>
                                            <linearGradient id="grad-dual" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                                            </linearGradient>
                                        </defs>

                                        {/* Grid Lines */}
                                        <line x1="0" y1="220" x2="500" y2="220" stroke="white" strokeOpacity="0.1" strokeWidth="1" />

                                        {/* Axis Line */}
                                        <line x1="0" y1="220" x2="0" y2="0" stroke="white" strokeOpacity="0.1" strokeWidth="1" />

                                        {/* Dual Axis Area (Stacked) */}
                                        <motion.path
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            whileInView={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                            viewport={{ once: true }}
                                            d="M0,190 Q100,185 200,178 Q300,170 400,165 Q500,160 L500,220 L0,220 Z"
                                            fill="url(#grad-dual)"
                                            stroke="#10B981"
                                            strokeWidth="2"
                                        />

                                        {/* Single Axis Area (Stacked on top visually for display) */}
                                        <motion.path
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            whileInView={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
                                            viewport={{ once: true }}
                                            d="M0,130 Q100,120 200,105 Q300,90 400,75 Q500,60 L500,160 Q400,165 300,170 Q200,178 100,185 L0,190 Z"
                                            fill="url(#grad-single)"
                                            stroke="#3B82F6"
                                            strokeWidth="2"
                                        />
                                    </svg>

                                    {/* Labels */}
                                    <div className="flex justify-between mt-6 text-[10px] md:text-xs text-white/30 font-bold px-1 uppercase tracking-widest">
                                        <span>2024</span>
                                        <span>2025</span>
                                        <span>2026</span>
                                        <span>2027</span>
                                        <span>2028</span>
                                        <span>2029</span>
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="flex gap-8 mt-12 self-center">
                                    <div className="flex items-center gap-3 text-sm text-white/50 font-bold uppercase tracking-wider">
                                        <div className="w-4 h-4 bg-[#3B82F6] rounded-sm shadow-lg shadow-blue-500/20" /> Single-axis
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-white/50 font-bold uppercase tracking-wider">
                                        <div className="w-4 h-4 bg-[#10B981] rounded-sm shadow-lg shadow-green-500/20" /> Dual-axis
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="lg:col-span-5 border-l-0 lg:border-l border-white/10 pl-0 lg:pl-16 relative flex flex-col justify-center">
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex w-8 h-8 rounded-full bg-[#10B981] items-center justify-center text-white border-4 border-brand-green-dark shadow-xl shadow-green-500/20 active:scale-95 transition-all cursor-pointer">
                                    <ChevronRight size={16} fill="currentColor" />
                                </div>
                                <div className="mb-10">
                                    <span className="text-8xl md:text-[10rem] font-black text-white/95 leading-none tracking-tighter">16.7<span className="text-4xl md:text-5xl text-white/20 ml-2">%</span></span>
                                </div>
                                <div className="space-y-8">
                                    <p className="text-white/80 leading-relaxed text-lg font-medium">
                                        <span className="text-brand-yellow font-black text-xl mr-3 border-b-2 border-brand-yellow/30 pb-1">Single-</span>
                                        The single-axis segment holds the largest market share due to its cost-effectiveness, simpler design, and ability to significantly enhance energy generation typically by 15–25% compared to fixed systems.
                                    </p>
                                    <p className="text-white/40 text-sm leading-relaxed border-l-2 border-white/5 pl-6 font-light">
                                        Its lower maintenance requirements, shorter installation time, and high compatibility with large-scale utility solar projects further drive widespread adoption globally.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-yellow/[0.01] blur-[100px] pointer-events-none" />
            </section>

            {/* Government Schemes Section */}
            <section className="py-16 md:py-32 bg-brand-green-dark relative overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Government Initiatives</span>
                            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight italic font-serif text-white">
                                Powering a Green <br />
                                <span className="text-brand-yellow">Digital India.</span>
                            </h2>
                            <div className="space-y-8">
                                <div className="glass-card border-brand-yellow/20 bg-brand-yellow/5">
                                    <h3 className="text-2xl font-bold mb-4 text-brand-yellow">PM Surya Ghar: Muft Bijli Yojana</h3>
                                    <p className="text-white/70 leading-relaxed mb-6">
                                        Launched in 2024, this flagship scheme offers up to <span className="text-white font-black text-xl">₹78,000</span> in direct subsidies for residential rooftop solar installations. The mission aims to provide free electricity to over <span className="text-white font-bold">1 crore Indian households</span>.
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                                            <Zap size={20} />
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-widest text-white/40">Zero setup cost options available</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 border-l-2 border-brand-yellow/30 bg-white/5 rounded-r-xl">
                                        <h4 className="font-bold text-white mb-2">PM-KUSUM Scheme</h4>
                                        <p className="text-xs text-white/50 leading-relaxed">Dedicated to farmers, providing solar pumps and decentralized solar power plants for agricultural independence.</p>
                                    </div>
                                    <div className="p-6 border-l-2 border-brand-yellow/30 bg-white/5 rounded-r-xl">
                                        <h4 className="font-bold text-white mb-2">PLI Incentives</h4>
                                        <p className="text-xs text-white/50 leading-relaxed">Production Linked Incentives for high-efficiency solar module manufacturing to boost self-reliant supply chains.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-2 border-white/5 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1566093097221-ac2335b09e70?q=80&w=2070&auto=format&fit=crop"
                                    alt="Modern Residential Solar Setup"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/80 via-transparent to-transparent" />
                                <div className="absolute bottom-10 left-10 right-10 p-8 glass-card border-white/10 text-center">
                                    <p className="text-brand-yellow font-black text-3xl mb-1">₹78,000</p>
                                    <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-bold">Maximum Subsidy Approved</p>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-yellow rounded-full flex items-center justify-center text-brand-green-dark p-6 text-center leading-tight font-black text-sm rotate-12 shadow-2xl border-4 border-brand-green-dark">
                                GOVERNMENT APPROVED
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Solar Business Opportunity Section */}
            <section className="py-16 md:py-32 bg-brand-green-dark relative overflow-hidden border-t border-white/5">
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Entrepreneurial Growth</span>
                            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                                Solar Business <br />
                                <span className="text-brand-yellow">In India.</span>
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-xl text-white/80 leading-relaxed italic mb-8 border-l-4 border-brand-yellow pl-6">
                                    "The solar business is booming in India! With advanced technology, supportive government policies, and growing awareness of environmental benefits, solar energy is becoming a game-changer."
                                </p>
                                <p className="text-white/60 leading-relaxed mb-10">
                                    If you've been curious about what the solar business is and why it matters, now is the time to explore the opportunities it offers. From residential installations to large-scale industrial projects, the horizon for solar entrepreneurship has never been brighter.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                <button className="px-8 py-4 bg-brand-yellow text-brand-green-dark font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl shadow-brand-yellow/20">
                                    Join the Revolution
                                </button>
                                <button className="px-8 py-4 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all">
                                    Download Guide
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="relative group lg:ml-auto"
                        >
                            <div className="aspect-square w-full max-w-xl rounded-[3rem] overflow-hidden border-2 border-white/5 shadow-2xl relative">
                                <img
                                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop"
                                    alt="Solar Business Opportunity"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-brand-green-dark/40 group-hover:bg-transparent transition-colors duration-700" />

                                <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                                    <div className="px-4 py-2 bg-brand-yellow text-brand-green-dark font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg">
                                        48+ Success Stories
                                    </div>
                                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md text-white font-black text-[10px] uppercase tracking-widest rounded-full border border-white/10">
                                        India-Wide Reach
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-brand-green-dark to-transparent">
                                    <h4 className="text-2xl font-bold text-white mb-2">Build a Brighter Future</h4>
                                    <p className="text-white/50 text-xs uppercase tracking-widest font-bold">Start your profitable solar venture today</p>
                                </div>
                            </div>

                            {/* Decorative Floating Icon */}
                            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-brand-yellow rounded-2xl flex items-center justify-center text-brand-green-dark shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                <TrendingUp size={40} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-32 bg-brand-green-dark relative">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Why Solar?</span>
                            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">The Power of the <span className="text-brand-yellow">Sun</span>, Realized.</h2>
                            <p className="text-white/60 text-lg mb-12">Discover why thousands of Indian homeowners and industries are transitioning to a cleaner, smarter energy future.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { icon: TrendingUp, title: "Unmatched Savings", desc: "Drastic reduction in electricity bills from day one, with ROI typically achieved within 3-4 years." },
                                    { icon: Leaf, title: "Eco-Conscious Living", desc: "Significantly reduce your carbon footprint and contribute to a healthier, greener environment for future generations." },
                                    { icon: Shield, title: "Energy Security", desc: "Achieve independence from grid fluctuations and protect yourself from rising energy tariffs." },
                                    { icon: HomeIcon, title: "Property Value", desc: "Properties equipped with premium solar infrastructure command higher market resale values." }
                                ].map((benefit, i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-yellow">
                                            <benefit.icon size={20} />
                                        </div>
                                        <h4 className="text-lg font-bold">{benefit.title}</h4>
                                        <p className="text-white/40 text-sm leading-relaxed">{benefit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="relative grid grid-cols-2 gap-4"
                        >
                            <div className="space-y-4">
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 mt-12">
                                    <img
                                        src="https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=1974&auto=format&fit=crop"
                                        alt="Modern Solar Architecture"
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                </div>
                                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                                    <img
                                        src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop"
                                        alt="Detailed Solar Panel"
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-12">
                                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                                    <img
                                        src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2058&auto=format&fit=crop"
                                        alt="Solar Installation Work"
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                </div>
                                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10">
                                    <img
                                        src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop"
                                        alt="Clean Energy Landscape"
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                </div>
                            </div>

                            {/* Decorative Blur */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-yellow/5 blur-[120px] rounded-full" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Solar Comparison Section */}
            <section className="py-16 md:py-32 bg-[#050a08] relative overflow-hidden border-t border-white/5">
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Transition Guide</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            On-Grid vs Off-Grid <br />
                            <span className="text-brand-yellow">& Hybrid Solar</span>
                        </h2>
                        <p className="text-white/40 mt-6 max-w-xl mx-auto">Different locations require different solutions. Discover the architecture that fits your energy lifestyle.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "On-Grid",
                                subtitle: "Grid Interactive",
                                icon: Zap,
                                price: "High Savings",
                                color: "blue-500",
                                features: [
                                    { label: "Grid Connection", status: true },
                                    { label: "Battery Required", status: false },
                                    { label: "Net Metering", status: true },
                                    { label: "Blackout Backup", status: false },
                                    { label: "Efficiency", value: "98%" }
                                ],
                                bestFor: "Residential homes in cities with reliable grid supply wanting to zero their bills."
                            },
                            {
                                title: "Off-Grid",
                                subtitle: "Fully Autonomous",
                                icon: Sun,
                                price: "Zero Bills",
                                color: "brand-yellow",
                                features: [
                                    { label: "Grid Connection", status: false },
                                    { label: "Battery Required", status: true },
                                    { label: "Net Metering", status: false },
                                    { label: "Blackout Backup", status: true },
                                    { label: "Sustainability", value: "100%" }
                                ],
                                bestFor: "Farmhouses, remote hills, and rural areas without stable grid infrastructure."
                            },
                            {
                                title: "Hybrid",
                                subtitle: "Modern Flexibility",
                                icon: Battery,
                                price: "Max Security",
                                color: "brand-green-light",
                                features: [
                                    { label: "Grid Connection", status: true },
                                    { label: "Battery Required", status: true },
                                    { label: "Net Metering", status: true },
                                    { label: "Blackout Backup", status: true },
                                    { label: "ROI Speed", value: "High" }
                                ],
                                bestFor: "Urban/Semi-urban luxury homes requiring 24/7 power and grid savings."
                            }
                        ].map((sys, i) => (
                            <motion.div
                                key={sys.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="glass-card p-10 border-white/5 flex flex-col h-full relative group"
                            >
                                <div className="flex justify-between items-start mb-10">
                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-black text-white">{sys.title}</h3>
                                        <p className="text-brand-yellow/60 text-[10px] uppercase tracking-[0.3em] font-black">{sys.subtitle}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-green-dark transition-all duration-500">
                                        <sys.icon size={24} />
                                    </div>
                                </div>

                                <div className="space-y-6 mb-12 flex-grow">
                                    {sys.features.map((feat, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-xs tracking-wide">
                                            <span className="text-white/30 font-bold uppercase">{feat.label}</span>
                                            {feat.value ? (
                                                <span className="text-white font-black">{feat.value}</span>
                                            ) : feat.status ? (
                                                <div className="flex items-center gap-2 text-brand-green-light font-black">
                                                    <ShieldCheck size={14} /> YES
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-white/20 font-black">
                                                    <CloseIcon size={14} /> NO
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 mt-auto group-hover:border-brand-yellow/20 transition-colors duration-500">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-brand-yellow mb-3">Target Profile</p>
                                    <p className="text-white/50 text-xs leading-relaxed font-medium">{sys.bestFor}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </section>

            {/* Services Detailed Section */}
            <section id="services" className="py-16 md:py-32 bg-brand-green-dark relative overflow-hidden">
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
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight text-white uppercase mb-8 tracking-tight whitespace-nowrap">
                                    Decarbonizing <span className="text-brand-yellow">India.</span>
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
                                    src="https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=1974&auto=format&fit=crop"
                                    alt="Indian Solar Team at work"
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
                            { name: "N Vani", role: "Managing Director", image: "/team/vani.jpg" },
                            { name: "Madhusudhan", role: "Marketing Manager", image: "/team/madhusudhan.jpg" },
                            { name: "Anil Kumar", role: "Technical Team Head", image: "/team/anil.jpg" },
                            { name: "Prahveenh", role: "Marketing Team Head", image: "/team/prahveenh.jpg" },
                            { name: "Kavitha", role: "Work Force Manager", image: "/team/kavitha.jpg" },
                            { name: "Shiva", role: "Business Development Manager", image: "/team/shiva.jpg" },
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
                                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop"
                                    alt="Solar Panel Installation"
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

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[
                            { title: "The Green Mansion", location: "Gurugram, HR", category: "Residential", image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=1974&auto=format&fit=crop", capacity: "15kW" },
                            { title: "Tech Plaza Industrial", location: "Pune, MH", category: "Commercial", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop", capacity: "250kW" },
                            { title: "Skyline Apartments", location: "Bengaluru, KA", category: "Housing Society", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop", capacity: "50kW" },
                            { title: "Eco Warehouse", location: "Ahmedabad, GJ", category: "Industrial", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop", capacity: "1.2MW" },
                            { title: "Royal Residency", location: "Jaipur, RJ", category: "Residential", image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2058&auto=format&fit=crop", capacity: "8kW" },
                            { title: "Global Logistics Hub", location: "Chennai, TN", category: "Industrial", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop", capacity: "800kW" }
                        ].map((project, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{
                                    y: -10,
                                    rotateX: -5,
                                    rotateY: 5,
                                    perspective: 1000
                                }}
                                className="group relative"
                            >
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                                    <motion.img
                                        whileHover={{ scale: 1.2 }}
                                        transition={{ duration: 1 }}
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-brand-yellow text-[10px] font-black uppercase tracking-widest mb-2 block bg-brand-yellow/10 px-2 py-0.5 rounded-full w-fit">{project.category}</span>
                                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-yellow transition-colors">{project.title}</h3>
                                                <div className="flex items-center text-white/50 text-xs">
                                                    <MapPin size={12} className="mr-1 text-brand-yellow" />
                                                    {project.location}
                                                </div>
                                            </div>
                                            <div className="bg-brand-yellow/10 backdrop-blur-md text-brand-yellow border border-brand-yellow/20 px-3 py-1 rounded-lg text-sm font-black group-hover:bg-brand-yellow group-hover:text-brand-green-dark transition-all duration-300">
                                                {project.capacity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Impact Tracker */}
            <section className="py-16 md:py-32 bg-brand-green-dark overflow-hidden relative">
                <div className="container-custom relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-20">Our Collective <span className="text-brand-yellow">Impact.</span></h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-12"
                    >
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
                    </motion.div>
                </div>
                {/* Animated Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent -translate-y-1/2" />
            </section>

            {/* FAQ */}
            <section className="py-16 md:py-32 bg-brand-green-dark relative overflow-hidden">
                <div className="container-custom max-w-4xl mx-auto relative z-10">
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
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card hover:border-brand-yellow/30 shadow-none border-white/5"
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

                {/* Glassmorphism Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 blur-[100px] rounded-full -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/5 blur-[100px] rounded-full -ml-48 -mb-48" />
            </section >
            {/* Solar Panel Cleaning Procedure */}
            <section className="py-16 md:py-32 bg-brand-green-dark border-t border-white/5">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Maintenance Guide</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 italic font-serif">Solar Panel <span className="text-brand-yellow">Cleaning Procedure.</span></h2>
                        <p className="text-white/60">Follow these standard protocols to maintain peak efficiency and extend the lifespan of your solar investment.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { step: "01", icon: Clock, title: "Optimal Timing", desc: "Clean panels early in the morning or late in the evening when they are cool to avoid thermal shock and rapid drying." },
                            { step: "02", icon: Zap, title: "Power Down", desc: "For maximum safety, turn off the system via the AC/DC isolator before starting the cleaning process." },
                            { step: "03", icon: Droplet, title: "Soft Water Rinsing", desc: "Use a gentle stream of soft water to wash away loose dust, bird droppings, and surface debris." },
                            { step: "04", icon: Users, title: "Gentle Brushing", desc: "Use a soft-bristled brush or microfiber squeegee with a dedicated solar cleaning solution for stubborn grime." },
                            { step: "05", icon: ShieldCheck, title: "Visual Inspection", desc: "Check for any cracks, glass damage, or loose wiring while cleaning to ensure ongoing system health." },
                            { step: "06", icon: CloudSun, title: "Natural Drying", desc: "Let the panels air dry or use a rubber squeegee to prevent water spots and mineral buildup." }
                        ].map((procedure, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="glass-card p-10 group hover:border-brand-yellow/30 transition-all"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-green-dark transition-all duration-500">
                                        <procedure.icon size={24} />
                                    </div>
                                    <span className="text-3xl font-serif font-black text-white/10 group-hover:text-brand-yellow/20 transition-all">{procedure.step}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-4">{procedure.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{procedure.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 p-8 glass-card border-brand-yellow/20 bg-brand-yellow/5 flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <h4 className="text-xl font-bold mb-2">Want professional maintenance?</h4>
                            <p className="text-white/60 text-sm">Our expert team provides deep cleaning and comprehensive health checks.</p>
                        </div>
                        <a href="https://wa.me/919182132523" target="_blank" rel="noopener noreferrer" className="btn-primary py-4 px-8">
                            Book Service
                        </a>
                    </div>
                </div>
            </section >

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
                                    { icon: Mail, label: "Email Support", val: "consult@solarhouses.in" },
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
