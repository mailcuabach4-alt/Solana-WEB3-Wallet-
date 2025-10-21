
import React, { useState } from 'react';

interface WalletInfoProps {
    publicKey: string;
    balance: number | null;
    onRefresh: () => void;
    loading: boolean;
}

const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4a12 12 0 0116 16" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 4a12 12 0 00-16 16" />
    </svg>
);


export const WalletInfo: React.FC<WalletInfoProps> = ({ publicKey, balance, onRefresh, loading }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(publicKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-700/50 p-4 rounded-lg space-y-3">
            <div>
                <span className="text-sm text-gray-400">Địa chỉ</span>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-medium text-purple-300 truncate bg-gray-900/50 px-3 py-1 rounded-md flex-1">
                        {publicKey}
                    </p>
                    <button onClick={handleCopy} className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition" title="Copy Address">
                        {copied ? <CheckIcon className="text-green-400"/> : <CopyIcon />}
                    </button>
                </div>
            </div>
            <div>
                <span className="text-sm text-gray-400">Số dư</span>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-2xl font-bold text-gray-100">
                        {balance === null ? '...' : `${balance.toFixed(4)} SOL`}
                    </p>
                    <button onClick={onRefresh} disabled={loading} className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition disabled:opacity-50" title="Refresh Balance">
                       <RefreshIcon className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>
        </div>
    );
};
