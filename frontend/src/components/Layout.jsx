import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-background overflow-hidden text-text selection:bg-primary/30">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div
                className={clsx(
                    "flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300",
                    collapsed ? "lg:ml-20" : "lg:ml-64"
                )}
            >
                <Navbar toggleSidebar={toggleSidebar} collapsed={collapsed} />

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 mt-16 scroll-smooth">
                    <div className="max-w-7xl mx-auto animate-fade-in-up">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
