
import React from 'react';
import { Cluster } from '@solana/web3.js';

interface NetworkSwitcherProps {
    network: Cluster | 'custom';
    setNetwork: (network: Cluster | 'custom') => void;
    customRpcUrl: string;
    setCustomRpcUrl: (url: string) => void;
    disabled: boolean;
}

const networks: { value: Cluster | 'custom'; label: string }[] = [
    { value: 'devnet', label: 'Devnet' },
    { value: 'testnet', label: 'Testnet' },
    { value: 'mainnet-beta', label: 'Mainnet' },
    { value: 'custom', label: 'Local / Tùy chỉnh' },
];

export const NetworkSwitcher: React.FC<NetworkSwitcherProps> = ({ network, setNetwork, customRpcUrl, setCustomRpcUrl, disabled }) => {
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {networks.map((net) => (
                    <button
                        key={net.value}
                        onClick={() => setNetwork(net.value)}
                        disabled={disabled}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            network === net.value
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {net.label}
                    </button>
                ))}
            </div>
            {network === 'custom' && (
                <div className="animate-fade-in-fast">
                    <label htmlFor="custom-rpc" className="block text-sm font-medium text-gray-300 mb-1">
                        URL RPC tùy chỉnh
                    </label>
                    <input
                        id="custom-rpc"
                        type="text"
                        value={customRpcUrl}
                        onChange={(e) => setCustomRpcUrl(e.target.value)}
                        placeholder="http://127.0.0.1:8899"
                        className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 transition"
                        disabled={disabled}
                    />
                </div>
            )}
        </div>
    );
};
