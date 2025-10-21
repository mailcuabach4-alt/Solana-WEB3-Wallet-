import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction, clusterApiUrl, Cluster } from '@solana/web3.js';
import bs58 from 'bs58';
import { ConnectWallet } from './components/ConnectWallet';
import { WalletDashboard } from './components/WalletDashboard';
import { NetworkSwitcher } from './components/NetworkSwitcher';
import { Guide } from './components/Guide';

const App: React.FC = () => {
    const [keypair, setKeypair] = useState<Keypair | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [network, setNetwork] = useState<Cluster | 'custom'>('devnet');
    const [customRpcUrl, setCustomRpcUrl] = useState<string>('http://127.0.0.1:8899');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const connection = useMemo(() => {
        const endpoint = network === 'custom' ? customRpcUrl : clusterApiUrl(network);
        return new Connection(endpoint, 'confirmed');
    }, [network, customRpcUrl]);

    const fetchBalance = useCallback(async (publicKey: PublicKey) => {
        try {
            setLoading(true);
            setError('');
            const lamports = await connection.getBalance(publicKey);
            setBalance(lamports / LAMPORTS_PER_SOL);
        } catch (err) {
            console.error("Lỗi khi lấy số dư:", err);
            setError("Không thể lấy số dư. Vui lòng kiểm tra mạng và thử lại.");
            setBalance(null);
        } finally {
            setLoading(false);
        }
    }, [connection]);

    useEffect(() => {
        if (keypair) {
            fetchBalance(keypair.publicKey);
        }
    }, [keypair, fetchBalance]);

    const handleConnect = useCallback(async (privateKey: string, format: 'base58' | 'byteArray') => {
        setLoading(true);
        setError('');
        try {
            let decodedKey: Uint8Array;

            if (format === 'base58') {
                decodedKey = bs58.decode(privateKey);
            } else { // 'byteArray'
                try {
                    const parsedArray = JSON.parse(privateKey);
                    if (!Array.isArray(parsedArray) || !parsedArray.every(item => typeof item === 'number' && item >= 0 && item <= 255)) {
                        throw new Error('Định dạng mảng byte không hợp lệ. Phải là một mảng các số từ 0-255.');
                    }
                    decodedKey = new Uint8Array(parsedArray);
                } catch (e) {
                    console.error('Lỗi phân tích mảng byte:', e);
                    throw new Error('Không thể phân tích mảng byte. Hãy chắc chắn rằng đó là một mảng JSON hợp lệ, ví dụ: [1, 2, ..., 64].');
                }
            }

            if (decodedKey.length !== 64) {
                 throw new Error(`Độ dài khóa riêng tư không hợp lệ. Yêu cầu 64 byte, nhưng nhận được ${decodedKey.length}.`);
            }
            const newKeypair = Keypair.fromSecretKey(decodedKey);
            await fetchBalance(newKeypair.publicKey);
            setKeypair(newKeypair);
        } catch (err) {
            console.error("Lỗi kết nối:", err);
            let message = 'Đã xảy ra lỗi không xác định.';
            if (err instanceof Error) {
                message = err.message;
            }
            setError(`Không thể kết nối ví: ${message}`);
            setKeypair(null);
            setBalance(null);
        } finally {
            setLoading(false);
        }
    }, [fetchBalance]);

    const handleDisconnect = () => {
        setKeypair(null);
        setBalance(null);
        setError('');
    };

    const handleSendSol = async (toAddress: string, amount: number): Promise<string> => {
        if (!keypair) {
            throw new Error("Ví chưa được kết nối.");
        }
        setLoading(true);
        setError('');

        try {
            const toPublicKey = new PublicKey(toAddress);
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: keypair.publicKey,
                    toPubkey: toPublicKey,
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendAndConfirmTransaction(connection, transaction, [keypair]);
            await fetchBalance(keypair.publicKey);
            return signature;
        } catch (err) {
            console.error("Lỗi giao dịch:", err);
             let message = 'Đã xảy ra lỗi không xác định.';
            if (err instanceof Error) {
                message = err.message;
            }
            setError(`Gửi SOL thất bại: ${message}`);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    
    const handleRefreshBalance = () => {
        if (keypair) {
            fetchBalance(keypair.publicKey);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-mono">
            <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-6 border border-purple-500/30">
                <div className="text-center">
                     <div className="flex items-center justify-center gap-3">
                        <h1 className="text-3xl font-bold text-purple-400">Ví Solana</h1>
                        <button onClick={() => setIsGuideOpen(!isGuideOpen)} className="text-gray-400 hover:text-purple-400 transition-colors" aria-label="Toggle Guide">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-gray-400 mt-1">Một ví đơn giản cho mạng Local & Devnet</p>
                </div>
                
                <Guide isOpen={isGuideOpen} />

                <NetworkSwitcher 
                  network={network}
                  setNetwork={setNetwork}
                  customRpcUrl={customRpcUrl}
                  setCustomRpcUrl={setCustomRpcUrl}
                  disabled={!!keypair}
                />

                {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm" role="alert">{error}</div>}

                {!keypair ? (
                    <ConnectWallet onConnect={handleConnect} loading={loading} />
                ) : (
                    <WalletDashboard
                        publicKey={keypair.publicKey.toBase58()}
                        balance={balance}
                        onSend={handleSendSol}
                        onDisconnect={handleDisconnect}
                        onRefresh={handleRefreshBalance}
                        loading={loading}
                        network={network}
                        customRpcUrl={customRpcUrl}
                    />
                )}
            </div>
            <footer className="text-center text-gray-500 mt-8 text-sm">
                <p>Tạo cho mục đích phát triển. KHÔNG BAO GIỜ sử dụng khóa riêng tư của ví chính!</p>
            </footer>
        </div>
    );
};

export default App;