import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { Power, RotateCw, Square, Terminal, Cpu, HardDrive, Zap } from 'lucide-react';
import clsx from 'clsx';

const ServerDetails = () => {
    const { id } = useParams();
    const [server, setServer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(false); // For power actions
    const [error, setError] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        fetchServerDetails();
        const interval = setInterval(fetchServerDetails, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [id, refreshTrigger]);

    const fetchServerDetails = async () => {
        try {
            const res = await axios.get(`/servers/${id}`);
            // Pterodactyl structure: res.data matches backend response
            // Backend returns { ...serverResponse.data, resources: resourcesResponse.data }
            // serverResponse.data has "object": "server", "attributes": { ... }
            // resourcesResponse.data has "object": "stats", "attributes": { current_state, resources: { memory_bytes, ... } }
            setServer(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            // Don't set error on polling failure if we already have data
            if (!server) setError('Failed to load server details.');
            setLoading(false);
        }
    };

    const handlePowerAction = async (signal) => {
        setStatusLoading(true);
        try {
            await axios.post(`/servers/${id}/power`, { signal });
            // Add a small delay then refresh
            setTimeout(() => setRefreshTrigger(p => p + 1), 1000);
        } catch (err) {
            alert('Failed to send power signal: ' + (err.response?.data?.message || err.message));
        } finally {
            setStatusLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-20 text-textMuted">Loading server details...</div>;
    if (error && !server) return <div className="text-center mt-20 text-danger">{error}</div>;
    if (!server) return null;

    const stats = server.resources?.attributes?.resources || { memory_bytes: 0, cpu_absolute: 0, disk_bytes: 0 };
    const state = server.resources?.attributes?.current_state || 'offline';

    // Format utility
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const limits = server.attributes.limits;
    const memoryPercent = limits.memory ? (stats.memory_bytes / 1024 / 1024 / limits.memory) * 100 : 0;
    const diskPercent = limits.disk ? (stats.disk_bytes / 1024 / 1024 / limits.disk) * 100 : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{server.attributes.name}</h1>
                    <p className="text-textMuted flex items-center gap-2">
                        <span className={clsx(
                            "w-2 h-2 rounded-full",
                            state === 'running' ? "bg-success" :
                                state === 'offline' ? "bg-danger" : "bg-warning"
                        )}></span>
                        {state.toUpperCase()} • {server.attributes.node} • {server.attributes.allocation.alias}:{server.attributes.allocation.port}
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => handlePowerAction('start')}
                        disabled={statusLoading || state === 'running'}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Power size={18} /> Start
                    </button>
                    <button
                        onClick={() => handlePowerAction('restart')}
                        disabled={statusLoading || state === 'offline'}
                        className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RotateCw size={18} /> Restart
                    </button>
                    <button
                        onClick={() => handlePowerAction('stop')}
                        disabled={statusLoading || state === 'offline'}
                        className="btn btn-danger disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Square size={18} /> Stop
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Cpu size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-textMuted uppercase">CPU Usage</p>
                            <h3 className="text-2xl font-bold">{stats.cpu_absolute.toFixed(1)}%</h3>
                            <p className="text-xs text-textMuted">Limit: {limits.cpu ? limits.cpu + '%' : 'Unlimited'}</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Zap size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-textMuted uppercase">Memory</p>
                            <h3 className="text-2xl font-bold">{formatBytes(stats.memory_bytes)}</h3>
                            <p className="text-xs text-textMuted">Limit: {limits.memory} MB</p>
                        </div>
                    </div>
                    <div className="w-full bg-surfaceHighlight rounded-full h-2 mt-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(memoryPercent, 100)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <HardDrive size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-textMuted uppercase">Disk</p>
                            <h3 className="text-2xl font-bold">{formatBytes(stats.disk_bytes)}</h3>
                            <p className="text-xs text-textMuted">Limit: {limits.disk} MB</p>
                        </div>
                    </div>
                    <div className="w-full bg-surfaceHighlight rounded-full h-2 mt-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(diskPercent, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Console Placeholder */}
            <div className="card h-96 flex flex-col">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-4">
                    <Terminal size={20} className="text-textMuted" />
                    <h3 className="font-semibold">Server Console</h3>
                </div>
                <div className="flex-1 bg-black/50 rounded p-4 font-mono text-xs overflow-y-auto text-textMuted">
                    <p className="text-success">{'> Container ready'}</p>
                    <p>{'> Pterodactyl Server detected'}</p>
                    <p>{'> Waiting for logs...'}</p>
                    <p className="text-warning">{'> Note: Real-time console requires WebSocket implementation which is beyond MVP scope.'}</p>
                </div>
                <div className="mt-4 flex gap-2">
                    <input type="text" placeholder="Type a command..." className="input-field" disabled />
                    <button className="btn btn-secondary" disabled>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ServerDetails;
