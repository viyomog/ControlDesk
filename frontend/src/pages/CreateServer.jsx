import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Server, Cpu, HardDrive, ArrowLeft, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateServer = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState('');

    // Default limits until fetched
    const [limits, setLimits] = useState({
        memory: { min: 128, max: 10240, default: 1024 },
        cpu: { min: 10, max: 400, default: 100 },
        disk: { min: 512, max: 51200, default: 10240 }
    });

    const [formData, setFormData] = useState({
        name: '',
        memory: 1024,
        cpu: 100,
        disk: 10240
    });

    // Fetch limits on mount
    useState(() => {
        const fetchLimits = async () => {
            try {
                const res = await axios.get('/config/resource-limits');
                const config = res.data;
                setLimits({
                    memory: config.memory,
                    cpu: config.cpu,
                    disk: config.disk
                });

                // Set defaults from config only if form is pristine (simple check here)
                setFormData(prev => ({
                    ...prev,
                    memory: config.memory.default,
                    cpu: config.cpu.default,
                    disk: config.disk.default
                }));
            } catch (err) {
                console.error("Failed to fetch resource limits:", err);
            } finally {
                setPageLoading(false);
            }
        };

        fetchLimits();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.name) {
            setError('Server name is required');
            setLoading(false);
            return;
        }

        // Frontend Validation
        if (formData.memory < limits.memory.min || formData.memory > limits.memory.max) {
            setError(`Memory must be between ${limits.memory.min}MB and ${limits.memory.max}MB`);
            setLoading(false);
            return;
        }
        if (formData.cpu < limits.cpu.min || formData.cpu > limits.cpu.max) {
            setError(`CPU must be between ${limits.cpu.min}% and ${limits.cpu.max}%`);
            setLoading(false);
            return;
        }
        if (formData.disk < limits.disk.min || formData.disk > limits.disk.max) {
            setError(`Disk must be between ${limits.disk.min}MB and ${limits.disk.max}MB`);
            setLoading(false);
            return;
        }

        try {
            await axios.post('/servers', formData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to create server');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-surfaceback">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Link
                to="/dashboard"
                className="text-textMuted hover:text-text mb-8 inline-flex items-center gap-2 transition-colors group"
            >
                <div className="p-1.5 rounded-full bg-surface group-hover:bg-surfaceHighlight transition-colors">
                    <ArrowLeft size={16} />
                </div>
                <span className="font-medium">Back to Dashboard</span>
            </Link>

            <div className="relative">
                {/* Decorative glow behind the card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-2xl blur-xl opacity-50 pointer-events-none"></div>

                <div className="relative bg-surface/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/5">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 p-[1px] shadow-lg shadow-primary/20">
                                <div className="w-full h-full rounded-2xl bg-surfaceback flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                    <Server className="text-white" size={32} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                                    Create New Server
                                </h1>
                                <p className="text-textMuted mt-1 text-base">
                                    Configure your high-performance game server
                                </p>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                            <Activity size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Server Name Section */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-text uppercase tracking-wider flex items-center gap-2">
                                <Server size={14} className="text-primary" />
                                Server Identity
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg placeholder:text-textMuted/50 group-hover:border-white/20"
                                    placeholder="e.g. Survival World 2024"
                                    autoFocus
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-white/5 text-xs text-textMuted border border-white/5">
                                    Required
                                </div>
                            </div>
                            <p className="text-xs text-textMuted ml-1">
                                A unique name to identify your server in the dashboard.
                            </p>
                        </div>

                        {/* Resources Grid */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-text uppercase tracking-wider flex items-center gap-2 mb-4">
                                <Zap size={14} className="text-yellow-500" />
                                Resource Allocation
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Memory Card */}
                                <div className="bg-black/20 border border-white/5 rounded-xl p-5 hover:border-primary/30 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <HardDrive size={64} />
                                    </div>
                                    <label className="block text-sm font-medium text-textMuted mb-2 flex items-center gap-2">
                                        <HardDrive size={16} className="text-blue-400" /> Memory (MB)
                                    </label>
                                    <input
                                        type="number"
                                        name="memory"
                                        value={formData.memory}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-primary text-2xl font-bold font-mono text-white placeholder:text-textMuted/30"
                                        min={limits.memory.min}
                                        max={limits.memory.max}
                                    />
                                    <div className="mt-2 text-xs text-textMuted">
                                        Max Allowed: {limits.memory.max} MB
                                    </div>
                                </div>

                                {/* CPU Card */}
                                <div className="bg-black/20 border border-white/5 rounded-xl p-5 hover:border-primary/30 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Cpu size={64} />
                                    </div>
                                    <label className="block text-sm font-medium text-textMuted mb-2 flex items-center gap-2">
                                        <Cpu size={16} className="text-green-400" /> CPU Limit (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="cpu"
                                        value={formData.cpu}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-primary text-2xl font-bold font-mono text-white placeholder:text-textMuted/30"
                                        min={limits.cpu.min}
                                        max={limits.cpu.max}
                                    />
                                    <div className="mt-2 text-xs text-textMuted">
                                        Max Allowed: {limits.cpu.max} %
                                    </div>
                                </div>

                                {/* Disk Card */}
                                <div className="bg-black/20 border border-white/5 rounded-xl p-5 hover:border-primary/30 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <HardDrive size={64} />
                                    </div>
                                    <label className="block text-sm font-medium text-textMuted mb-2 flex items-center gap-2">
                                        <HardDrive size={16} className="text-orange-400" /> Disk Space (MB)
                                    </label>
                                    <input
                                        type="number"
                                        name="disk"
                                        value={formData.disk}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-primary text-2xl font-bold font-mono text-white placeholder:text-textMuted/30"
                                        min={limits.disk.min}
                                        max={limits.disk.max}
                                    />
                                    <div className="mt-2 text-xs text-textMuted">
                                        Max Allowed: {limits.disk.max} MB
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-8 flex items-center justify-end gap-4 border-t border-white/5">
                            <Link
                                to="/dashboard"
                                className="px-6 py-3 rounded-xl text-sm font-medium text-textMuted hover:text-white hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                                disabled={loading}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative flex items-center gap-2">
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Provisioning...
                                        </>
                                    ) : (
                                        <>Run Server <Activity size={18} /></>
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default CreateServer;
