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
                    <div className="bg-white/95 p-1 md:p-1 rounded-lg md:rounded-xl shadow-2xl group-hover:bg-white transition-all duration-300">
                        <img src="/logo.png" alt="Solar House Logo" className="h-12 md:h-16 w-auto" />
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
                    <Link to="/login" className="btn-primary py-2 px-6 text-sm">
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
                            <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center">
                                Get a Quote
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="bg-brand-green-dark text-white pt-20 pb-10 border-t border-white/5">
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
                                <span>info@solarhouses.in</span>
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

const WhatsAppWidget = () => {
    return (
        <motion.a
            href="https://wa.me/919182132523"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                boxShadow: [
                    "0 0 0 0px rgba(37, 211, 102, 0.7)",
                    "0 0 0 20px rgba(37, 211, 102, 0)",
                ]
            }}
            transition={{
                boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                },
                scale: { duration: 0.5 },
                opacity: { duration: 0.5 }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-transform flex items-center justify-center group"
            title="Chat on WhatsApp"
        >
            <div className="absolute -left-20 bg-white text-brand-green-dark px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl mr-4 whitespace-nowrap">
                Chat with us
            </div>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.431 5.63 1.432h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        </motion.a>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <WhatsAppWidget />
            <Footer />
        </div>
    );
};

export default Layout;
