import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: 'Residential',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="pt-32 pb-20">
            <section className="container-custom relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Contact Info */}
                    <div>
                        <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Connect With Us</span>
                        <h2 className="text-5xl md:text-6xl font-black mb-10 leading-tight">Ready to Switch <br />to <span className="text-brand-yellow">Unlimited</span> Power?</h2>

                        <p className="text-white/60 text-lg mb-12">
                            Our energy consultants are standing by to help you design the perfect solar architecture. Reach out for a free site audit.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: Phone, label: "Call Us", val: "+91 91821 32523" },
                                { icon: Mail, label: "Email Support", val: "consult@solarhouse.in" },
                                { icon: MapPin, label: "Office Address", val: "Plot No -56, Rd No 5, Cherlapally, Hyderabad" },
                                { icon: Clock, label: "Business Hours", val: "Mon - Sat: 9:00 AM - 7:00 PM" }
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

                    {/* Contact Form */}
                    <div className="relative">
                        <div className="glass-card p-10 md:p-14 border-brand-yellow/20 relative z-10 overflow-hidden">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20"
                                >
                                    <CheckCircle2 size={80} className="text-brand-yellow mx-auto mb-6" />
                                    <h3 className="text-3xl font-black mb-4">Message Received!</h3>
                                    <p className="text-white/60">One of our engineers will contact you within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-white/70 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-white/70 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-white/70 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors"
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-white/70 mb-2">Interest</label>
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors appearance-none"
                                            >
                                                <option value="Residential" className="bg-brand-green-dark">Residential Solar</option>
                                                <option value="Commercial" className="bg-brand-green-dark">Commercial Setup</option>
                                                <option value="Industrial" className="bg-brand-green-dark">Industrial Grade</option>
                                                <option value="Maintenance" className="bg-brand-green-dark">Maintenance</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-white/70 mb-2">Project Details</label>
                                        <textarea
                                            rows="4"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors"
                                            placeholder="Tell us about your rooftop or land area..."
                                        ></textarea>
                                    </div>

                                    <button className="btn-primary w-full py-5 text-lg group">
                                        Send Inquiry <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                                    </button>
                                </form>
                            )}

                            {/* Decorative accent */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-yellow/5 rounded-full blur-2xl" />
                        </div>

                        {/* Background elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-green-light/10 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="container-custom mt-32 h-[450px] rounded-3xl overflow-hidden opacity-80 border border-white/10">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112173.07222530113!2d77.01423854999999!3d28.5274152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5e3482d799b92!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </section>
        </div>
    );
};

export default Contact;
