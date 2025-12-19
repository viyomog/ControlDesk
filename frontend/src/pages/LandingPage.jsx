import { Link } from 'react-router-dom';
import { ArrowRight, Play, Server, Activity, ShieldCheck, Cloud, CheckCircle, Upload, Sliders } from 'lucide-react';
import LandingNavbar from '../components/LandingNavbar';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background text-text font-sans selection:bg-primary/30">
            <LandingNavbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0 animate-fade-in">
                    <img
                        src="/assets/hero-bg.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-40 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 space-y-8 text-center lg:text-left animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                v1.0 Now Available
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Unified Server Control, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">Simplified.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-textMuted max-w-2xl mx-auto lg:mx-0">
                                Manage, monitor, and control your Pterodactyl servers from one powerful, modern dashboard designed for performance and scale.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Link
                                    to="/login"
                                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary hover:bg-primaryHover text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95"
                                >
                                    Get Started <ArrowRight size={20} />
                                </Link>
                                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface border border-border hover:bg-surfaceHighlight text-white font-semibold flex items-center justify-center gap-2 transition-all hover:bg-white/5 active:scale-95">
                                    <Play size={20} fill="currentColor" /> View Demo
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative group animate-slide-in-right delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-2xl opacity-20 group-hover:opacity-30 blur-2xl transition duration-1000 animate-pulse-glow"></div>
                            <img
                                src="/assets/hero-dashboard.png"
                                alt="ControlDesk Dashboard"
                                className="relative rounded-2xl shadow-2xl border border-white/10 transform transition duration-500 group-hover:scale-[1.01]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-surface/30 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Manage Servers</h2>
                        <p className="text-textMuted text-lg">Powerful features wrapped in a beautiful interface. ControlDesk gives you full command over your infrastructure.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon={Server}
                            title="Server Management"
                            description="Start, stop, and restart your servers with a single click. Access console and logs instantly."
                            delay={0}
                        />
                        <FeatureCard
                            icon={Activity}
                            title="Real-Time Monitoring"
                            description="Track CPU, Memory, and Disk usage in real-time with beautiful, responsive charts."
                            delay={100}
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Secure API Access"
                            description="Built on top of Pterodactyl with JWT authentication and secure proxying."
                            delay={200}
                        />
                        <FeatureCard
                            icon={Cloud}
                            title="Scalable Infrastructure"
                            description="Manage one server or one hundred. ControlDesk scales with your needs."
                            delay={300}
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-textMuted">Get up and running in minutes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                        <StepCard
                            icon={CheckCircle}
                            step="01"
                            title="Sign Up & Connect"
                            description="Create an account and connect your existing Pterodactyl API credentials."
                        />
                        <StepCard
                            icon={Upload}
                            step="02"
                            title="Import Servers"
                            description="ControlDesk automatically fetches and lists all your accessible servers."
                        />
                        <StepCard
                            icon={Sliders}
                            step="03"
                            title="Manage & Scale"
                            description="Take full control. Monitor performance and manage power states instantly."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/footer-bg.png"
                        alt="CTA Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Managing Your Servers Smarter</h2>
                    <p className="text-xl text-textMuted mb-10 max-w-2xl mx-auto">
                        Join thousands of server admins who trust ControlDesk for their daily operations.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-background font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl hover:shadow-white/20"
                    >
                        Launch ControlDesk <ArrowRight size={24} />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border bg-surface/20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <img src="/assets/logo.png" alt="ControlDesk" className="w-8 h-8 opacity-80" />
                            <span className="font-semibold text-lg text-textMuted">ControlDesk</span>
                        </div>

                        <div className="flex gap-8 text-sm text-textMuted">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>

                        <div className="text-sm text-textMuted/50">
                            © 2024 ControlDesk. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <div
        className="p-8 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:text-white">
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-textMuted leading-relaxed">
            {description}
        </p>
    </div>
);

const StepCard = ({ icon: Icon, step, title, description }) => (
    <div className="relative text-center z-10">
        <div className="w-20 h-20 mx-auto rounded-full bg-surface border-4 border-background flex items-center justify-center text-primary mb-6 shadow-xl relative group hover:scale-110 transition-transform duration-300">
            <Icon size={32} />
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold border-4 border-background">
                {step}
            </div>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-textMuted max-w-xs mx-auto">
            {description}
        </p>
    </div>
);

export default LandingPage;
