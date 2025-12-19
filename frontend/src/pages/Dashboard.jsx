import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { Server, Plus, Trash2, Cpu, HardDrive } from 'lucide-react';
import clsx from 'clsx';

const Dashboard = () => {
    const navigate = useNavigate();
    const [servers, setServers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchServers();
    }, []);

    const fetchServers = async () => {
        try {
            const res = await axios.get('/servers');
            setServers(res.data.data || []);
        } catch (err) {
            console.error(err);
            setError('Failed to load servers. ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Stop event from bubbling to card click
        e.preventDefault();

        if (!window.confirm('Are you sure you want to delete this server?')) return;

        try {
            await axios.delete(`/servers/${id}`);
            setServers(servers.filter(server => server._id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete server');
        }
    };

    const handleCardClick = (id) => {
        navigate(`/server/${id}`);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64 text-textMuted">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-2"></div>
            Loading servers...
        </div>
    );

    if (error) return (
        <div className="text-center mt-20 p-6 bg-surface border border-danger/20 rounded-xl">
            <p className="text-danger mb-4">{error}</p>
            <button onClick={fetchServers} className="btn btn-primary">Try Again</button>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Servers</h1>
                <Link to="/create-server" className="btn btn-primary flex items-center gap-2">
                    <Plus size={18} />
                    Create Server
                </Link>
            </div>

            {servers.length === 0 ? (
                <div className="text-center p-12 bg-surface rounded-xl border border-border border-dashed flex flex-col items-center">
                    <div className="w-16 h-16 bg-surfaceHighlight rounded-full flex items-center justify-center mb-4 text-textMuted">
                        <Server size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-text mb-2">No Servers Found</h3>
                    <p className="text-textMuted mb-6 max-w-sm">
                        You haven't created any servers yet. Get started by provisioning your first game server.
                    </p>
                    <Link to="/create-server" className="btn btn-primary">
                        Create Your First Server
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {servers.map((server, index) => (
                        <div
                            key={server._id}
                            onClick={() => handleCardClick(server._id)}
                            className="card hover:border-primary transition-all duration-300 group block hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 animate-fade-in-up opacity-0 relative cursor-pointer"
                            style={{ animationDelay: `${index * 100}ms` }}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={clsx(
                                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                                        server.status === 'running' ? "bg-success/20 text-success" : "bg-surfaceHighlight text-textMuted"
                                    )}>
                                        <Server size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                            {server.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className={clsx(
                                                "w-2 h-2 rounded-full",
                                                server.status === 'running' ? "bg-success" : "bg-danger"
                                            )}></div>
                                            <span className="text-xs text-textMuted font-medium uppercase tracking-wider">
                                                {server.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => handleDelete(e, server._id)}
                                    className="p-2 text-textMuted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 z-10 relative"
                                    title="Delete Server"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                                <div className="flex items-center gap-3">
                                    <Cpu size={16} className="text-textMuted" />
                                    <div>
                                        <p className="text-xs text-textMuted uppercase mb-0.5">CPU Limit</p>
                                        <p className="font-medium text-sm">{server.limits.cpu}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <HardDrive size={16} className="text-textMuted" />
                                    <div>
                                        <p className="text-xs text-textMuted uppercase mb-0.5">Memory</p>
                                        <p className="font-medium text-sm">{server.limits.memory} MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
