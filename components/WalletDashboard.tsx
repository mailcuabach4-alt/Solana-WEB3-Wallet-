
import React, { useState } from 'react';
import { Cluster } from '@solana/web3.js';
import { SendForm } from './SendForm';
import { WalletInfo } from './WalletInfo';

interface WalletDashboardProps {
    publicKey: string;
    balance: number | null;
    onSend: (toAddress: string, amount: number) => Promise<string>;
    onDisconnect: () => void;
    onRefresh: () => void;
    loading: boolean;
    network: Cluster | 'custom';
    customRpcUrl: string;
}

export const WalletDashboard: React.FC<WalletDashboardProps> = ({
    publicKey,
    balance,
    onSend,
    onDisconnect,
    onRefresh,
    loading,
    network,
    customRpcUrl,
}) => {
    const [txSignature, setTxSignature] = useState<string | null>(null);
    const [txError, setTxError] = useState<string>('');

    const handleSend = async (toAddress: string, amount: number) => {
        setTxSignature(null);
        setTxError('');
        try {
            const signature = await onSend(toAddress, amount);
            setTxSignature(signature);
        } catch (error) {
            let message = 'Đã xảy ra lỗi không xác định.';
            if (error instanceof Error) {
                message = error.message;
            }
            setTxError(`Giao dịch thất bại: ${message}`);
        }
    };

    const getExplorerUrl = (signature: string) => {
      const clusterParam = network === 'mainnet-beta' ? '' : `?cluster=${network === 'custom' ? `custom&customUrl=${encodeURIComponent(customRpcUrl)}` : network}`;
      return `https://explorer.solana.com/tx/${signature}${clusterParam}`;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <WalletInfo 
                publicKey={publicKey} 
                balance={balance} 
                onRefresh={onRefresh} 
                loading={loading}
            />

            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-purple-400 mb-4">Gửi SOL</h3>
                <SendForm onSend={handleSend} loading={loading} balance={balance ?? 0} />
            </div>

            {txSignature && (
                <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg text-sm">
                    <p><strong>Giao dịch thành công!</strong></p>
                    <a 
                        href={getExplorerUrl(txSignature)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline break-all hover:text-green-200"
                    >
                        Xem trên Explorer: {txSignature}
                    </a>
                </div>
            )}
            
            {txError && (
                 <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm" role="alert">
                    {txError}
                 </div>
            )}

            <button
                onClick={onDisconnect}
                className="w-full py-2 px-4 border border-red-500 text-red-400 rounded-md hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-colors"
            >
                Ngắt kết nối
            </button>
        </div>
    );
};
