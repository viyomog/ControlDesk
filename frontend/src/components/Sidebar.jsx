import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Server, Settings, PlusCircle, CreditCard, ChevronLeft, ChevronRight, LogOut, Disc } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar, collapsed, setCollapsed }) => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Servers', path: '/servers', icon: Server },
        { name: 'Create Server', path: '/create-server', icon: PlusCircle },
        { name: 'Billing', path: '/billing', icon: CreditCard },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <aside
            className={clsx(
                "fixed inset-y-0 left-0 z-50 bg-background border-r border-border transition-all duration-300 ease-in-out flex flex-col",
                // Mobile behavior: slide in/out
                // Desktop behavior: width change
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                collapsed ? "lg:w-20" : "lg:w-64",
                "w-64" // Default mobile width
            )}
        >
            {/* Header */}
            <div className={clsx("flex items-center h-16 border-b border-border transition-all duration-300", collapsed ? "justify-center px-0" : "justify-between px-6")}>
                <div className="flex items-center gap-3">
                    <img src="/assets/logo.png" alt="Logo" className="w-8 h-8" />
                    {!collapsed && (
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent truncate animate-fade-in">
                            ControlDesk
                        </span>
                    )}
                </div>

                {/* Collapse Button (Desktop Only) */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden lg:flex p-1.5 rounded-lg bg-surface hover:bg-surfaceHighlight text-textMuted hover:text-white transition-colors absolute -right-3 top-6 border border-border shadow-md z-50"
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            title={collapsed ? item.name : ''}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-textMuted hover:bg-surfaceHighlight hover:text-white",
                                collapsed && "justify-center"
                            )}
                        >
                            <item.icon size={22} className={clsx("transition-transform duration-200", isActive && "scale-110")} />

                            {!collapsed && (
                                <span className="truncate animate-fade-in">{item.name}</span>
                            )}

                            {/* Active Indicator Line */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                            )}

                            {/* Tooltip for collapsed mode */}
                            {collapsed && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-surface border border-border rounded text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                                    {item.name}
                                </div>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer / User / Logout */}
            <div className="p-4 border-t border-border">
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}
                    className={clsx(
                        "w-full flex items-center rounded-lg text-sm font-medium text-textMuted hover:text-danger hover:bg-danger/10 transition-colors",
                        collapsed ? "justify-center p-2" : "gap-3 px-4 py-3"
                    )}
                    title="Logout"
                >
                    <LogOut size={20} />
                    {!collapsed && <span className="animate-fade-in">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
