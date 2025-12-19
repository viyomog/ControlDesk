import { Menu, Bell, Search, ChevronDown, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';

const Navbar = ({ toggleSidebar, collapsed }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const location = useLocation();
    const [profileOpen, setProfileOpen] = useState(false);

    // Dynamic Title Map
    const getPageTitle = (pathname) => {
        if (pathname === '/dashboard') return 'Dashboard';
        if (pathname === '/servers') return 'Servers';
        if (pathname === '/create-server') return 'Create Server';
        if (pathname === '/billing') return 'Billing';
        if (pathname === '/settings') return 'Settings';
        if (pathname.startsWith('/server/')) return 'Server Details';
        return 'ControlDesk';
    };

    return (
        <header
            className={clsx(
                "fixed top-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 lg:px-8 transition-all duration-300",
                collapsed ? "left-20" : "left-0 lg:left-64"
            )}
        >
            <div className="flex items-center gap-4">
                {/* Mobile Sidebar Toggle */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 -ml-2 text-textMuted hover:text-white lg:hidden"
                >
                    <Menu size={24} />
                </button>

                <h1 className="text-xl font-semibold hidden sm:block">
                    {getPageTitle(location.pathname)}
                </h1>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
                {/* Search */}
                <div className="hidden md:flex items-center bg-surface border border-border rounded-lg px-3 py-1.5 w-64 focus-within:ring-1 focus-within:ring-primary transition-all">
                    <Search size={16} className="text-textMuted" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-white placeholder-textMuted"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-textMuted hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-3 hover:bg-surface py-1.5 px-2 rounded-lg transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20">
                            {user.name ? user.name[0].toUpperCase() : <User size={16} />}
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium leading-none">{user.name || 'Guest'}</p>
                            <p className="text-xs text-textMuted mt-0.5">{user.email || 'admin@controldesk.io'}</p>
                        </div>
                        <ChevronDown size={16} className="text-textMuted hidden md:block" />
                    </button>

                    {/* Dropdown Menu */}
                    {profileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-2xl py-1 animate-fade-in-up origin-top-right">
                            <div className="px-4 py-2 border-b border-border mb-1 md:hidden">
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-textMuted">{user.email}</p>
                            </div>
                            <a href="#" className="block px-4 py-2 text-sm text-textMuted hover:text-white hover:bg-surfaceHighlight transition-colors">Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-textMuted hover:text-white hover:bg-surfaceHighlight transition-colors">Settings</a>
                            <div className="border-t border-border my-1"></div>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    window.location.href = '/login';
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
