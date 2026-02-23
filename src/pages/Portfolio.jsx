import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, MapPin } from 'lucide-react';

const Portfolio = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const projects = [
        {
            title: "The Green Mansion",
            location: "Gurugram, HR",
            category: "Residential",
            image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1968&auto=format&fit=crop",
            capacity: "15kW"
        },
        {
            title: "Tech Plaza Industrial",
            location: "Pune, MH",
            category: "Commercial",
            image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1975&auto=format&fit=crop",
            capacity: "250kW"
        },
        {
            title: "Skyline Apartments",
            location: "Bengaluru, KA",
            category: "Housing Society",
            image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2058&auto=format&fit=crop",
            capacity: "50kW"
        },
        {
            title: "Eco Warehouse",
            location: "Ahmedabad, GJ",
            category: "Industrial",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
            capacity: "1.2MW"
        },
        {
            title: "Royal Residency",
            location: "Jaipur, RJ",
            category: "Residential",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
            capacity: "8kW"
        },
        {
            title: "Global Logistics Hub",
            location: "Chennai, TN",
            category: "Industrial",
            image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop",
            capacity: "800kW"
        }
    ];

    return (
        <div className="pt-32 pb-20">
            <section className="container-custom mb-20">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-brand-yellow font-black uppercase tracking-widest text-sm inline-block mb-4">Portfolio</span>
                    <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">Installations that <br />Speak for <span className="text-brand-yellow">Efficiency.</span></h2>
                    <p className="text-white/60">Explore our diverse range of successful solar transitions across India.</p>
                </div>
            </section>

            <section className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group relative cursor-pointer"
                            onClick={() => setSelectedImage(project)}
                        >
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                {/* Overlay Info */}
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

                                {/* Hover Maximize Icon */}
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                                        <Maximize2 size={20} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-brand-green-dark/95 backdrop-blur-2xl"
                    >
                        <motion.button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={40} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-5xl w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-3xl font-black text-white mb-2">{selectedImage.title}</h3>
                                <p className="text-brand-yellow font-bold uppercase tracking-widest">{selectedImage.category} Installation • {selectedImage.capacity}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;
