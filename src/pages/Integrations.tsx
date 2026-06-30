import { useState } from 'react';
import { Plug, RefreshCw, ExternalLink, ChevronRight, Unplug } from 'lucide-react';
import Modal from '../components/Modal';
import { integrations as initialIntegrations } from '../data/dummyData';

const apiEndpoints = [
  { name: 'Workout API', endpoint: '/api/v1/workouts', method: 'GET', status: 'active' },
  { name: 'Nutrition API', endpoint: '/api/v1/nutrition', method: 'POST', status: 'active' },
  { name: 'User Profile', endpoint: '/api/v1/users/:id', method: 'GET', status: 'active' },
  { name: 'AI Recommendations', endpoint: '/api/v1/ai/recommend', method: 'POST', status: 'active' },
  { name: 'Webhooks', endpoint: '/api/v1/webhooks', method: 'POST', status: 'beta' },
];

interface IntegrationsProps {
  onToast: (type: 'success' | 'info' | 'ai', title: string, msg: string) => void;
}

export default function Integrations({ onToast }: IntegrationsProps) {
  const [integs, setIntegs] = useState(initialIntegrations.map(i => ({ ...i })));
  const [syncing, setSyncing] = useState<string | null>(null);
  const [showApiModal, setShowApiModal] = useState<string | null>(null);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const toggleConnection = (id: string) => {
    setIntegs(prev => prev.map(i => {
      if (i.id === id) {
        const wasConnected = i.connected;
        onToast('success', wasConnected ? 'Disconnected' : 'Connected! ✓', `${i.name} ${wasConnected ? 'removed' : 'linked'}`);
        return { ...i, connected: !i.connected, lastSync: !wasConnected ? 'Just now' : null };
      }
      return i;
    }));
  };

  const syncIntegration = (id: string) => {
    setSyncing(id);
    onToast('info', 'Syncing...', 'Fetching latest data');
    setTimeout(() => {
      setSyncing(null);
      setIntegs(prev => prev.map(i => i.id === id ? { ...i, lastSync: 'Just now' } : i));
      onToast('success', 'Sync Complete ✓', 'All data up to date');
    }, 2000);
  };

  const selectedApi = apiEndpoints.find(a => a.name === showApiModal);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Integrations & APIs</h1>
        <p className="text-gray-500 mt-1">Connect your favorite apps and services</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {integs.map((integration) => (
          <div key={integration.id}
            className={`bg-white rounded-2xl border p-5 card-hover cursor-pointer group ${integration.connected ? 'border-emerald-200 bg-emerald-50/20' : 'border-gray-100'}`}
            onClick={() => toggleConnection(integration.id)}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{integration.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{integration.name}</h3>
                  {integration.connected ? (
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Connected</span>
                  ) : (
                    <span className="text-[11px] text-gray-400">Not connected</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {integration.dataTypes.map((type) => (
                <span key={type} className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md clickable-sm hover:bg-primary-100 hover:text-primary-700 transition-all"
                  onClick={(e) => { e.stopPropagation(); onToast('info', type, `${integration.name} syncs ${type} data`); }}>{type}</span>
              ))}
            </div>
            {integration.connected ? (
              <div className="flex items-center justify-between" onClick={e => e.stopPropagation()}>
                <span className="text-xs text-gray-400">Sync: {integration.lastSync}</span>
                <div className="flex gap-1">
                  <button onClick={() => syncIntegration(integration.id)} className={`p-1.5 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all clickable-sm ${syncing === integration.id ? 'animate-spin-slow' : ''}`}><RefreshCw size={14} /></button>
                  <button onClick={() => toggleConnection(integration.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all clickable-sm"><Unplug size={14} /></button>
                </div>
              </div>
            ) : (
              <button onClick={(e) => { e.stopPropagation(); toggleConnection(integration.id); }}
                className="w-full py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium btn-bounce ripple-container flex items-center justify-center gap-2">
                <Plug size={14} /> Connect
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 animate-fade-in-up delay-200">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <div><h2 className="text-lg font-bold text-gray-900">REST API Endpoints</h2><p className="text-sm text-gray-400">Developer API</p></div>
          <button onClick={() => onToast('info', 'API Docs', 'Full documentation opening...')} className="flex items-center gap-1 text-sm text-primary-600 font-medium hover:text-primary-700 clickable-sm"><span>Full Docs</span> <ExternalLink size={14} /></button>
        </div>
        <div className="divide-y divide-gray-50">
          {apiEndpoints.map((api) => (
            <div key={api.endpoint} onClick={() => setShowApiModal(api.name)} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all cursor-pointer clickable-sm">
              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-bold px-2 py-1 rounded-md clickable-sm ${api.method === 'GET' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{api.method}</span>
                <div><p className="text-sm font-medium text-gray-900 hover:text-primary-700 transition-colors">{api.name}</p><code className="text-xs text-gray-400 font-mono">{api.endpoint}</code></div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${api.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{api.status}</span>
                <ChevronRight size={14} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 animate-fade-in-up delay-300">
        <h3 className="text-sm font-bold text-gray-900 mb-3 cursor-pointer clickable-sm hover:text-primary-700 transition-colors" onClick={() => onToast('info', 'API Key', 'Your API key is secure')}>API Key</h3>
        <div className="flex items-center gap-3">
          <code className="flex-1 bg-white px-4 py-3 rounded-xl text-sm font-mono text-gray-500 border border-gray-200 cursor-pointer clickable-sm hover:border-primary-300 transition-all"
            onClick={() => { navigator.clipboard.writeText('sk_live_FitAI_demo_key_12345'); setApiKeyCopied(true); onToast('success', 'Copied!', 'API key copied'); setTimeout(() => setApiKeyCopied(false), 2000); }}>
            {apiKeyCopied ? '✓ Copied to clipboard!' : 'sk_live_••••••••••••••••••••••••FitAI'}
          </code>
          <button onClick={() => onToast('info', 'Regenerating...', 'New API key generated')}
            className="px-4 py-3 bg-primary-600 text-white rounded-xl text-sm font-medium btn-bounce ripple-container">Regenerate</button>
        </div>
      </div>

      <Modal isOpen={!!showApiModal} onClose={() => setShowApiModal(null)} title={selectedApi?.name || ''} size="sm">
        {selectedApi && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${selectedApi.method === 'GET' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{selectedApi.method}</span>
              <code className="text-sm font-mono text-gray-700">{selectedApi.endpoint}</code>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-sm font-mono text-green-400 overflow-x-auto">
              <p className="text-gray-500"># Example request</p>
              <p>curl -X {selectedApi.method} \</p>
              <p className="pl-4">https://api.fitai.pro{selectedApi.endpoint} \</p>
              <p className="pl-4">-H "Authorization: Bearer sk_live_..."</p>
            </div>
            <button onClick={() => { setShowApiModal(null); navigator.clipboard.writeText(`curl -X ${selectedApi.method} https://api.fitai.pro${selectedApi.endpoint}`); onToast('success', 'Copied!', 'cURL command copied'); }}
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm btn-bounce ripple-container">Copy cURL Command</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
