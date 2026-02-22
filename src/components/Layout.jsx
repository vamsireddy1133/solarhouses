import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/', id: 'home' },
        { name: 'About', path: '/about', id: 'about' },
        { name: 'Services', path: '/services', id: 'services' },
        { name: 'Projects', path: '/portfolio', id: 'portfolio' },
        { name: 'Contact', path: '/contact', id: 'contact' },
    ];

    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-green-dark/90 backdrop-blur-lg py-4 shadow-xl' : 'bg-transparent py-6'}`}>
            <div className="container-custom flex justify-between items-center">
                <Link to="/" className="flex items-center group">
                    <div className="bg-white/95 p-1 md:p-1.5 rounded-lg md:rounded-xl shadow-2xl group-hover:bg-white transition-all duration-300">
                        <img src="/logo.png" alt="Solar House Logo" className="h-8 md:h-12 w-auto" />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-brand-yellow ${location.pathname === link.path ? 'text-brand-yellow underline underline-offset-8' : 'text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" className="btn-primary py-2 px-6 text-sm">
                        Get a Quote
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white focus:outline-none">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-brand-green-dark border-t border-white/10"
                    >
                        <div className="container-custom py-6 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={`/#${link.id}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-bold transition-colors ${location.pathname === '/' && location.hash === `#${link.id}` ? 'text-brand-yellow' : 'text-white'}`}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a href="/#contact" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center">
                                Get a Quote
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-white/5">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center mb-6 group inline-block">
                            <div className="bg-white p-2 rounded-xl inline-block group-hover:shadow-lg group-hover:shadow-brand-yellow/20 transition-all">
                                <img src="/logo.png" alt="Solar House Logo" className="h-10 w-auto" />
                            </div>
                        </Link>
                        <p className="text-white/60 leading-relaxed mb-6">
                            Leading the green revolution in India with premium solar installations for residential and corporate sectors.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-green-dark transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-brand-yellow">Quick Links</h4>
                        <ul className="space-y-4 text-white/60">
                            <li><Link to="/" className="hover:text-brand-yellow transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-brand-yellow transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="hover:text-brand-yellow transition-colors">Services</Link></li>
                            <li><Link to="/portfolio" className="hover:text-brand-yellow transition-colors">Projects</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-brand-yellow">Services</h4>
                        <ul className="space-y-4 text-white/60">
                            <li><Link to="/services" className="hover:text-brand-yellow transition-colors">Residential Solar</Link></li>
                            <li><Link to="/services" className="hover:text-brand-yellow transition-colors">Commercial Setup</Link></li>
                            <li><Link to="/services" className="hover:text-brand-yellow transition-colors">Maintenance</Link></li>
                            <li><Link to="/services" className="hover:text-brand-yellow transition-colors">Consultation</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-brand-yellow">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-white/60">
                                <MapPin className="text-brand-yellow shrink-0" size={20} />
                                <span>Plot No -56, Road No- 5, Cherlapally, Hyderabad, 500051</span>
                            </li>
                            <li className="flex items-center space-x-3 text-white/60">
                                <Phone className="text-brand-yellow shrink-0" size={20} />
                                <span>+91 91821 32523</span>
                            </li>
                            <li className="flex items-center space-x-3 text-white/60">
                                <Mail className="text-brand-yellow shrink-0" size={20} />
                                <span>info@solarhouse.in</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
                    <p>© 2026 Solar House. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-brand-yellow">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-yellow">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
