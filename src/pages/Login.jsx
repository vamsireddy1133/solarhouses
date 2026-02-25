import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (credentials.email === 'admin@solarhouses.in' && credentials.password === 'House@Solar') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/quotation');
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="pt-40 pb-20 min-h-screen flex items-center justify-center">
            <div className="container-custom max-w-lg w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="glass-card p-10 md:p-12 border-brand-yellow/20 relative overflow-hidden"
                >
                    <div className="text-center mb-10">
                        <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Client Access</span>
                        <h2 className="text-4xl font-black text-white">Login to <br /><span className="text-brand-yellow">Quotation</span></h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-500 text-sm"
                            >
                                <AlertCircle size={18} />
                                <p>{error}</p>
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-white/70">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={credentials.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-white/70">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={credentials.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button className="btn-primary w-full py-5 text-lg group flex items-center justify-center space-x-2">
                            <span>Access Quotation</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-white/40 text-sm italic">Contact support if you've lost your access codes.</p>
                        </div>
                    </form>

                    {/* Decorative accent */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-yellow/5 rounded-full blur-3xl" />
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-green-light/5 rounded-full blur-3xl" />
                </motion.div>
            </div>
        </div>
    );
};

export default Login;

