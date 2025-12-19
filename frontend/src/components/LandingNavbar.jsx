import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const LandingNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Pricing', href: '#pricing' },
    ];

    return (
        <nav className={clsx(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
            scrolled ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent border-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/assets/logo.png"
                        alt="ControlDesk Logo"
                        className="w-10 h-10 group-hover:scale-105 transition-transform"
                    />
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        ControlDesk
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-textMuted hover:text-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link to="/login" className="text-sm font-medium text-white hover:text-primary transition-colors">
                        Login
                    </Link>
                    <Link
                        to="/login"
                        className="px-5 py-2.5 rounded-full bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text hover:text-primary transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div className={clsx(
                "md:hidden absolute top-full left-0 right-0 bg-surface border-b border-border transition-all duration-300 overflow-hidden",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="flex flex-col p-4 space-y-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-textMuted hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="border-t border-border pt-4 flex flex-col gap-3">
                        <Link
                            to="/login"
                            className="text-center text-textMuted hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            to="/login"
                            className="btn btn-primary w-full rounded-full"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavbar;
